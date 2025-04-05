// @hooks/useBreakpoint.ts

// @ts-ignore
import { useWindowSize } from 'usehooks-ts'
import { useMemo } from 'react'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Tailwind-ish / MUI-style breakpoints
 */
const breakpoints: Record<Breakpoint, number> = {
  xs: 0,      // mobile
  sm: 600,    // tablets
  md: 900,    // small desktops
  lg: 1200,   // standard desktops
  xl: 1536,   // large displays
}

export function useBreakpoint(): Breakpoint {
  const { width } = useWindowSize()

  return useMemo(() => {
    if (width >= breakpoints.xl) return 'xl'
    if (width >= breakpoints.lg) return 'lg'
    if (width >= breakpoints.md) return 'md'
    if (width >= breakpoints.sm) return 'sm'
    return 'xs'
  }, [width])
}
