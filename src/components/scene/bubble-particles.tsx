'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const BUBBLE_IMAGES = [
  '/assets/bubbles/bubble-2.webp',
  '/assets/bubbles/bubble-3.webp',
  '/assets/bubbles/bubble-4.webp',
  '/assets/bubbles/bubble-5.webp',
]
const BUBBLE_SIZES = [
  'w-[clamp(144px,15vw,220px)]',
  'w-[clamp(160px,17vw,245px)]',
  'w-[clamp(128px,13vw,200px)]',
]

const COLS = 6
const ROWS = 8
const STEP = 36
const GRID_START = -35
const wrapX = gsap.utils.wrap(GRID_START, GRID_START + COLS * STEP)
const wrapY = gsap.utils.wrap(GRID_START, GRID_START + ROWS * STEP)

const SPEED = 11

interface Bubble {
  src: string
  size: string
  x: number
  y: number
}

const BUBBLES: Bubble[] = []
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    if ((row + col) % 2 === 0) continue
    const i = BUBBLES.length
    BUBBLES.push({
      src: BUBBLE_IMAGES[i % BUBBLE_IMAGES.length],
      size: BUBBLE_SIZES[i % BUBBLE_SIZES.length],
      x: col * STEP - 10,
      y: row * STEP - 10,
    })
  }
}

export function BubbleParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current!
    const elements = Array.from(container.children) as HTMLElement[]
    const xs = BUBBLES.map((bubble) => bubble.x)
    const ys = BUBBLES.map((bubble) => bubble.y)

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 100) / 1000
      const flow = Number(getComputedStyle(container).getPropertyValue('--flow')) || 0

      for (let i = 0; i < BUBBLES.length; i++) {
        xs[i] = wrapX(xs[i] - flow * SPEED * dt)
        ys[i] = wrapY(ys[i] - (1 - flow) * SPEED * dt)
        elements[i].style.transform = `translate3d(${xs[i]}vmin, ${ys[i]}vmin, 0)`
      }
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  return (
    <div ref={containerRef} className="bubbles absolute inset-0 z-0 [--flow:0]">
      {BUBBLES.map((bubble, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 will-change-transform"
          style={{ transform: `translate3d(${bubble.x}vmin, ${bubble.y}vmin, 0)` }}
        >
          <img src={bubble.src} alt="" className={`${bubble.size} opacity-90`} />
        </div>
      ))}
    </div>
  )
}
