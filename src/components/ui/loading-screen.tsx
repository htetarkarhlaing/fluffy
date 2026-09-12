'use client'

import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  done: boolean
}

export function LoadingScreen({ done }: LoadingScreenProps) {
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    if (removed) return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [removed])

  if (removed) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#fcf6eb] transition-opacity duration-500 ${done ? 'opacity-0' : ''}`}
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget) setRemoved(true)
      }}
    >
      <img src="/assets/loading.webp" alt="Loading" className="size-36 object-contain sm:size-44" />
    </div>
  )
}
