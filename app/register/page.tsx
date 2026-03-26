"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { ModeToggle } from "@/components/mode-toggle"
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiArrowLeftLine } from "@remixicon/react"

export default function RegisterPage() {
  const router = useRouter()

  const [email,         setEmail]         = useState("")
  const [firstName,     setFirstName]     = useState("")
  const [lastName,      setLastName]      = useState("")
  const [password,      setPassword]      = useState("")
  const [showPassword,  setShowPassword]  = useState(false)
  const [agreed,        setAgreed]        = useState(false)
  const [isPending,     setIsPending]     = useState(false)

  const canSubmit = !!(email && firstName && lastName && password && agreed)

  function handleSubmit() {
    if (!canSubmit) return
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      router.push("/dashboard")
    }, 1200)
  }

  return (
    <div className="flex h-screen bg-background">

      {/* ── Left — form ──────────────────────────────────── */}
      <div className="relative flex flex-1 flex-col px-8 py-6">

        {/* Mode toggle top right */}
        <div className="absolute right-4 top-4 z-10">
          <ModeToggle />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/mtn-logo.svg" alt="MTN" className="h-7 w-auto dark:invert" />
        </div>

        {/* Form body — centred vertically */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[420px] flex flex-col gap-6">

            {/* Heading */}
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create your account</h1>
              <p className="text-sm text-muted-foreground">
                Sign up to start building and managing your MTN services.
              </p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">

              {/* Work email */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm text-muted-foreground">Work email</Label>
                <InputGroup>
                  <InputGroupAddon align="inline-start"><RiMailLine className="size-4" /></InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </InputGroup>
              </div>

              {/* First + Last name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="first-name" className="text-sm text-muted-foreground">First name</Label>
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="Alex"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="last-name" className="text-sm text-muted-foreground">Last name</Label>
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="Smith"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-sm text-muted-foreground">Password</Label>
                <InputGroup>
                  <InputGroupAddon align="inline-start"><RiLockLine className="size-4" /></InputGroupAddon>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <InputGroupButton
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <RiEyeOffLine className="size-4" /> : <RiEyeLine className="size-4" />}
                  </InputGroupButton>
                </InputGroup>
                <p className="text-xs text-muted-foreground">Password must be at least 8 characters</p>
              </div>

            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={v => setAgreed(v === true)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the{" "}
                <span className="text-link hover:underline underline-offset-4 cursor-pointer">terms and conditions</span>.
              </label>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="w-full"
              disabled={!canSubmit}
              loading={isPending}
              onClick={handleSubmit}
            >
              Create account
            </Button>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                className="cursor-pointer font-medium text-link hover:underline underline-offset-4"
                onClick={() => router.push("/login3")}
              >
                Sign in
              </span>
            </p>

          </div>
        </div>

        {/* Bottom bar — back / dots / links */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <button
            onClick={() => router.push("/login3")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RiArrowLeftLine className="size-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-border" />
            <div className="h-2 w-5 rounded-full bg-primary" />
            <div className="size-2 rounded-full bg-border" />
          </div>
          <div className="flex items-center gap-2">
            <span className="cursor-pointer hover:text-foreground hover:underline">Terms</span>
            <div className="h-2.5 w-px bg-border" />
            <span className="cursor-pointer hover:text-foreground hover:underline">Privacy</span>
          </div>
        </div>

      </div>

      {/* ── Right — hero panel (same as login3) ──────────── */}
      <div className="relative m-2 hidden w-[420px] shrink-0 overflow-hidden rounded-xl md:block" style={{ background: "#0a0906" }}>

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

    </div>
  )
}
