"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react"

const heroImage = "https://www.figma.com/api/mcp/asset/c10bd718-8973-4d75-8dc4-ffa7ba4d8b8e"

export default function LoginPage2() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Left — hero image */}
      <div className="relative m-2 hidden w-[420px] shrink-0 overflow-hidden rounded-md bg-muted md:block">
        <img
          src={heroImage}
          alt="MTN Partners"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        {/* Logo */}
        <div className="absolute left-6 top-5">
          <img src="/mtn-logo.svg" alt="MTN" className="h-8 w-auto invert" />
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-24 left-8 right-8 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-bold leading-tight text-white">
              All the tools you need to succeed!
            </p>
            <p className="text-lg leading-relaxed text-white/60">
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
      <div className="flex flex-1 flex-col items-center justify-between py-10 px-8 overflow-y-auto">
        {/* Logo (mobile only / top) */}
        <div className="md:hidden mb-8">
          <img src="/mtn-logo.svg" alt="MTN" className="h-8 w-auto dark:invert" />
        </div>

        {/* Spacer top */}
        <div className="hidden md:block" />

        {/* Form */}
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          {/* Logo centered on desktop */}
          <div className="flex justify-center">
            <img src="/mtn-logo.svg" alt="MTN" className="h-9 w-auto dark:invert" />
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-3xl font-bold text-foreground">Y'ello 👋 get started</h1>
            <p className="text-sm text-muted-foreground">
              New to the portal?{" "}
              <span className="cursor-pointer font-medium text-foreground underline underline-offset-4">
                Sign up
              </span>
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Your email address</Label>
              <Input type="email" placeholder="you@example.com" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Your password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <RiEyeOffLine className="size-4" /> : <RiEyeLine className="size-4" />}
                </button>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={() => router.push("/dashboard")}>
              Log in
            </Button>

          </div>

          {/* Social login */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">Or log in with</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="w-full">
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </Button>
              <Button variant="outline" className="w-full">
                <svg viewBox="0 0 24 24" className="size-4" fill="#1877F2" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Button>
              <Button variant="outline" className="w-full">
                <svg viewBox="0 0 24 24" className="size-4 dark:fill-white fill-black" aria-hidden>
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div />
      </div>
    </div>
  )
}
