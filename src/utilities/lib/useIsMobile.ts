// @hooks/useIsMobile.ts

import { useMemo } from 'react'
// @ts-ignore
import { useWindowSize } from 'usehooks-ts'

export function useIsMobile(breakpoint: number = 768): boolean {
  const { width } = useWindowSize()

  return useMemo(() => {
    return width !== undefined && width < breakpoint
  }, [width, breakpoint])
}
