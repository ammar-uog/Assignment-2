"use client"

import { Button } from "../../components/ui/button"
import { Navbar } from "../../components/shared/navbar"
import { 
  Target, 
  Lightbulb, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Cpu, 
  Users,
  Globe2
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      <Navbar />

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            <span>Our Philosophy</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">
            We believe time is your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              most non-renewable asset.
            </span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            We are building the intelligence layer for your calendar. Our mission is to eliminate the logistical friction of collaboration so you can focus on deep work.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="group p-10 rounded-[40px] bg-[#0A0A0A] border border-white/5 hover:border-white/10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                   <Target className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                <p className="text-zinc-400 leading-relaxed">
                  To liberate professionals from the administrative burden of scheduling. We create autonomous agents that negotiate time, protect focus, and facilitate connection without the back-and-forth emails.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group p-10 rounded-[40px] bg-[#0A0A0A] border border-white/5 hover:border-white/10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                   <Lightbulb className="h-6 w-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
                <p className="text-zinc-400 leading-relaxed">
                  A future where the logistics of work are invisible. We envision a world where AI handles the "when" and "where" of meetings instantly, allowing humans to focus entirely on the "why" and "what".
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-white/[0.02] -z-10" />
        <div className="container mx-auto max-w-3xl">
          
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-12">The Origin Code</h2>
          <div className="space-y-8 text-lg text-zinc-400 leading-relaxed font-light">
            <p>
              Chronos was initialized in 2024 by a small team of engineers and data scientists who realized they were spending more time managing their calendars than actually building product. The fragmentation of time was killing innovation.
            </p>
            <p>
              We started with a simple script: an algorithm that could analyze two calendars and find the optimal meeting slot without human intervention. That script evolved into a neural network capable of understanding context, priority, and "deep work" preferences.
            </p>
            <p>
              Today, Chronos processes millions of scheduling requests monthly for forward-thinking organizations. We aren't just a calendar tool; we are the operating system for modern time management.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Core Protocols</h2>
            <p className="text-lg text-zinc-400">The principles hardcoded into our culture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Respect for Time",
                description:
                  "We treat every minute as a scarce resource. If a meeting can be an email, our AI suggests it.",
                color: "text-amber-400"
              },
              {
                icon: Cpu,
                title: "Human-Centric AI",
                description:
                  "Technology should serve humans, not replace them. We automate the chore, not the connection.",
                color: "text-indigo-400"
              },
              {
                icon: ShieldCheck,
                title: "Privacy First",
                description:
                  "Your calendar data is a map of your life. We protect it with enterprise-grade encryption and zero-knowledge protocols.",
                color: "text-emerald-400"
              },
            ].map((value) => (
              <div key={value.title} className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors">
                <value.icon className={`h-10 w-10 ${value.color} mb-6`} />
                <h3 className="text-xl font-medium text-white mb-3">{value.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 px-6 border-y border-white/5 bg-[#0A0A0A]/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: "500k+", label: "Hours Saved" },
              { value: "12", label: "Global Timezones" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "System Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-3xl md:text-5xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {stat.value}
                </div>
                <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">Initialize your workspace</h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-lg mx-auto">
            Join the high-performance teams using Chronos to reclaim their schedule.
          </p>
          <Link href="/auth/register">
            <Button className="h-14 px-10 rounded-full bg-white text-black hover:bg-zinc-200 font-medium text-lg transition-transform hover:scale-105">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#020202]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="h-6 w-6 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                  <Globe2 className="h-3 w-3 text-zinc-400" />
               </div>
               <span className="text-sm font-medium text-zinc-400">© 2025 Chronos Inc.</span>
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Platform
              </Link>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Privacy Protocol
              </a>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}