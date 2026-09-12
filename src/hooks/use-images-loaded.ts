import { useEffect, useState, type RefObject } from 'react'

interface Options {
  minDelayMs?: number
  maxWaitMs?: number
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useImagesLoaded(
  container: RefObject<HTMLElement | null>,
  { minDelayMs = 0, maxWaitMs = 8000 }: Options = {},
) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    const images = Array.from(container.current?.querySelectorAll('img') ?? [])
    const decoded = Promise.all(images.map((img) => img.decode().catch(() => undefined)))

    Promise.all([Promise.race([decoded, delay(maxWaitMs)]), delay(minDelayMs)]).then(() => {
      if (!cancelled) setLoaded(true)
    })

    return () => {
      cancelled = true
    }
  }, [container, minDelayMs, maxWaitMs])

  return loaded
}
