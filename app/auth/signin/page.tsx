"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 bg-white rounded-lg transform rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-black font-bold text-xl">V</span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-zinc-400">Sign in to your account to continue</p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-white hover:bg-gray-100 text-black border-white/20"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full bg-white hover:bg-gray-100 text-black border-white/20"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-zinc-400">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-white hover:bg-gray-100 text-black border-white/20"
          >
            <Mail className="mr-2 h-5 w-5" />
            Email
          </Button>
        </div>

        <p className="text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
} 