"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Calendar, Loader2, ShieldCheck, ArrowLeft, Globe, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function GoogleConnectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleConnect = async () => {
    setLoading(true)
    setError("")

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/google/connect", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        // Redirect to Google OAuth page
        window.location.href = data.authUrl
      } else {
        setError("Failed to initiate Google connection")
        setLoading(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- BACK LINK --- */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="relative w-full max-w-md p-1 animate-in zoom-in-95 duration-500">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/50 to-blue-500/50 rounded-[34px] blur-sm opacity-50" />
        
        <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
          
          {/* Header Icon */}
          <div className="mx-auto mb-6 relative h-16 w-16 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative h-full w-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#0A0A0A] p-1 rounded-full border border-white/10">
               <Globe className="h-3 w-3 text-blue-400" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
              Sync Calendar Data
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Chronos requires secure read/write access to your Google Calendar to automate scheduling.
            </p>
          </div>

          <div className="space-y-6">
            {/* Permissions List */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1 pl-1">
                Permissions Required
              </p>
              <ul className="space-y-2">
                {[
                  "Manage calendar events",
                  "Generate Google Meet links", 
                  "Send automated invites"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-xs text-red-300 bg-red-500/10 p-3 rounded-xl border border-red-500/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleConnect} 
                disabled={loading} 
                className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 font-medium text-base shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <div className="flex items-center">
                    <img 
                       src="https://www.svgrepo.com/show/475656/google-color.svg" 
                       className="h-5 w-5 mr-3" 
                       alt="Google" 
                    />
                    Authorize with Google
                  </div>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => router.push("/")}
                className="w-full text-zinc-500 hover:text-white hover:bg-white/5"
              >
                Cancel Process
              </Button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-[10px] text-zinc-600">
            <Sparkles className="h-3 w-3" />
            <span>Encrypted via OAuth 2.0 Standard</span>
          </div>

        </div>
      </div>
    </div>
  )
}