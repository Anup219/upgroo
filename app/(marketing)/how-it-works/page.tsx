"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  ShieldCheck,
  MousePointerClick,
  Gift,
  Clock,
  Smartphone,
  TrendingUp,
  CheckCircle2,
  Users,
  Star,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Create your free account",
      desc: "Getting started takes under a minute. Sign up with your email, verify your account, and you're ready to go. No credit card, no hidden fees — completely free.",
      details: [
        "Email and password is all you need",
        "Instant account verification",
        "Secure, encrypted sign-up process",
      ],
      icon: ShieldCheck,
      step: "01",
    },
    {
      title: "Browse and complete tasks",
      desc: "Choose from a variety of tasks that match your interests. Play games, answer surveys, try new apps, or share your opinion — every completed task earns you points.",
      details: [
        "New offers refreshed daily",
        "Tasks for every interest and skill level",
        "Clear instructions and transparent rewards",
      ],
      icon: MousePointerClick,
      step: "02",
    },
    {
      title: "Claim your rewards",
      desc: "Once you've earned enough points, redeem them for digital gift cards from brands you love. Gift codes are delivered straight to your inbox and dashboard — no waiting.",
      details: [
        "Minimum redemption from just 500 points",
        "Choose from 100+ brand partners",
        "Most codes delivered within 24 hours",
      ],
      icon: Gift,
      step: "03",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Earn on your schedule",
      desc: "Tasks are available 24/7 — complete them whenever it suits you. No deadlines, no pressure.",
    },
    {
      icon: Smartphone,
      title: "Any device, anywhere",
      desc: "Whether you're on your phone, tablet, or laptop — your account syncs seamlessly across all devices.",
    },
    {
      icon: TrendingUp,
      title: "Track your progress",
      desc: "Our real-time dashboard shows your earnings, task history, and pending rewards at a glance.",
    },
    {
      icon: Users,
      title: "Earn through referrals",
      desc: "Invite friends and earn bonus points every time they complete their first task. Everyone wins.",
    },
    {
      icon: Star,
      title: "Bonus streaks",
      desc: "Complete tasks on consecutive days to unlock daily streak bonuses and multiply your earnings.",
    },
    {
      icon: CheckCircle2,
      title: "Verified partners only",
      desc: "Every task comes from a verified partner. We review all offers to ensure quality and fairness.",
    },
  ];

  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="pt-20 pb-16 px-4" aria-labelledby="how-heading">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[var(--font-size-xs)] font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-4">
            How it works
          </p>
          <h1 id="how-heading" className="text-5xl sm:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.1] mb-6">
            Three steps to your{" "}
            <span className="text-[var(--color-accent)]">first reward</span>
          </h1>
          <p className="text-lg text-[var(--color-text-inverse)] leading-relaxed max-w-xl mx-auto">
            Earning rewards has never been simpler. Here&apos;s exactly how Upgroo works — from sign-up to gift card.
          </p>
        </div>
      </section>

      {/* ── Steps ─────────────────────────────────────────────────── */}
      <section className="pb-20 px-4">
        <div className="mx-auto max-w-4xl flex flex-col gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-card)] p-8 md:p-10 shadow-[var(--shadow-1)] flex flex-col md:flex-row gap-8"
            >
              {/* Step number + icon */}
              <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 shrink-0">
                <span className="text-6xl font-bold text-[var(--color-border-strong)] select-none leading-none" aria-hidden="true">
                  {step.step}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent-muted)]">
                  <step.icon className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                  {step.title}
                </h2>
                <p className="text-[var(--font-size-md)] text-[var(--color-text-inverse)] leading-relaxed mb-5">
                  {step.desc}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {step.details.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-[var(--font-size-sm)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-[var(--color-text-primary)]">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits grid ─────────────────────────────────────────── */}
      <section className="py-20 px-4" aria-labelledby="benefits-heading">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="text-[var(--font-size-xs)] font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-3">
              Why Upgroo
            </p>
            <h2 id="benefits-heading" className="text-3xl font-bold text-[var(--color-text-primary)]">
              Built for a better earning experience
            </h2>
            <p className="mt-3 text-[var(--color-text-inverse)] max-w-lg mx-auto">
              Every feature is designed to make earning rewards effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-page)] p-6 shadow-[var(--shadow-1)] flex flex-col gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent-muted)]">
                  <b.icon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[var(--font-size-md)] font-semibold text-[var(--color-text-primary)] mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
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
            Ready to get started?
          </h2>
          <p className="text-[var(--color-text-inverse)] mb-8 text-lg leading-relaxed">
            Create your free account and start earning reward points today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="group gap-2">
                Create free account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/rewards">
              <Button variant="outline" size="lg">View rewards catalog</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
