import type { Ref } from 'react'

interface ScrollTrackProps {
  ref: Ref<HTMLDivElement>
  sectionCount: number
}

export function ScrollTrack({ ref, sectionCount }: ScrollTrackProps) {
  return (
    <div ref={ref} className="scroll-track" aria-hidden>
      {Array.from({ length: sectionCount }, (_, index) => (
        <section key={index} />
      ))}
    </div>
  )
}
