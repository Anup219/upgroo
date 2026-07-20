"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X, Sun, Moon } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  /* ── Theme management ────────────────────────────────────────── */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && systemDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  /* ── Scroll detection ─────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Lock body scroll when mobile menu is open ────────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const NAV_LINKS = [
    { href: "/how-it-works", label: "How it works" },
    { href: "/rewards",      label: "Rewards"      },
    { href: "/faq",          label: "FAQ"           },
  ];

  /* ── Shared link class ────────────────────────────────────────── */
  const navLinkClass =
    "text-[var(--font-size-sm)] font-medium text-[var(--color-text-inverse)] " +
    "opacity-80 hover:opacity-100 hover:text-[var(--color-text-primary)] " +
    "transition-all duration-[150ms] rounded-[var(--radius-xs)] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2";

  return (
    <>
      {/* ── Main header ─────────────────────────────────────────── */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-[300ms] ease-in-out
          ${scrolled ? "pt-3 px-4" : "pt-0 px-0"}
        `}
      >
        <div
          className={`
            mx-auto flex h-14 items-center justify-between px-5
            transition-all duration-[300ms] ease-in-out
            ${scrolled
              ? /* pill — floated glass */
                "max-w-5xl rounded-[var(--radius-lg)] border border-[var(--color-border)] " +
                "bg-[var(--color-surface-nav)] shadow-[var(--shadow-1)] backdrop-blur-[12px]"
              : /* flat — full width transparent */
                "max-w-full border-b border-[var(--color-border)] " +
                "bg-[var(--color-surface-page)]/80 backdrop-blur-[8px]"
            }
          `}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Upgroo home"
            className="flex items-center gap-2 rounded-[var(--radius-xs)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent)]">
              <span className="text-[10px] font-bold text-white" aria-hidden="true">UG</span>
            </div>
            <span className="text-[var(--font-size-md)] font-semibold tracking-tight text-[var(--color-text-primary)]">
              Upgroo
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={navLinkClass}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-xs)] text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button variant="default" size="sm">Get started</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-[var(--radius-xs)] text-[var(--color-text-primary)] hover:bg-black/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ── Mobile menu backdrop ─────────────────────────────────── */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={`
          fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]
          transition-opacity duration-[200ms]
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ── Mobile drawer ────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed top-0 right-0 bottom-0 z-50 w-[75vw] max-w-xs
          flex flex-col
          bg-[var(--color-surface-card)] shadow-[var(--shadow-3)]
          transition-transform duration-[250ms] ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--color-border)] px-5">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2"
            aria-label="Upgroo home"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent)]">
              <span className="text-[10px] font-bold text-white" aria-hidden="true">UG</span>
            </div>
            <span className="text-[var(--font-size-md)] font-semibold text-[var(--color-text-primary)]">
              Upgroo
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-xs)] text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)] hover:bg-black/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-xs)] hover:bg-black/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              <X className="h-5 w-5 text-[var(--color-text-primary)]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Drawer nav */}
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-4 flex-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center rounded-[var(--radius-xs)] px-4 py-3 text-[var(--font-size-md)] font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-page)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer auth actions */}
        <div className="border-t border-[var(--color-border)] p-4 flex flex-col gap-2">
          <Link href="/login" onClick={() => setMobileOpen(false)}>
            <Button variant="outline" size="lg" className="w-full">Sign in</Button>
          </Link>
          <Link href="/signup" onClick={() => setMobileOpen(false)}>
            <Button variant="default" size="lg" className="w-full">Get started</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
