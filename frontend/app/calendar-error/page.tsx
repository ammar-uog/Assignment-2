"use client"

import { Button } from "../../components/ui/button"
import { XCircle, RotateCcw, Home, AlertOctagon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CalendarErrorPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-zinc-100 font-sans selection:bg-red-500/30 overflow-hidden relative">
      
      {/* --- AMBIENT BACKGROUND (Error Tint) --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="relative w-full max-w-md p-1 animate-in zoom-in-95 duration-500">
        {/* Glowing border effect (Red/Orange) */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 to-orange-500/50 rounded-[34px] blur-sm opacity-50" />
        
        <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-12 text-center shadow-2xl">
          
          {/* Icon Animation */}
          <div className="mx-auto mb-8 relative h-20 w-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative h-full w-full bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/50">
              <XCircle className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-[#0A0A0A] p-1.5 rounded-full border border-white/10">
               <AlertOctagon className="h-4 w-4 text-red-400" />
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-white tracking-tight mb-3">
            Sync Failed
          </h1>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            We encountered a disruption while attempting to link your Google Calendar. The neural handshake was not completed.
          </p>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => router.push("/google/connect")} 
              className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 font-medium text-base shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02]"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Try Connection Again
            </Button>

            <Button 
              variant="outline"
              onClick={() => router.push("/dashboard")} 
              className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-base transition-colors"
            >
              <Home className="mr-2 h-4 w-4" /> Return to Dashboard
            </Button>
          </div>

          <p className="mt-8 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            Error Code: ERR_API_TIMEOUT
          </p>
        </div>
      </div>

    </div>
  )
}