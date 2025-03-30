"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRight,
  Cpu,
  Zap,
  Cloud,
  BarChart3,
  Gamepad2,
  Video,
  Building2,
  Sparkle,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const features = [
  {
    title: "Real-Time Optimization",
    description: "Dynamically allocate rendering workloads between iGPU and dGPU with intelligent load balancing.",
    icon: Cpu,
  },
  {
    title: "Intelligent Caching",
    description: "Smart caching system powered by TensorRT for lightning-fast frame delivery and reduced latency.",
    icon: Zap,
  },
  {
    title: "Cloud Rendering",
    description: "Offload heavy tasks to Groq Cloud's Llama 3-powered infrastructure for distributed rendering.",
    icon: Cloud,
  },
]

const useCases = [
  {
    title: "Game Development",
    description: "Faster level and asset rendering with optimized GPU utilization and real-time previews.",
    icon: Gamepad2,
  },
  {
    title: "VFX Production",
    description: "Real-time preview rendering optimization for seamless visual effects creation.",
    icon: Video,
  },
  {
    title: "Architectural Visualization",
    description: "Reduced render times for complex 3D models and architectural visualizations.",
    icon: Building2,
  },
]

export default function Home() {
  const [remainingSpots, setRemainingSpots] = useState(1000);
  const router = useRouter();

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

  const handleOptimizeClick = () => {
    router.push("/auth/signin");
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        {/* Minimal background with subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]" />
        
        <div className="container relative z-10">
          <div className="text-center space-y-16 flex flex-col items-center justify-center py-20">
            {/* Problem Statement - Clear and Direct */}
            <div className="space-y-8 max-w-4xl mx-auto">
              <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-white leading-tight">
                <span className="text-white">GPU Optimization</span>
                <br />
                <span className="text-white/80">Made Simple</span>
              </h1>
              
              {/* Clear Solution Statement */}
              <p className="text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Stop wasting GPU resources. Start optimizing with intelligence.
              </p>
            </div>

            {/* Key Benefits - Clear and Concise */}
            <div className="flex items-center justify-center gap-12 text-white/40 text-base max-w-3xl mx-auto">
              <span>60% Faster Rendering</span>
              <span>•</span>
              <span>Zero Crashes</span>
              <span>•</span>
              <span>3x Performance</span>
            </div>

            {/* Primary Action */}
            <div className="pt-8 space-y-6 flex flex-col items-center">
              <Button
                onClick={handleOptimizeClick}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                size="lg"
              >
                Start Optimizing
              </Button>
              
              {/* Trust Indicators */}
              <div className="space-y-3 flex flex-col items-center">
                <p className="text-base text-white/40">
                  First 1000 users free
                </p>
                <p className="text-base text-white/30">
                  No credit card required
                </p>
                <p className="text-base text-white/40">
                  {remainingSpots} spots remaining
                </p>
              </div>
            </div>

            {/* Key Visual - Minimal and Purposeful */}
            <div className="mt-24 relative w-full aspect-video max-w-5xl mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-white" />
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
              Powerful optimization
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Everything you need to maximize your GPU&apos;s performance.
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
              Perfect for your needs
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Discover how OverDrift can optimize your rendering workflow.
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
              Ready to optimize?
            </h2>
            <p className="text-lg mb-8 text-white/60">
              Start maximizing your GPU&apos;s potential today with OverDrift
            </p>
            <Button
              size="lg"
              className="clean-button bg-white hover:bg-gray-100 text-black"
              asChild
            >
              <Link href="/sign-in">
                Start optimizing
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
                <span className="text-black font-bold text-lg">O</span>
              </div>
            </div>
            <span className="font-bold text-white">OverDrift</span>
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
          </div>
        </div>
      </footer>
    </div>
  )
} 