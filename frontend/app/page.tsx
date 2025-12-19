"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Navbar } from "../components/shared/navbar"
import { 
  Network, 
  Cpu, 
  GitBranch, 
  Terminal, 
  Layers, 
  Command, 
  ArrowRight, 
  Activity,
  CalendarCheck
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string; token: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) router.push("/dashboard")
  }, [router])

  return (
    // THEME: "Deep Carbon" - Precise, engineered, clean.
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      <Navbar />

      {/* BACKGROUND: Structured Data Grid */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#09090b] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                v2.4 Stable Release
              </div>

              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white">
                Time allocation <br />
                <span className="text-zinc-500">optimized via ML.</span>
              </h1>

              <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
                Chronos uses predictive modeling to orchestrate meetings. We treat your calendar as a dataset, optimizing for deep work and minimal context switching.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link href="/auth/register">
                  <Button className="h-12 px-8 bg-zinc-100 text-zinc-950 hover:bg-white rounded-md font-medium text-base transition-all">
                    Deploy Scheduler
                  </Button>
                </Link>
                {/* <Link href="/docs">
                  <Button variant="ghost" className="h-12 px-8 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md font-mono text-sm">
                    
                  </Button>
                </Link> */}
              </div>
            </div>

            {/* Right Visual: The "Terminal/Dashboard" Look */}
            <div className="flex-1 w-full">
              <div className="relative rounded-lg border border-zinc-800 bg-[#0c0c0e] shadow-2xl overflow-hidden">
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  <div className="ml-auto font-mono text-xs text-zinc-500">model_inference.py</div>
                </div>
                
                {/* Code/Data Interface */}
                <div className="p-6 space-y-4 font-mono text-sm">
                  <div className="flex gap-4">
                    <span className="text-zinc-600">01</span>
                    <span className="text-indigo-400">import</span>
                    <span className="text-white">chronos_core</span>
                    <span className="text-indigo-400">as</span>
                    <span className="text-white">scheduler</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-zinc-600">02</span>
                    <span className="text-zinc-500"># Initializing optimization parameters</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-zinc-600">03</span>
                    <span className="text-white">config = {"{"}</span>
                  </div>
                  <div className="flex gap-4 pl-8">
                    <span className="text-zinc-600">..</span>
                    <span className="text-emerald-400">"deep_work_focus"</span>: <span className="text-orange-400">0.85</span>,
                  </div>
                  <div className="flex gap-4 pl-8">
                    <span className="text-zinc-600">..</span>
                    <span className="text-emerald-400">"buffer_strategy"</span>: <span className="text-teal-400">"adaptive"</span>,
                  </div>
                  <div className="flex gap-4">
                    <span className="text-zinc-600">04</span>
                    <span className="text-white">{"}"}</span>
                  </div>
                  
                  {/* Simulation of a UI element inside the terminal */}
                  <div className="mt-6 p-4 rounded bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider">Optimization Score</span>
                      <span className="text-emerald-400">98.4%</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[98%] bg-indigo-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section - Data Driven */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white">System Performance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-lg overflow-hidden">
            {[
              { label: "Processing Latency", value: "12ms", desc: "Real-time sync across APIs" },
              { label: "Conflict Resolution", value: "Auto", desc: "Zero-touch rescheduling" },
              { label: "Time Recovered", value: "14%", desc: "Average weekly gain per user" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#09090b] p-8 hover:bg-zinc-900/50 transition-colors group">
                <div className="text-zinc-500 text-sm font-mono mb-2">{stat.label}</div>
                <div className="text-4xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">{stat.value}</div>
                <div className="text-zinc-600 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Technical Diagram Style */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Feature 1 */}
            <div className="space-y-6">
              <div className="h-12 w-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Network className="text-indigo-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">Neural Scheduling Network</h3>
              <p className="text-zinc-400 leading-relaxed">
                Unlike simple rule-based schedulers, Chronos analyzes the semantic context of your meeting requests. It distinguishes between a "quick sync"  adjusting duration and time-of-day placement accordingly.
              </p>
              <ul className="space-y-3 pt-2">
                {['Semantic analysis of invites', 'Participant priority weighting', 'Automatic agenda extraction'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="space-y-6">
              <div className="h-12 w-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <GitBranch className="text-teal-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">Adaptive Workflow Branching</h3>
              <p className="text-zinc-400 leading-relaxed">
                Define conditional logic for your availability. If a project deadline is approaching (detected via Google Calendar), Chronos automatically constricts your availability to protect focus time.
              </p>
              <ul className="space-y-3 pt-2">
                {['Google Calendar Conection', 'Intelligent meeting scheduling', 'Adaptive calendar'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="h-1.5 w-1.5 bg-teal-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "Edge Computing", desc: "Calendar logic runs on the edge for <50ms response times globally." },
              { icon: Layers, title: "Multi-Model Stack", desc: "Combines heuristics with LLMs to negotiate times via email naturally." },
              { icon: CalendarCheck, title: "Smart Reschedule", desc: "One-click conflict resolution that finds the next best optimal slot." }
            ].map((card, i) => (
              <div key={i} className="group p-6 rounded-lg border border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 transition-all">
                <card.icon className="h-8 w-8 text-zinc-500 mb-4 group-hover:text-white transition-colors" />
                <h4 className="text-lg font-medium text-white mb-2">{card.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
  

      {/* Footer - Clean Data */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#09090b]">
        <div className="container mx-auto max-w-6xl flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-indigo-500" />
              <span className="font-semibold text-white">CHRONOS</span>
            </div>
            <p className="text-xs text-zinc-600 max-w-[200px]">
             Built and Designed By 
             <br />
             Masood Subhani and TEAM
            </p>
          </div>
          <div className="text-right">
             <p className="text-xs text-zinc-600 font-mono">System Status: <span className="text-emerald-500">Operational</span></p>
          </div>
        </div>
      </footer>
    </div>
  )
}