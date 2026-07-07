import { createContext, useContext, useEffect, useState } from 'react'

/*
  Flat key -> {en, hi} dictionary rather than nested namespaces.
  This is a small app with one screen's worth of copy, so a flat map
  keeps every string easy to audit in one file (useful when someone
  reviews bilingual completeness, which the brief explicitly requires).
*/
const strings = {
  appTitle: { en: 'Ops Cockpit', hi: 'संचालन कक्ष' },
  wardOps: { en: 'Municipal Grievance Desk', hi: 'नगरपालिका शिकायत डेस्क' },
  asOf: { en: 'as of', hi: 'समय' },

  actionQueue: { en: "Today's Action Queue", hi: 'आज की कार्रवाई सूची' },
  actionQueueSub: { en: 'Top 5 items needing a decision now', hi: 'तुरंत निर्णय हेतु शीर्ष 5 मामले' },
  approve: { en: 'Approve', hi: 'स्वीकृत करें' },
  hold: { en: 'Hold', hi: 'रोकें' },
  approved: { en: 'Approved', hi: 'स्वीकृत' },
  held: { en: 'On hold', hi: 'रोक पर' },
  reopen: { en: 'Reopen', hi: 'पुनः खोलें' },
  ward: { en: 'Ward', hi: 'वार्ड' },
  sla: { en: 'SLA', hi: 'एसएलए' },
  overdue: { en: 'overdue', hi: 'समय सीमा पार' },
  dueIn: { en: 'due in', hi: 'शेष' },

  anomalies: { en: 'Flagged Anomalies', hi: 'चिह्नित असामान्यताएँ' },
  anomaliesSub: { en: 'Auto-detected, needs a human look', hi: 'स्वतः पहचान, मानव समीक्षा आवश्यक' },
  severity: { en: 'Severity', hi: 'गंभीरता' },
  high: { en: 'High', hi: 'उच्च' },
  medium: { en: 'Medium', hi: 'मध्यम' },
  low: { en: 'Low', hi: 'निम्न' },

  liveMetric: { en: 'Open Tickets Right Now', hi: 'अभी लंबित शिकायतें' },
  liveMetricSub: { en: 'Citywide, all wards, live', hi: 'पूरे शहर में, सभी वार्ड, लाइव' },
  last1h: { en: 'last 1h trend', hi: 'पिछले 1 घंटे का रुझान' },

  langToggle: { en: 'हिं', hi: 'EN' },
  daylightOn: { en: 'Daylight mode', hi: 'दिन मोड' },
  daylightOff: { en: 'Control-room mode', hi: 'नियंत्रण कक्ष मोड' },
  lowBandwidth: { en: 'Low-bandwidth', hi: 'कम बैंडविड्थ' },

  shortcutsHint: {
    en: 'j/k select · a approve · h hold',
    hi: 'j/k चुनें · a स्वीकृत · h रोकें',
  },
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = (key) => strings[key]?.[lang] ?? key
  const toggle = () => setLang((l) => (l === 'en' ? 'hi' : 'en'))

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
