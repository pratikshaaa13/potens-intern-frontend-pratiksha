import { useEffect, useState } from 'react'
import { LangProvider, useLang } from './i18n'
import TopBar from './components/TopBar'
import ActionQueue from './components/ActionQueue'
import AnomaliesPanel from './components/AnomaliesPanel'
import LiveMetric from './components/LiveMetric'
import { actionItems, anomalies } from './data/mockData'
import { useKeyboardNav } from './hooks/useKeyboardNav'

function Dashboard() {
  const { t } = useLang()
  const [statuses, setStatuses] = useState({}) // id -> 'approved' | 'held'
  const [selectedId, setSelectedId] = useState(actionItems[0]?.id ?? null)
  const [daylight, setDaylight] = useState(false)
  const [lowBandwidth, setLowBandwidth] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('daylight', daylight)
  }, [daylight])

  function approve(id) {
    setStatuses((s) => ({ ...s, [id]: 'approved' }))
  }
  function hold(id) {
    setStatuses((s) => ({ ...s, [id]: 'held' }))
  }

  useKeyboardNav({
    items: actionItems,
    selectedId,
    onSelect: setSelectedId,
    onApprove: approve,
    onHold: hold,
  })

  return (
    <div className="min-h-screen bg-ink">
      <TopBar
        daylight={daylight}
        onToggleDaylight={() => setDaylight((d) => !d)}
        lowBandwidth={lowBandwidth}
        onToggleLowBandwidth={() => setLowBandwidth((b) => !b)}
      />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-6">
        <div className="md:col-span-2">
          <ActionQueue
            items={actionItems}
            statuses={statuses}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onApprove={approve}
            onHold={hold}
          />
        </div>

        <div className="flex flex-col gap-4">
          <LiveMetric lowBandwidth={lowBandwidth} />
          <AnomaliesPanel anomalies={anomalies} />
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-6 text-center text-[11px] text-text-faint md:px-6">
        {t('shortcutsHint')}
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Dashboard />
    </LangProvider>
  )
}
