# 🔥 Personal Coding Tracker — Competitive Programming Stats Dashboard

> *"Jo darr gaya, samjho mar gaya. Yahan sirf woh jeeta hai, jo roz apni seema todhta hai."*

A cinematic, **Cybertronian-themed** personal dashboard that scrapes and aggregates my competitive programming stats across **6 major platforms** in real-time. Built from scratch as a full-stack MERN application with a dark, fiery UI inspired by sci-fi HUDs.

---

## ✨ Features

- **🏆 Multi-Platform Stats** — Live data from LeetCode, Codeforces, CodeChef, GeeksforGeeks, HackerRank, and AtCoder
- **📊 Platform Dashboards** — Dedicated pages per platform with rank-synchronized visualizations, rating graphs, and activity heatmaps
- **📅 Contest Tracker** — Upcoming contest aggregator across all platforms with direct links
- **🎮 Cinematic UI** — Fiery canvas animations, glassmorphism panels, orbital avatar rings, and micro-animations
- **🃏 Dev Card** — Shareable profile card with aggregated stats
- **🔄 Sync Terminal** — One-click data refresh with a retro terminal animation
- **📱 Responsive Design** — Full mobile support with bottom navigation
- **⚡ Power Level Bar** — Aggregated skill rating visualization across platforms
- **🎯 GFG 160 Tracker** — Progress tracker for the GeeksforGeeks 160 challenge

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| **UI Components** | Radix UI, shadcn/ui, Recharts, Three.js |
| **Backend** | Node.js, Express 5, TypeScript |
| **Data** | Custom API scrapers with node-cache, Axios |
| **Routing** | React Router v6 |
| **State** | TanStack React Query |

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1. Clone the repository
```bash
git clone https://github.com/Dhruv4848l/Personal-Coding-Tracker.git
cd Personal-Coding-Tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `backend/.env` file:
```env
PORT=5000
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
In the project root, install dependencies:
```bash
npm install
```
Create a `.env.local` file in the root:
```env
VITE_BACKEND_URL=http://localhost:5000
```
Start the frontend dev server:
```bash
npm run dev
```

### 4. Run Both Together
From the project root:
```bash
npm start
```
This uses `concurrently` to launch both frontend and backend simultaneously.

---

## 📁 Project Structure

```
Personal-Coding-Tracker/
├── backend/
│   ├── routes/          # Platform-specific API scrapers
│   │   ├── leetcode.ts
│   │   ├── codeforces.ts
│   │   ├── codechef.ts
│   │   ├── gfg.ts
│   │   ├── atcoder.ts
│   │   ├── contests.ts
│   │   ├── codolio.ts
│   │   └── powerlevel.ts
│   ├── lib/cache.ts     # Server-side caching layer
│   └── server.ts        # Express server entry point
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── PlatformStats.tsx
│   │   ├── ContestTracker.tsx
│   │   ├── SyncTerminal.tsx
│   │   ├── FireCanvas.tsx
│   │   ├── DevCard.tsx
│   │   ├── PowerLevelBar.tsx
│   │   └── ...
│   ├── hooks/           # Custom React hooks for data fetching
│   ├── pages/           # Route-level page components
│   │   ├── CoverPage.tsx
│   │   ├── Dashboard.tsx
│   │   └── platforms/   # Per-platform detail pages
│   └── data/            # Static data (GFG 160 problems list)
├── public/              # Static assets (favicon, profile image)
├── index.html           # App entry point
├── vite.config.ts       # Vite configuration
└── tailwind.config.ts   # Tailwind CSS theme config
```

---

## 🎨 Design Philosophy

The UI follows a **"Cybertronian Forge"** aesthetic:
- Dark backgrounds with deep purples and crimson accents
- Animated fire canvas as the ambient background
- Floating panels with subtle transparency — no heavy glassmorphism blocking the backdrop
- Orbital ring animations around the profile avatar
- Terminal-style sync interface with typewriter effects
- Consistent free-floating design across all platform pages

---

## 📜 License

This project is for personal use. All rights reserved.

---

## 👤 Author

**Dhruv Maji**

- GitHub: [@Dhruv4848l](https://github.com/Dhruv4848l)
- LinkedIn: [mr-dhruv-maji](https://www.linkedin.com/in/mr-dhruv-maji/)
- Twitter: [@DhruvMaji](https://x.com/DhruvMaji)

---

> *"Har contest ek yudh hai. Har problem ek dushman. Main tab tak nahi rukta — jab tak jeet nahi jaata."*
