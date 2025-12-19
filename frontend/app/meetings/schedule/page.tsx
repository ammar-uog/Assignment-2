"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Loader2, 
  Copy, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Globe,
  CalendarCheck
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ScheduleMeetingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [meetingCreated, setMeetingCreated] = useState(false)
  const [meetLink, setMeetLink] = useState("")
  const [copied, setCopied] = useState(false)

  // Form fields
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState("30")
  const [attendees, setAttendees] = useState("")
  const [timezone, setTimezone] = useState("UTC")

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
    }

    // Detect user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimezone(userTimezone)

    // Set default date to today
    const today = new Date().toISOString().split("T")[0]
    setDate(today)
    
    // Set default time to next hour
    const now = new Date()
    now.setHours(now.getHours() + 1)
    now.setMinutes(0)
    const timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    setStartTime(timeString)
  }, [router])

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }

    // Parse attendees (comma-separated emails)
    const attendeeList = attendees
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0)

    const meetingData = {
      title,
      date,
      startTime,
      duration: Number.parseInt(duration),
      timezone,
      attendees: attendeeList,
    }

    try {
      const response = await fetch("http://localhost:5000/api/meetings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(meetingData),
      })

      const data = await response.json()

      if (response.ok) {
        setMeetingCreated(true)
        setMeetLink(data.meeting.meetLink)
      } else {
        setError(data.message || "Failed to schedule meeting")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // --- SUCCESS STATE (Mission Accomplished) ---
  if (meetingCreated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="w-full max-w-lg relative animate-in zoom-in-95 duration-500">
          <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/30 to-indigo-500/30 rounded-[34px] blur-sm opacity-50" />
          
          <div className="relative bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 text-center shadow-2xl">
            
            <div className="mx-auto mb-8 relative h-20 w-20 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative h-full w-full bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Meeting Confirmed
            </h1>
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
              The event has been synced to your calendar and invitations have been dispatched via neural relay.
            </p>

            <div className="bg-[#111114] border border-white/10 rounded-xl p-4 mb-8 text-left">
              <Label className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 block">
                Secure Video Link
              </Label>
              <div className="flex gap-2">
                <div className="flex-1 bg-black/20 border border-white/5 rounded-lg px-3 py-2 text-sm font-mono text-emerald-400 truncate">
                   {meetLink}
                </div>
                <Button 
                   variant="outline" 
                   size="icon" 
                   onClick={copyToClipboard} 
                   className="shrink-0 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white"
                >
                  {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => window.open(meetLink, "_blank")} 
                className="w-full h-12 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium"
              >
                <Video className="mr-2 h-4 w-4" />
                Launch Meeting Room
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                 <Button 
                    variant="outline" 
                    onClick={() => router.push("/dashboard")}
                    className="h-12 border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl"
                 >
                    Dashboard
                 </Button>
                 <Button
                    variant="outline"
                    onClick={() => {
                      setMeetingCreated(false)
                      setMeetLink("")
                      setTitle("")
                      setAttendees("")
                    }}
                    className="h-12 border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl"
                  >
                    New Event
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- FORM STATE (The Command Center) ---
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Cancel & Return</span>
        </Link>
      </header>

      <main className="container mx-auto max-w-3xl pt-24 pb-20 px-6 relative z-10">
        
        {/* Title Area */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-xl">
              <CalendarCheck className="h-6 w-6 text-indigo-400" />
           </div>
           <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
              Initialize Session
           </h1>
           <p className="text-zinc-400 max-w-md mx-auto">
              Configure parameters for a new synchronous event. Invitations will be handled automatically by Chronos.
           </p>
        </div>

        {/* Main Form Card */}
        <div className="relative animate-in zoom-in-95 duration-700 delay-100">
           <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[34px] blur-sm opacity-30" />
           
           <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
              
              <form onSubmit={handleSchedule} className="space-y-8">
                 
                 {/* TITLE INPUT */}
                 <div className="space-y-3 group">
                    <Label htmlFor="title" className="text-xs font-medium text-zinc-500 uppercase tracking-widest pl-1 group-focus-within:text-indigo-400 transition-colors">
                       Event Designation
                    </Label>
                    <div className="relative">
                       <Input
                          id="title"
                          placeholder="e.g. Q3 Strategy Review"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="h-14 pl-12 bg-[#0F0F12] border-white/10 text-lg text-white placeholder:text-zinc-700 rounded-2xl focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all"
                          required
                       />
                       <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                    </div>
                 </div>

                 {/* DATE & TIME GRID */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 group">
                       <Label className="text-xs font-medium text-zinc-500 uppercase tracking-widest pl-1 group-focus-within:text-indigo-400 transition-colors">
                          Date Vector
                       </Label>
                       <Input 
                          type="date" 
                          value={date} 
                          onChange={(e) => setDate(e.target.value)} 
                          className="h-14 bg-[#0F0F12] border-white/10 text-white rounded-2xl focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all [color-scheme:dark]"
                          required 
                       />
                    </div>

                    <div className="space-y-3 group">
                       <Label className="text-xs font-medium text-zinc-500 uppercase tracking-widest pl-1 group-focus-within:text-indigo-400 transition-colors">
                          Time Origin
                       </Label>
                       <div className="relative">
                          <Input
                             type="time"
                             value={startTime}
                             onChange={(e) => setStartTime(e.target.value)}
                             className="h-14 pl-12 bg-[#0F0F12] border-white/10 text-white rounded-2xl focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all [color-scheme:dark]"
                             required
                          />
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                       </div>
                    </div>
                 </div>

                 {/* DURATION & TIMEZONE */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label className="text-xs font-medium text-zinc-500 uppercase tracking-widest pl-1">
                          Duration (Minutes)
                       </Label>
                       <div className="grid grid-cols-4 gap-2">
                          {[15, 30, 45, 60].map((mins) => (
                             <button
                                key={mins}
                                type="button"
                                onClick={() => setDuration(mins.toString())}
                                className={`h-14 rounded-xl text-sm font-medium transition-all border ${
                                   duration === mins.toString()
                                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                      : "bg-[#0F0F12] text-zinc-400 border-white/10 hover:bg-white/5 hover:border-white/20"
                                }`}
                             >
                                {mins}m
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-3 group">
                       <Label className="text-xs font-medium text-zinc-500 uppercase tracking-widest pl-1 group-focus-within:text-indigo-400 transition-colors">
                          Local Timezone
                       </Label>
                       <div className="relative">
                          <Input
                             value={timezone}
                             onChange={(e) => setTimezone(e.target.value)}
                             className="h-14 pl-12 bg-[#0F0F12] border-white/10 text-white rounded-2xl focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all"
                          />
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                       </div>
                    </div>
                 </div>

                 {/* ATTENDEES */}
                 <div className="space-y-3 group">
                    <Label className="text-xs font-medium text-zinc-500 uppercase tracking-widest pl-1 group-focus-within:text-indigo-400 transition-colors">
                       Participants (Comma Separated)
                    </Label>
                    <div className="relative">
                       <Textarea
                          placeholder="alice@corp.com, bob@agency.com"
                          value={attendees}
                          onChange={(e) => setAttendees(e.target.value)}
                          className="min-h-[100px] pl-12 pt-4 bg-[#0F0F12] border-white/10 text-white placeholder:text-zinc-700 rounded-2xl focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all resize-none"
                       />
                       <Users className="absolute left-4 top-5 h-5 w-5 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                    </div>
                 </div>

                 {/* ERROR MESSAGE */}
                 {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                       <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                       {error}
                    </div>
                 )}

                 {/* SUBMIT BUTTON */}
                 <div className="pt-4">
                    <Button 
                       type="submit" 
                       disabled={loading} 
                       className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-lg shadow-lg shadow-indigo-900/20 transition-all hover:scale-[1.01] relative overflow-hidden group/btn"
                    >
                       {loading ? (
                          <>
                             <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                             Processing Request...
                          </>
                       ) : (
                          <>
                             <Sparkles className="mr-3 h-5 w-5" />
                             Schedule Event
                          </>
                       )}
                       {/* Shine effect */}
                       <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
                    </Button>
                    
                    <div className="mt-6 text-center">
                       <Button 
                          type="button" 
                          variant="ghost" 
                          onClick={() => router.push("/dashboard")}
                          className="text-zinc-500 hover:text-white hover:bg-transparent"
                       >
                          Discard Draft
                       </Button>
                    </div>
                 </div>

              </form>
           </div>
        </div>

      </main>
    </div>
  )
}