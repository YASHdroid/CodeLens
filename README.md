# CodeLens

> AI-Powered Code Intelligence

CodeLens is an AI-powered code review and interview preparation platform that helps developers understand, improve, and prepare for technical interviews using Generative AI.

Users can submit their code to get an AI-powered review, identify bugs, understand issues, receive improvement suggestions, and generate technical interview questions based on their code.

---

## 🚀 Features

### 🤖 AI Code Review

- Submit code for AI-powered analysis
- Detect bugs and potential issues
- Categorize issues by:
  - Syntax
  - Logic
  - Security
  - Performance
  - Style
- Get severity levels:
  - LOW
  - MEDIUM
  - HIGH
  - CRITICAL
- Get detailed explanations
- Get corrected code
- Receive improvement suggestions
- Generate interview questions based on the submitted code

### 🎯 Interview Preparation

- Generate interview questions from submitted code
- 8 AI-generated questions per session
- Difficulty progression:
  - 2 Easy
  - 3 Medium
  - 3 Hard
- Detailed answers
- Example code for every question
- AI-generated session titles

### 🕘 History

- Automatically save code reviews
- Automatically save interview sessions
- AI-generated titles for history
- Open previous reviews
- Open previous interview sessions
- Delete reviews
- Delete interview sessions
- Search through history

### 🔐 Authentication

- User signup and login
- JWT-based authentication
- Protected routes
- Password hashing using bcrypt
- Change password functionality
- Current password verification
- Logout functionality

### ⚙️ User Settings

- Account settings
- Change password
- Secure password verification
- Logout

### 🎨 UI

- Dark modern interface
- Responsive layout
- Collapsible sidebar
- Search history
- Clean code-focused interface
- Loading states
- Interactive history navigation

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

### AI

- Google Gemini
- Gemini 2.5 Flash
- `@google/generative-ai`

---

## 🏗️ Architecture

```text
                     ┌──────────────────┐
                     │      User        │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │   React Client   │
                     │   Tailwind CSS   │
                     └────────┬─────────┘
                              │
                         Axios / REST
                              │
                              ▼
                     ┌──────────────────┐
                     │ Express Backend  │
                     └────────┬─────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
       ┌─────────────────┐         ┌─────────────────┐
       │   Gemini AI     │         │    MongoDB      │
       │ Gemini 2.5 Flash│         │   + Mongoose    │
       └─────────────────┘         └─────────────────┘


CodeLens/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── PublicRoute.jsx
│   │   │   ├── ReviewResult.jsx
│   │   │   └── InterviewResult.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── reviewController.js
│   │   ├── prepController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Review.js
│   │   └── Interview.js
│   │
│   ├── routes/
│   │   ├── reviewRoutes.js
│   │   ├── prepRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── services/
│   │   ├── aiService.js
│   │   └── prepService.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md


1. User submits code
        ↓
2. Backend sends code to Gemini
        ↓
3. Gemini generates 8 questions
        ↓
4. Questions are divided by difficulty
        ↓
5. Answers + example code are generated
        ↓
6. Interview session is stored in MongoDB
        ↓
7. User can view the session
        ↓
8. Session appears in history


Signup
  ↓
Password hashed using bcrypt
  ↓
User stored in MongoDB

Login
  ↓
Password verified
  ↓
JWT generated
  ↓
Token stored on client

Authenticated Request
  ↓
Authorization: Bearer <token>
  ↓
JWT verification middleware
  ↓
Protected API access


🎯 Project Goal

CodeLens was built to explore how Generative AI can be integrated into a production-style full-stack application.

The project focuses on:

Generative AI integration
Structured AI responses
REST API design
Authentication and authorization
MongoDB data persistence
React state management
AI-powered developer tooling
Building a complete SaaS-style application

👨‍💻 Author

Yash Chopra

Built with React, Node.js, MongoDB and Google Gemini.
