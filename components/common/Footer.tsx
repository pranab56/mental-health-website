"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, MessageSquare, Send, Users } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sidebar pt-10 md:pt-16 pb-6 md:pb-8 border-t border-sidebar-border/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">

          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <Users className="w-8 h-8 text-secondary fill-current" />
                <MessageSquare className="w-4 h-4 text-primary absolute -top-1 -right-1 fill-white stroke-secondary" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">Mynder Therapy</span>
            </Link>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Making mental health support accessible, affordable, and personalized for everyone, everywhere.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
              >
                <Facebook className="w-5 h-5 fill-current" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-6">
            <h3 className="font-bold text-foreground text-lg">Company</h3>
            <ul className="space-y-4">
              {[
                { label: "How it Works", href: "/how-it-works" },
                { label: "Resources", href: "/resources" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="font-bold text-foreground text-lg">Newsletter</h3>
            <p className="text-muted-foreground">
              Get weekly mental health tips.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email here..."
                className="bg-white border-0 shadow-sm h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button
                size="icon"
                className="h-12 w-12 rounded-xl bg-secondary hover:bg-secondary/90 shadow-sm shrink-0"
              >
                <Send className="w-5 h-5 text-white -ml-0.5 mt-0.5" />
              </Button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/5 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Mynder Therapy Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}