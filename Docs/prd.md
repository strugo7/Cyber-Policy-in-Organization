# Product Requirements Document (PRD): CyberScape Academy

## 1. Introduction
**CyberScape Academy** is a fully client-side, gamified web application designed to prepare students for the "Cyber Policy in Organization" academic exam. It bridges the gap between theoretical lectures and practical application through immersive simulations and interactive study modules.

### 1.1 Purpose
To provide a comprehensive, engaging, and effective study platform that ensures students master the course material (NIST CSF 2.0, Risk Management, Compliance, Threat Landscape) and pass their final exam with distinction.

### 1.2 Target Audience
- **Primary**: Students enrolled in the "Cyber Policy in Organization" course preparing for their final exam.
- **Secondary**: Self-learners seeking structured intro-level cyber policy training.

### 1.3 Project Constraints
- **Timeline**: Complete and deploy by end of weekend.
- **Architecture**: Client-side only (no backend, no authentication).
- **Deployment**: Static site hosted on Vercel.
- **Content**: All course material, questions, and simulations hardcoded in the application.

## 2. Scope

### 2.1 Core Learning Modules (6 Modules)
The application covers all lecture materials from the course syllabus:
1. **Module 1: Cyber Foundations** - CIA Triad, Threat Landscape, Basic Concepts
2. **Module 2: Governance & Strategy** - Corporate Cyber Strategy, Risk Appetite, Policies
3. **Module 3: NIST CSF 2.0 Framework** - The Six Functions (Govern, Identify, Protect, Detect, Respond, Recover)
4. **Module 4: Risk Management** - Risk Assessment, Heatmaps, Supply Chain Security
5. **Module 5: Defense in Depth** - Access Control, Data Protection, Awareness Programs
6. **Module 6: Incident Response & Recovery** - IR Playbooks, BCP/DR, Lessons Learned

### 2.2 Interactive Simulations (2 Scenarios)
- **Ransomware Wargame**: Real-time crisis decision-making during a ransomware attack
- **Social Engineering Simulation**: Phishing detection and response scenario

### 2.3 Assessment System
- **20-Question Final Exam**: Comprehensive exam covering all modules with timer and instant grading
- **Certificate Generation**: Downloadable PDF certificate upon exam completion

## 3. Functional Requirements

### 3.1 User Experience (No Authentication Required)
- **Anonymous Access**: Students can access the platform immediately without creating accounts
- **Agent Identity**: Optional username entry for certificate personalization (stored locally)
- **Progress Tracking**: Browser localStorage persists progress across sessions
- **Rank System**: Dynamic rank progression (Analyst → Specialist → Expert → CISO) based on module completion and exam score

### 3.2 Immersive Dashboard (The Command Center)
- **3D Isometric Interface**: Visual "Cyber City" map with clickable sectors representing modules
- **Module Sectors**:
  - AI Regulation Zone (Module 1)
  - NIST Citadel (Module 3)
  - Threat Zone (Module 1)
  - Risk Assessment Hub (Module 4)
  - Defense Grid (Module 5)
  - Response War Room (Module 6)
- **Progress Visualization**:
  - Overall completion percentage
  - XP counter
  - Current rank badge
  - Module completion indicators (locked/unlocked/completed)
- **Quick Actions**:
  - "Resume Mission" button (jumps to last incomplete module)
  - "Launch Exam" button (unlocked after all modules completed)
- **System Stats**: Faux metrics for immersion (Encryption Status: Active, Latency: 12ms, Threats Neutralized: X)

### 3.3 Learning Modules (The Knowledge Core)
Each module contains:
- **Theory Sections**:
  - Concise Hebrew summaries extracted from lecture PDFs
  - Key concepts highlighted
  - Visual hierarchy with headings and bullet points
- **Interactive Diagrams**:
  - Clickable SVG elements (CIA Triad, NIST Cycle, Defense Layers)
  - Hover states reveal definitions
  - "Decrypt" buttons expand advanced details
- **Navigation**:
  - Linear Next/Previous flow
  - Progress bar showing lesson X of Y
  - Breadcrumb navigation
- **Module Completion**:
  - Automatic unlock of next module upon completion
  - XP reward notification
  - Progress saved to localStorage

### 3.4 Simulations (The War Room)

#### 3.4.1 Ransomware Wargame
- **Scenario**: Company CRM system encrypted by ransomware
- **Mechanics**:
  - Real-time countdown timer (5 minutes)
  - Decision tree with branching paths:
    - Disconnect network → Assess damage → Restore from backup / Contact authorities
    - Pay ransom → Money lost + No guarantee / Reputation damage
    - Ignore threat → Data leaked / Systems destroyed
  - Each decision shows immediate consequences
  - Terminal-style logs display "threat intel"
- **Outcomes**:
  - Success: Best practices followed (isolate, report, restore)
  - Partial: Some mistakes made but recovered
  - Failure: Critical errors (paid ransom, delayed response)
- **Feedback**: Post-scenario debrief explaining why each decision succeeded/failed based on course theory

#### 3.4.2 Social Engineering Simulation
- **Scenario**: Series of phishing attempts and social engineering attacks
- **Mechanics**:
  - Interactive email inbox with suspicious messages
  - Phone call transcripts with manipulation tactics
  - Decision points: Report / Ignore / Engage / Verify
  - Red flags highlighted after each choice
- **Outcomes**:
  - Success: Identified all threats and followed protocol
  - Partial: Missed some red flags
  - Failure: Fell for phishing or leaked credentials
- **Feedback**: Educational overlay explaining social engineering techniques (pretexting, urgency, authority)

#### 3.4.3 Simulation Visuals
- **Glitch Effects**: CSS animations for "system breach" moments
- **Terminal Logs**: Monospace font with scrolling text
- **Red Alert UI**: Pulsing borders, warning icons, countdown timers
- **Sound Effects**: Optional (button clicks, alert beeps)

### 3.5 Assessment & Certification

#### 3.5.1 Final Exam Mode
- **Structure**:
  - 20 multiple-choice questions
  - Randomized from question bank (25-30 questions total)
  - Covers all 6 modules proportionally
  - Time limit: 30 minutes
- **Interface**:
  - Full-screen exam mode
  - Question counter (X of 20)
  - Timer with visual warning at 5 minutes remaining
  - Flag/bookmark questions for review
  - Submit with confirmation dialog
- **Scoring**:
  - Instant grading upon submission
  - Pass threshold: 70% (14/20 correct)
  - Detailed results screen showing correct/incorrect answers
  - Explanation for each question (why answer is correct/incorrect)

#### 3.5.2 Certificate Generation
- **Trigger**: Automatic upon passing exam (≥70%)
- **Content**:
  - "CyberScape Academy - Cyber Policy Specialist Certificate"
  - Student name (from localStorage or "Anonymous Agent")
  - Completion date
  - Final score percentage
  - Course topics covered (NIST CSF 2.0, Risk Management, IR, etc.)
  - Signature line: "Academy Director"
  - Unique certificate ID (timestamp-based)
- **Format**: Downloadable PDF generated client-side (jsPDF library)
- **Design**: Cyberpunk-themed with neon borders and Academy logo

## 4. Non-Functional Requirements

### 4.1 Performance
- **Initial Load**: Under 2 seconds for dashboard
- **Navigation**: Instant client-side routing (Next.js App Router)
- **Animations**: Smooth 60fps for transitions and effects
- **Optimization**: Code splitting per route, lazy loading images

### 4.2 Language & Localization
- **Primary Language**: Hebrew (עברית)
- **RTL Support**: Full right-to-left layout throughout application
- **Font**: "Heebo" or "Public Sans" for Hebrew readability
- **Mixed Content**: Technical terms in English where appropriate (NIST, CIA Triad, etc.)

### 4.3 Responsiveness
- **Primary Target**: Desktop (1920x1080, 1440x900)
- **Secondary**: Tablet (1024x768 landscape)
- **Mobile**: Limited support - text/quiz content only, no 3D dashboard

### 4.4 Browser Compatibility
- **Supported**: Chrome/Edge 100+, Firefox 100+, Safari 15+
- **localStorage Required**: App will display warning if localStorage is disabled

### 4.5 Aesthetics & Design System
- **Theme**: Cyberpunk / High-Tech Command Center
- **Color Palette**:
  - Primary: Cyan (#3dd6f5)
  - Secondary: Purple (#7f13ec)
  - Danger: Red (#f20d0d)
  - Background: Deep Navy (#0a1618) / Black (#0a0a0a)
  - Surface: Glassmorphism panels (rgba with backdrop blur)
- **Typography**:
  - Display: "Space Grotesk" or "Inter"
  - Body: "Heebo" (Hebrew)
  - Code/Terminal: "Fira Code" or monospace
- **Effects**:
  - Glassmorphism cards with backdrop blur
  - Neon glow on interactive elements
  - Scanline overlays for terminal screens
  - Isometric 3D transforms for dashboard
  - Glitch animations for alerts
- **Dark Mode**: Default and only theme

### 4.6 Accessibility
- **Keyboard Navigation**: Tab/Enter support for all interactive elements
- **Focus States**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant for text
- **Screen Readers**: Basic ARIA labels (not priority for weekend scope)

## 5. Content Requirements

### 5.1 Learning Content
- **Source Material**: 11 lecture PDFs in Hebrew (מצגת שיעור 1-11) + NIST CSF 2.0 + CIS Controls
- **Extraction**: Key concepts, definitions, frameworks summarized into module lessons
- **Structure**: ~4-6 lessons per module, each 3-5 minutes reading time
- **Visuals**: Interactive diagrams for CIA Triad, NIST Functions, Risk Matrix, Defense Layers

### 5.2 Question Bank
- **Total Questions**: 25-30 questions
- **Exam Selection**: 20 questions randomly selected per exam attempt
- **Distribution**:
  - Module 1 (Foundations): 4-5 questions
  - Module 2 (Governance): 3-4 questions
  - Module 3 (NIST): 5-6 questions
  - Module 4 (Risk): 3-4 questions
  - Module 5 (Defense): 3-4 questions
  - Module 6 (IR/Recovery): 3-4 questions
- **Format**: Multiple choice (4 options, 1 correct)
- **Difficulty**: Mix of recall, comprehension, and application questions
- **Content**: Based directly on lecture material and Hebrew PDFs

### 5.3 Simulation Content
- **Ransomware**: 5-7 decision points, 3 possible endings
- **Social Engineering**: 4-6 scenarios, scoring based on red flags identified

## 6. Technical Constraints

### 6.1 Development Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF
- **Deployment**: Vercel (static export)

### 6.2 Data Persistence
- **No Backend**: All logic runs client-side
- **localStorage**: Stores progress, scores, preferences
- **No User Accounts**: Anonymous usage
- **Data Structure**:
```json
{
  "agentName": "string",
  "currentRank": "Analyst|Specialist|Expert|CISO",
  "totalXP": 0,
  "modulesCompleted": ["module1", "module3"],
  "examScore": null,
  "examAttempts": 0,
  "lastActive": "timestamp"
}
```

### 6.3 Static Export
- **Build Command**: `npm run build` → static HTML/CSS/JS
- **No Server-Side Features**: No API routes, no SSR for dynamic content
- **All Content**: Bundled at build time

## 7. Success Metrics

Since this is a static site with no analytics backend, success is measured by:
- **Completion Rate**: Student completes all 6 modules and attempts exam
- **User Engagement**: Average time spent (tracked client-side, shown in UI)
- **Exam Performance**: Students achieve ≥70% pass rate (self-reported)
- **Visual Polish**: Matches HTML prototype quality
- **Deployment**: Successfully deployed to Vercel by Sunday evening

## 8. Out of Scope (Not Required for Weekend Launch)

- ❌ User authentication/accounts
- ❌ Backend database
- ❌ Leaderboards/social features
- ❌ Admin panel for content updates
- ❌ Mobile optimization beyond basic responsiveness
- ❌ Multiplayer simulations
- ❌ Video content
- ❌ Email notifications
- ❌ Analytics/tracking
- ❌ Multi-language support (Hebrew only)

## 9. Launch Checklist

- [ ] All 6 modules built with content from PDFs
- [ ] 2 simulations (Ransomware + Social Engineering) functional
- [ ] 20-question exam with timer working
- [ ] Certificate generation and download
- [ ] Progress tracking via localStorage
- [ ] Hebrew RTL layout verified
- [ ] Desktop responsive design tested
- [ ] All interactive diagrams functional
- [ ] Deployed to Vercel with custom domain (optional)
- [ ] README with student instructions

---

**Document Version**: 2.0 (Weekend Sprint Edition)
**Last Updated**: 2026-02-11
**Timeline**: 48-hour weekend build
**Status**: Ready for Development
