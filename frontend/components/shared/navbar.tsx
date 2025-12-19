"use client"

import { Button } from "../ui/button"
import { Menu, X, Activity, Terminal } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add a subtle border transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#09090b]/80 backdrop-blur-md border-b border-white/5" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Branding - Technical/Lab Style */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-zinc-800 p-1.5 rounded-md border border-zinc-700 group-hover:border-indigo-500/50 transition-colors">
            <Activity className="h-4 w-4 text-indigo-400" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            CHRONOS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {["Product", "Solutions", "Enterprise", "Docs"].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-white/5">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button 
              size="sm" 
              className="bg-white text-black hover:bg-zinc-200 font-medium border border-transparent"
            >
              Start Trial
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu - Technical Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#09090b] border-b border-white/10 shadow-2xl md:hidden">
          <div className="container mx-auto px-6 py-6 space-y-6">
            <div className="space-y-4">
              {["Product", "Solutions", "Enterprise", "Docs"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
            
            <div className="h-px w-full bg-white/5" />
            
            <div className="grid gap-3">
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/5">
                  <Terminal className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50">
                  Initialize Workspace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}