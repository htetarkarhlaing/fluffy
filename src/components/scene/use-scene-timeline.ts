import { useState, type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createSceneTimeline, SECTION_LABELS } from './scene-timeline'

gsap.registerPlugin(ScrollTrigger)

export function useSceneTimeline(stage: RefObject<HTMLElement | null>, track: RefObject<HTMLElement | null>) {
  const [restingSection, setRestingSection] = useState<number | null>(0)

  useGSAP(
    () => {
      gsap.matchMedia().add(
        { desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' },
        ({ conditions }) => {
          const timeline = createSceneTimeline({ walkX: conditions?.desktop ? '22vw' : '35vw' })
          const labelProgress = SECTION_LABELS.map((label) => timeline.labels[label] / timeline.duration())
          const scrub = gsap.quickTo(timeline, 'progress', { duration: 0.5, ease: 'power2.out' })

          timeline.eventCallback('onUpdate', () => {
            const progress = timeline.progress()
            const index = labelProgress.findIndex((p) => Math.abs(progress - p) < 0.001)
            setRestingSection(index === -1 ? null : index)
          })

          ScrollTrigger.create({
            trigger: track.current,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => scrub(gsap.utils.interpolate(labelProgress, self.progress)),
          })
        },
      )
    },
    { scope: stage },
  )

  return restingSection
}
