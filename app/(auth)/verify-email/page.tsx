"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Mail, RefreshCw, CheckCircle2 } from "lucide-react";

export default function VerifyEmailPage() {
  const { user, resendVerification } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Poll for verification status
    const interval = setInterval(async () => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          router.push("/dashboard");
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user, router]);

  const handleResend = async () => {
    setIsResending(true);
    setMessage("");
    try {
      await resendVerification();
      setMessage("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      setMessage(error.message || "Failed to resend email.");
    } finally {
      setIsResending(false);
    }
  };

  if (!user) {
    return null; // or redirect to login
  }

  if (user.emailVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-pk-bg)] p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-pk-success)]/10">
              <CheckCircle2 className="h-6 w-6 text-[var(--color-pk-success)]" />
            </div>
            <CardTitle>Email Verified</CardTitle>
            <CardDescription>Your email has been successfully verified.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-pk-bg)] p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-pk-surface-elevated)]">
            <Mail className="h-6 w-6 text-[var(--color-pk-text-secondary)]" />
          </div>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent a verification link to <span className="font-medium text-[var(--color-pk-text-primary)]">{user.email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--color-pk-text-secondary)]">
            Click the link in the email to verify your account. This page will automatically update once you&apos;re verified.
          </p>
          {message && (
            <p className="mt-4 text-sm text-[var(--color-pk-accent)]">{message}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleResend}
            isLoading={isResending}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Resend email
          </Button>
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => router.push("/login")}
          >
            Back to login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
