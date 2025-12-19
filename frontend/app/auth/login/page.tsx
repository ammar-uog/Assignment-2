"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Sparkles, Clock, CheckCircle2, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }))
        router.push("/dashboard")
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden font-sans selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* --- BACKGROUND: FLUID INTELLIGENCE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Deep ambient glow representing 'Deep Learning' */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-violet-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full blur-[100px]" />
        
        {/* Subtle glowing orbs drifting (The AI "Thinking") */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-violet-600/20 to-transparent rounded-full blur-[80px] animate-[bounce_10s_infinite]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="w-full max-w-[420px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white mb-8 transition-colors duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* MAIN CARD */}
        <div className="relative group">
          {/* Soft backlight behind card */}
          <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-[32px] blur-md opacity-20 group-hover:opacity-40 transition duration-700"></div>
          
          <div className="relative p-10 rounded-[30px] bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/10 shadow-2xl">
            
            {/* Visual Header: The "Time Keeper" AI */}
            <div className="flex flex-col items-center justify-center mb-8 text-center">
              <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
                {/* Abstract Clock / Orbit Animation */}
                <div className="absolute inset-0 rounded-full border border-violet-500/30 animate-[spin_8s_linear_infinite]" />
                <div className="absolute inset-2 rounded-full border border-indigo-400/20 animate-[spin_12s_linear_infinite_reverse]" />
                
                {/* Center Core */}
                <div className="h-8 w-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 rotate-45">
                   <Clock className="text-white h-4 w-4 -rotate-45" />
                </div>
                
                {/* Floating "AI" sparkles */}
                <Sparkles className="absolute -top-1 -right-2 h-4 w-4 text-indigo-300 animate-pulse" />
              </div>

              <h1 className="text-2xl font-semibold text-white tracking-tight">
                Welcome to Chronos
              </h1>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Your AI assistant is ready to optimize your schedule. Please sign in to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-zinc-400 ml-1">Work Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/5 border-white/5 hover:border-white/10 focus:bg-white/10 focus:border-violet-500/50 text-white placeholder:text-zinc-600 rounded-2xl transition-all duration-300"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label htmlFor="password" className="text-xs font-medium text-zinc-400">Password</label>
                  <Link href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white/5 border-white/5 hover:border-white/10 focus:bg-white/10 focus:border-violet-500/50 text-white placeholder:text-zinc-600 rounded-2xl transition-all duration-300"
                  required
                />
              </div>

              {/* Error Message Display */}
              {error && (
                <div className="text-xs text-red-300 bg-red-500/10 p-3 rounded-xl border border-red-500/20 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 mt-2 bg-white text-black hover:bg-zinc-200 rounded-2xl font-medium text-sm transition-all duration-300 shadow-[0_0_20px_-10px_rgba(255,255,255,0.5)]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-zinc-400 border-t-transparent animate-spin" />
                    Syncing...
                  </span>
                ) : (
                  "Continue to Schedule"
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-zinc-500 text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-zinc-300 hover:text-white font-medium transition-colors">
              Create workspace
            </Link>
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest pt-4">
             <CheckCircle2 className="h-3 w-3" /> Secure AI Environment
          </div>
        </div>
      </div>
    </div>
  )
}