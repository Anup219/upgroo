"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { FloatingPaths } from "@/components/ui/background-paths";

function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password. Please try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later or reset your password.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    default:
      return "Failed to sign in. Please try again.";
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error("Sign-in error:", err);
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
            Welcome back
          </h1>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] mt-1.5">
            Access your Upgroo earner dashboard
          </p>
        </div>

        {/* Card Container */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)]/80 backdrop-blur-[12px] shadow-[var(--shadow-3)] overflow-hidden">
          <form onSubmit={handleLogin}>
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
                id="login-email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="bg-[var(--color-surface-page)]/50 focus:bg-[var(--color-surface-card)]"
              />
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
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
                <div className="text-right pt-1">
                  <Link href="/reset-password" className="text-xs font-medium text-[var(--color-text-accent)] hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-6 pt-2">
              <Button type="submit" className="w-full shadow-lg shadow-[var(--color-accent)]/15" isLoading={isLoading}>
                Sign in
              </Button>
              <div className="text-center text-sm text-[var(--color-text-inverse)]">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-[var(--color-text-accent)] hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
