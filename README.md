# VitalSyn

VitalSyn is a modern healthcare monitoring and patient management system built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and various UI components. It includes a **patient-doctor dashboard**, **emergency alert system**, **chatbot assistant**, and **wearable device integration**.

## Features

- 🏥 **Patient-Doctor Dashboard** - Separate portals for patients, doctors, and administrators.
- ⚠️ **Emergency Alert System** - Real-time alerts for critical conditions.
- 🩺 **Wearable Device Data** - Displays simulated health data from wearables.
- 💬 **AI Chatbot Assistant** - AI-powered chatbot for assistance.
- 🌍 **Multi-language Support** - Language selection for localization.
- 🎨 **Dark Mode Support** - Toggle between light and dark themes.
- 🎛 **Advanced UI Components** - Includes form elements, charts, and more.

## Live Demo

🔗 [Visit VitalSyn](https://vittalscan.vercel.app/)

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS)
- **pnpm** (Package manager, recommended over npm)

### Setup
```sh
# Clone the repository
git clone https://github.com/yourusername/vitalsyn.git
cd vitalsyn

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open `http://localhost:3000` to view the app.

## Folder Structure
```
.vitalsyn/
├── app/                   # Main application folder
│   ├── dashboard/         # Doctor, Patient & Admin Dashboards
│   ├── login/             # Login page
│   ├── layout.tsx         # Global layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/                # Shadcn UI elements
│   ├── emergency-alert.tsx  # Emergency alerts
│   ├── chatbot-assistant.tsx # AI Chatbot
│   ├── dashboard-layout.tsx  # Dashboard UI
├── public/                # Static assets
├── styles/                # Global stylesheets
├── utils/                 # Helper functions & API handlers
├── hooks/                 # Custom React hooks for data fetching
├── context/               # Global state management using Context API
├── package.json           # Project dependencies
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.mjs        # Next.js configuration
```

## How It Works (Technical Overview)

### Frontend - Next.js & TypeScript
- The application follows the **App Router** paradigm in Next.js.
- Uses **Server Components** for optimized rendering.
- **Client Components** are used for interactive UI elements.
- **ShadCN UI** is used for building modular UI components.
- **Tailwind CSS** for styling.

### State Management
- Utilizes **React Context API** to manage global state for user authentication and alerts.
- Custom **hooks** are implemented for fetching and handling data.

### Emergency Alert System
- Emergency alerts are triggered based on simulated **wearable device data**.
- Uses **WebSockets** (or polling in a simulated mode) for real-time updates.
- Critical health conditions generate automatic alerts in the dashboard.

### AI Chatbot Assistant
- A React-based chatbot UI.
- Integrated with an **AI backend API** (or simulated for now).
- Handles user queries about vitals, emergency steps, and general health info.

### Patient-Doctor Dashboard
- **Doctor Portal:** Displays assigned patients, their vitals, and alert history.
- **Patient Portal:** Shows personal health metrics, prescriptions, and alerts.
- **Admin Panel:** Manages users, assigns doctors, and oversees system alerts.

### Backend & API Integration
- Uses **Next.js API Routes** (`app/api/`) for handling backend logic.
- API endpoints include:
  - `/api/auth` - User authentication (login/logout, JWT-based auth).
  - `/api/patients` - Fetch patient data.
  - `/api/alerts` - Manage emergency alerts.
  - `/api/chatbot` - AI chatbot interaction (simulated for now).

### Database (Optional for Future Integration)
- Can integrate with **MongoDB (via Mongoose)** or **PostgreSQL (via Prisma)**.
- Currently, it operates in a **mocked/simulated data mode**.

### Security & Authentication
- Uses **JWT-based authentication** for user sessions.
- **Role-based access control (RBAC)** ensures different privileges for doctors, patients, and admins.

## Usage
- **Login** to access dashboards.
- **View patient records, vitals, and emergency alerts.**
- **Use chatbot assistant for health queries.**
- **Switch between dark and light mode.**

## Contributing
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.


---

🚀 **VitalSyn - Revolutionizing Digital Healthcare**


<h1>Version 2 </h1>

is an advanced AI-powered healthcare assistant built using Next.js (App Router), TypeScript, Tailwind CSS, and ShadCN UI components. It provides a seamless experience for healthcare monitoring, emergency alerts, and an AI chatbot for medical assistance.

Features

🏥 Healthcare Dashboard - User-friendly interface for patients and doctors.

⚠️ Emergency Alert System - Real-time alerts for critical conditions.

🤖 AI Chatbot Assistant - Provides instant medical assistance.

🌍 Multi-language Support - Language selection for accessibility.

🎨 Dark Mode Support - Toggle between light and dark themes.

📊 Wearable Data Integration - Displays simulated health vitals.

🎛 Advanced UI Components - Includes form elements, charts, and interactive components.

Live Demo

🔗 Visit AI AllCare

Installation

Prerequisites

Ensure you have the following installed:

Node.js (Latest LTS)

pnpm (Recommended package manager)

Setup

# Clone the repository
git clone https://github.com/yourusername/aiallcare.git
cd aiallcare

# Install dependencies
pnpm install

# Run the development server
pnpm dev

Open http://localhost:3000 to view the app.

Folder Structure

.aiallcare/
├── app/                   # Main application folder
│   ├── dashboard/         # User and Doctor Dashboards
│   ├── login/             # Login page
│   ├── layout.tsx         # Global layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/                # ShadCN UI elements
│   ├── emergency-alert.tsx  # Emergency alerts
│   ├── chatbot-assistant.tsx # AI Chatbot
│   ├── dashboard-layout.tsx  # Dashboard UI
├── public/                # Static assets
├── styles/                # Global stylesheets
├── utils/                 # Helper functions & API handlers
├── hooks/                 # Custom React hooks for data fetching
├── context/               # Global state management using Context API
├── package.json           # Project dependencies
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.mjs        # Next.js configuration

How It Works (Technical Overview)

Frontend - Next.js & TypeScript

Uses the App Router for efficient server-side rendering.

Implements ShadCN UI components for a sleek design.

Tailwind CSS provides responsive styling.

React Context API for state management.

AI Chatbot Assistant

Integrated chatbot for medical assistance.

Provides basic health recommendations.

Can be extended with GPT or LLM models.

Emergency Alert System

Tracks simulated vitals.

Sends real-time alerts in case of emergency.

Can integrate with IoT health devices.

Authentication & Security

JWT-based authentication for user sessions.

Role-based access control (RBAC) ensures secure access.

Backend & API Integration

Uses Next.js API Routes for backend logic.

API endpoints:

/api/auth - Handles authentication.

/api/patients - Manages patient data.

/api/alerts - Sends emergency alerts.

/api/chatbot - Handles chatbot responses.

Database (Optional for Future Integration)

Can be extended with MongoDB (via Mongoose) or PostgreSQL (via Prisma).

Currently, it runs in mocked data mode.

Usage

Login to access dashboards.

View patient records, vitals, and emergency alerts.

Use chatbot assistant for health queries.

Switch between dark and light mode.

Contributing

Fork the repository.

Create a new branch (feature/new-feature).

Commit your changes.

Push to your branch.

Open a pull request.



