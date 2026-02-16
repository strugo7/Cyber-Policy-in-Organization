# CyberScape Academy

## Project Overview
CyberScape Academy is an interactive, gamified learning platform for organizational cyber policy. It covers NIST CSF 2.0, Israeli Defense Doctrine, and global cyber regulations.

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Static Export (`output: 'export'`)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build
To create a production build:
```bash
npm run build
```
This will generate a static site in the `out/` directory.

## Deployment (Vercel)
1.  Import project from GitHub.
2.  Framework Preset: **Next.js**.
3.  **Root Directory**: `./` (default).
4.  **Build Command**: `next build` (default).
5.  **Output Directory**: `out` (Since `output: 'export'` is set in `next.config.mjs`).
