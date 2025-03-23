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

<h1>The Hardware part is called as Trehan </h1>
<h1>The softwarre part is called as Kadambani </h1>

<h1>Images </h1>

![Screenshot 2025-03-22 223854](https://github.com/user-attachments/assets/e286907a-c1b1-4ea7-bba1-bd95c41a41ce)
![Screenshot 2025-03-22 223843](https://github.com/user-attachments/assets/ae03be5f-f683-4e15-adce-7a1f6a02c49c)
![Screenshot 2025-03-22 224327](https://github.com/user-attachments/assets/46d72ece-d447-4f14-9298-7e602181708b)
![Screenshot 2025-03-22 224314](https://github.com/user-attachments/assets/147f379b-eeaf-4005-91f9-5d49a0241434)
![Screenshot 2025-03-22 224210](https://github.com/user-attachments/assets/a619a815-b834-4dcb-879f-d008e760d513)
![Screenshot 2025-03-22 223946](https://github.com/user-attachments/assets/bd6bf338-0bbc-49c8-9fda-947787850e0c)

![Screenshot 2025-03-22 223917](https://github.com/user-attachments/assets/8b5fa64f-1fc5-4b96-bf9e-2374578c63a3)
![Screenshot 2025-03-22 224256](https://github.com/user-attachments/assets/d34a9a44-cd49-4da5-84ef-f5115aadda4f)
![Screenshot 2025-03-22 224220](https://github.com/user-attachments/assets/605eda46-e796-4b3f-93f1-6ef77513c863)
![Screenshot 2025-03-22 223932](https://github.com/user-attachments/assets/aad7680f-ed24-43a5-a8bf-155bb2264fae)


<h1>HARDWARE IMPLEMENTATION KADAMBANI </h1>


![IMG-20250323-WA0017](https://github.com/user-attachments/assets/b5debcae-a8fd-4773-8b12-b803c80b22b0)
![IMG-20250323-WA0016](https://github.com/user-attachments/assets/aa049c37-4d92-4e17-88ee-68287a7180b9)
![IMG-20250323-WA0015](https://github.com/user-attachments/assets/28629f65-5a12-4559-bce3-b8af019453fd)
![IMG-20250323-WA0010](https://github.com/user-attachments/assets/e335cf33-0468-4b35-bf5a-7cd30c86ed86)
![IMG-20250323-WA0008](https://github.com/user-attachments/assets/b93c093b-8880-4551-8460-d7f2c54a735f)
![IMG-20250323-WA0019](https://github.com/user-attachments/assets/79072f43-84c3-4b84-9d3a-0ea898836540)
![IMG-20250323-WA0018](https://github.com/user-attachments/assets/9d625010-017f-470e-8d9a-aa7e5973d896)


