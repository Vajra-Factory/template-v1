"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for individual creators getting started",
    features: [
      "AI-powered content generation",
      "Basic templates",
      "5GB storage",
      "Email support",
      "Community access",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For professional creators who need more power",
    features: [
      "Everything in Starter",
      "Advanced AI features",
      "Unlimited storage",
      "Priority support",
      "Custom templates",
      "Team collaboration",
      "Analytics dashboard",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams and organizations",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Advanced security",
      "Custom branding",
      "API access",
      "Training sessions",
    ],
    cta: "Contact sales",
    popular: false,
  },
]

const faqs = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all paid plans come with a 14-day free trial. No credit card required.",
  },
  {
    question: "What happens after my trial ends?",
    answer: "After your trial ends, you'll be prompted to choose a plan to continue using OverDrift.",
  },
]

export default function Pricing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Simple, transparent{" "}
              <span className="text-gradient">pricing</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8">
              Choose the plan that&apos;s right for you. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border ${
                  plan.popular
                    ? "border-white/20 bg-white/5"
                    : "border-zinc-800 bg-zinc-900/30"
                } p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                      Most popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">{plan.price}</div>
                  <p className="text-zinc-400">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-zinc-300">
                      <Check className="h-5 w-5 text-white mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full h-12 ${
                    plan.popular
                      ? "bg-white hover:bg-gray-100 text-black"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                  asChild
                >
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/signup"}>
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-black/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently asked questions</h2>
            <p className="text-zinc-400">Everything you need to know about our pricing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-zinc-400 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-black rounded-full h-12 px-8 button-glow"
              asChild
            >
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 