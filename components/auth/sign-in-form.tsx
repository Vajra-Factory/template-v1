"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  async function handleGitHubSignIn() {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl });
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <Button
        variant="outline"
        onClick={handleGitHubSignIn}
        disabled={isLoading}
        className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        Continue with GitHub
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-zinc-500">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        disabled={isLoading}
        className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.mail className="mr-2 h-4 w-4" />
        )}
        Sign in with Email
      </Button>

      <p className="px-8 text-center text-sm text-zinc-500">
        By continuing, you agree to our{" "}
        <a href="/terms" className="underline underline-offset-4 hover:text-zinc-400">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-zinc-400">
          Privacy Policy
        </a>
        .
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
} 