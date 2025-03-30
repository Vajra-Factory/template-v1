"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-white rounded-lg transform rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black font-bold text-lg">O</span>
            </div>
          </div>
          <span className="font-bold text-white">OverDrift</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/features" className="text-white/60 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-white/60 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/documentation" className="text-white/60 hover:text-white transition-colors">
            Documentation
          </Link>
          <Button variant="ghost" className="text-white/60 hover:text-white" asChild>
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Button className="bg-white hover:bg-white/90 text-black" asChild>
            <Link href="/auth/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}