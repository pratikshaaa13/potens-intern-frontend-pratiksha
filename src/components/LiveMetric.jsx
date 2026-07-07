import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'

// Simulates a live feed: tickets open citywide drift up/down with a mild
// upward bias (mirrors real intake patterns skewing up through the morning).
// This is intentionally a *simulation*, not random noise, so the sparkline
// tells a believable story rather than looking like jitter.
export default function LiveMetric({ lowBandwidth }) {
  const { t } = useLang()
  const [value, setValue] = useState(1284)
  const historyRef = useRef(Array.from({ length: 24 }, () => 1284))
  const [, force] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const delta = Math.floor(Math.random() * 5) - 1 // bias toward +
        const next = Math.max(1200, v + delta)
        historyRef.current = [...historyRef.current.slice(1), next]
        return next
      })
      force((n) => n + 1)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  const history = historyRef.current
  const min = Math.min(...history)
  const max = Math.max(...history)
  const range = max - min || 1
  const points = history
    .map((v, i) => {
      const x = (i / (history.length - 1)) * 100
      const y = 32 - ((v - min) / range) * 28 - 2
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="rounded-lg border border-hairline bg-panel p-4">
      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted">
        {t('liveMetric')}
      </div>
      <div className="flex items-end justify-between">
        <span
          className="font-mono text-4xl font-semibold tabular-nums text-amber"
          aria-live="polite"
        >
          {value.toLocaleString('en-IN')}
        </span>
        <span
          className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-amber"
          aria-hidden="true"
          title="live"
        />
      </div>
      <div className="mt-1 text-xs text-text-faint">{t('liveMetricSub')}</div>

      {!lowBandwidth && (
        <svg viewBox="0 0 100 32" className="mt-3 h-8 w-full" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke="var(--color-teal)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {!lowBandwidth && (
        <div className="mt-1 text-[10px] text-text-faint">{t('last1h')}</div>
      )}
    </div>
  )
}
