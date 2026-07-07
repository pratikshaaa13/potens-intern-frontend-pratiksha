import { useLang } from '../i18n'

const SEVERITY_STYLE = {
  high: 'border-danger text-danger bg-danger-dim',
  medium: 'border-amber text-amber bg-amber-dim',
  low: 'border-teal text-teal bg-teal-dim',
}

export default function AnomaliesPanel({ anomalies }) {
  const { t, lang } = useLang()

  return (
    <div className="rounded-lg border border-hairline bg-panel p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {t('anomalies')}
      </div>
      <div className="mb-3 text-xs text-text-faint">{t('anomaliesSub')}</div>

      <ul className="space-y-2">
        {anomalies.map((a) => (
          <li
            key={a.id}
            className="rounded-md border border-hairline bg-panel-raised p-3"
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-text-faint">{a.id}</span>
              <span
                className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${SEVERITY_STYLE[a.severity]}`}
              >
                {t(a.severity)}
              </span>
            </div>
            <p className="text-sm leading-snug text-text">{a.text[lang]}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
