"use client"

import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Navbar } from "../../components/shared/navbar"
import {
  Bot,
  BarChart3,
  Globe,
  ShieldCheck,
  Zap,
  Workflow,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Cpu,
  Building2
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      <Navbar />

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            <span>Chronos Intelligence Suite</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">
            Time orchestration for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              high-performance teams.
            </span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            From autonomous negotiation to deep work protection, our AI services reclaim the hours you lose to scheduling logistics.
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                title: "Autonomous Negotiation",
                description: "Chronos emails external guests on your behalf to find the perfect time, handling timezones and conflicts automatically.",
                color: "text-indigo-400"
              },
              {
                icon: BarChart3,
                title: "Calendar Analytics",
                description: "Visualize where your time goes. Identify meeting heavy days and optimize your schedule for productivity.",
                color: "text-violet-400"
              },
              {
                icon: Globe,
                title: "Global Sync",
                description: "Cross-timezone intelligence that respects working hours for distributed teams across London, NY, and Tokyo.",
                color: "text-blue-400"
              },
              {
                icon: ShieldCheck,
                title: "Focus Guard",
                description: "The AI defensivley blocks out 'Deep Work' sessions on your calendar when it detects high task loads.",
                color: "text-emerald-400"
              },
              {
                icon: Zap,
                title: "Instant Handoff",
                description: "Round-robin scheduling for sales teams. Route leads to the right AE instantly based on availability.",
                color: "text-amber-400"
              },
              {
                icon: Workflow,
                title: "Workflow API",
                description: "Connect Chronos to Slack, Salesforce, and Linear to trigger scheduling actions from your existing tools.",
                color: "text-pink-400"
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group p-8 rounded-[32px] bg-[#0A0A0A] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{service.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise / Organization Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-white/[0.01] -z-10" />
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-white/10 text-zinc-400">
              Enterprise Grade
            </Badge>
            <h2 className="text-4xl font-semibold mb-4 text-white">Scale your time management</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Infrastructure designed for organizations scheduling 10,000+ meetings a month.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="p-10 rounded-[40px] bg-[#0c0c0e] border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                     <Cpu className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">For Engineering Teams</h3>
                </div>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  Protect maker time. Chronos automatically batches meetings to create long blocks of uninterrupted coding time.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Sprint cycle awareness",
                    "Automatic meeting batching",
                    "Jira & Linear integrations",
                    "No-meeting day enforcement",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3 text-indigo-400" />
                      </div>
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-12 rounded-xl">
                    View Engineering Docs
                </Button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-10 rounded-[40px] bg-[#0c0c0e] border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                     <Building2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">For Sales Organizations</h3>
                </div>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  Reduce time-to-meeting. Qualify, route, and book prospects instantly from your website or email campaigns.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Round-robin lead distribution",
                    "Salesforce bi-directional sync",
                    "Group scheduling for demos",
                    "Instant booking overlays",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      </div>
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white h-12 rounded-xl">
                    Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-semibold mb-4 text-white">Select your tier</h2>
            <p className="text-lg text-zinc-400">Simple, transparent pricing for every stage of growth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {[
              {
                name: "Personal",
                price: "$0",
                description: "For individuals optimizing their own workflow.",
                features: ["1 Calendar connection", "Basic scheduling link", "Google Meet integration", "48hr Support SLA"],
                button: "Start Free",
                popular: false
              },
              {
                name: "Professional",
                price: "$20",
                description: "For power users and small teams.",
                features: [
                  "Unlimited calendars",
                  "AI Email Negotiation",
                  "Team scheduling pages",
                  "Analytics dashboard",
                  "Zapier integration",
                  "Custom branding"
                ],
                button: "Go Pro",
                popular: true
              },
              {
                name: "Organization",
                price: "Custom",
                description: "For large teams requiring advanced control.",
                features: [
                  "SSO (SAML/Okta)",
                  "Dedicated Success Manager",
                  "Audit logs",
                  "SLA Guarantee",
                  "Admin insights",
                  "Custom contracts"
                ],
                button: "Contact Us",
                popular: false
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-[32px] border relative flex flex-col h-full ${
                  plan.popular 
                    ? "bg-[#0f0f12] border-indigo-500/50 shadow-2xl shadow-indigo-900/20 z-10 scale-105" 
                    : "bg-[#0A0A0A] border-white/5 hover:border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-medium tracking-wide shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-zinc-500">/mo</span>}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex-1 mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className={`h-4 w-4 ${plan.popular ? "text-indigo-400" : "text-zinc-600"}`} />
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/auth/register" className="w-full">
                  <Button 
                    className={`w-full h-12 rounded-xl font-medium ${
                      plan.popular 
                        ? "bg-white text-black hover:bg-zinc-200" 
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {plan.button}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#020202]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="h-6 w-6 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                  <Sparkles className="h-3 w-3 text-zinc-400" />
               </div>
               <span className="text-sm font-medium text-zinc-400">© 2025 Chronos Inc.</span>
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm text-zinc-500 hover:text-white transition-colors">
                About
              </Link>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}