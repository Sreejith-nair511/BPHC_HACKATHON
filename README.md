# VittalSync V1

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


<h1>Version 2 Of the Website  </h1>

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

🔗 Visit AI AllCare[https://aiallcare.vercel.app/#contact]

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

<h1>The Hardware part is called as Kadammbani   </h1>
<h1>The softwarre part is called as Rukhmabai  </h1>

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

<H3>the dashborad implementation </H3>

![IMG-20250323-WA0004](https://github.com/user-attachments/assets/0cb8bb06-5e4e-483e-9854-9971c642a45e)
![IMG-20250323-WA0005](https://github.com/user-attachments/assets/78d80a68-8a3f-4d4e-bc06-c30d5787d552)

#Swastha (Real-time Vital Signs Monitoring)



![IMG-20250323-WA0020](https://github.com/user-attachments/assets/4e0be904-487b-437f-bfe1-63e8366b35f8)
![IMG-20250323-WA0031](https://github.com/user-attachments/assets/2ae9b9b9-8621-48e6-b0ae-018f51b1da90)
![IMG-20250323-WA0030](https://github.com/user-attachments/assets/a12b54e6-a2f6-41af-87fe-ef980790c849)
![IMG-20250323-WA0029](https://github.com/user-attachments/assets/d23bd8aa-18ee-4c18-a937-6684cecdfd30)
![IMG-20250323-WA0027](https://github.com/user-attachments/assets/921d1215-af77-4f5a-8523-858070f08e8e)
![IMG-20250323-WA0022](https://github.com/user-attachments/assets/a38eaccc-71d9-4344-9406-f483305b275f)



-Continuously monitors heart rate, SpO2, ECG, and fall detection in real-time.
-Uses ESP32 to collect and transmit data via a local web-based interface.
-Provides instant alerts for abnormal vital signs, ensuring timely medical intervention.
-Ideal for hospital patients, elderly individuals, and individuals with chronic conditions.
-Helps in remote health monitoring, allowing family members and doctors to track a patient's well-being.
-User-friendly interface with easy-to-read graphical data representation
-Enables quick decision-making by healthcare providers based on live health parameters.

#Netra (Vital Critical Care Monitoring System)

-Monitors air quality (AQI), CO2 levels, temperature, humidity, sunlight, motion, and RFID-based patient identification.
-Uses Arduino Mega and various sensors to ensure a safe and healthy hospital or ICU environment.
-Detects harmful gases like methane and CO2, reducing the risk of respiratory issues.
-PIR motion sensor ensures safety by detecting movement in patient areas.
-RFID system instantly retrieves patient details, ensuring proper identification and tracking.
-Data is visualized through a Processing-based graphical interface on a laptop, making it easy to analyze.
-Helps in maintaining optimal environmental conditions, crucial for critical care patients.

#Swastha Netra (Integrated Patient & Environment Monitoring System)

-Combines Swastha and Netra into a holistic patient monitoring solution.
-Monitors both vital signs and environmental conditions to ensure comprhensive healthcare support.
-Helps doctors correlate health conditions with environmental factors (e.g., breathing issues due to poor AQI).
-Provides a real-time safety net for critically ill patients by monitoring both body and surrounding.
-Prevents medical emergencies through early alerts and real-time data tracking.
-Improves patient care by giving a detailed, all-in-one health and environment report.
-Helps caregivers and families remotely monitor patients through a centralized system.


<h1>ArogyaPratibimb</h1>
A digital body  twin and disease prediction service 

# SmartTwin

## Overview
SmartTwin is a cutting-edge digital twin platform designed to create virtual replicas of physical systems, enabling real-time monitoring, simulation, and predictive analytics. It integrates IoT data, AI-driven insights, and dynamic visualization to enhance decision-making across multiple industries.

## Features
- **Real-time Monitoring**: Collects and visualizes live data from connected systems.
- **AI-powered Insights**: Machine learning models analyze patterns, detect anomalies, and forecast future trends.
- **User-friendly Interface**: Designed for seamless navigation and interaction.
- **Scalability**: Adaptable for industries like healthcare, smart cities, manufacturing, and environmental monitoring.
- **Cloud Deployment**: Hosted on Vercel for high availability, fast performance, and global scalability.
- **IoT Integration**: Connects with smart sensors to collect real-world data.
- **Predictive Analytics**: Uses AI to anticipate failures and optimize system performance.
- **3D Visualization**: Supports advanced rendering for better representation of digital twins.

## Tech Stack
- **Frontend**: React.js, Next.js, Tailwind CSS, Three.js (for 3D rendering)
- **Backend**: Node.js, Express (if applicable), WebSockets for real-time updates
- **Database**: MongoDB / Firebase / PostgreSQL (if applicable)
- **AI & Analytics**: Python, TensorFlow, Pandas, Scikit-learn
- **Hosting**: Vercel with CI/CD automation
- **IoT Integration**: MQTT, WebSockets, or REST APIs for live data exchange

## Installation
To run the project locally:

```sh
git clone https://github.com/smarttwin.git
cd smarttwin
npm install
npm run dev
```

## Deployment
SmartTwin is deployed on Vercel. Any push to the main branch triggers an automatic deployment.

## Usage
1. Visit [SmartTwin](https://smarttwinn.vercel.app/)
2. Sign up or log in (if authentication is implemented).
3. Navigate through the dashboard to access real-time data and insights.
4. Connect sensors or data sources (if applicable) and monitor live metrics.
5. Use AI-powered analytics for predictive maintenance and optimization.
6. Visualize data in 3D models for better spatial analysis.

## API Endpoints (not implemented)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/data` | GET | Fetch real-time system data |
| `/api/predict` | POST | Get AI-driven predictions |
| `/api/alerts` | GET | Retrieve system alerts and notifications |

## Future Enhancements
- Improved AI-driven predictions and automation
- Expanded integrations with IoT devices and cloud services
- Enhanced 3D visualization with WebGL and Three.js
- Support for edge computing to reduce latency
- Advanced security features for data privacy and encryption

## Contributing
Feel free to open issues and pull requests to contribute. Ensure that your code follows best practices and includes documentation.

<H3>images</H3>

![Screenshot 2025-03-23 085346](https://github.com/user-attachments/assets/da1c871a-e201-4a56-9de7-11eb4da5a6d1)
![Screenshot 2025-03-23 085058](https://github.com/user-attachments/assets/9e4f841a-922a-4d78-a3f1-c548e5124afa)

![Screenshot 2025-03-23 085409](https://github.com/user-attachments/assets/875c9689-c345-4496-9c4e-29dc63a5d184)
![Screenshot 2025-03-23 042224](https://github.com/user-attachments/assets/1d822ef8-3e94-4526-91f5-1325b1605303)



<h1>Smart watch ideation </

https://github.com/user-attachments/assets/c68176ca-52eb-4729-a08c-a10d219efcb6

h1>


