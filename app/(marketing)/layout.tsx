"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingPaths } from "@/components/ui/background-paths";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--color-surface-page)] overflow-x-hidden">
      {/* Global Animated Background Paths */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.65] dark:opacity-[0.65] z-0 overflow-hidden" aria-hidden="true">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="h-14" aria-hidden="true" />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
