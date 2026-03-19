"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { ModeToggle } from "@/components/mode-toggle"
import { RiArrowLeftLine } from "@remixicon/react"

const heroImage = "https://www.figma.com/api/mcp/asset/75356151-20fe-49bf-818c-572f1c4b8968"

function VerifyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your email"
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (countdown === 0) return
    const timer = setInterval(() => setCountdown(c => c - 1), 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const formatted = `00:${String(countdown).padStart(2, "0")}`

  return (
    <div className="flex h-screen bg-background">
      {/* Left — hero image */}
      <div className="relative m-2 hidden w-[369px] shrink-0 overflow-hidden rounded-xl bg-muted md:block">
        <img src={heroImage} alt="MTN Partners" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute bottom-24 left-8 right-8 flex flex-col items-start gap-8">
          <img src="/mtn-logo.svg" alt="MTN" className="h-8 w-auto invert" />
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-semibold leading-tight text-white">
              All the tools you need to{" "}
              <span className="text-primary">succeed!</span>
            </p>
            <p className="text-base leading-relaxed text-white/60">
              Find tools you need to start, grow and manage your services on MTN.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-6 rounded-full bg-primary" />
            <div className="size-2 rounded-full bg-white/20" />
            <div className="size-2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="relative flex flex-1 items-center justify-center px-8 pb-10">
        <div className="absolute right-4 top-4">
          <ModeToggle />
        </div>
        <div className="absolute left-6 top-6">
          <button
            onClick={() => router.push("/login3/register")}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted"
            aria-label="Go back"
          >
            <RiArrowLeftLine className="size-4" />
          </button>
        </div>

        <div className="w-full max-w-[450px] flex flex-col gap-6">
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-foreground">Verify your account</h1>
            <p className="text-base text-muted-foreground">
              We&apos;ve sent a one-time password (OTP) to{" "}
              <span className="font-medium text-foreground">{email}</span>. Enter it below to verify.
            </p>
          </div>

          {/* Card */}
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8">
            {/* Illustration */}
            <div className="text-6xl select-none">🤳🏾</div>

            {/* OTP — 3 groups of 2 with separators */}
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} className="size-14 text-lg rounded-xl" />
                <InputOTPSlot index={1} className="size-14 text-lg rounded-xl" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} className="size-14 text-lg rounded-xl" />
                <InputOTPSlot index={3} className="size-14 text-lg rounded-xl" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} className="size-14 text-lg rounded-xl" />
                <InputOTPSlot index={5} className="size-14 text-lg rounded-xl" />
              </InputOTPGroup>
            </InputOTP>

            {/* Countdown / resend */}
            <p className="text-sm text-muted-foreground text-center">
              {countdown > 0 ? (
                <>
                  Don&apos;t see it? Send a new code in{" "}
                  <span className="font-semibold text-foreground tabular-nums">{formatted}</span>
                </>
              ) : (
                <>
                  Didn&apos;t receive a code?{" "}
                  <button
                    className="font-medium text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
                    onClick={() => setCountdown(30)}
                  >
                    Resend code
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Verify button */}
          <Button
            size="lg"
            className="w-full"
            disabled={otp.length < 6}
            onClick={() => router.push("/login3/secure")}
          >
            Verify OTP
          </Button>

          {/* Login link */}
          <p className="text-center text-base text-muted-foreground">
            Already have an account?{" "}
            <span
              className="cursor-pointer font-medium text-foreground underline underline-offset-4"
              onClick={() => router.push("/login3")}
            >
              Login
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-5 right-7 flex items-center gap-2 text-xs text-muted-foreground">
          <span>© 2025 MTN. All rights reserved.</span>
          <span className="cursor-pointer text-foreground hover:underline">Terms</span>
          <div className="h-2.5 w-px bg-border" />
          <span className="cursor-pointer text-foreground hover:underline">Privacy</span>
        </div>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <React.Suspense>
      <VerifyForm />
    </React.Suspense>
  )
}
