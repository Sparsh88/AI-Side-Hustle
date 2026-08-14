# AI Side Hustle Finder

> An AI-powered full-stack web application that generates personalized side hustle recommendations, execution roadmaps, milestone tracking, and an interactive AI chatbot assistant.

---

## 📌 Overview

Finding a viable, personalized side income opportunity can be difficult due to generic advice and decision fatigue. **AI Side Hustle Finder** addresses this problem by analyzing a user's unique technical and non-technical skills, personal interests, weekly time availability, and startup budget to generate tailored side hustle recommendations.

The application generates detailed step-by-step execution roadmaps with required tools and realistic timeline estimates, provides an interactive floating AI chatbot assistant for guidance, and persists user progress and saved opportunities locally.

---

## ✨ Features

* **Personalized AI Hustle Discovery**: Evaluates user inputs (skills, interests, weekly hours, startup budget) and generates tailored hustle suggestions with match explanations.
* **Step-by-Step Action Roadmaps**: Generates custom execution plans for each hustle, outlining milestones, required tooling, and time-to-first-dollar estimates.
* **Interactive Roadmap Progress Tracking**: Allows users to check off completed milestones with visual progress bars and dynamic percentage indicators.
* **Hustle Bookmarking & Dashboard**: Save favorite side hustles to a dedicated dashboard for quick access and tracking across sessions.
* **Interactive AI Assistant**: Embedded multi-turn chatbot powered by Google Gemini to answer questions, guide execution, and resolve roadblocks.
* **Resilient Offline / Mock Fallbacks**: Graceful fallback mechanisms ensure recommendations, roadmaps, and chat remain functional even during third-party API rate limits or missing credentials.
* **Modern Animated User Interface**: Glassmorphism aesthetic with dark theme, dynamic glow gradients, interactive hover micro-animations, and animated statistics counters.

---

## 🛠️ Tech Stack

### Frontend
* React
* React Router
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React
* Axios
* Browser localStorage

### Backend
* Node.js
* Express.js
* CORS
* Dotenv

### AI Integrations
* OpenAI GPT-4o (Recommendation Engine & Roadmap Generator)
* Google Gemini (Conversational Chat Assistant)

### Deployment & Tooling
* Vercel (Frontend Hosting)
* Render (Backend API Hosting)
* Git & GitHub (Version Control)

---

## 🏗️ Project Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   User Browser                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │               React 19 Frontend                  │  │
│  │   (Vite + Tailwind CSS + Framer Motion)          │  │
│  └────────┬────────────────────────────────┬────────┘  │
│           │ Local State / Storage          │           │
│           ▼                                ▼           │
│     localStorage                      Axios HTTP       │
│  (Saved Hustles & Progress)                │           │
└────────────────────────────────────────────┼───────────┘
                                             │ REST API
                                             ▼
                        ┌───────────────────────────────┐
                        │      Express.js Backend       │
                        │    (Node.js / 0.0.0.0:5000)   │
                        └───────┬───────────────┬───────┘
                                │               │
                ┌───────────────┘               └───────────────┐
                ▼                                               ▼
    ┌──────────────────────┐                        ┌──────────────────────┐
    │    OpenAI GPT-4o     │                        │  Google Gemini Flash │
    │   (Recommendations   │                        │   (Chatbot Service   │
    │    & Action Plans)   │                        │    & Conversational) │
    └──────────┬───────────┘                        └──────────┬───────────┘
               │ (Fallback)                                    │ (Fallback)
               ▼                                               ▼
    ┌──────────────────────┐                        ┌──────────────────────┐
    │ Structured Fallback  │                        │ Offline Chatbot      │
    │ Mock Recommendations │                        │ Guidance Response    │
    └──────────────────────┘                        └──────────────────────┘
```

---

## 📂 Project Structure

```text
AI-Side-Hustle/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AnimatedCounter.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HustleCard.jsx
│   │   │   ├── HustleForm.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Discover.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── HustleDetail.jsx
│   │   │   └── Progress.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── config.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── services/
│   │   └── aiService.js
│   ├── package.json
│   └── server.js
├── package.json
├── render.yaml
├── .gitignore
└── README.md
```

---

## 🔌 API Reference

All backend API routes return JSON responses and include CORS and error handling.

| Method | Endpoint | Purpose | Authentication |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Service status indicator | None |
| `GET` | `/health` | Health check probe for deployment monitoring | None |
| `GET` | `/api/health` | API health check endpoint | None |
| `POST` | `/api/get-hustles` | Generates 6 personalized side hustle suggestions | None |
| `POST` | `/api/get-hustle-details` | Generates structured execution steps, tools, and timeline | None |
| `POST` | `/api/chat` | Processes multi-turn AI chatbot conversations | None |

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
      "description": "Build reusable UI components and templates for developers and small businesses on marketplaces.",
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
  "description": "Build reusable UI components and templates for developers and small businesses on marketplaces."
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
  "reply": "Start by calculating your desired hourly rate or package pricing based on market rates..."
}
```

---

## 🤖 AI Integration & Fallback Strategy

* **OpenAI GPT-4o**: Configured with strict `json_object` response schemas ensuring consistent JSON data parsing for UI cards and milestone lists.
* **Google Gemini 2.5 Flash**: Configured with system instructions and strict alternating conversation history formatting (`user` / `model`).
* **Fallback Design**: If API keys are unconfigured or external API limits are exceeded (e.g. HTTP 429 quota exhaustion), the service catches the error, logs a clean diagnostic message, and returns structured fallback data so the user experience never breaks.

---

## ☁️ Deployment

* **Frontend (Vercel)**: [https://ai-side-hustle-ruby.vercel.app/](https://ai-side-hustle-ruby.vercel.app/)
* **Backend API (Render)**: [https://ai-side-hustle-k2ge.onrender.com](https://ai-side-hustle-k2ge.onrender.com)
* **Health Check Probe**: [https://ai-side-hustle-k2ge.onrender.com/health](https://ai-side-hustle-k2ge.onrender.com/health)

---

## ⚙️ Installation & Setup

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
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

Start the backend development server:
```bash
npm run dev
# Or start standard production server:
npm start
```
The backend server runs on `http://localhost:5000`.

---

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` folder, and install dependencies:
```bash
cd frontend
npm install
```

(Optional) Create a `.env.local` file in `frontend/` to configure the API base URL:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```
The frontend application runs on `http://localhost:5173`.

---

### 4. Monorepo Root Scripts (Optional)
From the root workspace directory, you can also run:
```bash
# Start backend via root proxy
npm start

# Run backend development server
npm run backend:dev

# Run frontend development server
npm run frontend:dev
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` | No |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o recommendations | None | No (Falls back to mock data if absent) |
| `GEMINI_API_KEY` | Google Gemini API key for chatbot assistant | None | No (Falls back to offline reply if absent) |
| `FRONTEND_URL` | Allowed origin for CORS headers | `*` | No |

### Frontend (`frontend/.env` or `frontend/.env.local`)
| Variable | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL of the backend API service | `http://localhost:5000` | No |

---

## 🚀 Future Improvements

* **User Authentication & Cloud Storage**: Optional user accounts with cloud database synchronization across devices.
* **PDF / Markdown Roadmap Export**: Ability to download custom execution checklists and toolkits for offline access.
* **Community Side Hustle Directory**: Public feed of community-submitted side hustle reviews and real-world earnings metrics.
* **Calendar Integration**: Export step-by-step milestone timelines directly to Google Calendar or Notion.

---

## 👨‍💻 Author

**Sparsh Chauhan**  
*Computer Science and Engineering Student & Full Stack Web Developer*

* **GitHub**: [@Sparsh88](https://github.com/Sparsh88)
* **LinkedIn**: [Sparsh Chauhan](https://linkedin.com/in/sparshchauhan08)

---
