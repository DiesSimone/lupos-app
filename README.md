# LUPOS APP 🚀

## Overview

**LUPOS APP** is a cutting-edge productivity and self-improvement platform designed for individuals committed to peak performance, discipline, and long-term mastery. This application is your personal ecosystem for eliminating cheap dopamine traps, implementing relentless self-improvement habits, and maintaining laser-focused discipline in pursuit of your goals.

## Mission & Philosophy

At its core, LUPOS APP is built on a simple but powerful philosophy:

- **Peak Productivity**: Achieve maximum output by eliminating distraction and optimizing your workflow
- **Discipline & Mastery**: Build sustainable habits that compound over time, leading to genuine excellence
- **Long-Term Vision**: Think beyond quick wins—focus on the systems and strategies that create lasting change
- **Community Support**: Discuss with fellow members of the app, about all related stuff for being more productive

## Key Features

### 🎯 Smart Dashboard
Your personalized command center that gives you an at-a-glance view of your progress, current goals, and actionable insights.

### ✅ Intelligent Task Management
Organize, prioritize, and execute tasks with precision. Never lose track of what matters most.

### 📅 Calendar Integration
Plan strategically with integrated calendar functionality to see your commitments and habits aligned with your schedule.

### 🔄 Habit Tracking
Build unbreakable habits by tracking consistent daily actions. Visualize streaks and trends that fuel motivation.

### 📊 Advanced Analytics
Deep-dive into your productivity data with comprehensive analytics. Understand your patterns, measure progress, and identify areas for optimization.

### ⚙️ Customizable Settings
Tailor the app to your specific needs and preferences.

### 👤 Community Chats
Meet new mind-like people

### 🤖 Wolfy AI Assistant
Integrated AI assistant that supports you in:
- **Strategic Decision-Making**: Get intelligent recommendations based on your goals and patterns
- **Progress Tracking**: Automatically analyze your habits and provide insights
- **Focus Maintenance**: Persistent guidance to keep you aligned with your long-term vision
- **Goal Optimization**: Continuous feedback to refine your approach and increase effectiveness

## Tech Stack

LUPOS APP is built using the **MERN** stack—a modern, robust architecture for building scalable web applications:

### Backend
- **Node.js + Express.js**: Fast, scalable server-side runtime and web framework
- **MongoDB**: NoSQL database for flexible, document-based data storage
- **Mongoose**: Object data modeling (ODM) for MongoDB
- **Authentication & Sessions**: Secure authentication and user session management
- **bcrypt**: Industry-standard password hashing for security

### Frontend
- **React 19**: Modern, component-based UI library for building interactive user interfaces
- **React Router**: Client-side routing for seamless navigation
- **Vite**: Next-generation frontend tooling for fast development and optimized builds
- **Axios**: Streamlined HTTP client for API communication

### Development Tools
- **ESLint**: Code quality and consistency
- **Nodemon**: Development server with hot-reload capabilities

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and insert your values:
```
PORT=
DATABASE_URI=
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with:
```
VITE_API_URL=[YOUR_BACKEND_URL]
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `GET /api/status` - Check authentication status
- `GET /api/getname` - Get current user's username

## Authentication

The app uses **session-based authentication** with:
- Password hashing via bcrypt
- HTTP-only session cookies
- CORS protection
- Session persistence with MongoDB

## Contributing

We welcome contributions from developers passionate about productivity and self-improvement. Whether it's features, bug fixes, or optimizations—your input helps us build a better platform.

## License

This project is licensed under the AGPL 3.0 License. See the LICENSE file for details.

