const express = require("express")
const router = express.Router()
const { google } = require("googleapis")
const User = require("../models/User")
const protect = require("../middleware/authMiddleware")

// Google OAuth2 client configuration
const createOAuthClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
}

// Scopes for Calendar + Meet
const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
]
/**
 * GET /api/google/connect
 * Initiates Google OAuth flow
 * Protected route - requires JWT authentication
 */
router.get("/connect", protect, (req, res) => {
  try {
    // Generate OAuth URL with user ID in state for callback
    const oauth2Client = createOAuthClient()
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      state: req.user._id.toString(),
      prompt: "consent",
    })
  
    res.json({ authUrl })
  } catch (error) {
    console.error("Error generating auth URL:", error)
    res.status(500).json({ message: "Failed to generate authorization URL" })
  }
})

/**
 * GET /api/google/callback
 * Handles OAuth callback from Google
 * Exchanges authorization code for tokens
 */
router.get("/callback", async (req, res) => {
  const { code, state } = req.query
  if (!code || !state) return res.status(400).json({ message: "Missing code or state" })

  try {
    const oauth2Client = createOAuthClient() // ✅ also define here
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    await User.findByIdAndUpdate(state, {
      googleAccessToken: tokens.access_token,
      googleRefreshToken: tokens.refresh_token,
      googleTokenExpiry: new Date(tokens.expiry_date),
    })

    res.redirect(`${process.env.FRONTEND_URL}/calendar-connected`)
  } catch (error) {
    console.error("Error during OAuth callback:", error)
    res.redirect(`${process.env.FRONTEND_URL}/calendar-error`)
  }
})


/**
 * GET /api/google/status
 * Check if user has connected their Google account
 */
router.get("/status", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const isConnected = !!(user.googleAccessToken && user.googleRefreshToken)

    res.json({
      isConnected,
      email: isConnected ? user.email : null,
    })
  } catch (error) {
    console.error("Error checking Google connection status:", error)
    res.status(500).json({ message: "Failed to check connection status" })
  }
})

/**
 * DELETE /api/google/disconnect
 * Disconnect Google account
 */
router.delete("/disconnect", protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $unset: {
        googleAccessToken: "",
        googleRefreshToken: "",
        googleTokenExpiry: "",
      },
    })

    res.json({ message: "Google account disconnected successfully" })
  } catch (error) {
    console.error("Error disconnecting Google account:", error)
    res.status(500).json({ message: "Failed to disconnect Google account" })
  }
})

module.exports = router
