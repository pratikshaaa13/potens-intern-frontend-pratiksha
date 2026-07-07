import { useEffect, useState } from 'react'
import { useLang } from '../i18n'

export default function TopBar({ daylight, onToggleDaylight, lowBandwidth, onToggleLowBandwidth }) {
  const { t, lang, toggle } = useLang()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = now.toLocaleTimeString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <header className="flex items-center justify-between border-b border-hairline px-4 py-3 md:px-6">
      <div className="flex items-baseline gap-3">
        <h1 className="font-mono text-lg font-semibold tracking-tight text-text md:text-xl">
          {t('appTitle')}
        </h1>
        <span className="hidden text-sm text-text-muted md:inline">{t('wardOps')}</span>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <span className="hidden font-mono text-xs text-text-faint sm:inline">
          {t('asOf')} {timeStr}
        </span>

        <ToggleButton
          active={lowBandwidth}
          onClick={onToggleLowBandwidth}
          label={t('lowBandwidth')}
        />
        <ToggleButton
          active={daylight}
          onClick={onToggleDaylight}
          label={daylight ? t('daylightOff') : t('daylightOn')}
        />
        <button
          onClick={toggle}
          className="rounded-md border border-hairline bg-panel-raised px-3 py-1.5 font-mono text-xs font-medium text-text transition hover:border-amber hover:text-amber"
          aria-label="Toggle language"
        >
          {t('langToggle')}
        </button>
      </div>
    </header>
  )
}

function ToggleButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
        active
          ? 'border-teal bg-teal-dim text-teal'
          : 'border-hairline bg-panel-raised text-text-muted hover:text-text'
      }`}
    >
      {label}
    </button>
  )
}
