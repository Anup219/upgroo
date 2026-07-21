"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { FloatingPaths } from "@/components/ui/background-paths";

function getErrorMessage(code: string): string {
  switch (code) {
    case "auth/user-not-found":
    case "auth/invalid-email":
      return "No account found with this email address.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    default:
      return "Failed to send reset email. Please try again.";
  }
}

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--color-surface-page)] p-4">
      
      {/* Background Trails */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.65] dark:opacity-[0.65] z-0 overflow-hidden" aria-hidden="true">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Navigation Back */}
        <Link 
          href="/login" 
          className="inline-flex items-center gap-1.5 text-[var(--font-size-xs)] font-medium text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)] mb-6 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to sign in</span>
        </Link>

        {/* Logo/Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)] shadow-md shadow-[var(--color-accent)]/20 mb-3">
            <span className="text-xs font-black text-white">UG</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Forgot your password?
          </h1>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] mt-1.5">
            Enter your email and we&apos;ll send a reset link right away.
          </p>
        </div>

        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)]/80 backdrop-blur-[12px] shadow-[var(--shadow-3)] overflow-hidden">
          {isSuccess ? (
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Mail className="h-7 w-7 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[var(--color-text-primary)]">Check your inbox</h2>
                <p className="text-sm text-[var(--color-text-inverse)] mt-1">
                  We&apos;ve sent a reset link to <span className="font-semibold text-[var(--color-text-primary)]">{email}</span>.
                  Check your spam folder if you don&apos;t see it.
                </p>
              </div>
              <Link href="/login" className="block">
                <Button className="w-full mt-2">Back to Sign In</Button>
              </Link>
            </CardContent>
          ) : (
            <form onSubmit={handleReset}>
              <CardContent className="space-y-4 pt-6">
                {error && (
                  <div className="flex items-start space-x-2 rounded-md bg-[var(--color-danger)]/10 p-3 text-sm text-[var(--color-danger)]">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span className="leading-tight">{error}</span>
                  </div>
                )}
                <Input
                  label="Email Address"
                  type="email"
                  id="reset-email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-[var(--color-surface-page)]/50 focus:bg-[var(--color-surface-card)]"
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pb-6 pt-2">
                <Button type="submit" className="w-full shadow-lg shadow-[var(--color-accent)]/15" isLoading={isLoading}>
                  Send Reset Link
                </Button>
                <div className="text-center text-sm text-[var(--color-text-inverse)]">
                  Remember your password?{" "}
                  <Link href="/login" className="font-semibold text-[var(--color-text-accent)] hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </main>
  );
}
