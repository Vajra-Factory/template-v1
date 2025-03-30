"use client"

import { SignInForm } from "@/components/auth/sign-in-form";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left Panel - Branding */}
        <div className="relative hidden h-full flex-col bg-black p-10 text-white lg:flex">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="/logo.svg"
              alt="OverDrift"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              OverDrift
            </span>
          </div>
          
          {/* Gaming Visual */}
          <div className="relative z-20 mt-8">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 animate-gradient" />
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">
                  Boost Your Gaming Performance
                </h2>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center">
                    <span className="mr-2">⚡</span>
                    Real-time FPS optimization
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🎮</span>
                    Smart GPU switching
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">☁️</span>
                    Cloud rendering support
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "OverDrift boosted my FPS by 40% and eliminated stuttering. It's a game-changer!"
              </p>
              <footer className="text-sm text-blue-400">
                — Alex Chen, Pro Gamer
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right Panel - Sign In Form */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Welcome back
              </h1>
              <p className="text-muted-foreground text-zinc-400">
                Sign in to optimize your gaming experience
              </p>
            </div>
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
} 