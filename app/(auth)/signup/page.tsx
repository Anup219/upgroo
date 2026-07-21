"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { FloatingPaths } from "@/components/ui/background-paths";

function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    default:
      return "Failed to create account. Please try again.";
  }
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const passwordStrong = password.length >= 6;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }
    if (!passwordStrong) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, name);
      router.push("/verify-email");
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err.code));
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
          href="/" 
          className="inline-flex items-center gap-1.5 text-[var(--font-size-xs)] font-medium text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)] mb-6 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to home</span>
        </Link>

        {/* Logo/Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)] shadow-md shadow-[var(--color-accent)]/20 mb-3">
            <span className="text-xs font-black text-white">UG</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Create an account
          </h1>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] mt-1.5">
            Start earning rewards for your daily online activities
          </p>
        </div>

        {/* Card Container */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)]/80 backdrop-blur-[12px] shadow-[var(--shadow-3)] overflow-hidden">
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4 pt-6">
              {error && (
                <div className="flex items-start space-x-2 rounded-md bg-[var(--color-danger)]/10 p-3 text-sm text-[var(--color-danger)]">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="leading-tight">{error}</span>
                </div>
              )}
              <Input
                label="Full Name"
                type="text"
                id="signup-name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="bg-[var(--color-surface-page)]/50 focus:bg-[var(--color-surface-card)]"
              />
              <Input
                label="Email Address"
                type="email"
                id="signup-email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="bg-[var(--color-surface-page)]/50 focus:bg-[var(--color-surface-card)]"
              />
              {/* Password */}
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="bg-[var(--color-surface-page)]/50 focus:bg-[var(--color-surface-card)] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 bottom-2.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <p className={`text-xs flex items-center gap-1 ${passwordStrong ? "text-emerald-500" : "text-[var(--color-danger)]"}`}>
                    <CheckCircle2 className="h-3 w-3" />
                    {passwordStrong ? "Strong password" : "At least 6 characters required"}
                  </p>
                )}
              </div>
              {/* Confirm Password */}
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showConfirm ? "text" : "password"}
                    id="signup-confirm-password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="bg-[var(--color-surface-page)]/50 focus:bg-[var(--color-surface-card)] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 bottom-2.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword.length > 0 && (
                  <p className={`text-xs flex items-center gap-1 ${passwordsMatch ? "text-emerald-500" : "text-[var(--color-danger)]"}`}>
                    <CheckCircle2 className="h-3 w-3" />
                    {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-6 pt-2">
              <Button type="submit" className="w-full shadow-lg shadow-[var(--color-accent)]/15" isLoading={isLoading}>
                Create account
              </Button>
              <div className="text-center text-sm text-[var(--color-text-inverse)]">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[var(--color-text-accent)] hover:underline">
                  Sign in
                </Link>
              </div>
              <p className="text-center text-[10px] text-[var(--color-text-muted)] leading-relaxed">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-[var(--color-text-primary)]">Terms</Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-[var(--color-text-primary)]">Privacy Policy</Link>.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
