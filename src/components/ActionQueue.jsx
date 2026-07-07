import { useLang } from '../i18n'

function slaLabel(hours, t) {
  if (hours < 0) return { text: `${Math.abs(hours)}h ${t('overdue')}`, tone: 'danger' }
  if (hours <= 4) return { text: `${hours}h ${t('dueIn')}`, tone: 'amber' }
  return { text: `${hours}h ${t('dueIn')}`, tone: 'muted' }
}

const TONE_CLASS = {
  danger: 'text-danger',
  amber: 'text-amber',
  muted: 'text-text-muted',
}

export default function ActionQueue({ items, statuses, selectedId, onSelect, onApprove, onHold }) {
  const { t, lang } = useLang()

  return (
    <div className="rounded-lg border border-hairline bg-panel p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {t('actionQueue')}
      </div>
      <div className="mb-3 text-xs text-text-faint">{t('actionQueueSub')}</div>

      <ul className="space-y-2">
        {items.map((item) => {
          const status = statuses[item.id] // undefined | 'approved' | 'held'
          const sla = slaLabel(item.slaHoursRemaining, t)
          const isSelected = selectedId === item.id

          return (
            <li
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`cursor-pointer rounded-md border p-3 transition ${
                isSelected
                  ? 'border-amber bg-panel-raised'
                  : 'border-hairline bg-panel-raised/60 hover:border-text-faint'
              } ${status === 'approved' ? 'opacity-60' : ''} ${status === 'held' ? 'opacity-70' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    {/* Signature element: ticket ref rendered like an official stamp */}
                    <span className="rotate-[-1.5deg] rounded border-2 border-text-faint px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-text-faint">
                      {item.id}
                    </span>
                    <span className="text-xs text-text-muted">
                      {t('ward')} {item.ward} · {item.category[lang]}
                    </span>
                  </div>
                  <p className="text-sm leading-snug text-text">{item.context[lang]}</p>
                  <div className={`mt-1 font-mono text-[11px] ${TONE_CLASS[sla.tone]}`}>
                    {t('sla')}: {sla.text}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-1.5">
                  {status === 'approved' ? (
                    <StatusPill label={t('approved')} tone="teal" />
                  ) : status === 'held' ? (
                    <StatusPill label={t('held')} tone="amber" />
                  ) : (
                    <>
                      <ActionButton
                        tone="teal"
                        label={t('approve')}
                        onClick={(e) => {
                          e.stopPropagation()
                          onApprove(item.id)
                        }}
                      />
                      <ActionButton
                        tone="amber"
                        label={t('hold')}
                        onClick={(e) => {
                          e.stopPropagation()
                          onHold(item.id)
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ActionButton({ tone, label, onClick }) {
  const toneClass =
    tone === 'teal'
      ? 'border-teal text-teal hover:bg-teal-dim'
      : 'border-amber text-amber hover:bg-amber-dim'
  return (
    <button
      onClick={onClick}
      className={`rounded border px-2.5 py-1 text-xs font-medium transition ${toneClass}`}
    >
      {label}
    </button>
  )
}

function StatusPill({ label, tone }) {
  const toneClass = tone === 'teal' ? 'border-teal text-teal bg-teal-dim' : 'border-amber text-amber bg-amber-dim'
  return (
    <span className={`rounded border px-2 py-1 text-center text-xs font-medium ${toneClass}`}>
      {label}
    </span>
  )
}
