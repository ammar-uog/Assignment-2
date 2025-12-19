const express = require("express")
const router = express.Router()
const { google } = require("googleapis")
const User = require("../models/User")
const protect = require("../middleware/authMiddleware")

// Google OAuth2 client configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
)

/**
 * Helper function to refresh access token if expired
 */
async function refreshAccessToken(user) {
  try {
    oauth2Client.setCredentials({
      refresh_token: user.googleRefreshToken,
    })

    const { credentials } = await oauth2Client.refreshAccessToken()

    // Update user with new access token
    const expiryDate = new Date()
    expiryDate.setSeconds(expiryDate.getSeconds() + credentials.expiry_date)

    await User.findByIdAndUpdate(user._id, {
      googleAccessToken: credentials.access_token,
      googleTokenExpiry: expiryDate,
    })

    return credentials.access_token
  } catch (error) {
    console.error("Error refreshing access token:", error)
    throw new Error("Failed to refresh access token")
  }
}

/**
 * Helper function to get valid access token
 */
async function getValidAccessToken(user) {
  const now = new Date()
  const tokenExpiry = new Date(user.googleTokenExpiry)

  // Check if token is expired or about to expire (within 5 minutes)
  if (tokenExpiry <= now || tokenExpiry - now < 5 * 60 * 1000) {
    return await refreshAccessToken(user)
  }

  return user.googleAccessToken
}

/**
 * POST /api/meetings/create
 * Create a Google Calendar event with Google Meet link
 * Protected route - requires JWT authentication and Google OAuth
 */
router.post("/create", protect, async (req, res) => {
  try {
    const { title, date, startTime, duration, timezone, attendees } = req.body

    // Validate required fields
    if (!title || !date || !startTime || !duration) {
      return res.status(400).json({
        message: "Missing required fields: title, date, startTime, duration",
      })
    }

    // Get user with Google tokens
    const user = await User.findById(req.user._id)

    if (!user.googleAccessToken || !user.googleRefreshToken) {
      return res.status(403).json({
        message: "Google Calendar not connected. Please connect your Google account first.",
      })
    }

    // Get valid access token (refresh if needed)
    const accessToken = await getValidAccessToken(user)

    // Set credentials for this request
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: user.googleRefreshToken,
    })

    // Initialize Google Calendar API
    const calendar = google.calendar({ version: "v3", auth: oauth2Client })

    // Parse date and time
    const [year, month, day] = date.split("-")
    const [hours, minutes] = startTime.split(":")

    // Create start and end datetime
    const startDateTime = new Date(year, month - 1, day, hours, minutes)
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000)

    // Format attendees
    const attendeesList = attendees && attendees.length > 0 ? attendees.map((email) => ({ email: email.trim() })) : []

    // Create calendar event with Google Meet
    const event = {
      summary: title,
      description: `Meeting scheduled via app`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: timezone || "UTC",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: timezone || "UTC",
      },
      attendees: attendeesList,
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    }

    // Insert event into Google Calendar
    const response = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1, // Required for Google Meet link generation
      resource: event,
      sendUpdates: "all", // Send invites to attendees
    })

    // Extract Google Meet link
    const meetLink = response.data.conferenceData?.entryPoints?.find((ep) => ep.entryPointType === "video")?.uri

    if (!meetLink) {
      return res.status(500).json({
        message: "Event created but Google Meet link generation failed",
        eventId: response.data.id,
      })
    }

    // Return success response with meeting details
    res.status(201).json({
      success: true,
      message: "Meeting scheduled successfully",
      meeting: {
        id: response.data.id,
        title: response.data.summary,
        startTime: response.data.start.dateTime,
        endTime: response.data.end.dateTime,
        meetLink: meetLink,
        htmlLink: response.data.htmlLink,
        attendees: response.data.attendees || [],
      },
    })
  } catch (error) {
    console.error("Error creating meeting:", error)

    if (error.message === "Failed to refresh access token") {
      return res.status(401).json({
        message: "Google authentication expired. Please reconnect your Google account.",
      })
    }

    res.status(500).json({
      message: "Failed to create meeting",
      error: error.message,
    })
  }
})
/**
 * DELETE /api/meetings/:id
 * Delete a meeting from Google Calendar
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params

    // 1. Authenticate and get Google client
    const user = await User.findById(req.user._id)
    if (!user.googleAccessToken || !user.googleRefreshToken) {
      return res.status(403).json({ message: "Google Calendar not connected" })
    }

    const accessToken = await getValidAccessToken(user)
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: user.googleRefreshToken,
    })

    const calendar = google.calendar({ version: "v3", auth: oauth2Client })

    // 2. Delete the event
    await calendar.events.delete({
      calendarId: "primary",
      eventId: id,
      sendUpdates: "all", // Notify attendees of cancellation
    })

    res.json({ success: true, message: "Meeting deleted successfully" })

  } catch (error) {
    console.error("Error deleting meeting:", error)
    
    // Handle specific Google API errors
    if (error.code === 404) {
      return res.status(404).json({ message: "Meeting not found in Google Calendar" })
    }
    if (error.code === 410) {
      return res.status(410).json({ message: "Meeting already deleted" })
    }

    res.status(500).json({ message: "Failed to delete meeting", error: error.message })
  }
})

/**
 * PUT /api/meetings/:id
 * Update an existing meeting in Google Calendar
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params
    const { title, date, startTime, duration, timezone, attendees, description } = req.body

    // 1. Authenticate
    const user = await User.findById(req.user._id)
    if (!user.googleAccessToken || !user.googleRefreshToken) {
      return res.status(403).json({ message: "Google Calendar not connected" })
    }

    const accessToken = await getValidAccessToken(user)
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: user.googleRefreshToken,
    })

    const calendar = google.calendar({ version: "v3", auth: oauth2Client })

    // 2. Fetch existing event first to preserve data if partial update
    // We need this to correctly calculate end time if only start time changes, etc.
    const currentEvent = await calendar.events.get({
      calendarId: "primary",
      eventId: id,
    })

    if (!currentEvent.data) {
      return res.status(404).json({ message: "Meeting not found" })
    }

    // 3. Prepare the Patch Object
    const patchResource = {}

    if (title) patchResource.summary = title
    if (description) patchResource.description = description

    // Handle Date/Time updates
    // Note: If you update time, you usually need to re-supply date/start/duration logic
    // This logic assumes if you send one time param, you send them all for safety, 
    // OR we fallback to existing values.
    if (date || startTime || duration) {
      
      // Parse existing start time to fallback if needed
      const currentStart = new Date(currentEvent.data.start.dateTime)
      const currentEnd = new Date(currentEvent.data.end.dateTime)
      
      // Calculate duration in minutes if not provided
      const currentDuration = (currentEnd - currentStart) / 60000

      // Use new values or fallback to existing
      const targetDateStr = date || currentStart.toISOString().split('T')[0]
      const targetTimeStr = startTime || `${currentStart.getHours().toString().padStart(2, '0')}:${currentStart.getMinutes().toString().padStart(2, '0')}`
      const targetDuration = duration || currentDuration
      const targetTimezone = timezone || currentEvent.data.start.timeZone

      const [year, month, day] = targetDateStr.split("-")
      const [hours, minutes] = targetTimeStr.split(":")

      const newStartDateTime = new Date(year, month - 1, day, hours, minutes)
      const newEndDateTime = new Date(newStartDateTime.getTime() + targetDuration * 60000)

      patchResource.start = {
        dateTime: newStartDateTime.toISOString(),
        timeZone: targetTimezone,
      }
      patchResource.end = {
        dateTime: newEndDateTime.toISOString(),
        timeZone: targetTimezone,
      }
    }

    // Handle Attendees update (Replaces the list)
    if (attendees) {
      patchResource.attendees = attendees.map((email) => ({ email: email.trim() }))
    }

    // 4. Send Patch Request
    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId: id,
      resource: patchResource,
      sendUpdates: "all", // Notify attendees of changes
    })

    res.json({
      success: true,
      message: "Meeting updated successfully",
      meeting: {
        id: response.data.id,
        title: response.data.summary,
        startTime: response.data.start.dateTime,
        endTime: response.data.end.dateTime,
        meetLink: response.data.conferenceData?.entryPoints?.find((ep) => ep.entryPointType === "video")?.uri,
        htmlLink: response.data.htmlLink,
      },
    })

  } catch (error) {
    console.error("Error updating meeting:", error)
    res.status(500).json({ message: "Failed to update meeting", error: error.message })
  }
})
/**
 * GET /api/meetings/list
 * List upcoming meetings from Google Calendar
 */
router.get("/list", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user.googleAccessToken || !user.googleRefreshToken) {
      return res.status(403).json({
        message: "Google Calendar not connected",
      })
    }

    const accessToken = await getValidAccessToken(user)

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: user.googleRefreshToken,
    })

    const calendar = google.calendar({ version: "v3", auth: oauth2Client })

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    })

    const meetings = response.data.items.map((event) => ({
      id: event.id,
      title: event.summary,
      startTime: event.start.dateTime || event.start.date,
      endTime: event.end.dateTime || event.end.date,
      meetLink: event.conferenceData?.entryPoints?.find((ep) => ep.entryPointType === "video")?.uri,
      htmlLink: event.htmlLink,
    }))

    res.json({ meetings })
  } catch (error) {
    console.error("Error listing meetings:", error)
    res.status(500).json({ message: "Failed to fetch meetings" })
  }
})

module.exports = router
