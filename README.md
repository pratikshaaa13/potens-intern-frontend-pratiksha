# Ops Cockpit — Municipal Grievance Desk

A 9 a.m. dashboard for a senior civic-ops reviewer: today's action queue,
system-flagged anomalies, and a live citywide ticket count. Built for the
Potens internship take-home (Q2 — Operations Cockpit Dashboard).

**Live use case, made concrete:** rather than a generic "ops dashboard,"
this is scoped to a municipal grievance desk — the kind of screen a ward
officer would actually open before triaging the day's complaints about
water, roads, sanitation, and streetlights.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

No backend, no env vars, no API keys. All data is mocked in
`src/data/mockData.js`.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite` — no separate config file; theme
  tokens live in `src/index.css` under `@theme`)
- No component library, no state management library — the state is small
  enough that `useState` in `App.jsx` is the honest choice

## Design decisions

**Dark is the default, not a toggle.** Most dashboards treat dark mode as
an inverted afterthought. Here the ink-navy "control room" theme *is* the
primary design — it's framed as a live instrument someone is monitoring,
not a marketing surface — and "Daylight mode" is the alternate, for glare
or printing. This is why the toggle button is labeled by what it's *for*
("Daylight mode" / "Control-room mode"), not by a generic sun/moon icon.

**IBM Plex Sans + IBM Plex Sans Devanagari + IBM Plex Mono.** The
Devanagari companion face was the deciding factor: it shares metrics and
weight with the Latin IBM Plex Sans, so toggling English ↔ Hindi doesn't
cause a jarring font-personality shift, just a script change. Plex Mono is
reserved for anything that's *data* — ticket IDs, timestamps, the live
counter — so the eye learns "monospace = a fact, not a description."

**Ticket IDs as a stamp, not a tag.** The signature visual element: each
`GRV-XXXXX` reference is rendered like a rubber-stamped seal (bordered,
monospace, a slight rotation) rather than a flat pill. It's the one
deliberately "designed" flourish in an otherwise restrained UI, and it
ties directly to the brief's own framing of a "reference ID."

**Flat i18n dictionary over nested namespaces.** `src/i18n.jsx` holds one
flat `key -> {en, hi}` map. For a single-screen app this is easier to
audit for bilingual completeness (the brief requires *every* label to
switch) than a nested JSON tree would be — you can scan one file and see
every string has both languages.

**Simulated live data, not random noise.** The live counter drifts with a
mild upward bias and keeps a real rolling history for its sparkline,
rather than jumping to unrelated random numbers each tick. It's fake data,
but it tells a plausible story, which is what actually reads as "live"
rather than "jittery."

**Keyboard nav ignores focus inside inputs.** `useKeyboardNav` checks
`document.activeElement` before treating `j`/`k`/`a`/`h` as shortcuts, so
the convention doesn't hijack normal typing — the dashboard has no text
inputs today, but this is a correctness detail that matters the moment one
is added (e.g. a comment box), so it was cheap to get right now rather
than retrofit later.

**Low-bandwidth mode is a real, if modest, toggle.** It drops the
sparkline SVG and its caption from the live metric card — the one piece
of decorative-but-non-essential rendering in the app. There isn't a large
image payload to strip in this build (no photos, no avatars), so this
toggle is honest about its own limited scope rather than pretending to do
more; see "What I'd build next."

## What's broken or unfinished

- **Low-bandwidth mode is thin.** It only trims the sparkline. A real
  version would also swap font loading strategy (system font fallback
  instead of the Google Fonts CDN request) and reduce the 2.2s polling
  cadence on the live counter.
- **No persistence.** Approve/hold state lives in React state only and
  resets on refresh. Given more time this would go in `localStorage` at
  minimum, matching the pattern the Q1 brief explicitly asks for.
- **No automated tests.** Everything above was checked by hand (dev
  server + Playwright screenshots for visual review across language/
  theme/viewport combinations), not by a test suite.
- **Anomalies and action items aren't connected.** In a real system a
  flagged anomaly (e.g. "Ward 7 volume up 340%") would let you jump to the
  relevant queue items. Right now they're two independent panels.
- **`daylight` and `lowBandwidth` toggle state isn't persisted** across a
  reload either — same reasoning as above, deprioritized in favor of
  getting the core queue/anomalies/metric loop solid first.
- Tablet breakpoint is via Tailwind's default `md:` (768px); I didn't
  test on a physical tablet, only Chrome's device emulation.

## What I'd build next

1. Wire anomalies to the action queue (click an anomaly, it filters/
   highlights the related ward's items).
2. Persist approve/hold decisions and toggle preferences to
   `localStorage`, with a "reset demo data" affordance for reviewers.
3. Replace the Google Fonts CDN `@import` with self-hosted, subsetted
   Devanagari + Latin fonts — better for the "low-bandwidth" story to
   actually be true, and removes an external network dependency.
4. A real WCAG pass with a screen reader (VoiceOver/NVDA), not just
   Lighthouse — Lighthouse catches contrast and markup issues but misses
   things like whether the keyboard-shortcut hint text is discoverable to
   assistive tech.
5. Unit tests for the SLA-label logic (`slaLabel` in `ActionQueue.jsx`) —
   it's the one place with actual branching logic worth locking down.

## AI Use Log

## AI Use Log

- **Claude (Sonnet)** — 15-18 messages across one extended session. Used for:
  full project build (Vite + React + Tailwind v4 scaffold, i18n layer,
  mock civic-ops dataset, all components — TopBar, ActionQueue,
  AnomaliesPanel, LiveMetric — keyboard-nav hook, design token system),
  visual QA via Playwright screenshots during development, this README,
  and troubleshooting the git/GitHub push after a broken history issue
  on my end during setup.
  
  - **ChatGPT** — ~5-6 messages 
  a few messages. Used for: understanding the problem
  statement and clarifying some project setup questions before starting.

**I'm logging this plainly rather than softening it: this submission leaned heavily on Claude for implementation. I directed the build, made the calls on scope and design, and did all the git work myself — but I want to be upfront that most of the code and copy came from working with the AI, not from me typing it from scratch.**
---
The assignment brief itself says: *"We expect you to use AI assistants. That is how good engineers work in 2026. We just want honesty... Lying about it is the fastest track to a no."* This log is written in that spirit — full disclosure of how heavily I relied on AI, rather than downplaying it.
