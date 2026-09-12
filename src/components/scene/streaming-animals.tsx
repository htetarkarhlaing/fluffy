'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Animal {
  src: string
  alt: string
  size: string
  x: number
  y: number
  phase: number
  spin: number
  angle: number
}

const ANIMALS: Animal[] = [
  { src: '/assets/animals/animal-15.webp', alt: 'Koala', size: 'w-14 sm:w-18 lg:w-22', x: 10, y: 14, phase: 0, spin: 22, angle: 45 },
  { src: '/assets/animals/animal-13.webp', alt: 'Orange cat', size: 'w-14 sm:w-18 lg:w-20', x: 50, y: 18, phase: 1.2, spin: -26, angle: 120 },
  { src: '/assets/animals/animal-16.webp', alt: 'Sheep', size: 'w-14 sm:w-18 lg:w-22', x: 90, y: 12, phase: 2.3, spin: 20, angle: 210 },
  { src: '/assets/animals/animal-10.webp', alt: 'Hedgehog', size: 'w-12 sm:w-16 lg:w-18', x: 130, y: 19, phase: 0.8, spin: -28, angle: 300 },
  { src: '/assets/animals/animal-8.webp', alt: 'Bunny', size: 'w-14 sm:w-18 lg:w-20', x: 170, y: 15, phase: 1.9, spin: 24, angle: 80 },
  { src: '/assets/animals/animal-11.webp', alt: 'Grey cat', size: 'w-14 sm:w-18 lg:w-20', x: 30, y: 30, phase: 0.5, spin: 25, angle: 160 },
  { src: '/assets/animals/animal-1.webp', alt: 'Panda', size: 'w-18 sm:w-24 lg:w-28', x: 70, y: 35, phase: 1.7, spin: -18, angle: 25 },
  { src: '/assets/animals/animal-4.webp', alt: 'Peeking cat', size: 'w-14 sm:w-18 lg:w-22', x: 110, y: 32, phase: 2.8, spin: 30, angle: 190 },
  { src: '/assets/animals/animal-14.webp', alt: 'Red panda', size: 'w-14 sm:w-18 lg:w-22', x: 150, y: 38, phase: 1.1, spin: -22, angle: 75 },
  { src: '/assets/animals/animal-19.webp', alt: 'Calico cat', size: 'w-16 sm:w-20 lg:w-24', x: 190, y: 33, phase: 2.1, spin: 26, angle: 280 },
  { src: '/assets/animals/animal-17.webp', alt: 'Pink pig', size: 'w-16 sm:w-22 lg:w-24', x: 20, y: 52, phase: 0.9, spin: -24, angle: 110 },
  { src: '/assets/animals/animal-2.webp', alt: 'Black shiba', size: 'w-16 sm:w-20 lg:w-24', x: 60, y: 56, phase: 2.0, spin: 20, angle: 240 },
  { src: '/assets/animals/animal-6.webp', alt: 'Beaver', size: 'w-14 sm:w-18 lg:w-22', x: 100, y: 49, phase: 0.3, spin: -27, angle: 330 },
  { src: '/assets/animals/animal-12.webp', alt: 'Pink bunny', size: 'w-14 sm:w-18 lg:w-22', x: 140, y: 57, phase: 1.5, spin: 21, angle: 50 },
  { src: '/assets/animals/animal-7.webp', alt: 'Brown dog', size: 'w-16 sm:w-20 lg:w-24', x: 180, y: 53, phase: 2.7, spin: -25, angle: 145 },
  { src: '/assets/animals/animal-5.webp', alt: 'Dalmatian', size: 'w-16 sm:w-22 lg:w-26', x: 40, y: 73, phase: 1.0, spin: 19, angle: 315 },
  { src: '/assets/animals/animal-9.webp', alt: 'Grey tabby', size: 'w-16 sm:w-20 lg:w-24', x: 80, y: 76, phase: 2.4, spin: -28, angle: 95 },
  { src: '/assets/animals/animal-18.webp', alt: 'White dog', size: 'w-18 sm:w-24 lg:w-28', x: 120, y: 78, phase: 0.7, spin: 23, angle: 180 },
  { src: '/assets/animals/animal-3.webp', alt: 'Brown dog', size: 'w-14 sm:w-18 lg:w-22', x: 160, y: 71, phase: 1.8, spin: -26, angle: 260 },
  { src: '/assets/animals/animal-1.webp', alt: 'Panda', size: 'w-18 sm:w-24 lg:w-28', x: 200, y: 75, phase: 3.1, spin: 21, angle: 15 },
]

const DRIFT_SPEED = 7.5
const BOB_AMPLITUDE = 1.6
const BOB_SPEED = 2.2

const wrapX = gsap.utils.wrap(-30, 210)

export function StreamingAnimals() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = Array.from(containerRef.current?.children ?? []) as HTMLElement[]
    const positions = ANIMALS.map((animal) => animal.x)

    const tick = (time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 100) / 1000

      ANIMALS.forEach((animal, i) => {
        positions[i] = wrapX(positions[i] - DRIFT_SPEED * dt)
        const y = animal.y + Math.sin(time * BOB_SPEED + animal.phase) * BOB_AMPLITUDE
        const angle = animal.angle + time * animal.spin
        elements[i].style.transform = `translate3d(${positions[i]}vw, ${y}vh, 0) rotate(${angle}deg)`
      })
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      {ANIMALS.map((animal, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 will-change-transform"
          style={{ transform: `translate3d(${animal.x}vw, ${animal.y}vh, 0) rotate(${animal.angle}deg)` }}
        >
          <img src={animal.src} alt={animal.alt} className={`animal ${animal.size} cursor-pointer pointer-events-auto`} />
        </div>
      ))}
    </div>
  )
}
