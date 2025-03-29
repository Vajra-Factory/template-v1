"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Wand2,
  Mountain,
  Trees,
  Gamepad2,
  Star,
  Zap,
  Sparkle,
} from "lucide-react"
import { useEffect } from "react"

const features = [
  {
    title: "AI-Powered Creation",
    description: "Harness the power of advanced AI to transform your creative vision into reality with unprecedented precision.",
    icon: Sparkles,
  },
  {
    title: "Real-time Flow",
    description: "Experience seamless creation with our lightning-fast engine that responds instantly to your creative impulses.",
    icon: Cpu,
  },
  {
    title: "Limitless Expression",
    description: "Break free from constraints and explore infinite possibilities in your digital creative journey.",
    icon: Layers,
  },
]

const useCases = [
  {
    title: "Digital Art",
    description: "Create stunning digital artworks that push the boundaries of creative expression.",
    icon: Gamepad2,
  },
  {
    title: "Visual Design",
    description: "Craft compelling visual experiences that captivate and inspire.",
    icon: Mountain,
  },
  {
    title: "Creative Projects",
    description: "Bring your creative visions to life with powerful digital tools and workflows.",
    icon: Trees,
  },
]

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".scroll-fade").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24">
        {/* Minimal Background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center space-y-12 max-w-3xl mx-auto scroll-fade">
            {/* Problem Statement */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                Create without{" "}
                <span className="text-white/90">constraints</span>
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                The creative platform that removes the barriers between your imagination and reality.
              </p>
            </div>

            {/* Solution & Social Proof */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                <span>Trusted by 10,000+ creators</span>
                <span>•</span>
                <span>Featured in TechCrunch</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-white/40 text-sm">
                <span>4.9/5 App Store Rating</span>
                <span>•</span>
                <span>99.9% Uptime</span>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="pt-4">
              <Button
                size="lg"
                className="clean-button bg-white hover:bg-white/90 text-black group relative overflow-hidden"
                asChild
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  <span className="relative z-10">Start creating</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Key Visual */}
            <div className="mt-16 relative w-full aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden group scroll-fade">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wand2 className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-black section-transition">
        <div className="container">
          <div className="text-center mb-16 scroll-fade">
            <span className="text-white/60 text-sm font-medium mb-2 block">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Powerful features
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Everything you need to create stunning digital experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="clean-card scroll-fade"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-32 bg-black section-transition">
        <div className="container">
          <div className="text-center mb-16 scroll-fade">
            <span className="text-white/60 text-sm font-medium mb-2 block">Use Cases</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Endless possibilities
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Discover how Vajrakama can transform your creative workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <div
                  key={useCase.title}
                  className="clean-card scroll-fade"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                  <p className="text-white/60">{useCase.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden section-transition">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto scroll-fade">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 text-white/60">
              Transform your creative vision today with Vajrakama
            </p>
            <Button
              size="lg"
              className="clean-button bg-white hover:bg-gray-100 text-black"
              asChild
            >
              <Link href="/sign-in">
                Start creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-black">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 bg-white rounded-lg transform rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-black font-bold text-lg">V</span>
              </div>
            </div>
            <span className="font-bold text-white">Vajrakama</span>
          </div>
          <div className="flex items-center space-x-6 text-white/40">
            <Link href="/features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/documentation" className="hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
} 