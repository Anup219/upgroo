import Link from "next/link";

const LINKS = {
  Platform: [
    { href: "/how-it-works", label: "How it works"   },
    { href: "/rewards",       label: "Rewards catalog" },
    { href: "/faq",           label: "FAQ"            },
  ],
  Legal: [
    { href: "/terms",   label: "Terms of service" },
    { href: "/privacy", label: "Privacy policy"   },
    { href: "/cookies", label: "Cookie policy"    },
  ],
  Support: [
    { href: "mailto:support@upgroo.app", label: "Contact us" },
    { href: "#",                                     label: "Help center" },
  ],
};

const SOCIALS = [
  { href: "#", label: "Twitter",   symbol: "𝕏" },
  { href: "#", label: "LinkedIn",  symbol: "in" },
  { href: "#", label: "GitHub",    symbol: "gh" },
  { href: "#", label: "Instagram", symbol: "ig" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-surface-card)] border-t border-[var(--color-border)]" role="contentinfo">
      <div className="mx-auto max-w-5xl px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 rounded-[var(--radius-xs)]"
              aria-label="Upgroo home"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent)]">
                <span className="text-[10px] font-bold text-white" aria-hidden="true">UG</span>
              </div>
              <span className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">
                Upgroo
              </span>
            </Link>
            <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] leading-relaxed max-w-[220px]">
              Earn reward points for doing what you already do online.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 text-[var(--font-size-xs)] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] opacity-80 hover:opacity-100 hover:text-[var(--color-text-primary)] underline-offset-3 hover:underline transition-all duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-1 rounded-[var(--radius-xs)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[var(--font-size-xs)] text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} Upgroo. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ href, label, symbol }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--font-size-xs)] font-semibold text-[var(--color-text-inverse)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-all duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
              >
                <span aria-hidden="true">{symbol}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
