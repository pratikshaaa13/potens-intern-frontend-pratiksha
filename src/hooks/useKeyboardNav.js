import { useEffect } from 'react'

// j/k move selection, a approves, h holds — the vim-style convention ops
// teams already know from terminals/Linear/Superhuman. Ignores keystrokes
// while focus is inside an input/textarea so it never fights normal typing.
export function useKeyboardNav({ items, selectedId, onSelect, onApprove, onHold }) {
  useEffect(() => {
    function handler(e) {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      const ids = items.map((i) => i.id)
      const currentIndex = ids.indexOf(selectedId)

      if (e.key === 'j') {
        e.preventDefault()
        const next = ids[Math.min(currentIndex + 1, ids.length - 1)] ?? ids[0]
        onSelect(next)
      } else if (e.key === 'k') {
        e.preventDefault()
        const prev = ids[Math.max(currentIndex - 1, 0)] ?? ids[0]
        onSelect(prev)
      } else if (e.key === 'a' && selectedId) {
        e.preventDefault()
        onApprove(selectedId)
      } else if (e.key === 'h' && selectedId) {
        e.preventDefault()
        onHold(selectedId)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [items, selectedId, onSelect, onApprove, onHold])
}
