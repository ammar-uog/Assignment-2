"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { 
  Video, 
  Settings, 
  Plus, 
  Clock, 
  CalendarDays,
  ChevronRight,
  AlertCircle,
  Command,
  LogOut,
  Sparkles,
  CheckCircle2,
  CalendarCheck
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Meeting {
  id: string
  title: string
  startTime: string
  endTime: string
  meetLink?: string
  htmlLink: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string; token: string } | null>(null)
  const [googleConnected, setGoogleConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [meetingsLoading, setMeetingsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Clock Update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Auth Check
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setUser(JSON.parse(userData))
      checkGoogleConnection(token)
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const checkGoogleConnection = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/google/status", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setGoogleConnected(data.isConnected)
        if (data.isConnected) fetchMeetings(token)
      }
    } catch (error) {
      console.error("Connection check failed", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMeetings = async (token: string) => {
    setMeetingsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/meetings/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setMeetings(data.meetings)
      }
    } catch (error) {
      console.error("Fetch failed", error)
    } finally {
      setMeetingsLoading(false)
    }
  }

  // --- Date Grouping Logic ---
  const groupedMeetings = useMemo(() => {
    const groups: { [key: string]: Meeting[] } = {}
    
    meetings.forEach(meeting => {
      const date = new Date(meeting.startTime)
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      let key = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
      
      if (date.toDateString() === today.toDateString()) key = "Today"
      else if (date.toDateString() === tomorrow.toDateString()) key = "Tomorrow"

      if (!groups[key]) groups[key] = []
      groups[key].push(meeting)
    })

    return groups
  }, [meetings])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) return null

  const nextEvent = meetings.length > 0 ? meetings[0] : null

  return (
    <div className="h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- TOP FLOATING COMMAND BAR (Navigation) --- */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-700">
         <div className="flex items-center gap-1 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-white/5">
            <Link href="/dashboard">
               <div className="p-3 rounded-full bg-white/10 text-white transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <Clock className="h-5 w-5" />
               </div>
            </Link>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <Link href="/meetings/schedule">
               <button className="p-3 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all hover:scale-105 tooltip" title="New Meeting">
                  <Plus className="h-5 w-5" />
               </button>
            </Link>
            <Link href="/meetings/list">
               <button className="p-3 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all hover:scale-105">
                  <CalendarDays className="h-5 w-5" />
               </button>
            </Link>
            <Link href="/settings">
               <button className="p-3 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all hover:scale-105">
                  <Settings className="h-5 w-5" />
               </button>
            </Link>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <button 
              onClick={handleLogout}
              className="p-3 rounded-full text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all hover:scale-105"
            >
               <LogOut className="h-5 w-5" />
            </button>
         </div>
      </div>

      {/* --- SIDE CORNER ELEMENTS --- */}
      <div className="fixed top-8 left-8 z-40 hidden md:block">
          <Link href="/dashboard" className="text-xl font-bold tracking-tighter text-white flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="h-10 w-10 bg-gradient-to-br from-white/10 to-transparent rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
              <Command className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span>Chronos</span>
              {googleConnected && (
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  ONLINE
                </span>
              )}
            </div>
          </Link>
      </div>

      <div className="fixed top-8 right-8 z-40 hidden md:flex items-center gap-4">
         <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-white">{user?.name}</span>
            <span className="text-xs text-zinc-500">{user?.email}</span>
         </div>
         <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 p-[1px]">
            <div className="h-full w-full rounded-full bg-[#050505] flex items-center justify-center text-sm font-bold">
              {user?.name.charAt(0)}
            </div>
         </div>
      </div>


      {/* --- SCROLLABLE MAIN STAGE --- */}
      <div className="h-full overflow-y-auto scroll-smooth no-scrollbar pt-32 pb-20">
        <main className="container max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Greeting */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-600">
              {currentTime.getHours() < 12 ? 'Good morning' : 'Good evening'}.
            </h1>
            <div className="flex items-center gap-4 mt-4 text-zinc-400">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-sm">
                <Clock className="h-3 w-3" /> {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-sm">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* --- HERO: NEXT EVENT (3D Card) --- */}
          <section className="mb-16 perspective-[1000px] group">
            {!googleConnected ? (
               <div className="relative w-full p-10 rounded-[2rem] bg-gradient-to-br from-[#0f0f12] to-[#050505] border border-white/10 overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-900/20">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shine_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-medium">
                           <AlertCircle className="h-3 w-3" /> System Disconnected
                        </div>
                        <h2 className="text-3xl font-semibold text-white">Sync your timeline</h2>
                        <p className="text-zinc-400 max-w-lg">Chronos needs access to your Google Calendar to visualize your day and automate meetings.</p>
                     </div>
                     <Link href="/google/connect">
                        <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 font-medium text-base transition-transform hover:scale-105 active:scale-95">
                          Connect Google Calendar
                        </Button>
                     </Link>
                  </div>
               </div>
            ) : (
              /* CONNECTED STATE HERO */
              <div className="relative w-full min-h-[300px] rounded-[2.5rem] bg-[#0A0A0A] border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10 hover:border-white/20">
                 {/* Connection Status Badge inside Hero */}
                 <div className="absolute top-8 right-8 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                    <CalendarCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-400">Calendar Connected</span>
                 </div>

                 {/* 3D Glass Layer */}
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                 
                 {meetingsLoading ? (
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-12 w-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                        <span className="text-zinc-500 text-sm tracking-widest uppercase">Syncing Neural Net...</span>
                      </div>
                   </div>
                 ) : nextEvent ? (
                   <div className="relative z-10 p-10 md:p-14 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start">
                         <div>
                            <Badge variant="outline" className="mb-4 border-indigo-500/30 text-indigo-300 bg-indigo-500/5 px-3 py-1 rounded-full">
                               Up Next
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight max-w-3xl">
                              {nextEvent.title}
                            </h2>
                         </div>
                         <div className="hidden md:block text-right">
                            <div className="text-3xl font-mono text-white">
                              {new Date(nextEvent.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div className="text-zinc-500 text-sm mt-1 font-mono">
                               to {new Date(nextEvent.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                         </div>
                      </div>

                      <div className="mt-12 flex flex-col sm:flex-row gap-4">
                         {nextEvent.meetLink && (
                            <Button 
                              onClick={() => window.open(nextEvent.meetLink, "_blank")}
                              className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-lg shadow-lg shadow-indigo-900/20 transition-all hover:translate-y-[-2px]"
                            >
                               <Video className="mr-3 h-5 w-5" /> Join Now
                            </Button>
                         )}
                         <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white text-lg backdrop-blur-sm">
                            View Details
                         </Button>
                      </div>
                   </div>
                 ) : (
                   <div className="relative z-10 p-14 flex flex-col items-center justify-center h-full text-center min-h-[300px]">
                      <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                         <Sparkles className="h-8 w-8 text-zinc-400" />
                      </div>
                      <h2 className="text-2xl font-semibold text-white">All caught up</h2>
                      <p className="text-zinc-500 mt-2">No meetings scheduled for the immediate future.</p>
                   </div>
                 )}
              </div>
            )}
          </section>

          {/* --- TIMELINE GRID --- */}
          {googleConnected && !meetingsLoading && (
            <section className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 pb-20">
               {Object.keys(groupedMeetings).length > 0 ? (
                  Object.entries(groupedMeetings).map(([dateLabel, dayMeetings], index) => (
                     <div key={dateLabel} className="space-y-6">
                        <div className="flex items-center gap-4 sticky top-24 z-20 py-2 bg-[#050505]/80 backdrop-blur-md">
                           <h3 className="text-2xl font-medium text-white">{dateLabel}</h3>
                           <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                           {dayMeetings.map((meeting, i) => (
                              <div 
                                key={meeting.id} 
                                className="group relative p-6 rounded-3xl bg-[#0f0f12] border border-white/5 hover:bg-[#151518] hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
                                style={{ animationDelay: `${i * 100}ms` }}
                              >
                                 <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col">
                                       <span className="text-sm font-mono text-zinc-500">
                                         {new Date(meeting.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                       </span>
                                       <span className="text-xs text-zinc-600 mt-0.5">
                                          {Math.floor((new Date(meeting.endTime).getTime() - new Date(meeting.startTime).getTime()) / 60000)}m
                                       </span>
                                    </div>
                                    {meeting.meetLink && (
                                       <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-indigo-500 transition-colors">
                                          <Video className="h-4 w-4" />
                                       </div>
                                    )}
                                 </div>
                                 <h4 className="text-lg font-medium text-zinc-200 group-hover:text-white line-clamp-2">
                                    {meeting.title}
                                 </h4>
                                 
                                 <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/10">
                                       <ChevronRight className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))
               ) : (
                  <div className="text-center py-20 border-t border-white/5">
                     <p className="text-zinc-500">Timeline is clear.</p>
                  </div>
               )}
            </section>
          )}

        </main>
      </div>
      
      {/* Hide Scrollbar Utility Style */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}