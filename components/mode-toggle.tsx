"use client"

import { useTheme } from "next-themes"
import { RiMoonLine, RiSunLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <RiSunLine className="scale-100 dark:scale-0 transition-transform duration-200" />
      <RiMoonLine className="absolute scale-0 dark:scale-100 transition-transform duration-200" />
    </Button>
  )
}
