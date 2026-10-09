# Wonderdraw — 1,000 Topic Lottery & Challenge Studio

> **Bilingual (EN / FR) Interactive Web App created from `Topic_Lottery_1000_Subjects.md`.**
> 1,000 curated subjects, 3D tactile lottery draw, 10-minute independent research timer, and 60-second video pitch timer.

---

## 🌟 Workflow & Features

### 1. Bilingual Switcher (FR / EN)
- **Instant Toggle :** Switch between **English** and **Français** anytime via the header button (`EN` / `FR`).
- Full localization of all UI controls, guidance rules, pitch framework, and category descriptions with persistent preference in `localStorage`.

### 2. Lottery Draw (Wonderdraw Lottery)
- **Single 3D Tactile Card :** Instant random draw across all 1,000 subjects (by click or pressing <kbd>Space</kbd>) with cursor physics tilt, card shuffle, procedural Web Audio sound, flip reveal, and celebration confetti.
- **Physical Deck Tracking :** "Exclude previously drawn topics" toggle with real-time remaining counter (`X/1000 remaining`) and one-click deck reset.
- **Rigorous Methodological Guidance :** Precise angle reminders on each card back (e.g. scientific rigor for psychology, distinguishing evidence/interpretation/faith for religions).

### 3. Dual Chronometer (10-Min Research & 60-Sec Pitch)
- **Step 1 — Research Timer (10 Minutes) :**
  - Circular countdown (`10:00`) with *Start*, *Pause*, and *Reset* controls.
  - 1-click research shortcuts (Google, Google Scholar, Wikipedia, YouTube).
  - Synchronized auto-saving notes pad / teleprompter.
  - Audio warning at 1 minute remaining, completion gong at `00:00`, and prompt to start pitch.
- **Step 2 — Video Pitch Timer (60 Seconds) :**
  - 60-second pure countdown timer for your spoken delivery.
  - 3-step pitch outline: Hook (`00:00 - 00:10`), Core Mechanism & Example (`00:10 - 00:45`), Takeaway (`00:45 - 01:00`).
  - Audio warning at 15 seconds remaining and final gong.
  - "Mark as Completed" button to validate and record progress.

### 4. Progress Dashboard
- 4 key metrics: Completed topics, Drawn topics, Bookmarked favorites, and Deck remaining.
- 10 category progress tracks (out of 100).

---

## 🎨 Design & Craft Sensibility

- **Zero Emojis :** Clean, minimalist 24x24 SVG vector icon system (*Linear / Apple / Vercel style*).
- **Dark & Light Themes :** Deep galactic obsidian and crisp porcelain themes.
- **Web Audio API Synthesizer :** Procedural sounds without external audio assets.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| <kbd>Space</kbd> or <kbd>Enter</kbd> | Draw a subject / Next card |
| <kbd>T</kbd> | Open Timers (10m / 1m) |
| <kbd>F</kbd> | Toggle Favorite |
| <kbd>M</kbd> | Mute / Unmute Sounds |
| <kbd>?</kbd> | View Shortcuts Guide |
| <kbd>Esc</kbd> | Close Modal |

---

## 🚀 Local Run

```bash
# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Build for production
npm run build
```
Live local server: [http://localhost:5173](http://localhost:5173).
