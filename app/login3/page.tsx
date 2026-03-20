"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { ModeToggle } from "@/components/mode-toggle"
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "@remixicon/react"
import { Alert, AlertIcon, AlertContent, AlertDescription } from "@/components/ui/alert"


export default function LoginPage3() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Left — hero panel */}
      <div className="relative m-2 hidden w-[369px] shrink-0 overflow-hidden rounded-xl md:block" style={{ background: "#0a0906" }}>
        {/* To use an image later: add <img src="/your-image.jpg" className="absolute inset-0 h-full w-full object-cover" /> here
            as the first child — it will sit behind all the layers below. Dial down or remove the orb/rings if the image
            provides enough visual interest, and keep the golden sweep to maintain MTN branding at the bottom. */}

        {/* Blurred golden orb — atmospheric depth */}
        <div className="absolute" style={{ top: "8%", left: "50%", transform: "translateX(-50%)", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,68,8,0.6) 0%, rgba(45,34,4,0.3) 45%, transparent 70%)", filter: "blur(36px)" }} />
        {/* Concentric rings */}
        <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -58%)", width: 520, height: 520, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
        <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -58%)", width: 360, height: 360, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)" }} />
        <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -58%)", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.09)" }} />
        {/* Golden sweep from bottom */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: "55%", background: "linear-gradient(to top, rgba(249,198,0,0.18) 0%, rgba(249,198,0,0.05) 45%, transparent 100%)" }} />
        {/* Bottom-left golden accent */}
        <div className="absolute" style={{ bottom: -100, left: -60, width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, rgba(249,198,0,0.10) 0%, transparent 55%)", filter: "blur(24px)" }} />

        {/* Content */}
        <div className="absolute bottom-24 left-8 right-8 flex items-start flex-col gap-8">
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
                Click Login to enter the playground.
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
              <p className="text-right text-sm text-link cursor-pointer hover:underline underline-offset-4" onClick={() => router.push("/login3/forgot-password")}>
                Forgot password?
              </p>
            </div>
          </div>

          {/* Login button */}
          <Button size="lg" className="w-full" onClick={() => router.push("/dashboard")}>
            Login
          </Button>

          {/* Register */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span
              className="cursor-pointer text-link hover:underline underline-offset-4"
              onClick={() => router.push("/login3/register")}
            >
              Register
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-5 right-7 flex items-center gap-2 text-xs text-muted-foreground">
          <span>© 2025 MTN. All rights reserved.</span>
          <span className="cursor-pointer text-muted-foreground hover:text-foreground hover:underline">Terms</span>
          <div className="h-2.5 w-px bg-border" />
          <span className="cursor-pointer text-muted-foreground hover:text-foreground hover:underline">Privacy</span>
        </div>
      </div>
    </div>
  )
}
