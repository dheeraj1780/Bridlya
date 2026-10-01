import { useEffect, useState } from 'react'

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(() => (typeof window === 'undefined' ? initial : window.matchMedia(query).matches))
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatches(m.matches)
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return matches
}

/** Desktop = wide, precise-pointer layouts get the pinned/horizontal choreography. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v))
}
