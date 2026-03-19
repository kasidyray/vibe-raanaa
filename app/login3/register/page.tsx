"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { ModeToggle } from "@/components/mode-toggle"
import { RiArrowLeftLine, RiEyeLine, RiEyeOffLine, RiLockLine } from "@remixicon/react"
import { cn } from "@/lib/utils"

const heroImage = "https://www.figma.com/api/mcp/asset/75356151-20fe-49bf-818c-572f1c4b8968"

const requirements = [
  { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least one special character (!, @, #, etc.)" },
  { regex: /[A-Z]/,                  text: "At least one uppercase letter (A-Z)"            },
  { regex: /[a-z]/,                  text: "At least one lowercase letter (a-z)"            },
  { regex: /[0-9]/,                  text: "At least one number (0-9)"                      },
]

const strengthColors = ["bg-border", "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-emerald-500"]
const strengthLabels  = ["Enter a password", "Weak password", "Weak password", "Medium password", "Strong password"]

function stepClass(i: number, current: number) {
  if (i === current) return "opacity-100 translate-y-0 pointer-events-auto z-10"
  if (i < current)   return "opacity-0 -translate-y-4 pointer-events-none z-0"
  return "opacity-0 translate-y-4 pointer-events-none z-0"
}

export default function RegisterFlowPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  // ── Step 0 — Register ──────────────────────────────────────
  const [firstName, setFirstName] = useState("")
  const [lastName,  setLastName]  = useState("")
  const [company,   setCompany]   = useState("")
  const [email,     setEmail]     = useState("")
  const [phone,     setPhone]     = useState("")
  const [agreed,    setAgreed]    = useState(false)
  const canRegister = !!(firstName && lastName && email && agreed)

  // ── Step 1 — Verify ────────────────────────────────────────
  const [otp,       setOtp]       = useState("")
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (step !== 1 || countdown === 0) return
    const timer = setInterval(() => setCountdown(c => c - 1), 1000)
    return () => clearInterval(timer)
  }, [step, countdown])

  // Reset OTP + countdown each time the verify step is entered
  useEffect(() => {
    if (step === 1) { setOtp(""); setCountdown(30) }
  }, [step])

  // ── Step 2 — Secure ────────────────────────────────────────
  const [password,        setPassword]        = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword,    setShowPassword]    = useState(false)
  const [showConfirm,     setShowConfirm]     = useState(false)

  const strength     = requirements.map(req => ({ met: req.regex.test(password), text: req.text }))
  const score        = useMemo(() => strength.filter(r => r.met).length, [strength])
  const showMismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword
  const canSubmit    = score === 4 && confirmPassword.length > 0 && password === confirmPassword

  const formatted = `00:${String(countdown).padStart(2, "0")}`

  return (
    <div className="flex h-screen bg-background">

      {/* ── Left — hero image ─────────────────────────────── */}
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
          {/* Progress dots animate with current step */}
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
        <div className="absolute right-4 top-4 z-10">
          <ModeToggle />
        </div>
        {step > 0 && (
          <div className="absolute left-6 top-6 z-10">
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted"
              aria-label="Go back"
            >
              <RiArrowLeftLine className="size-4" />
            </button>
          </div>
        )}

        {/* ── Panel 0 — Create account ──────────────────── */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center overflow-y-auto px-8 pb-10",
          "transition-all duration-200 ease-out",
          stepClass(0, step),
        )}>
          <div className="w-full max-w-[450px] flex flex-col gap-8 py-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground">Create an account</h1>
              <p className="text-base text-muted-foreground">Fill in the information below to create an account.</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-muted-foreground">First Name</Label>
                  <Input type="text" placeholder="Sampson" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-muted-foreground">Last Name</Label>
                  <Input type="text" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Company Name</Label>
                <Input type="text" placeholder="SmartReach Africa" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Email</Label>
                <Input type="email" placeholder="jane.doe@smartreach.africa" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Phone</Label>
                <Input type="tel" placeholder="+234 701 234 5678" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="terms" checked={agreed} onCheckedChange={v => setAgreed(v === true)} className="mt-0.5" />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                By clicking this checkbox, I confirm that I have read and understood the{" "}
                <span className="text-foreground underline underline-offset-2 cursor-pointer">MTN FAQ</span>
                {" "}and acknowledge the{" "}
                <span className="text-foreground underline underline-offset-2 cursor-pointer">requirements</span>
                {" "}for onboarding my services.
              </label>
            </div>

            <Button size="lg" className="w-full" disabled={!canRegister} onClick={() => setStep(1)}>
              Continue
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span className="cursor-pointer font-medium text-foreground underline underline-offset-4" onClick={() => router.push("/login3")}>
                Login
              </span>
            </p>
          </div>
        </div>

        {/* ── Panel 1 — Verify OTP ──────────────────────── */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center px-8 pb-10",
          "transition-all duration-200 ease-out",
          stepClass(1, step),
        )}>
          <div className="w-full max-w-[450px] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground">Verify your account</h1>
              <p className="text-base text-muted-foreground">
                We&apos;ve sent a one-time password (OTP) to{" "}
                <span className="font-medium text-foreground">{email || "your email"}</span>. Enter it below to verify.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8">
              

              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-14 text-lg" />
                  <InputOTPSlot index={1} className="size-14 text-lg" />
                  <InputOTPSlot index={2} className="size-14 text-lg" />
                  <InputOTPSlot index={3} className="size-14 text-lg" />
                  <InputOTPSlot index={4} className="size-14 text-lg" />
                  <InputOTPSlot index={5} className="size-14 text-lg" />
                </InputOTPGroup>
              </InputOTP>

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

            <Button size="lg" className="w-full" disabled={otp.length < 6} onClick={() => setStep(2)}>
              Verify OTP
            </Button>

            <p className="text-center text-base text-muted-foreground">
              Already have an account?{" "}
              <span className="cursor-pointer font-medium text-foreground underline underline-offset-4" onClick={() => router.push("/login3")}>
                Login
              </span>
            </p>
          </div>
        </div>

        {/* ── Panel 2 — Secure account ──────────────────── */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center overflow-y-auto px-8 pb-10",
          "transition-all duration-200 ease-out",
          stepClass(2, step),
        )}>
          <div className="w-full max-w-[450px] flex flex-col gap-6 py-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground">Secure your account</h1>
              <p className="text-base text-muted-foreground">Please create a secure password to proceed.</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Enter password</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start"><RiLockLine className="size-4" /></InputGroupAddon>
                <InputGroupInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Confirm password</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start"><RiLockLine className="size-4" /></InputGroupAddon>
                <InputGroupInput
                  type={showConfirm ? "text" : "password"}
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <InputGroupButton
                  onClick={() => setShowConfirm(v => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
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
              <div
                className={`h-full transition-all duration-500 ease-out ${strengthColors[score]}`}
                style={{ width: `${(score / 4) * 100}%` }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">{strengthLabels[score]}. Must contain:</p>
              <ul aria-label="Password requirements" className="flex flex-col gap-1.5">
                {strength.map(req => (
                  <li key={req.text} className="flex items-center gap-2">
                    {req.met
                      ? <CheckIcon aria-hidden className="size-4 text-emerald-500" />
                      : <XIcon     aria-hidden className="size-4 text-muted-foreground/60" />
                    }
                    <span className={`text-xs ${req.met ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
                      {req.text}
                      <span className="sr-only">{req.met ? " - Requirement met" : " - Requirement not met"}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" className="w-full" disabled={!canSubmit} onClick={() => router.push("/")}>
              Confirm
            </Button>

            <p className="text-center text-base text-muted-foreground">
              Already have an account?{" "}
              <span className="cursor-pointer font-medium text-foreground underline underline-offset-4" onClick={() => router.push("/login3")}>
                Login
              </span>
            </p>
          </div>
        </div>

        {/* Shared footer */}
        <div className="absolute bottom-5 right-7 z-10 flex items-center gap-2 text-xs text-muted-foreground">
          <span>© 2025 MTN. All rights reserved.</span>
          <span className="cursor-pointer text-foreground hover:underline">Terms</span>
          <div className="h-2.5 w-px bg-border" />
          <span className="cursor-pointer text-foreground hover:underline">Privacy</span>
        </div>

      </div>
    </div>
  )
}
