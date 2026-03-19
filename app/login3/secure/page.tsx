"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { ModeToggle } from "@/components/mode-toggle"
import { RiArrowLeftLine, RiEyeLine, RiEyeOffLine, RiLockLine } from "@remixicon/react"

const heroImage = "https://www.figma.com/api/mcp/asset/75356151-20fe-49bf-818c-572f1c4b8968"

const requirements = [
  { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least one special character (!, @, #, etc.)" },
  { regex: /[A-Z]/,                  text: "At least one uppercase letter (A-Z)"            },
  { regex: /[a-z]/,                  text: "At least one lowercase letter (a-z)"            },
  { regex: /[0-9]/,                  text: "At least one number (0-9)"                      },
]

const strengthColors = ["bg-border", "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-emerald-500"]
const strengthLabels  = ["Enter a password", "Weak password", "Weak password", "Medium password", "Strong password"]

export default function SecurePage() {
  const router = useRouter()
  const [password,        setPassword]        = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword,    setShowPassword]    = useState(false)
  const [showConfirm,     setShowConfirm]     = useState(false)

  const strength = requirements.map(req => ({ met: req.regex.test(password), text: req.text }))
  const score    = useMemo(() => strength.filter(r => r.met).length, [strength])

  const showMismatch  = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword
  const canSubmit     = score === 4 && confirmPassword.length > 0 && password === confirmPassword

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
      <div className="relative flex flex-1 items-center justify-center overflow-y-auto px-8 pb-10">
        <div className="absolute right-4 top-4">
          <ModeToggle />
        </div>
        <div className="absolute left-6 top-6">
          <button
            onClick={() => router.push("/login3/verify")}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted"
            aria-label="Go back"
          >
            <RiArrowLeftLine className="size-4" />
          </button>
        </div>

        <div className="w-full max-w-[450px] flex flex-col gap-6 py-10">
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-foreground">Secure your account</h1>
            <p className="text-base text-muted-foreground">
              Please create a secure password to proceed.
            </p>
          </div>

          {/* Password field */}
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

          {/* Confirm password field */}
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
            {showMismatch && (
              <p className="text-sm text-destructive">Passwords do not match</p>
            )}
          </div>

          {/* Strength bar */}
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

          {/* Requirements */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-foreground">
              {strengthLabels[score]}. Must contain:
            </p>
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

          {/* Submit */}
          <Button size="lg" className="w-full" disabled={!canSubmit} onClick={() => router.push("/")}>
            Confirm
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
