"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { ModeToggle } from "@/components/mode-toggle"
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "@remixicon/react"
import { Alert, AlertIcon, AlertContent, AlertDescription } from "@/components/ui/alert"

const heroImage = "https://www.figma.com/api/mcp/asset/75356151-20fe-49bf-818c-572f1c4b8968"

export default function LoginPage3() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Left — hero image */}
      <div className="relative m-2 hidden w-[369px] shrink-0 overflow-hidden rounded-xl bg-muted md:block">
        <img
          src={heroImage}
          alt="MTN Partners"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Yellow gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Bottom content */}
        <div className="absolute bottom-24 left-8 right-8 flex items-start flex-col gap-8">
          {/* MTN logo */}
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

          {/* Carousel indicators */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-6 rounded-full bg-primary" />
            <div className="size-2 rounded-full bg-white/20" />
            <div className="size-2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="relative flex flex-1 items-center justify-center px-8 pb-10">
        {/* Mode toggle top right */}
        <div className="absolute right-4 top-4">
          <ModeToggle />
        </div>

        <div className="w-full max-w-[450px] flex flex-col gap-6">
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-foreground">👋 Y&apos;ello</h1>
            <p className="text-base text-muted-foreground">
              Login to your Raanaa playground.
            </p>
          </div>

          {/* Info alert */}
          <Alert variant="info" level="inline">
            <AlertIcon />
            <AlertContent>
              <AlertDescription>
                No real authentication. Click Login to enter the playground.
              </AlertDescription>
            </AlertContent>
          </Alert>

          {/* Fields */}
          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Email</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start"><RiMailLine className="size-4" /></InputGroupAddon>
                <InputGroupInput type="email" placeholder="example@email.com" />
              </InputGroup>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-muted-foreground">Password</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start"><RiLockLine className="size-4" /></InputGroupAddon>
                <InputGroupInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputGroupButton
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <RiEyeOffLine className="size-4" /> : <RiEyeLine className="size-4" />}
                </InputGroupButton>
              </InputGroup>
              <p className="text-right text-sm text-link cursor-pointer hover:underline">
                Forgot password?
              </p>
            </div>
          </div>

          {/* Login button */}
          <Button size="lg" className="w-full" onClick={() => router.push("/dashboard")}>
            Login
          </Button>

          {/* Register */}
          <p className="text-center text-base text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span className="cursor-pointer font-medium text-foreground underline underline-offset-4">
              Register
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
