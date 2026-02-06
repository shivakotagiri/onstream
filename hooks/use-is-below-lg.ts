// hooks/use-is-below-lg.ts
import { useEffect, useState } from "react"

export function useIsBelowLg() {
  const [isBelowLg, setIsBelowLg] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    const handler = () => setIsBelowLg(mq.matches)

    handler()
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return isBelowLg
}
