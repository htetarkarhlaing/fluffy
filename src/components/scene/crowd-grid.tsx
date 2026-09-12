import type { CSSProperties } from 'react'

export const CROWD_ROWS = 8
export const CROWD_COLS = 8

const CENTER = { row: 3, col: 4 }

const HUMAN_IMAGES = Array.from({ length: 16 }, (_, i) => `/assets/human/img${i + 1}.webp`)

interface CrowdMember {
  id: string
  src: string
  col: number
  row: number
  zIndex: number
  bounceDelay: string
}

const CROWD_MEMBERS: CrowdMember[] = []

for (let row = 0; row < CROWD_ROWS; row++) {
  for (let col = 0; col < CROWD_COLS; col++) {
    if (row === CENTER.row && col === CENTER.col) continue

    CROWD_MEMBERS.push({
      id: `crowd-${row}-${col}`,
      src: HUMAN_IMAGES[(col * 3 + row * 7) % HUMAN_IMAGES.length],
      col: col - CENTER.col,
      row: row - CENTER.row,
      zIndex: row <= CENTER.row ? row + 1 : row + 20,
      bounceDelay: `-${((col * 0.08 + row * 0.03) % 0.75).toFixed(2)}s`,
    })
  }
}

export function CrowdGrid() {
  return (
    <div className="crowd absolute inset-0">
      {CROWD_MEMBERS.map((member) => (
        <div
          key={member.id}
          className="crowd-member"
          style={{ zIndex: member.zIndex, '--col': member.col, '--row': member.row } as CSSProperties}
        >
          <img
            src={member.src}
            alt=""
            className="crowd-bounce w-full"
            style={{ animationDelay: member.bounceDelay }}
          />
        </div>
      ))}
    </div>
  )
}
