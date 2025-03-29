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
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-white rounded-lg transform rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black font-bold text-lg">V</span>
            </div>
          </div>
          <span className="font-bold text-white">Vajrakama</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            href="/features"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/documentation"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Documentation
          </Link>

          {session ? (
            <>
              <Link href="/dashboard">
                <Button className="bg-white hover:bg-gray-100 text-black rounded-full h-8 px-4">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white"
                onClick={() => signOut()}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button
              className="bg-white hover:bg-gray-100 text-black rounded-full h-8 px-4"
              onClick={() => signIn()}
            >
              Sign in
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}