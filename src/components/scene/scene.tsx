'use client'

import { useRef } from 'react'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { useImagesLoaded } from '@/hooks/use-images-loaded'
import { BubbleParticles } from './bubble-particles'
import { Character, type CharacterIdle } from './character'
import { CrowdGrid } from './crowd-grid'
import { SECTION_LABELS } from './scene-timeline'
import { ScrollTrack } from './scroll-track'
import { SectionThree } from './section-three'
import { SectionTwo } from './section-two'
import { useSceneTimeline } from './use-scene-timeline'

const IDLE_BY_SECTION: CharacterIdle[] = ['bounce', 'bob', 'none']

export function Scene() {
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const ready = useImagesLoaded(stageRef, { minDelayMs: 1500 })
  const restingSection = useSceneTimeline(stageRef, trackRef)
  const idle = restingSection === null ? 'none' : IDLE_BY_SECTION[restingSection]

  return (
    <>
      <LoadingScreen done={ready} />

      <main ref={stageRef} className="stage fixed inset-0 overflow-hidden select-none pointer-events-none">
        <img
          src="/assets/tex/logo.webp"
          alt="Fluffy HÜGS"
          className="header-logo absolute top-6 left-6 z-30 h-11 w-auto sm:top-8 sm:left-8 sm:h-14 md:h-16 lg:top-9 lg:left-9 lg:h-[68px]"
        />

        <BubbleParticles />
        <CrowdGrid />
        <SectionTwo />
        <SectionThree />
        <Character idle={idle} />
      </main>

      <ScrollTrack ref={trackRef} sectionCount={SECTION_LABELS.length} />
    </>
  )
}
