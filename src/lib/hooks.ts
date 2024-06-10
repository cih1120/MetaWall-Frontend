import { useEffect, useState, useCallback } from 'react'
import { debounce } from './utils'
import { BREAK_POINTS } from './constants'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const setSize = useCallback(() => {
    setWindowSize({
      width: window.outerWidth,
      height: window.outerHeight,
    });
  }, []);

  const handleResize = useCallback(debounce(() => {
    setSize();
  }, 300), [setSize]);

  useEffect(() => {
    setSize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return windowSize
}

export const useResponsiveBreakpoint = (bp: keyof typeof BREAK_POINTS) => {
  const { width } = useWindowSize();
  return width >= BREAK_POINTS[bp];
}

export const canUseDOM = () => { typeof window !== 'undefined' }