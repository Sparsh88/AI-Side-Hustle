# AI Side Hustle Finder

An AI-powered full-stack web application that helps users discover personalized side hustle opportunities, generate step-by-step execution roadmaps, track milestone progress, and consult an interactive AI assistant.

---

## Overview

**AI Side Hustle Finder** is a web application designed to help students, freelancers, and aspiring entrepreneurs identify viable side income streams based on their individual skills, interests, available weekly hours, and startup budget.

Instead of browsing through generic lists of ideas online, users receive tailored recommendations powered by Large Language Models (LLMs), complete with realistic learning curves, required software and tools, estimated timelines to first earnings, and an interactive checklist to track execution.

---

## Problem Statement

Finding the right side hustle is often challenging due to:
* **Information Overload**: Thousands of generic ideas exist online without context regarding feasibility or prerequisites.
* **Skill Mismatch**: Many suggested hustles require skills or upfront capital that the user does not possess.
* **Lack of Actionable Roadmaps**: Users often know *what* they want to do but lack structured, milestone-driven steps on *how* to start.
* **Guidance Gaps**: Beginners frequently encounter roadblocks early on without access to immediate mentorship or guidance.

---

## Solution

This project provides an end-to-end full-stack solution:
1. **Targeted Assessment**: Users submit their specific skills, interests, time availability, and budget constraints.
2. **Structured AI Generation**: An Express.js backend queries LLM APIs (OpenAI GPT-4o) using strict JSON response schemas to deliver structured recommendations and detailed execution roadmaps.
3. **Execution & Progress Tracking**: Users can bookmark opportunities, track completed action steps with persistent progress indicators, and view overall statistics on a central dashboard.
4. **Interactive Assistant**: An embedded floating chatbot powered by Google Gemini provides real-time guidance and answers questions regarding hustle execution.

---

## Features

### Functional Features
* **Personalized Hustle Matching**: Generates 6 custom side hustle ideas with clear explanations of why each fits the user's profile.
* **Actionable Step-by-Step Roadmaps**: Breaks down each opportunity into sequential execution phases, necessary tools, and timeline estimates.
* **Interactive Milestone Tracking**: Users can mark roadmap tasks as completed, dynamically updating progress bars and completion percentages.
* **Dashboard & Bookmarking**: Save side hustles locally to manage active roadmaps and monitor overall progress across sessions.
* **AI Chatbot Assistant**: Multi-turn conversational assistant capable of answering questions, suggesting tools, and helping overcome roadblocks.
* **Offline / Quota Fallback System**: If third-party AI APIs hit rate limits or credentials are not supplied, the application automatically falls back to built-in structured mock data to maintain full UI functionality without crashing.

### UI & UX Features
* **Modern Dark Theme & Glassmorphism**: Clean visual hierarchy utilizing backdrop blurs, glow effects, and modern typography.
* **Micro-Animations**: Smooth page transitions, hover states, and dynamic elements powered by Framer Motion.
* **Interactive Statistics Counter**: Animated number counters showcasing key platform metrics and user dashboard stats.
* **FAQ Accordion**: Interactive questions and answers section explaining platform usage and AI behavior.

---

## Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 | Component-based user interface |
| **Build Tool** | Vite | Fast local development server and optimized production bundler |
| **Routing** | React Router v7 | Client-side page routing and deep linking |
| **Styling** | Tailwind CSS | Utility-first responsive styling and design system |
| **Animations** | Framer Motion | Page transitions, modal animations, and micro-interactions |
| **Icons** | Lucide React | Clean, consistent SVG icon set |
| **HTTP Client** | Axios | REST API communication with the backend |
| **Backend Runtime** | Node.js (ESM) | JavaScript runtime environment |
| **Backend Framework** | Express.js | RESTful API server and request routing |
| **AI Services** | OpenAI API (GPT-4o) | Structured recommendation engine and roadmap generator |
| **AI Assistant** | Google Gemini API | Conversational chat assistant |
| **State & Storage** | Browser `localStorage` | Client-side persistence for saved hustles and checklist progress |
| **Deployment** | Vercel & Render | Frontend hosting (Vercel) and Backend API hosting (Render) |

---

## System Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   Client Browser                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │               React 19 Frontend                  │  │
│  │   (Vite + Tailwind CSS + Framer Motion)          │  │
│  └────────┬────────────────────────────────┬────────┘  │
│           │ Local State                    │           │
│           ▼                                ▼           │
│     localStorage                      Axios HTTP       │
│  (Saved Hustles & Progress)                │           │
└────────────────────────────────────────────┼───────────┘
                                             │ REST API (JSON)
                                             ▼
                        ┌───────────────────────────────┐
                        │      Express.js Backend       │
                        │    (Node.js / 0.0.0.0:5000)   │
                        └───────┬───────────────┬───────┘
                                │               │
                ┌───────────────┘               └───────────────┐
                ▼                                               ▼
    ┌──────────────────────┐                        ┌──────────────────────┐
    │    OpenAI GPT-4o     │                        │  Google Gemini 2.5   │
    │   (Recommendations   │                        │        Flash         │
    │    & Action Plans)   │                        │    (Chatbot Service) │
    └──────────┬───────────┘                        └──────────┬───────────┘
               │ (Fallback on error/limit)                     │ (Fallback on error)
               ▼                                               ▼
    ┌──────────────────────┐                        ┌──────────────────────┐
    │ Structured Fallback  │                        │ Built-in Fallback    │
    │ Mock Recommendations │                        │ Guidance Response    │
    └──────────────────────┘                        └──────────────────────┘
```

---

## Application Flow

1. **User Input**: The user navigates to the **Discover** page and fills in their skills, interests, available weekly time, and budget.
2. **Backend Processing**: The frontend sends a `POST /api/get-hustles` request to the Express backend.
3. **AI Generation**: The backend prompts OpenAI GPT-4o with strict JSON formatting instructions.
4. **Displaying Matches**: The frontend receives and renders matched hustle cards showing titles, summaries, and personalized match reasons.
5. **Roadmap Generation**: When a user clicks a hustle card, `POST /api/get-hustle-details` generates a multi-step execution plan with required tools and time estimates.
6. **Progress Tracking**: Users can save the hustle to their **Dashboard** and toggle completion checkboxes on the roadmap. State is automatically saved to `localStorage` and reflected on the **Progress** page.
7. **Conversational Support**: At any point, the user can open the floating **Chatbot** to ask specific questions via `POST /api/chat`.

---

## Project Structure

```text
AI-Side-Hustle/
├── frontend/                     # Client-side React application
│   ├── public/                   # Static assets (favicons, icons)
│   ├── src/
│   │   ├── assets/               # Local images and graphic assets
│   │   ├── components/           # Reusable UI components
│   │   │   ├── AnimatedCounter.jsx # Number animation component
│   │   │   ├── Chatbot.jsx       # Floating Gemini chatbot assistant
│   │   │   ├── Footer.jsx        # App footer
│   │   │   ├── HustleCard.jsx    # Recommendation card component
│   │   │   ├── HustleForm.jsx    # Input form for user profile
│   │   │   ├── Loader.jsx        # Loading spinner animation
│   │   │   └── Navbar.jsx        # Responsive navigation bar
│   │   ├── pages/                # Route view components
│   │   │   ├── Dashboard.jsx     # Saved hustles and overall metrics
│   │   │   ├── Discover.jsx      # Form input and recommendations view
│   │   │   ├── Home.jsx          # Landing page with hero & FAQ
│   │   │   ├── HustleDetail.jsx  # Detailed roadmap and milestone checklist
│   │   │   └── Progress.jsx      # Active roadmaps tracking view
│   │   ├── App.css               # Global component utility styles
│   │   ├── App.jsx               # Application routes and main layout
│   │   ├── config.js             # Environment-aware API base URL config
│   │   ├── index.css             # Tailwind base styles and theme tokens
│   │   └── main.jsx              # React application entry point
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies and scripts
│   ├── postcss.config.js         # PostCSS configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   └── vite.config.js            # Vite bundler configuration
├── backend/                      # Server-side Express application
│   ├── services/
│   │   └── aiService.js          # OpenAI and Google Gemini API integrations
│   ├── package.json              # Backend dependencies and scripts
│   └── server.js                 # Express server, middleware, routes, and health checks
├── package.json                  # Root monorepo proxy scripts
├── render.yaml                   # Render Blueprint deployment configuration
├── .gitignore                    # Git ignore file for secrets and dependencies
└── README.md                     # Project documentation
```

---

## Installation & Setup

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher
* **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Sparsh88/AI-Side-Hustle.git
cd AI-Side-Hustle
```

---

### 2. Backend Setup
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
# Start in development mode (with nodemon):
npm run dev

# Or start in standard mode:
npm start
```
The backend will run on `http://localhost:5000`.

---

### 3. Frontend Setup
Open a second terminal, navigate to the `frontend` directory, and install dependencies:
```bash
cd frontend
npm install
```

(Optional) Create a `.env.local` file in `frontend/` to configure the API base URL:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

### 4. Running via Monorepo Root (Optional)
You can also run commands directly from the workspace root:
```bash
# Start backend via root proxy:
npm start

# Run backend in development mode:
npm run backend:dev

# Run frontend in development mode:
npm run frontend:dev
```

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `PORT` | Port on which the Express server listens | `5000` | No |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o recommendations | None | No *(Falls back to mock data if absent)* |
| `GEMINI_API_KEY` | Google Gemini API key for chatbot assistant | None | No *(Falls back to offline reply if absent)* |
| `FRONTEND_URL` | Allowed origin for CORS configuration | `*` | No |

### Frontend (`frontend/.env` or `frontend/.env.local`)
| Variable | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Target URL of the backend API | `http://localhost:5000` | No |

---

## API Documentation

All API endpoints exchange data using JSON payloads and include CORS and error handling.

| Method | Endpoint | Purpose | Authentication |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Service status indicator | None |
| `GET` | `/health` | Uptime and health check probe | None |
| `GET` | `/api/health` | API health check endpoint | None |
| `POST` | `/api/get-hustles` | Generates personalized side hustle ideas | None |
| `POST` | `/api/get-hustle-details` | Generates step-by-step roadmap, tools, and timeline | None |
| `POST` | `/api/chat` | Handles conversational AI chatbot messages | None |

### Request & Response Examples

#### 1. Generate Hustles
**Endpoint:** `POST /api/get-hustles`

**Request Body:**
```json
{
  "skills": "JavaScript, React, UI Design",
  "interests": "Web Development, Open Source",
  "time": "5-10 hrs",
  "budget": "low"
}
```

**Response (200 OK):**
```json
{
  "suggestions": [
    {
      "title": "Freelance React Component Developer",
      "description": "Build reusable UI components and templates for developers and small businesses on freelance marketplaces.",
      "matchReason": "Directly leverages your React and UI Design skills within a 5-10 hour weekly window."
    }
  ]
}
```

#### 2. Get Hustle Roadmap Details
**Endpoint:** `POST /api/get-hustle-details`

**Request Body:**
```json
{
  "title": "Freelance React Component Developer",
  "description": "Build reusable UI components and templates for developers and small businesses on freelance marketplaces."
}
```

**Response (200 OK):**
```json
{
  "details": {
    "steps": [
      {
        "title": "Build a Component Portfolio",
        "description": "Create 5 polished UI component sets using React and Tailwind CSS and host them on GitHub/Vercel."
      },
      {
        "title": "Publish on Marketplaces",
        "description": "Set up profiles on platforms like Upwork or Gumroad to sell your component kits."
      }
    ],
    "tools": [
      {
        "name": "Storybook / GitHub",
        "purpose": "Showcasing component demos and hosting source code"
      }
    ],
    "timeline": "2-4 weeks to first earnings"
  }
}
```

#### 3. AI Chatbot
**Endpoint:** `POST /api/chat`

**Request Body:**
```json
{
  "message": "How do I price my freelance services?",
  "history": []
}
```

**Response (200 OK):**
```json
{
  "reply": "Start by calculating your desired hourly rate based on market averages, or offer fixed-price milestone packages for clear deliverables."
}
```

---

## Database & Data Persistence

* **Current Architecture**: The backend is completely **stateless**, meaning it handles API requests and AI queries on-demand without maintaining server-side user tables.
* **Client-Side Persistence**: Saved hustles, completed roadmap milestones, and progress percentages are stored directly in browser **`localStorage`** (`savedHustles`, `progress_<id>`, `totalSteps_<id>`).
* **Cross-Component Sync**: State updates trigger custom `window.dispatchEvent(new Event('storage'))` events, keeping the Dashboard, Progress view, and Detail pages synchronized in real time.

---

## Deployment

The application is deployed live on cloud platforms:

* **Live Frontend (Vercel)**: [https://ai-side-hustle-ruby.vercel.app/](https://ai-side-hustle-ruby.vercel.app/)
* **Live Backend API (Render)**: [https://ai-side-hustle-k2ge.onrender.com](https://ai-side-hustle-k2ge.onrender.com)
* **Backend Health Check**: [https://ai-side-hustle-k2ge.onrender.com/health](https://ai-side-hustle-k2ge.onrender.com/health)

---

## Key Implementation Details

1. **Structured JSON Output from LLMs**: Configured OpenAI chat completions with `response_format: { type: 'json_object' }` to prevent unpredictable output formats and guarantee valid JSON parsing on the frontend.
2. **Strict Conversational History for Gemini**: The chat service formats incoming message arrays into alternating `user` and `model` roles with parts arrays to comply with Google Gemini API requirements.
3. **Resilient Error & Rate-Limit Handling**: If API keys are missing or third-party quota limits (HTTP 429) are encountered, the backend automatically logs the diagnostic message and serves structured fallback mock data.
4. **Cloud Deployment Hardening**: Configured explicit `0.0.0.0` host binding, automated Render blueprint (`render.yaml`), health check probe endpoints (`/health`), and global unhandled rejection process handlers.

---

## Challenges and Learnings

* **Managing Third-Party AI Quotas and Fallbacks**: Learned how to design graceful fallback strategies so that API outages or quota limits do not crash the user experience.
* **Prompt Engineering for Structured Data**: Developed prompts that reliably return strict JSON objects with typed arrays for roadmaps, tools, and match rationale.
* **State Synchronization Without a Central Database**: Implemented client-side storage patterns with custom window storage events to maintain consistent UI state across multiple page views.
* **Full-Stack Monorepo Deployment**: Resolved cloud hosting nuances on Render and Vercel, including build command paths, environment variable propagation, and CORS preflight handling.

---

## Known Limitations

* **Client-Bound Storage**: Saved hustles and progress are stored in the user's browser `localStorage`, meaning data does not sync across different devices or browsers.
* **API Rate Dependency**: Live AI recommendations require active API quotas with OpenAI and Google Gemini; during rate limits, the app serves fallback data.

---

## Future Improvements

* **User Authentication**: Add user sign-up/login (e.g., JWT or OAuth) to support multi-device account access.
* **Cloud Database Integration**: Connect PostgreSQL or MongoDB to store user profiles, custom roadmap notes, and saved hustles in the cloud.
* **Roadmap PDF Export**: Allow users to download their action plans as formatted PDF or Markdown checklists.
* **Calendar Integration**: Export estimated weekly milestones to Google Calendar or Notion for scheduling.

---

## Author

**Sparsh Chauhan**  
*Computer Science and Engineering Student & Full Stack Web Developer*

* **GitHub**: [@Sparsh88](https://github.com/Sparsh88)
* **LinkedIn**: [Sparsh Chauhan](https://linkedin.com/in/sparshchauhan08)
