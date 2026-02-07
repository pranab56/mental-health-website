"use client"

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Resources', href: '/resources' },
    { name: 'FAQ', href: '/faq' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full bg-background border-b border-border/5 shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50 relative">
          <Image src="/icons/Logo.png" alt="Logo" width={1200} height={1200} className='w-full h-12' />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-foreground/80'
                  }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push('/login')}
              variant="outline"
              className="border-action text-foreground hover:bg-action/5 hover:text-foreground cursor-pointer  w-full h-11 border-2 font-medium"
            >
              Login <ArrowRight className="ml-2 w-4 h-4 text-foreground" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push('/signup')}
              className="bg-primary hover:bg-primary/90 text-white h-11 px-6 font-medium cursor-pointer shadow-lg shadow-primary/20"
            >
              Sign UP <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden flex flex-col items-center justify-center gap-8"
            >
              <nav className="flex flex-col items-center gap-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-foreground/80'
                        }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              <div className="flex flex-col gap-4 w-full p-8 w-full">
                <Button
                  onClick={() => router.push('/login')}
                  className="w-full border-action bg-primary hover:bg-primary/90 cursor-pointer text-white  hover:bg-action/5  px-20 h-12 text-base font-medium"
                >
                  Login <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  onClick={() => router.push('/signup')}
                  className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-medium shadow-lg shadow-primary/20"
                >
                  Sign UP <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  )
}
