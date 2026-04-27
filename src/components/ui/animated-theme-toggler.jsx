import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}) => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef(null)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  const toggleTheme = useCallback((event) => {
    const button = buttonRef.current
    if (!button || !mounted) return

    // Use click coordinates if available, otherwise fallback to button center
    const x = event?.clientX ?? 0
    const y = event?.clientY ?? 0
    
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y))

    const applyTheme = () => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    if (!document.startViewTransition) {
      applyTheme()
      return
    }

    const transition = document.startViewTransition(() => {
      document.documentElement.classList.add('switching-theme')
      flushSync(applyTheme)
    })

    transition.finished.finally(() => {
      document.documentElement.classList.remove('switching-theme')
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }, [resolvedTheme, setTheme, mounted, duration])

  if (!mounted) return <div className={cn(className, "opacity-0")} />

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}>
      {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
