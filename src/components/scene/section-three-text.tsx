const DESKTOP_LINES = [
  'debtcircledebt',
  'circleofmotionthing',
  'TaChito,',
  'enclosureMarehand',
  'nightand others',
  'deathTastomach',
  '',
  'Peッtoormotionthing',
  'butlargegoodtreeNaa',
  'NaTafart',
]

const MOBILE_LINES = [
  'debtcircledebtcircleof',
  'motionthingTaChito,',
  'enclosureMarehandnight',
  'and  othersdeathTa',
  'stomach',
  '',
  'Peッtoormotionthingbut',
  'largegoodtreeNaaNaTa',
  'fart',
]

const WAVE_STAGGER = 0.065

interface WaveTextProps {
  lines: string[]
  className?: string
}

function WaveText({ lines, className = '' }: WaveTextProps) {
  let charIndex = 0

  return (
    <div className={className}>
      {lines.map((line, lineIndex) =>
        line ? (
          <p key={lineIndex} className="wave-line">
            {Array.from(line).map((char, i) =>
              char === ' ' ? (
                <span key={i} className="wave-space" />
              ) : (
                <span key={i} className="wave-char" style={{ animationDelay: `${-(charIndex++ * WAVE_STAGGER)}s` }}>
                  {char}
                </span>
              ),
            )}
          </p>
        ) : (
          <div key={lineIndex} className="h-[1.5em]" />
        ),
      )}
    </div>
  )
}

export function SectionThreeText() {
  return (
    <div className="wave-text">
      <WaveText lines={DESKTOP_LINES} className="hidden md:block" />
      <WaveText lines={MOBILE_LINES} className="md:hidden" />
    </div>
  )
}
