# Taskboard — 3D Kanban Task Manager

A modern, visually rich task management app built with Next.js 16, React 19, and Three.js. Features a fully interactive kanban board with 3D animated backgrounds, drag-and-drop task management, live search, and a settings panel.

---

## Features

- **Kanban board** — three columns (To do, In progress, Done) with drag-and-drop reordering across columns
- **3D animated background** — WebGL blobs that follow your mouse cursor (and touch on mobile)
- **Live search** — instant task filtering by title, description, or project via the header search icon
- **Add tasks** — create tasks with a title, description, and project via a modal
- **Settings page** — profile editing, light/dark theme toggle, notification toggles, and data management
- **Persistent state** — tasks and theme are saved to `localStorage`
- **Light & dark mode** — toggle from the sidebar or the settings page
- **Fully mobile responsive** — collapsible sidebar, horizontal board scroll, touch-friendly throughout

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) + [Tailwind CSS v4](https://tailwindcss.com) |
| 3D / WebGL | [Three.js](https://threejs.org) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://drei.pmnd.rs) |
| Animations | [Framer Motion](https://www.framer.com/motion) |
| Drag & Drop | [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | [Outfit](https://fonts.google.com/specimen/Outfit) via `next/font` |

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Main board page
│   ├── settings/
│   │   └── page.tsx        # Settings page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Board.tsx            # Kanban columns + task cards
│   ├── Sidebar.tsx          # Collapsible nav sidebar
│   ├── Header.tsx           # Top bar with search trigger
│   ├── SearchModal.tsx      # Live search overlay
│   ├── AddTaskModal.tsx     # New task form modal
│   ├── GhostBackground.tsx  # Mouse-following 3D blobs
│   ├── Background3D.tsx     # Floating sphere background
│   ├── TaskCube.tsx         # 3D progress cube widget
│   └── TaskProgress3D.tsx   # 3D progress orb widget
├── context/
│   └── TaskContext.tsx      # Global state (tasks, theme)
└── types/
    └── index.ts             # Task, Project, TaskStatus types
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
