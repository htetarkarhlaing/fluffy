import gsap from 'gsap'
import { CROWD_COLS, CROWD_ROWS } from './crowd-grid'

export const SECTION_LABELS = ['section-1', 'section-2', 'section-3'] as const

interface SceneTimelineOptions {
  walkX: string
}

export function createSceneTimeline({ walkX }: SceneTimelineOptions) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'sine.inOut' } })

  tl.set('.section-two', { autoAlpha: 0, y: 20, scale: 0.96 })
    .set('.section-three', { autoAlpha: 0, y: 20 })
    .addLabel(SECTION_LABELS[0])

  tl.to('.crowd-member', {
    yPercent: 250,
    autoAlpha: 0,
    duration: 0.35,
    ease: 'power2.in',
    stagger: { grid: [CROWD_ROWS, CROWD_COLS], from: 'end', amount: 0.2 },
  })
    .to('.pose-standing', { autoAlpha: 0, duration: 0.32 }, 0.3)
    .to('.pose-floating', { autoAlpha: 1, duration: 0.32 }, '<')
    .to('.character', { '--y': '54vh', '--anchor-y': '-50%', '--rotate': '-90deg', '--scale': 0.68, duration: 1.1 }, 0.45)
    .to('.section-two', { autoAlpha: 1, y: 0, scale: 1, duration: 0.85 }, '<0.25')
    .to('.header-logo', { autoAlpha: 0, duration: 0.5 }, '<')
    .addLabel(SECTION_LABELS[1])

  tl.to('.pose-floating', { autoAlpha: 0, duration: 0.42 })
    .to('.pose-walking', { autoAlpha: 1, duration: 0.42 }, '<')
    .to('.character', { '--rotate': '0deg', '--scale': 0.78, duration: 0.42 }, '<')
    .to('.character', { '--x': walkX, '--y': '74vh', duration: 1.1 }, '<0.15')
    .to('.section-two', { autoAlpha: 0, duration: 0.8 }, '<')
    .to('.section-three', { autoAlpha: 1, y: 0, duration: 1.1 }, '<')
    .to('.header-logo', { autoAlpha: 1, duration: 0.5 }, '<')
    .to('.bubbles', { '--flow': 1, duration: 1.1 }, '<')
    .addLabel(SECTION_LABELS[2])

  return tl
}
