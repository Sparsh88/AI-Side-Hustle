# AI Side Hustle Finder

An AI-powered full-stack web application that transforms user skills, interests, time availability, and budget into personalized side hustle recommendations, phased action roadmaps, and real-time conversational mentoring.

---

## 🔗 Live Demo & Repository

- **Live Demo**: [ai-side-hustle-finder.vercel.app](https://ai-side-hustle-finder.vercel.app)
- **GitHub Repository**: [github.com/Sparsh88/AI-Side-Hustle](https://github.com/Sparsh88/AI-Side-Hustle)

---

## 📖 Overview

**AI Side Hustle Finder** is a full-stack platform designed to help students, freelancers, and aspiring entrepreneurs discover practical side income streams tailored to their specific background and constraints.

Rather than presenting generic, overwhelming lists of business ideas, the application analyzes a user's technical and non-technical skills, personal interests, weekly time commitment, and starting budget. It leverages **OpenAI GPT-4o** in structured JSON mode to generate tailored side hustle options alongside step-by-step execution roadmaps. Additionally, an embedded chat assistant powered by **Google Gemini 2.5 Flash** provides interactive guidance on pricing, client outreach, and freelancing strategies.

The project is architected with a decoupled frontend and backend, featuring a modern glassmorphic interface, client-side state persistence, and robust fallback mechanisms to ensure uninterrupted functionality.

---

## 🎯 Problem Statement

- **Generic Information Overload**: Countless unvetted business ideas exist online without clarity on entry requirements, difficulty, or realistic outcomes.
- **Skill and Capital Mismatch**: Most guides recommend high-barrier ventures that do not fit a beginner's current skillset or minimal budget constraints.
- **Absence of Actionable Roadmaps**: Aspiring creators often know their target domain but struggle to break execution down into clear, sequential milestones.
- **Lack of On-Demand Guidance**: Beginners lack immediate access to mentors for tactical questions regarding tool selection, marketplace profiles, and initial client acquisition.

---

## ✨ Key Features

### Functional Features
- **Personalized Hustle Matching**: Generates 6 custom side hustle opportunities matching user-defined skills, interests, available hours, and budget with contextual reasoning.
- **Dynamic Phased Roadmaps**: Creates structured action plans broken into sequential steps, recommended tools with specific purposes, and realistic time-to-first-earnings estimates.
- **Interactive Milestone Tracker**: Allows users to check off completed roadmap steps with real-time percentage progress updates.
- **Saved Hustles Dashboard**: Centralized dashboard to bookmark, manage, and review active projects and overall completion metrics.
- **AI Mentorship Chatbot**: Multi-turn conversational copilot powered by Google Gemini for real-time advice on rate setting, freelancing platforms, and workflow optimization.
- **Resilient Fallback Engine**: Built-in intelligent fallback system that generates dynamic mock recommendations if external AI API keys are unavailable or rate-limited.

### UI & UX Features
- **Dark Glassmorphic UI**: High-contrast modern interface with backdrop blur panels, gradient accents, and responsive typography.
- **Smooth Page Transitions & Micro-Interactions**: Fluid route animations and animated numerical statistic counters built using Framer Motion.
- **Responsive Layout**: Fully adaptive layouts optimized for desktop, tablet, and mobile viewing.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19, Vite | Component-based Single-Page Application (SPA) with fast build tooling |
| **Styling & Design** | Tailwind CSS | Utility-first styling with custom glassmorphism effects and dark palette |
| **Animations** | Framer Motion | Smooth layout animations, page transitions, and progress effects |
| **Iconography** | Lucide React | Clean, scalable vector icons across all UI components |
| **HTTP Client** | Axios | Promise-based client for REST API communication |
| **Backend Framework** | Node.js, Express.js | Modular REST API server handling request validation, routing, and CORS |
| **AI — Recommendations & Roadmaps** | OpenAI API (`gpt-4o`) | Structured JSON generation for tailored hustles and phased execution steps |
| **AI — Conversational Chatbot** | Google Generative AI (`gemini-2.5-flash`) | Multi-turn conversational assistant with structured history management |
| **State Persistence** | Web Storage (`localStorage`) | Client-side persistence for bookmarked hustles and checklist progress |
| **Deployment** | Vercel (Frontend), Render (Backend) | Static hosting for the React client and cloud hosting for the Node API |

---

## 🏗️ Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          Client (Browser)                              │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │               React 19 SPA (Vite + Tailwind CSS)               │   │
│   └───────────────┬────────────────────────────────┬───────────────┘   │
│                   │ Local Sync                     │ Axios Client      │
│                   ▼                                ▼                   │
│          localStorage Engine                HTTP Requests (JSON)       │
│        (Bookmarks & Milestones)                    │                   │
└───────────────────┼────────────────────────────────┼───────────────────┘
                    │                                │
                    │                                ▼
                    │               ┌──────────────────────────────────┐
                    │               │      Express.js Backend API      │
                    │               │       (Node.js / Render)         │
                    │               └────┬────────────────────────┬────┘
                    │                    │                        │
                    │                    ▼                        ▼
                    │          ┌───────────────────┐    ┌─────────────────┐
                    │          │   OpenAI GPT-4o   │    │  Google Gemini  │
                    │          │ (Ideas & Roadmap) │    │ (Chat Copilot)  │
                    │          └───────────────────┘    └─────────────────┘
```

---

## 🔄 Application Flow

1. **User Profile Input**: The user navigates to the Discover page and submits their skills, interests, weekly hours, and startup budget.
2. **Backend Processing**: The Express backend validates request inputs at `/api/get-hustles` and queries OpenAI GPT-4o with strict JSON schema instructions.
3. **Matching & Display**: The client receives and renders 6 personalized side hustle cards with custom match rationales.
4. **Roadmap Generation**: Clicking a hustle triggers a request to `/api/get-hustle-details`, returning a 4-step action plan, required tools, and timeline.
5. **Progress & Persistence**: The user bookmarks hustles and toggles milestone checkboxes, saving state in `localStorage` with cross-component event sync.
6. **AI Mentoring**: The user opens the floating chatbot at any point to ask contextual freelancing and execution questions via Google Gemini.

---

## 📁 Project Structure

```text
AI-Side-Hustle-Finder/
├── backend/
│   ├── services/
│   │   └── aiService.js         # OpenAI & Gemini service integration + fallback generators
│   ├── .env.example             # Environment variable template
│   ├── package.json             # Express, cors, dotenv, openai, @google/generative-ai
│   └── server.js                # Express app setup, API routes, and error handling
├── frontend/
│   ├── public/                  # Static assets and favicon
│   ├── src/
│   │   ├── components/          # Reusable UI components (HustleForm, HustleCard, Chatbot, etc.)
│   │   ├── pages/               # Views (Home, Discover, Dashboard, HustleDetail, Progress)
│   │   ├── App.jsx              # Main routing and global layout wrapper
│   │   ├── config.js            # Dynamic API base URL configuration
│   │   ├── index.css            # Tailwind CSS directives and custom utility styles
│   │   └── main.jsx             # React DOM root entry point
│   ├── package.json             # React 19, Vite, Tailwind CSS, Framer Motion
│   └── vite.config.js           # Vite bundler configuration
├── package.json                 # Root workspace scripts proxy
├── render.yaml                  # Infrastructure-as-code deployment blueprint for Render
└── README.md                    # Project documentation
```

---

## 📡 API Endpoints

### 1. Generate Hustle Matches
- **Endpoint**: `POST /api/get-hustles`
- **Payload**:
  ```json
  {
    "skills": "React, Python, Content Writing",
    "interests": "AI, Fitness, Web Design",
    "time": "5-10 hrs",
    "budget": "low"
  }
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "suggestions": [
      {
        "title": "Freelance React Specialist",
        "description": "Offer web development services to small businesses and creators.",
        "matchReason": "Directly utilizes your React skillset and fits your weekly schedule."
      }
    ]
  }
  ```

### 2. Generate Action Roadmap
- **Endpoint**: `POST /api/get-hustle-details`
- **Payload**:
  ```json
  {
    "title": "Freelance React Specialist",
    "description": "Offer web development services to small businesses and creators."
  }
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "details": {
      "steps": [
        { "title": "Portfolio Setup", "description": "Build 2 showcase projects." }
      ],
      "tools": [
        { "name": "Vercel / GitHub", "purpose": "Project hosting and version control." }
      ],
      "timeline": "2-4 weeks to first earnings"
    }
  }
  ```

### 3. Conversational AI Chat
- **Endpoint**: `POST /api/chat`
- **Payload**:
  ```json
  {
    "message": "How should I structure my pricing for beginner web design projects?",
    "history": []
  }
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "reply": "Start with competitive fixed-price milestone packages to secure your first 3 positive reviews..."
  }
  ```

### 4. Health Check
- **Endpoint**: `GET /health`
- **Response (`200 OK`)**:
  ```json
  {
    "status": "ok",
    "message": "API is healthy",
    "timestamp": "2026-08-14T17:35:00.000Z"
  }
  ```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** package manager
- **OpenAI API Key** (optional: app automatically uses fallback data if omitted)
- **Google Gemini API Key** (optional: chat falls back to built-in guidance if omitted)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Sparsh88/AI-Side-Hustle.git
cd AI-Side-Hustle
```

---

### 2. Backend Configuration & Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:
```bash
npm run dev
```
The server starts at `http://localhost:5000`.

---

### 3. Frontend Configuration & Setup
In a new terminal window:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory (optional for local development):
```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

## 👨‍💻 Author

**Sparsh Chauhan**  
*Computer Science & Engineering | Full-Stack & AI Developer*

- **GitHub**: [@Sparsh88](https://github.com/Sparsh88)
- **LinkedIn**: [Sparsh Chauhan](https://linkedin.com/in/sparshchauhan08)
- **Project Repository**: [Sparsh88/AI-Side-Hustle](https://github.com/Sparsh88/AI-Side-Hustle)
