"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RiLockLine, RiEyeLine, RiEyeOffLine, RiMailLine } from "@remixicon/react"

const heroImage = "https://www.figma.com/api/mcp/asset/c10bd718-8973-4d75-8dc4-ffa7ba4d8b8e"

export default function LoginPage() {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Left — form */}
      <div className="relative flex flex-1 flex-col">
        {/* Logo */}
        <div className="absolute left-6 top-4">
          <img src="/mtn-logo.svg" alt="MTN" className="h-8 w-auto dark:invert" />
        </div>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center px-8">
          <div className="flex w-full max-w-[485px] flex-col gap-6">
            {/* Heading */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold italic text-foreground">Y'ello 👋</h1>
              <p className="text-base text-muted-foreground">Login to your Partner portal account</p>
            </div>

            {/* Fields card */}
            <div className="flex flex-col gap-6 rounded-2xl border border-border p-6">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Email address</Label>
                <div className="relative">
                  <RiMailLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Confirm password */}
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Confirm password</Label>
                <div className="relative">
                  <RiLockLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Password"
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <RiEyeOffLine className="size-4" /> : <RiEyeLine className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <p className="text-center text-sm text-muted-foreground">
                Forgot password?{" "}
                <span className="cursor-pointer text-foreground">Reset</span>
              </p>
            </div>

            {/* Login button */}
            <Button size="lg" className="w-full" onClick={() => router.push("/dashboard")}>
              Login
            </Button>

            {/* Register link */}
            <p className="text-center text-base text-muted-foreground">
              Don&apos;t have an account?{" "}
              <span className="cursor-pointer text-foreground underline">Register</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right — hero image */}
      <div className="relative m-2 hidden w-[369px] shrink-0 overflow-hidden rounded-md bg-muted md:block">
        <img
          src={heroImage}
          alt="MTN Partners"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        {/* Bottom text */}
        <div className="absolute bottom-24 left-8 right-8 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-bold leading-tight text-white">
              All the tools you need to succeed!
            </p>
            <p className="text-xl leading-relaxed text-white/60">
              Find tools you need to start, grow and manage your services on MTN.
            </p>
          </div>
          {/* Carousel indicators */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-6 rounded-full bg-primary" />
            <div className="size-2 rounded-full bg-white/20" />
            <div className="size-2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
