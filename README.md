# AI Side Hustle Finder

An AI-powered full-stack web application that helps users discover personalised side hustle opportunities based on their skills, interests, available time, and budget. The application generates customised recommendations, provides execution roadmaps, and includes an AI assistant for guidance throughout the learning journey.

---

## Overview

Finding the right side hustle can be overwhelming due to the large number of opportunities available online. This project addresses that problem by using Large Language Models (LLMs) to generate personalised recommendations and structured implementation plans.

The application collects user preferences, processes them through an Express.js backend, and uses AI models to generate actionable side hustle ideas with realistic learning paths, required tools, estimated earnings, and step-by-step execution plans.

---

## Features

* AI-powered personalised side hustle recommendations
* Custom execution roadmap for every recommendation
* Income estimates and learning timeline
* Interactive AI chatbot for guidance and Q&A
* Save favourite hustles locally
* Progress tracking dashboard
* Responsive UI with dark mode
* Error handling and AI fallback mechanisms
* RESTful backend API architecture

---

## Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* Framer Motion
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* REST APIs
* CORS

### AI Integration

* OpenAI GPT-4o (Recommendation Engine)
* Google Gemini 2.5 Flash (Conversational Assistant)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## System Architecture

```text
                User
                  │
                  ▼
      React + Vite Frontend
                  │
      HTTP Requests (Axios)
                  │
                  ▼
        Express.js REST API
                  │
     ┌────────────┴────────────┐
     ▼                         ▼
 OpenAI GPT-4o          Google Gemini
 Recommendation API      Chat Assistant
     │                         │
     └────────────┬────────────┘
                  ▼
           JSON Responses
                  │
                  ▼
          React User Interface
```

---

## Project Structure

```text
AI-Side-Hustle/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Sparsh88/AI-Side-Hustle.git

cd AI-Side-Hustle
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file.

```env
PORT=5000

OPENAI_API_KEY=your_openai_api_key

GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server.

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend

npm install

npm run dev
```

(Optional)

Create `.env.local`

```env
VITE_API_BASE_URL=http://localhost:5000
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint                  | Description                             |
| ------ | ------------------------- | --------------------------------------- |
| POST   | `/api/get-hustles`        | Generate personalised side hustle ideas |
| POST   | `/api/get-hustle-details` | Generate complete execution roadmap     |
| POST   | `/api/chat`               | AI chatbot conversation                 |

---

## Key Learning Outcomes

This project helped me gain practical experience with:

* Building scalable full-stack applications
* REST API development using Express.js
* AI API integration (OpenAI & Google Gemini)
* Prompt engineering for structured JSON generation
* State management in React
* Responsive UI design with Tailwind CSS
* API error handling and fallback strategies
* Deployment using Vercel and Render
* Environment variable management
* Git and GitHub workflow

---

## Future Improvements

* User authentication
* Database integration (MongoDB/PostgreSQL)
* Cloud sync for saved hustles
* Payment integration for premium features
* AI-generated weekly learning plans
* Analytics dashboard
* Multi-language support

---

## Live Demo

**Frontend**

https://ai-side-hustle-ruby.vercel.app/

**Backend API**

https://ai-side-hustle-k2ge.onrender.com

---

## Developer

**Sparsh Chauhan**

Computer Science Engineering Student

Full Stack Web Developer

GitHub: https://github.com/Sparsh88

LinkedIn: https://linkedin.com/in/sparshchauhan08

---

## License

This project is intended for educational and portfolio purposes.

---

If you found this project interesting, consider giving it a ⭐ on GitHub.
