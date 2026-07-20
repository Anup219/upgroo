"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Gift,
  MousePointerClick,
  ShieldCheck,
  Zap,
  BarChart3,
  Globe,
  Users,
  Coins,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

export default function LandingPage() {
  const steps = [
    {
      title: "Create an account",
      desc: "Sign up in seconds — just an email address is all you need.",
      icon: ShieldCheck,
      step: "01",
    },
    {
      title: "Complete tasks",
      desc: "Play games, answer surveys, or try new apps from verified partners.",
      icon: MousePointerClick,
      step: "02",
    },
    {
      title: "Claim rewards",
      desc: "Exchange points for Amazon, Flipkart, or Swiggy gift cards instantly.",
      icon: Gift,
      step: "03",
    },
  ];

  const brands = ["Amazon India", "Flipkart", "Swiggy", "Zomato", "Myntra"];

  const stats = [
    { value: "50K+",  label: "Active earners"      },
    { value: "₹2Cr+", label: "Rewards paid out"    },
    { value: "100+",  label: "Brand partners"      },
    { value: "24hr",  label: "Payout turnaround"   },
  ];

  const features = [
    {
      icon: Globe,
      title: "Earn from anywhere",
      desc: "Tasks are available 24/7. Complete offers on your phone, tablet, or desktop — no limits.",
      wide: true,
    },
    {
      icon: BarChart3,
      title: "Live point tracker",
      desc: "Watch your balance update in real time with our dashboard analytics.",
      wide: false,
    },
    {
      icon: Zap,
      title: "Instant redemption",
      desc: "Gift codes hit your inbox the moment your redemption is approved.",
      wide: false,
    },
    {
      icon: Users,
      title: "Invite and multiply",
      desc: "Refer friends and earn a bonus every time they complete their first task.",
      wide: true,
    },
  ];

  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative pt-16 pb-0 px-4 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-3xl text-center relative z-10">
          {/* ── Earn · Redeem · Repeat tag strip ─────────────────── */}
          <div className="inline-flex items-center mb-10" role="list" aria-label="How Upgroo works">
            {/* Glass container */}
            <div
              className="relative flex items-center gap-0 rounded-[var(--radius-lg)] p-1"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,239,235,0.9) 100%)",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Step 1 — Earn */}
              <div
                role="listitem"
                className="flex items-center gap-2 rounded-[calc(var(--radius-lg)-4px)] px-3.5 py-2 transition-colors duration-150"
                style={{ background: "var(--color-accent-muted)" }}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: "var(--color-accent)" }}
                  aria-hidden="true"
                >
                  <Coins className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </span>
                <span className="text-[13px] font-semibold" style={{ color: "var(--color-accent)" }}>
                  Earn
                </span>
              </div>

              {/* Separator */}
              <ChevronRight
                className="mx-0.5 h-4 w-4 shrink-0"
                style={{ color: "rgba(0,0,0,0.25)" }}
                aria-hidden="true"
              />

              {/* Step 2 — Redeem */}
              <div
                role="listitem"
                className="flex items-center gap-2 rounded-[calc(var(--radius-lg)-4px)] px-3.5 py-2 transition-colors duration-150 hover:bg-black/[0.04]"
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: "#1a1a1a" }}
                  aria-hidden="true"
                >
                  <Gift className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </span>
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: "#1a1a1a" }}
                >
                  Redeem
                </span>
              </div>

              {/* Separator */}
              <ChevronRight
                className="mx-0.5 h-4 w-4 shrink-0"
                style={{ color: "rgba(0,0,0,0.25)" }}
                aria-hidden="true"
              />

              {/* Step 3 — Repeat */}
              <div
                role="listitem"
                className="flex items-center gap-2 rounded-[calc(var(--radius-lg)-4px)] px-3.5 py-2 transition-colors duration-150 hover:bg-black/[0.04]"
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed"
                  style={{ borderColor: "rgba(0,0,0,0.20)" }}
                  aria-hidden="true"
                >
                  <RefreshCw className="h-3.5 w-3.5" style={{ color: "#6b7280" }} strokeWidth={2.5} />
                </span>
                <span
                  className="text-[13px] font-medium"
                  style={{ color: "#6b7280" }}
                >
                  Repeat
                </span>
              </div>
            </div>
          </div>

          <h1
            id="hero-heading"
            className="text-5xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]"
          >
            Earn rewards for things{" "}
            <span className="text-[var(--color-accent)]">you already do</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-text-inverse)] leading-relaxed">
            Complete tasks, try new apps, and share your opinion to earn points.
            Redeem instantly for your favourite digital gift cards.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="group gap-2">
                Start Earning
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg">
                See how it works
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Laptop + Browser mockup ─────────────────────────────── */}
        <div className="mt-16 mx-auto max-w-3xl relative" aria-hidden="true">
          {/* Laptop lid + screen */}
          <div className="relative">
            {/* Screen bezel */}
            <div className="rounded-t-[16px] rounded-b-[4px] border-[3px] border-[var(--color-text-primary)]/15 bg-[#1a1a1a] p-[6px] shadow-[var(--shadow-3)]">
              {/* Browser chrome */}
              <div className="rounded-[10px] overflow-hidden border border-black/20 bg-[var(--color-surface-page)]">
                {/* Browser top bar */}
                <div className="flex items-center gap-3 bg-[#f3f2ee] border-b border-black/8 px-4 py-2.5">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  {/* Tab */}
                  <div className="flex items-center gap-2 rounded-t-[6px] bg-[var(--color-surface-card)] border border-black/8 border-b-0 px-3 py-1 -mb-[10.5px] pb-[14px]">
                    <div className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-[var(--color-accent)]">
                      <span className="text-[7px] font-black text-white leading-none">UG</span>
                    </div>
                    <span className="text-[11px] font-medium text-[var(--color-text-primary)]">Upgroo</span>
                    <span className="text-[10px] text-[var(--color-text-muted)] ml-3 opacity-60">×</span>
                  </div>
                  {/* URL bar */}
                  <div className="flex-1 flex items-center gap-1.5 rounded-[6px] bg-[var(--color-surface-card)] border border-black/10 px-3 py-1 mx-2">
                    <svg className="h-3 w-3 text-[var(--color-success)] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                    <span className="text-[11px] text-[var(--color-text-inverse)]">upgroo.app/dashboard</span>
                  </div>
                  {/* Browser actions */}
                  <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15h-6a3 3 0 0 0-3 3v0"/><path d="M15 12l3 3-3 3"/><path d="M6 9h6a3 3 0 0 0 3-3v0"/><path d="M9 12 6 9l3-3"/></svg>
                  </div>
                </div>

                {/* Dashboard UI */}
                <div className="flex h-[220px] overflow-hidden">

                  {/* Sidebar */}
                  <div className="hidden sm:flex w-40 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface-card)] flex flex-col">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]">
                      <div className="h-5 w-5 rounded-[4px] bg-[var(--color-accent)] flex items-center justify-center">
                        <span className="text-[7px] font-black text-white">UG</span>
                      </div>
                      <span className="text-[11px] font-bold text-[var(--color-text-primary)]">Upgroo</span>
                    </div>
                    <nav className="flex flex-col gap-0.5 p-2 flex-1">
                      {[
                        { label: "Dashboard", active: true  },
                        { label: "Earn Points", active: false },
                        { label: "Redeem",     active: false },
                        { label: "History",    active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`rounded-[4px] px-2.5 py-1.5 text-[10px] font-medium ${
                            item.active
                              ? "bg-[var(--color-surface-page)] text-[var(--color-text-primary)] shadow-[var(--shadow-1)]"
                              : "text-[var(--color-text-inverse)]"
                          }`}
                        >
                          {item.label}
                        </div>
                      ))}
                    </nav>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 overflow-hidden bg-[var(--color-surface-page)] p-4 flex flex-col md:flex-row gap-3">
                    {/* Left side: Quick stats */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div>
                        <p className="text-[11px] font-bold text-[var(--color-text-primary)]">Rahul's Dashboard 👋</p>
                        <p className="text-[9px] text-[var(--color-text-inverse)]">Live performance tracking</p>
                      </div>
                      
                      {/* Stat cards grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "Points", value: "12,450", color: "text-[var(--color-accent)]" },
                          { label: "Done", value: "47 tasks", color: "text-[var(--color-text-primary)]" }
                        ].map((card) => (
                          <div key={card.label} className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface-card)] p-2">
                            <p className={`text-[11px] font-bold leading-none ${card.color}`}>{card.value}</p>
                            <p className="text-[7px] text-[var(--color-text-inverse)] mt-0.5">{card.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Small notification strip */}
                      <div className="rounded-[6px] bg-[var(--color-accent-muted)] border border-[var(--color-accent)]/10 p-2 text-[8px] text-[var(--color-accent)] font-medium">
                        🚀 New tasks available — earn 500+ points today
                      </div>
                    </div>

                    {/* Right side: Recent Activity Feed */}
                    <div className="hidden md:flex w-full md:w-1/2 h-full p-3 flex flex-col justify-start select-none">
                      <div>
                        <div className="flex justify-between items-center mb-2 border-b border-[var(--color-border)] pb-1">
                          <span className="text-[9px] font-bold text-[var(--color-text-primary)]">Recent Activity</span>
                          <span className="text-[7px] text-[var(--color-text-inverse)] font-medium">Updated live</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {[
                            { desc: "App installation reward", pts: "+450 pts", status: "Approved", statusColor: "text-[var(--color-success)] bg-[var(--color-success)]/10" },
                            { desc: "Customer feedback survey", pts: "+150 pts", status: "Pending", statusColor: "text-[var(--color-accent)] bg-[var(--color-accent)]/10" },
                            { desc: "Daily streak bonus", pts: "+25 pts", status: "Approved", statusColor: "text-[var(--color-success)] bg-[var(--color-success)]/10" },
                            { desc: "Referred friend signup", pts: "+100 pts", status: "Approved", statusColor: "text-[var(--color-success)] bg-[var(--color-success)]/10" },
                          ].map((act, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[8px] border-b border-[var(--color-border)] pb-1.5 last:border-b-0 last:pb-0">
                              <div>
                                <p className="font-semibold text-[var(--color-text-primary)]">{act.desc}</p>
                                <p className="text-[7px] text-[var(--color-text-inverse)]">{act.pts}</p>
                              </div>
                              <span className={`px-1.5 py-0.5 rounded-[4px] font-bold ${act.statusColor}`}>{act.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Laptop base / hinge */}
            <div className="relative mx-auto">
              <div className="h-[10px] rounded-b-[8px] bg-gradient-to-b from-[#c8c6c0] to-[#b0aead] border border-t-0 border-black/10" />
              <div className="h-[6px] mx-[-20px] rounded-b-[12px] bg-gradient-to-b from-[#b0aead] to-[#a0a09a] shadow-[0_4px_12px_rgba(0,0,0,0.18)]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────── */}
      <section className="py-20 px-4" aria-label="Platform statistics">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[var(--font-size-sm)] font-medium text-[var(--color-text-inverse)] mb-10">
            Trusted by earners across India
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-1)]"
              >
                <p className="text-[var(--font-size-4xl)] font-bold text-[var(--color-text-primary)] leading-none mb-2">
                  {s.value}
                </p>
                <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features bento ────────────────────────────────────────── */}
      <section className="py-20 px-4" aria-labelledby="features-heading">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 id="features-heading" className="text-4xl font-bold text-[var(--color-text-primary)]">
              Features so good you&apos;ll{" "}
              <span className="text-[var(--color-accent)]">Love us</span>
            </h2>
            <p className="mt-3 text-[var(--color-text-inverse)] max-w-lg mx-auto">
              Everything you need to earn, track, and redeem — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className={`rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-card)] p-7 shadow-[var(--shadow-1)] flex flex-col gap-4 ${
                  f.wide ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent-muted)]">
                  <f.icon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[var(--font-size-xl)] font-semibold text-[var(--color-text-primary)] mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works (teaser) ─────────────────────────────────── */}
      <section className="py-20 px-4" aria-labelledby="how-heading">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="text-[var(--font-size-xs)] font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-3">
                How it works
              </p>
              <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Three steps to your first reward
              </h2>
            </div>
            <Link href="/how-it-works" className="hidden md:flex items-center gap-1.5 text-[var(--font-size-sm)] font-semibold text-[var(--color-accent)] hover:underline underline-offset-3">
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step) => (
              <div
                key={step.step}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-page)] p-7 flex flex-col gap-5 shadow-[var(--shadow-1)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent-muted)]">
                    <step.icon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                  <span className="text-4xl font-bold text-[var(--color-border-strong)] select-none" aria-hidden="true">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-[var(--font-size-md)] font-semibold text-[var(--color-text-primary)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <Link href="/how-it-works">
              <Button variant="outline">Learn more about how it works</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Rewards (teaser) ──────────────────────────────────────── */}
      <section className="py-20 px-4" aria-labelledby="rewards-heading">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-[var(--font-size-xs)] font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-3">
                Rewards
              </p>
              <h2 id="rewards-heading" className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Brands you <span className="text-[var(--color-accent)]">actually</span> use
              </h2>
            </div>
            <Link href="/rewards" className="hidden md:flex items-center gap-1.5 text-[var(--font-size-sm)] font-semibold text-[var(--color-accent)] hover:underline underline-offset-3">
              View catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {brands.map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-card)] px-8 py-5 text-[var(--font-size-sm)] font-medium text-[var(--color-text-inverse)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] hover:shadow-[var(--shadow-1)] transition-all duration-[150ms] cursor-default shadow-[var(--shadow-1)]"
              >
                {brand}
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <Link href="/rewards">
              <Button variant="outline">View full catalog</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-28 px-4 relative overflow-hidden" aria-label="Call to action">
        {/* Large warm orange bloom — fills the entire CTA background */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          {/* Main central bloom */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-[50%] blur-[80px]" style={{background: "radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(6,182,212,0.12) 40%, transparent 70%)"}} />
          {/* Bottom-left fresh glow */}
          <div className="absolute -bottom-10 -left-20 h-[400px] w-[500px] rounded-[50%] bg-gradient-to-tr from-[var(--color-accent)]/15 via-sky-100/15 to-transparent blur-[60px]" />
          {/* Top-right subtle glow */}
          <div className="absolute -top-10 -right-20 h-[300px] w-[400px] rounded-[50%] bg-gradient-to-bl from-indigo-100/15 via-[var(--color-accent)]/10 to-transparent blur-[60px]" />
        </div>

        <div className="mx-auto max-w-3xl text-center relative">
          <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-lg)] border border-[var(--color-accent)]/30 bg-[var(--color-accent-muted)] px-4 py-1.5 text-[var(--font-size-xs)] font-semibold text-[var(--color-accent)] mb-6 shadow-[var(--shadow-1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
            Free to join — no credit card needed
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4 leading-[1.1]">
            Ready to start{" "}
            <span className="text-[var(--color-accent)]">earning</span>?
          </h2>
          <p className="text-[var(--color-text-inverse)] mb-10 text-lg max-w-md mx-auto leading-relaxed">
            Join thousands who earn reward points every day — completely free.
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
