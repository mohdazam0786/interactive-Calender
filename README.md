# Wall Calendar — Interactive React Component

A polished, interactive wall calendar built with **Next.js 14 (App Router)** and **TypeScript**. Inspired by the physical wall calendar aesthetic — spiral binding, hero image panel, chevron shapes, and a clean date grid.

---

## ✨ Features

### Core
- **Wall calendar aesthetic** — spiral coil binding, full-bleed hero canvas, geometric chevron shapes, serif month typography
- **Day range selector** — click a start date, hover to preview the range highlight, click to set the end date. Handles row-wrapping correctly (rounded caps on row ends)
- **Notes section** — notes are scoped **per month** by default, or **per selected range** when a range is active. All notes persist via `localStorage`
- **Fully responsive** — desktop: side-by-side notes + grid; mobile (≤640px): stacked layout with compact hero

### Extras
- **4 color themes** (Alpine, Sunset, Forest, Dusk) — each recolors the animated hero canvas, accent color, and range highlights in real time via CSS custom properties
- **Animated hero canvas** — generative gradient landscape with subtle wave animation, redraws on theme/month change
- **Note indicators** — days with saved notes show a small dot
- **Today marker** — today's date has an accent dot underneath
- **Hover preview** — the range band renders live as you hover before confirming
- **Keyboard accessible** — day cells respond to `Enter` key; nav buttons have `aria-label`s

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens (CSS variables), base reset
│   ├── layout.tsx           # Root layout + metadata
│   └── page.tsx             # Entry page
├── components/
│   ├── WallCalendar.tsx     # Root calendar shell (hero, layout, footer)
│   ├── WallCalendar.module.css
│   ├── CalendarGrid.tsx     # Weekday headers + day cells grid
│   ├── CalendarGrid.module.css
│   ├── DayCell.tsx          # Individual day cell with all range states
│   ├── DayCell.module.css
│   ├── HeroCanvas.tsx       # Animated canvas hero using theme colors
│   ├── HeroCanvas.module.css
│   ├── NotesPanel.tsx       # Lined notes textarea with range context
│   ├── NotesPanel.module.css
│   ├── ThemeSwitcher.tsx    # Theme chip buttons
│   └── ThemeSwitcher.module.css
├── hooks/
│   └── useCalendarState.ts  # All calendar state + logic (custom hook)
└── lib/
    └── types.ts             # Types, constants, pure date helpers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Install & run

```bash
# 1. Clone the repo
git clone https://github.com/mohdazam0786/wall-calendar.git
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## 🎨 Design Decisions

| Decision | Rationale |
|---|---|
| **CSS Modules** | Scoped styles with zero runtime cost; works natively with Next.js |
| **CSS custom properties for theming** | Theme switches update a single `--accent` variable — no re-renders needed for color changes |
| **Canvas for hero** | Gives full creative control for animated backgrounds without large image assets |
| **Monday-first grid** | Matches the reference design; standard in European/Indian calendar convention |
| **`localStorage` for notes** | Pure client-side persistence — no backend needed per assessment requirements |
| **`useCalendarState` hook** | Separates all logic from presentation; easier to test and extend |
| **`rangeNumbers` as `{lo, hi}` integers** | O(1) range membership check per cell — avoids date parsing on every render |

---

## 🔧 Extending

- **Add holiday markers**: import a `holidays` map into `CalendarGrid.tsx` and pass an `isHoliday` prop to `DayCell`
- **Custom images per month**: replace `HeroCanvas` with an `<Image>` component and a month→image map
- **Date-specific notes**: change `noteKey` in `useCalendarState` to use `dateKey(clickedDay)` instead of `monthKey`
- **Swipe navigation (mobile)**: add a `touchstart`/`touchend` handler on the `.hero` element calling `prevMonth`/`nextMonth`

---

## 📦 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS Modules
- HTML5 Canvas API
- No UI library dependencies
