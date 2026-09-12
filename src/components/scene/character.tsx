'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export type CharacterIdle = 'bounce' | 'bob' | 'none'

const IDLE_MOTION: Record<Exclude<CharacterIdle, 'none'>, gsap.TweenVars> = {
  bounce: { '--idle-y': '-22px', duration: 0.375, ease: 'power2.out', yoyoEase: true },
  bob: { '--idle-y': '-10px', duration: 1.8, ease: 'sine.inOut' },
}

interface CharacterProps {
  idle: CharacterIdle
}

export function Character({ idle }: CharacterProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const motion = gsap.timeline().to(ref.current, { '--idle-y': '0px', duration: 0.3, ease: 'sine.out' })
    if (idle !== 'none') motion.to(ref.current, { ...IDLE_MOTION[idle], repeat: -1, yoyo: true })
    return () => {
      motion.kill()
    }
  }, [idle])

  const poseClass = 'absolute inset-0 h-full w-full object-contain'

  return (
    <div ref={ref} className="character z-[18]">
      <img src="/assets/tex/human.webp" alt="Fluffy HÜGS character" className={`pose-standing ${poseClass}`} />
      <img src="/assets/human-floating.webp" alt="" className={`pose-floating ${poseClass} invisible opacity-0`} />
      <img src="/assets/human-walking.webp" alt="" className={`pose-walking ${poseClass} invisible opacity-0`} />
    </div>
  )
}
