"use client"

import { useEffect } from "react"
import { Button } from "../../components/ui/button"
import { CalendarCheck, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CalendarConnectedPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="relative w-full max-w-md p-1 animate-in zoom-in-95 duration-500">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/50 to-emerald-500/50 rounded-[34px] blur-sm opacity-50" />
        
        <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-12 text-center shadow-2xl">
          
          {/* Icon Animation */}
          <div className="mx-auto mb-8 relative h-20 w-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative h-full w-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
              <CalendarCheck className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-[#0A0A0A] p-1.5 rounded-full border border-white/10">
               <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-white tracking-tight mb-3">
            System Synced
          </h1>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Your Google Calendar has been successfully integrated into the Chronos neural network. We are now optimizing your timeline.
          </p>

          <Button 
            onClick={() => router.push("/dashboard")} 
            className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 font-medium text-base shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02]"
          >
            Enter Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="mt-6 text-xs text-zinc-600 font-mono">
            Redirecting automatically in 3s...
          </p>
        </div>
      </div>

    </div>
  )
}