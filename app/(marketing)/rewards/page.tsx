"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Gift,
  ShoppingBag,
  Utensils,
  Shirt,
  Gamepad2,
  Wallet,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function RewardsPage() {
  const categories = [
    {
      icon: ShoppingBag,
      name: "Shopping",
      brands: [
        { name: "Amazon India", points: "From 500 pts" },
        { name: "Flipkart", points: "From 500 pts" },
        { name: "Myntra", points: "From 1,000 pts" },
        { name: "Ajio", points: "From 1,000 pts" },
      ],
    },
    {
      icon: Utensils,
      name: "Food & Delivery",
      brands: [
        { name: "Swiggy", points: "From 500 pts" },
        { name: "Zomato", points: "From 500 pts" },
        { name: "BigBasket", points: "From 1,000 pts" },
        { name: "Blinkit", points: "From 500 pts" },
      ],
    },
    {
      icon: Shirt,
      name: "Fashion",
      brands: [
        { name: "Myntra", points: "From 1,000 pts" },
        { name: "Nykaa", points: "From 500 pts" },
        { name: "Ajio", points: "From 1,000 pts" },
        { name: "Tata CLiQ", points: "From 1,500 pts" },
      ],
    },
    {
      icon: Gamepad2,
      name: "Gaming & Entertainment",
      brands: [
        { name: "Google Play", points: "From 500 pts" },
        { name: "Steam", points: "From 1,000 pts" },
        { name: "Netflix", points: "From 2,000 pts" },
        { name: "Spotify", points: "From 1,000 pts" },
      ],
    },
  ];

  const howRedemptionWorks = [
    {
      icon: Wallet,
      title: "Check your balance",
      desc: "View your current points in the dashboard. 100 points = ₹1.",
    },
    {
      icon: Gift,
      title: "Choose a gift card",
      desc: "Browse our catalog and select the brand and amount you want.",
    },
    {
      icon: Clock,
      title: "Get your code",
      desc: "Most gift codes are delivered to your email and dashboard within 24 hours.",
    },
  ];

  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="pt-20 pb-16 px-4" aria-labelledby="rewards-heading">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[var(--font-size-xs)] font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-4">
            Rewards Catalog
          </p>
          <h1 id="rewards-heading" className="text-5xl sm:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.1] mb-6">
            Brands you{" "}
            <span className="text-[var(--color-accent)]">actually</span> use
          </h1>
          <p className="text-lg text-[var(--color-text-inverse)] leading-relaxed max-w-xl mx-auto">
            Redeem your points for digital gift cards from India&apos;s most popular brands. New partners added every month.
          </p>
        </div>
      </section>

      {/* ── Conversion info ───────────────────────────────────────── */}
      <section className="pb-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-accent)]/20 bg-[var(--color-accent-muted)] p-6 text-center">
            <p className="text-[var(--font-size-xl)] font-bold text-[var(--color-text-primary)] mb-1">
              100 points = ₹1
            </p>
            <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)]">
              Minimum redemption starts from just 500 points (₹5). No processing fees, ever.
            </p>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────── */}
      <section className="pb-20 px-4" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="categories-heading" className="sr-only">Reward categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-card)] p-7 shadow-[var(--shadow-1)]"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent-muted)]">
                    <cat.icon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                  <h3 className="text-[var(--font-size-lg)] font-bold text-[var(--color-text-primary)]">
                    {cat.name}
                  </h3>
                </div>

                {/* Brands list */}
                <div className="flex flex-col gap-3">
                  {cat.brands.map((brand) => (
                    <div
                      key={brand.name}
                      className="flex items-center justify-between rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-surface-page)] px-4 py-3 hover:border-[var(--color-border-strong)] transition-colors"
                    >
                      <span className="text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)]">
                        {brand.name}
                      </span>
                      <span className="text-[var(--font-size-xs)] font-semibold text-[var(--color-text-inverse)]">
                        {brand.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How redemption works ──────────────────────────────────── */}
      <section className="py-20 px-4" aria-labelledby="redeem-heading">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="text-[var(--font-size-xs)] font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-3">
              Redemption Process
            </p>
            <h2 id="redeem-heading" className="text-3xl font-bold text-[var(--color-text-primary)]">
              How to redeem your points
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {howRedemptionWorks.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-page)] p-7 shadow-[var(--shadow-1)] flex flex-col gap-4 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-muted)] mx-auto">
                  <item.icon className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[var(--font-size-md)] font-semibold text-[var(--color-text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {[
              { icon: ShieldCheck, text: "Verified partners" },
              { icon: Zap, text: "Instant delivery" },
              { icon: Clock, text: "24hr turnaround" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-[var(--font-size-sm)] text-[var(--color-text-inverse)]">
                <badge.icon className="h-4 w-4 text-[var(--color-success)]" aria-hidden="true" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden" aria-label="Call to action">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-[50%] blur-[80px]" style={{background: "radial-gradient(ellipse at center, rgba(224,90,34,0.30) 0%, rgba(212,148,10,0.20) 40%, transparent 70%)"}} />
        </div>
        <div className="mx-auto max-w-2xl text-center relative">
          <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4 leading-[1.1]">
            Start earning your first gift card
          </h2>
          <p className="text-[var(--color-text-inverse)] mb-8 text-lg leading-relaxed">
            Join Upgroo for free and start completing tasks to earn points now.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="group gap-2">
                Create free account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg">See how it works</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
