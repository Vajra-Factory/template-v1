"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Sparkles,
  Cpu,
  Layers,
  Wand2,
  Shield,
  Zap,
  Users,
  BarChart,
} from "lucide-react"

const features = [
  {
    title: "AI-Powered Creation",
    description: "Harness the power of advanced AI to transform your creative vision into reality with unprecedented precision.",
    icon: Sparkles,
    benefits: [
      "Intelligent content generation",
      "Smart style adaptation",
      "Context-aware suggestions",
    ],
  },
  {
    title: "Real-time Flow",
    description: "Experience seamless creation with our lightning-fast engine that responds instantly to your creative impulses.",
    icon: Cpu,
    benefits: [
      "Instant previews",
      "Live collaboration",
      "Zero latency updates",
    ],
  },
  {
    title: "Limitless Expression",
    description: "Break free from constraints and explore infinite possibilities in your digital creative journey.",
    icon: Layers,
    benefits: [
      "Unlimited variations",
      "Custom templates",
      "Flexible export options",
    ],
  },
  {
    title: "Advanced Tools",
    description: "Access a comprehensive suite of professional-grade tools designed for modern creators.",
    icon: Wand2,
    benefits: [
      "Layer management",
      "Advanced filters",
      "Smart objects",
    ],
  },
  {
    title: "Enterprise Security",
    description: "Your creative assets are protected with enterprise-grade security and compliance features.",
    icon: Shield,
    benefits: [
      "End-to-end encryption",
      "Role-based access",
      "Audit logging",
    ],
  },
  {
    title: "Lightning Fast",
    description: "Optimized performance ensures you never miss a creative moment.",
    icon: Zap,
    benefits: [
      "Cloud acceleration",
      "Smart caching",
      "Optimized rendering",
    ],
  },
]

const socialProof = [
  {
    text: "Vajrakama has transformed how we create digital content. The AI-powered features are game-changing.",
    author: "Sarah Chen",
    role: "Creative Director at DesignCo",
    image: "/testimonials/sarah.jpg",
  },
  {
    text: "The real-time collaboration features have made our team 3x more productive. Highly recommended!",
    author: "Michael Rodriguez",
    role: "Lead Designer at TechCorp",
    image: "/testimonials/michael.jpg",
  },
]

export default function Features() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Everything you need to create{" "}
              <span className="text-gradient">stunning content</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8">
              Powerful features designed to help you create, collaborate, and share your creative vision with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-black rounded-full h-12 px-8 button-glow"
                asChild
              >
                <Link href="/auth/signup">Get started</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-8"
                asChild
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="feature-card relative group rounded-lg border border-zinc-800 bg-zinc-900/30 p-8"
                >
                  <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="text-sm text-zinc-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-black/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by creators worldwide</h2>
            <p className="text-zinc-400">See what our users have to say about Vajrakama</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {socialProof.map((testimonial) => (
              <div
                key={testimonial.author}
                className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6"
              >
                <p className="text-zinc-300 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-white/10 mr-3" />
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-sm text-zinc-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your creative workflow?</h2>
            <p className="text-zinc-400 mb-8">
              Join thousands of creators who are already using Vajrakama to bring their ideas to life.
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-black rounded-full h-12 px-8 button-glow"
              asChild
            >
              <Link href="/auth/signup">Get started now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 