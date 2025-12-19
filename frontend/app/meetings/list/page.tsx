"use client"

import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { 
  Clock, 
  Video, 
  ExternalLink, 
  ArrowLeft, 
  CalendarDays, 
  Trash2, 
  AlertCircle,
  Pencil,
  X,
  Save,
  Loader2
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Meeting {
  id: string
  title: string
  startTime: string
  endTime: string
  meetLink?: string
  htmlLink: string
  description?: string
}

export default function MeetingsListPage() {
  const router = useRouter()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // --- STATE FOR ACTIONS ---
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  // Edit Modal State
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  
  // Edit Form State
  const [editForm, setEditForm] = useState({
    title: "",
    date: "",
    startTime: "",
    duration: "30"
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }
    fetchMeetings(token)
  }, [router])

  const fetchMeetings = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/meetings/list", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setMeetings(data.meetings)
      } else {
        const data = await response.json()
        setError(data.message || "Failed to fetch meetings")
      }
    } catch (err) {
      setError("An error occurred while fetching meetings")
    } finally {
      setLoading(false)
    }
  }

  // --- 1. UPDATED DATE FORMATTER (Includes Year) ---
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr)
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric", // Year added here
      hour: "numeric",
      minute: "2-digit",
    })
  }

  // --- DELETE HANDLER ---
  const handleDeleteMeeting = async (meetingId: string) => {
    if (!window.confirm("Are you sure you want to remove this event from your calendar?")) return

    const token = localStorage.getItem("token")
    setDeletingId(meetingId)

    try {
      const response = await fetch(`http://localhost:5000/api/meetings/${meetingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        setMeetings((prev) => prev.filter((m) => m.id !== meetingId))
      } else {
        alert("Failed to delete meeting.")
      }
    } catch (error) {
      console.error("Error deleting:", error)
      alert("An error occurred.")
    } finally {
      setDeletingId(null)
    }
  }

  // --- EDIT HANDLERS ---
  const openEditModal = (meeting: Meeting) => {
    setEditingMeeting(meeting)
    
    // Parse current values for the form
    const start = new Date(meeting.startTime)
    const end = new Date(meeting.endTime)
    const durationMins = Math.round((end.getTime() - start.getTime()) / 60000)

    // Format date as YYYY-MM-DD for input
    const dateStr = start.toISOString().split('T')[0]
    
    // Format time as HH:MM for input
    // Note: Use getHours/getMinutes to avoid timezone shifting issues on pure strings
    const hours = start.getHours().toString().padStart(2, '0')
    const minutes = start.getMinutes().toString().padStart(2, '0')
    const timeStr = `${hours}:${minutes}`

    setEditForm({
      title: meeting.title || "",
      date: dateStr,
      startTime: timeStr,
      duration: durationMins.toString()
    })
    
    setIsEditOpen(true)
  }

  const handleUpdateMeeting = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMeeting) return

    setUpdateLoading(true)
    const token = localStorage.getItem("token")

    try {
      const response = await fetch(`http://localhost:5000/api/meetings/${editingMeeting.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editForm.title,
          date: editForm.date,
          startTime: editForm.startTime,
          duration: parseInt(editForm.duration)
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update the list with the new data from API
        setMeetings((prev) => 
          prev.map((m) => (m.id === editingMeeting.id ? data.meeting : m))
        )
        setIsEditOpen(false)
        setEditingMeeting(null)
      } else {
        alert("Failed to update meeting.")
      }
    } catch (error) {
      console.error("Error updating:", error)
      alert("An error occurred while updating.")
    } finally {
      setUpdateLoading(false)
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="h-10 w-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
           <p className="text-zinc-500 text-sm font-medium animate-pulse">Retrieving timeline...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
           <span className="text-sm font-medium text-zinc-500">Chronos Calendar</span>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl pt-32 pb-20 px-6 relative z-10">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
               Upcoming Events
            </h1>
            <p className="text-zinc-400 text-lg">
               Manage your synchronized schedule.
            </p>
          </div>
          
          <Button 
            onClick={() => router.push("/meetings/schedule")}
            className="h-12 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
          >
            + Schedule New
          </Button>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-3">
             <AlertCircle className="h-4 w-4" />
             {error}
          </div>
        )}

        {meetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 text-center">
            <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
               <CalendarDays className="h-8 w-8 text-zinc-500" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Timeline Clear</h2>
            <p className="text-zinc-500 max-w-sm mb-8">
               You have no upcoming meetings scheduled. Your calendar is wide open for deep work.
            </p>
            <Button 
               variant="outline"
               onClick={() => router.push("/meetings/schedule")}
               className="h-12 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl"
            >
               Schedule Meeting
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {meetings.map((meeting, index) => (
              <div 
                key={meeting.id}
                className="group relative p-6 md:p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-indigo-500/30 hover:bg-[#0f0f12] transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
                   
                   {/* Left: Info */}
                   <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3 text-sm font-mono text-indigo-400">
                         <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                            <Clock className="h-3.5 w-3.5" />
                            {/* Updated Formatter used here */}
                            {formatDateTime(meeting.startTime)}
                         </div>
                      </div>
                      
                      <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-white transition-colors">
                         {meeting.title || "Untitled Meeting"}
                      </h3>

                      <div className="flex items-center gap-4 pt-2">
                         {meeting.meetLink && (
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                               <Video className="h-3.5 w-3.5" /> Google Meet Enabled
                            </div>
                         )}
                      </div>
                   </div>

                   {/* Right: Actions */}
                   <div className="flex flex-row md:flex-col gap-3 justify-end items-start md:items-end">
                      {meeting.meetLink && (
                         <Button 
                           size="sm" 
                           onClick={() => window.open(meeting.meetLink, "_blank")}
                           className="h-10 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/20 shadow-lg shadow-indigo-900/20 w-full md:w-auto"
                         >
                           <Video className="h-4 w-4 mr-2" />
                           Join
                         </Button>
                      )}
                      
                      <div className="flex gap-2 w-full md:w-auto">
                        {/* EDIT BUTTON */}
                        <Button 
                           variant="outline" 
                           size="sm" 
                           onClick={() => openEditModal(meeting)}
                           className="h-10 w-10 p-0 rounded-lg border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                           title="Edit Event"
                        >
                           <Pencil className="h-4 w-4" />
                        </Button>

                        {/* DELETE BUTTON */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteMeeting(meeting.id)}
                            disabled={deletingId === meeting.id}
                            className="h-10 w-10 p-0 rounded-lg border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-zinc-500 transition-colors"
                            title="Remove Event"
                        >
                            {deletingId === meeting.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Trash2 className="h-4 w-4" />
                            )}
                        </Button>

                        <Button 
                           variant="outline" 
                           size="sm" 
                           onClick={() => window.open(meeting.htmlLink, "_blank")}
                           className="h-10 w-10 p-0 rounded-lg border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                           title="View in Calendar"
                        >
                           <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                   </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- EDIT MODAL (Custom Overlay) --- */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="relative w-full max-w-lg bg-[#0c0c0e] border border-white/10 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-semibold text-white">Edit Meeting</h2>
                 <button onClick={() => setIsEditOpen(false)} className="text-zinc-500 hover:text-white">
                    <X className="h-5 w-5" />
                 </button>
              </div>

              <form onSubmit={handleUpdateMeeting} className="space-y-5">
                 <div className="space-y-2">
                    <Label className="text-zinc-400">Title</Label>
                    <Input 
                       value={editForm.title} 
                       onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                       className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:border-indigo-500"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label className="text-zinc-400">Date</Label>
                       <Input 
                          type="date"
                          value={editForm.date} 
                          onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                          className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:border-indigo-500"
                       />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-zinc-400">Start Time</Label>
                       <Input 
                          type="time"
                          value={editForm.startTime} 
                          onChange={(e) => setEditForm({...editForm, startTime: e.target.value})}
                          className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:border-indigo-500"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label className="text-zinc-400">Duration (Minutes)</Label>
                    <Input 
                       type="number"
                       value={editForm.duration} 
                       onChange={(e) => setEditForm({...editForm, duration: e.target.value})}
                       className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus:border-indigo-500"
                    />
                 </div>

                 <div className="pt-4 flex gap-3">
                    <Button 
                       type="submit" 
                       className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white h-11 rounded-xl"
                       disabled={updateLoading}
                    >
                       {updateLoading ? (
                          <>
                             <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...
                          </>
                       ) : (
                          <>
                             <Save className="h-4 w-4 mr-2" /> Save Changes
                          </>
                       )}
                    </Button>
                    <Button 
                       type="button" 
                       variant="outline"
                       onClick={() => setIsEditOpen(false)}
                       className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 text-white h-11 rounded-xl"
                       disabled={updateLoading}
                    >
                       Cancel
                    </Button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  )
}