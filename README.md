# AI Side Hustle Finder

An AI-driven full-stack web application that analyzes user skills, interests, time availability, and budget to generate tailored side hustle recommendations, phased action roadmaps, and real-time conversational mentoring.

---

## Live Demo & Repository

- **Live Application:** [https://ai-side-hustle-ruby.vercel.app](https://ai-side-hustle-ruby.vercel.app)
- **GitHub Repository:** [https://github.com/Sparsh88/AI-Side-Hustle](https://github.com/Sparsh88/AI-Side-Hustle)

---

## Overview

AI Side Hustle Finder is a full-stack platform designed to help students, freelancers, and aspiring entrepreneurs discover practical income streams tailored to their specific skills and resource constraints.

Rather than presenting generic lists of business ideas, the application collects user parameters including technical and non-technical skills, personal interests, weekly time commitment, and starting budget. It leverages OpenAI GPT-4o and Google Gemini 2.5 Flash in structured JSON output mode to generate curated recommendations and step-by-step action roadmaps. An interactive conversational mentor provides real-time guidance on pricing strategies, client outreach, and marketplace profiles.

The application features a decoupled frontend and backend architecture, a modern glassmorphic interface, client-side state persistence, and intelligent fallback generators to maintain full functionality during external API rate limits.

---

## Problem Statement

- **Generic Information Overload:** Unvetted online business ideas rarely account for beginner difficulty, realistic time-to-first-earnings, or prerequisite tools.
- **Skill and Capital Mismatch:** Most online entrepreneurship guides recommend ventures requiring significant upfront capital or expertise beyond a student's profile.
- **Absence of Actionable Roadmaps:** Aspiring creators frequently know their target niche but struggle to break execution down into clear, sequential phases.
- **Lack of On-Demand Mentorship:** Beginners lack affordable access to experienced mentors for practical tactical advice regarding tool selection and client acquisition.

---

## Key Features

- **Personalized Hustle Matching:** Analyzes user skills, interests, time commitment, and budget to generate 6 custom side hustle opportunities with contextual reasoning.
- **Structured Phased Roadmaps:** Generates sequential action plans with milestone steps, recommended tools with specific purposes, and realistic time-to-income projections.
- **Interactive Milestone Tracker:** Check off completed roadmap steps with real-time percentage progress updates and client-side persistence.
- **Saved Hustles Dashboard:** Centralized dashboard to bookmark, manage, and review active projects and overall milestone completion metrics.
- **AI Mentorship Chatbot:** Multi-turn conversational copilot powered by Google Gemini for real-time guidance on rate setting, freelancing platforms, and workflow optimization.
- **Resilient Fallback Engine:** Built-in heuristic fallback system that generates structured recommendations if external AI API keys are unavailable or rate-limited.
- **Dark Glassmorphic UI:** Modern high-contrast interface with backdrop blur panels, gradient accents, and responsive typography.

---

## Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| Frontend Framework | React 18, Vite | Single-page client application with rapid hot-module replacement |
| Styling & UI | Tailwind CSS, Lucide React | Modern glassmorphic styling, responsive layout, and iconography |
| Animations | Framer Motion | Smooth route transitions, modal reveals, and animated statistic counters |
| Backend Runtime | Node.js, Express.js | REST API server for AI prompt engineering and data orchestration |
| AI / LLM Integrations | OpenAI GPT-4o, Google Gemini 2.5 Flash | Structured JSON generation for recommendations, roadmaps, and chat |
| Data Persistence | LocalStorage API | Client-side caching of user preferences, bookmarked hustles, and progress |
| Deployment | Vercel | Production cloud deployment for frontend and backend |

---

## Architecture

```text
User Browser (React 18 SPA + Framer Motion)
     │
     ├──> LocalStorage (Saved Hustles & Progress State)
     │
     └──> REST API Requests
               │
               ▼
       Express.js Server (Node.js)
         ├── Request Validation & Parameter Normalization
         ├── Fallback Generator Engine (Deterministic Mock Mode)
         └── AI Services
               ├── OpenAI GPT-4o (Structured Hustle & Roadmap JSON)
               └── Google Gemini 2.5 Flash (Conversational Mentorship API)
```

---

## Application Flow

1. **Parameter Input:** User selects skills, interests, weekly hours (e.g. 5–20 hrs), and starting budget.
2. **AI Recommendation:** The frontend sends parameters to the backend; GPT-4o generates 6 structured side hustle cards.
3. **Roadmap Generation:** User clicks a hustle to generate a multi-phase action plan with step-by-step milestones and recommended tools.
4. **Milestone Tracking:** User checks off completed steps in the roadmap; progress percentage updates in real time.
5. **Bookmark & Dashboard:** User saves preferred hustles to the central dashboard for ongoing tracking.
6. **Conversational Mentorship:** User opens the Gemini-powered AI chatbot to ask follow-up questions regarding pricing, portfolio setup, and client acquisition.

---

## Project Structure

```text
AI-Side-Hustle-Finder/
├── backend/
│   ├── server.js              # Express API endpoints (/api/hustles, /api/roadmap, /api/chat)
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/        # Hero, InputForm, HustleCard, RoadmapModal, ChatBot, Dashboard
│   │   ├── data/              # Fallback templates and default categories
│   │   ├── App.jsx            # State management and primary view switching
│   │   ├── main.jsx           # React DOM root
│   │   └── index.css          # Tailwind directives
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/Sparsh88/AI-Side-Hustle.git
cd AI-Side-Hustle
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key       # Optional: mock fallback active if omitted
GEMINI_API_KEY=your_gemini_api_key       # Optional: fallback chat active if omitted
```

Start backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Author

**Sparsh Chauhan**  
*Computer Science & Engineering Student | Full Stack Developer*

- **Portfolio:** [portfolio-flame-rho-29.vercel.app](https://portfolio-flame-rho-29.vercel.app/)
- **GitHub:** [@Sparsh88](https://github.com/Sparsh88)
- **LinkedIn:** [linkedin.com/in/sparshchauhan08](https://linkedin.com/in/sparshchauhan08)
- **Email:** [sparshchauhan050@gmail.com](mailto:sparshchauhan050@gmail.com)
