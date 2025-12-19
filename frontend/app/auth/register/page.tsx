"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Sparkles, User, Mail, Lock, CheckCircle2, ArrowRight, AlertCircle } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }))
        router.push("/dashboard")
      } else {
        setError(data.message || "Registration failed")
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
         {/* Deep ambient glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-violet-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full blur-[100px]" />
        
        {/* Subtle glowing orbs drifting */}
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-violet-600/20 to-transparent rounded-full blur-[80px] animate-[bounce_12s_infinite]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="w-full max-w-[440px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
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
            
            {/* Visual Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-6 shadow-lg shadow-violet-500/10">
                <Sparkles className="h-5 w-5 text-violet-200" />
              </div>
              <h1 className="text-2xl font-semibold text-white tracking-tight">
                Initialize Workspace
              </h1>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Create your Chronos account to start automating your schedule with AI.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Full Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-medium text-zinc-400 ml-1">Full Name</label>
                <div className="relative group/input">
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 pl-10 bg-white/5 border-white/5 hover:border-white/10 focus:bg-white/10 focus:border-violet-500/50 text-white placeholder:text-zinc-600 rounded-2xl transition-all duration-300"
                    required
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within/input:text-violet-400 transition-colors pointer-events-none" />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-zinc-400 ml-1">Work Email</label>
                <div className="relative group/input">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-10 bg-white/5 border-white/5 hover:border-white/10 focus:bg-white/10 focus:border-violet-500/50 text-white placeholder:text-zinc-600 rounded-2xl transition-all duration-300"
                    required
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within/input:text-violet-400 transition-colors pointer-events-none" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-medium text-zinc-400 ml-1">Create Password</label>
                <div className="relative group/input">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-10 bg-white/5 border-white/5 hover:border-white/10 focus:bg-white/10 focus:border-violet-500/50 text-white placeholder:text-zinc-600 rounded-2xl transition-all duration-300"
                    required
                    minLength={6}
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within/input:text-violet-400 transition-colors pointer-events-none" />
                </div>
              </div>

              {/* Error Message Display */}
              {error && (
                <div className="text-xs text-red-300 bg-red-500/10 p-3 rounded-xl border border-red-500/20 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 mt-2 bg-white text-black hover:bg-zinc-200 rounded-2xl font-medium text-sm transition-all duration-300 shadow-[0_0_20px_-10px_rgba(255,255,255,0.5)] group/btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-zinc-400 border-t-transparent animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                   Signup <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>


          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-zinc-500 text-sm">
            Already have a workspace?{" "}
            <Link href="/auth/login" className="text-zinc-300 hover:text-white font-medium transition-colors">
              Sign in
            </Link>
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest pt-4">
             <CheckCircle2 className="h-3 w-3" /> No Credit Card Required
          </div>
        </div>
      </div>
    </div>
  )
}