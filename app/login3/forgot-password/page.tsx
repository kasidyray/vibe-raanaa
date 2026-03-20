"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { ModeToggle } from "@/components/mode-toggle"
import { RiArrowLeftLine, RiEyeLine, RiEyeOffLine, RiLockLine, RiMailLine } from "@remixicon/react"
import { cn } from "@/lib/utils"

const requirements = [
  { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least one special character (!, @, #, etc.)" },
  { regex: /[A-Z]/,                  text: "At least one uppercase letter (A-Z)"            },
  { regex: /[a-z]/,                  text: "At least one lowercase letter (a-z)"            },
  { regex: /[0-9]/,                  text: "At least one number (0-9)"                      },
]

const strengthColors = ["bg-border", "bg-error", "bg-warning-dark", "bg-warning", "bg-success"]
const strengthLabels  = ["Enter a password", "Weak password", "Weak password", "Medium password", "Strong password"]

function stepClass(i: number, current: number) {
  if (i === current) return "opacity-100 translate-y-0 pointer-events-auto z-10"
  if (i < current)   return "opacity-0 -translate-y-4 pointer-events-none z-0"
  return "opacity-0 translate-y-4 pointer-events-none z-0"
}

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  // ── Step 0 — Enter email ───────────────────────────────────
  const [email, setEmail] = useState("")
  const canSend = !!email

  // ── Step 1 — Check email ───────────────────────────────────
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (step !== 1 || countdown === 0) return
    const timer = setInterval(() => setCountdown(c => c - 1), 1000)
    return () => clearInterval(timer)
  }, [step, countdown])

  useEffect(() => {
    if (step === 1) setCountdown(30)
  }, [step])

  const formatted = `00:${String(countdown).padStart(2, "0")}`

  // ── Step 2 — Reset password ────────────────────────────────
  const [password,        setPassword]        = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword,    setShowPassword]    = useState(false)
  const [showConfirm,     setShowConfirm]     = useState(false)

  const strength     = requirements.map(req => ({ met: req.regex.test(password), text: req.text }))
  const score        = useMemo(() => strength.filter(r => r.met).length, [strength])
  const showMismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword
  const canSubmit    = score === 4 && confirmPassword.length > 0 && password === confirmPassword

  return (
    <div className="flex h-screen bg-background">

      {/* ── Left — hero panel ─────────────────────────────── */}
      <div className="relative m-2 hidden w-[369px] shrink-0 overflow-hidden rounded-xl md:block" style={{ background: "#0a0906" }}>
        {/* To use an image later: add <img src="/your-image.jpg" className="absolute inset-0 h-full w-full object-cover" /> here
            as the first child — it will sit behind all the layers below. Dial down or remove the orb/rings if the image
            provides enough visual interest, and keep the golden sweep to maintain MTN branding at the bottom. */}

        {/* Blurred golden orb */}
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
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={cn(
                  "rounded-full transition-all duration-500",
                  i === step ? "h-2 w-6 bg-primary" : "size-2 bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right — step panels ───────────────────────────── */}
      <div className="relative flex-1">

        {/* Shared chrome */}
        <div className="absolute right-4 top-4 z-20">
          <ModeToggle />
        </div>
        <div className="absolute left-6 top-6 z-20">
          <button
            onClick={() => step === 0 ? router.push("/login3") : setStep(s => s - 1)}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted"
            aria-label="Go back"
          >
            <RiArrowLeftLine className="size-4" />
          </button>
        </div>

        {/* ── Panel 0 — Enter email ──────────────────────── */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center px-8 pb-10",
          "transition-all duration-200 ease-out",
          stepClass(0, step),
        )}>
          <div className="w-full max-w-[450px] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground">Forgot password?</h1>
              <p className="text-base text-muted-foreground">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Email</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start"><RiMailLine className="size-4" /></InputGroupAddon>
                <InputGroupInput
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </InputGroup>
            </div>

            <Button size="lg" className="w-full" disabled={!canSend} onClick={() => setStep(1)}>
              Send reset link
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Remembered your password?{" "}
              <span className="cursor-pointer font-medium text-link hover:underline underline-offset-4" onClick={() => router.push("/login3")}>
                Login
              </span>
            </p>
          </div>
        </div>

        {/* ── Panel 1 — Check email ──────────────────────── */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center px-8 pb-10",
          "transition-all duration-200 ease-out",
          stepClass(1, step),
        )}>
          <div className="w-full max-w-[450px] flex flex-col items-center gap-6">
            {/* Icon */}
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <RiMailLine className="size-7 text-primary" />
            </div>

            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold text-foreground">Check your email</h1>
              <p className="text-base text-muted-foreground">
                We sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email || "your email"}</span>.
              </p>
            </div>

            <Button size="lg" className="w-full" onClick={() => setStep(2)}>
              Open email app
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              {countdown > 0 ? (
                <>
                  Didn&apos;t receive the email? Resend in{" "}
                  <span className="font-semibold text-foreground tabular-nums">{formatted}</span>
                </>
              ) : (
                <>
                  Didn&apos;t receive the email?{" "}
                  <button
                    className="cursor-pointer font-medium text-link hover:underline underline-offset-4"
                    onClick={() => setCountdown(30)}
                  >
                    Resend
                  </button>
                </>
              )}
            </p>

            <p className="text-center text-sm text-muted-foreground">
              Remembered your password?{" "}
              <span className="cursor-pointer font-medium text-foreground hover:underline underline-offset-4" onClick={() => router.push("/login3")}>
                Login
              </span>
            </p>
          </div>
        </div>

        {/* ── Panel 2 — Reset password ───────────────────── */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center overflow-y-auto px-8 pb-10",
          "transition-all duration-200 ease-out",
          stepClass(2, step),
        )}>
          <div className="w-full max-w-[450px] flex flex-col gap-6 py-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground">Reset your password</h1>
              <p className="text-base text-muted-foreground">Please create a new secure password.</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">New password</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start"><RiLockLine className="size-4" /></InputGroupAddon>
                <InputGroupInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <InputGroupButton onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <RiEyeOffLine className="size-4" /> : <RiEyeLine className="size-4" />}
                </InputGroupButton>
              </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Confirm new password</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start"><RiLockLine className="size-4" /></InputGroupAddon>
                <InputGroupInput
                  type={showConfirm ? "text" : "password"}
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <InputGroupButton onClick={() => setShowConfirm(v => !v)} aria-label={showConfirm ? "Hide password" : "Show password"}>
                  {showConfirm ? <RiEyeOffLine className="size-4" /> : <RiEyeLine className="size-4" />}
                </InputGroupButton>
              </InputGroup>
              {showMismatch && <p className="text-sm text-destructive">Passwords do not match</p>}
            </div>

            <div
              aria-label="Password strength"
              aria-valuemax={4}
              aria-valuemin={0}
              aria-valuenow={score}
              className="h-1 w-full overflow-hidden rounded-full bg-border"
              role="progressbar"
              tabIndex={-1}
            >
              <div className={`h-full transition-all duration-500 ease-out ${strengthColors[score]}`} style={{ width: `${(score / 4) * 100}%` }} />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">{strengthLabels[score]}. Must contain:</p>
              <ul aria-label="Password requirements" className="flex flex-col gap-1.5">
                {strength.map(req => (
                  <li key={req.text} className="flex items-center gap-2">
                    {req.met
                      ? <CheckIcon aria-hidden className="size-4 text-success" />
                      : <XIcon     aria-hidden className="size-4 text-muted-foreground/60" />
                    }
                    <span className={`text-xs ${req.met ? "text-success-dark dark:text-success" : "text-muted-foreground"}`}>
                      {req.text}
                      <span className="sr-only">{req.met ? " - Requirement met" : " - Requirement not met"}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" className="w-full" disabled={!canSubmit} onClick={() => router.push("/login3")}>
              Reset password
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Remembered your password?{" "}
              <span className="cursor-pointer font-medium text-link hover:underline underline-offset-4" onClick={() => router.push("/login3")}>
                Login
              </span>
            </p>
          </div>
        </div>

        {/* Shared footer */}
        <div className="absolute bottom-5 right-7 z-10 flex items-center gap-2 text-xs text-muted-foreground">
          <span>© 2025 MTN. All rights reserved.</span>
          <span className="cursor-pointer text-muted-foreground hover:text-foreground hover:underline">Terms</span>
          <div className="h-2.5 w-px bg-border" />
          <span className="cursor-pointer text-muted-foreground hover:text-foreground hover:underline">Privacy</span>
        </div>

      </div>
    </div>
  )
}
