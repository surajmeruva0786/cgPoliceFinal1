<p align="center">
  <h1 align="center">🛡️ CG Police — Cybercrime Detection & Intelligence Platform</h1>
  <p align="center">
    A full-stack AI-powered cybercrime detection system built for the <strong>Chhattisgarh Police Department</strong>.
    <br />
    Combines deepfake video detection, malicious URL scanning, document intelligence, news monitoring, and an AI-powered chatbot into a unified law-enforcement platform.
  </p>
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Web Frontend Setup](#web-frontend-setup)
  - [Mobile App Setup](#mobile-app-setup)
- [API Reference](#api-reference)
- [Portals](#portals)

---

## Overview

**CG Police** is an AI-powered cybercrime detection and intelligence platform designed for the Chhattisgarh Police Department. The system assists law-enforcement officers and empowers citizens with tools to detect, analyze, and respond to various cyber threats including deepfake videos, fraudulent URLs, and criminal activity patterns.

The platform is composed of three main components:

| Component | Description |
|-----------|-------------|
| **Backend** | Python/FastAPI server powering all AI & intelligence modules, User Auth, Data Persistence & Integrations |
| **Web Dashboard** | React-based admin dashboard & citizen portal frontend |
| **Mobile App** | Expo/React Native companion app for on-the-go access |

---

## Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                        CLIENTS                               │
│  ┌────────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Web Dashboard  │  │ Citizen Portal│  │   Mobile App     │  │
│  │  (React + Vite) │  │  (React)      │  │  (Expo/RN)       │  │
│  └───────┬────────┘  └──────┬───────┘  └────────┬─────────┘  │
└──────────┼──────────────────┼───────────────────┼────────────┘
           │                  │                   │
           ▼                  ▼                   ▼
┌──────────────────────────────────────────────────────────────┐
│                    FastAPI Backend (:8000)                   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ User Auth &  │  │ Deepfake     │  │  URL Safety        │  │
│  │ Local SQLite │  │ Detector     │  │  Checker           │  │
│  └──────────────┘  └──────────────┘  └────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ News Intel   │  │ AI Chatbot   │  │ Document Analysis  │  │
│  │ (RSS + LLM)  │  │ (Ollama)     │  │ (OCR + LLM)        │  │
│  └──────────────┘  └──────────────┘  └────────────────────┘  │
└────────────┬──────────────────────────────────┬──────────────┘
             │                                  │
             ▼                                  ▼
┌────────────────────────────────┐  ┌──────────────────────────┐
│        EXTERNAL SERVICES       │  │     INTEGRATIONS         │
│  • Google Safe Browsing API    │  │  • Google Sheets API     │
│  • Ollama (LLaMA 3.2)          │  │    (via Webhook)         │
│  • Indian News RSS Feeds       │  │                          │
│  • Tesseract OCR               │  │                          │
└────────────────────────────────┘  └──────────────────────────┘
```

---

## Features

### 🔐 Authentication & Data Persistence
- **Role-Based Access Control**: Separate login portals for Officials and Citizens.
- **Local Database**: Uses SQLite for fast, local storage of user schemas, historical data, and chat sessions.
- **Per-User History**: Users can view their past analyzed documents, chat bot histories, deepfake scans, and checked URLs.

### 🔗 Real-Time Intelligence & Sheets Sync
- **Automated Data Aggregation**: Suspicious URLs, Deepfake incidents, and Fraud Reports are pushed dynamically to a centralized **Google Sheet** via a Webhook Integration.
- Provides investigating officers a master spreadsheet pipeline for cybercrime correlation.

### 🎭 Deepfake Video Detection
- Detects AI-generated/manipulated videos using an **ensemble of EfficientNet-B7** models
- Face detection via **MTCNN** (Multi-task Cascaded Convolutional Networks)
- GPU-accelerated inference with FP16 support for real-time analysis
- Returns prediction (`REAL` / `FAKE`) with confidence score

### 🔗 Fraudulent URL Detection
- Scans URLs against the **Google Safe Browsing API v4**
- Detects malware, social engineering, phishing, unwanted software, and potentially harmful applications
- Returns threat type classification and safety status

### 📄 Document Analysis & Intelligence
- **OCR** text extraction from uploaded images via **Tesseract**
- Automatic **crime-keyword extraction** from document text
- Cross-references extracted keywords with **live Indian news RSS feeds** (Times of India, The Hindu, NDTV, Indian Express)
- AI-powered investigative analysis via **Ollama (LLaMA 3.2)** — generating case summaries, key entities, timelines, clues, recommendations, and risk levels

### 📰 News Intelligence
- Real-time aggregation of cybercrime & Chhattisgarh-related news from multiple RSS sources
- Keyword-based relevance filtering
- LLM-powered threat landscape synthesis, trend identification, and actionable recommendations for law enforcement

### 🤖 AI Chatbot
- Conversational AI assistant powered by **Ollama (LLaMA 3.2)**
- Specialized system prompt for Chhattisgarh Police operations
- Assists with cybercrime trends, digital arrest case queries, deepfake analysis guidance, and general police queries

### 📊 Admin Dashboard (Web)
- **Overview** — At-a-glance statistics and key metrics
- **Citizen Monitoring** — Track and manage citizen reports
- **Live Alerts** — Real-time threat notifications
- **Fraud URL Detection** — Admin interface for bulk URL scanning
- **Deepfake Monitoring** — Video upload and analysis panel
- **Identity Verification** — Official identity verification tools
- **Criminal Intelligence** — Cross-referencing and pattern recognition
- **AI Chatbot** — Conversational interface for officers
- **Newspaper Intelligence** — News monitoring dashboard
- **Document Summarizer** — Upload & analyze documents

### 👥 Citizen Portal (Web)
- **Dashboard** — Citizen-facing overview of available tools
- **URL Checker** — Check if a URL is safe before clicking
- **Deepfake Detector** — Upload suspicious videos for analysis
- **Identity Verifier** — Verify whether a caller/contact is a real official
- **Report Fraud** — Submit cybercrime reports
- **Protection Tips** — Educational content on staying safe online
- **Live Alerts** — View active cyber threat alerts
- **AI Assistant** — Citizen-facing chatbot for guidance

### 📱 Mobile App
- Cross-platform companion app built with **Expo** and **React Native**
- WebView integration to the web platform for seamless access
- Dark/light theme support
- Optimized for on-field use by officers

---

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Python 3.10+** | Runtime |
| **FastAPI** | REST API framework |
| **SQLite** | Local Database & Auth Storage |
| **Uvicorn** | ASGI server |
| **PyTorch** | Deep learning inference |
| **timm** | EfficientNet-B7 model architecture |
| **facenet-pytorch** | MTCNN face detection |
| **OpenCV** | Video/image processing |
| **Tesseract / pytesseract** | OCR text extraction |
| **Ollama** | Local LLM inference (LLaMA 3.2) |
| **BeautifulSoup / lxml** | RSS feed & HTML parsing |
| **Google Apps Script**| Receiver webhook for Sheets Integration |

### Web Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **TypeScript** | Type-safe development |
| **React Router** | Client-side routing |
| **Radix UI** | Accessible component primitives |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icon library |
| **Recharts** | Data visualization / charts |
| **Framer Motion** | Animations |
| **Sonner** | Toast notifications |

### Mobile App
| Technology | Purpose |
|------------|---------|
| **React Native 0.81** | Cross-platform mobile framework |
| **Expo SDK 54** | Managed workflow & tooling |
| **Expo Router** | File-based navigation |
| **React Native Reanimated** | Smooth animations |
| **React Native WebView** | Embedded web content |

---

## Project Structure

```text
cgPoliceFinal1/
├── .env                          # Environment variables (API keys, Webhooks)
├── README.md                     # This file
│
├── backend/                      # Python FastAPI backend
│   ├── server.py                 # Main API server & route definitions
│   ├── database.py               # SQLite initialization, auth & history schemas
│   ├── sheets_integration.py     # Google Sheets async push webhook handler
│   ├── deepfake_detector.py      # EfficientNet-B7 deepfake detection engine
│   ├── document_analysis.py      # OCR + keyword extraction + LLM analysis
│   ├── url_detector.py           # Google Safe Browsing API integration
│   ├── news_intelligence.py      # RSS news aggregation + LLM analysis
│   ├── chatbot.py                # AI chatbot (Ollama / LLaMA 3.2)
│   ├── requirements.txt          # Python dependencies
│   ├── weights/                  # Model weight files (EfficientNet-B7)
│   └── uploads/                  # Temporary file upload directory
│
├── web/                          # React web frontend
│   ├── index.html                # Entry HTML
│   ├── vite.config.ts            # Vite configuration
│   ├── package.json              # Node.js dependencies
│   └── src/
│       ├── App.tsx               # Root application component
│       ├── routes.ts             # Route definitions (admin + citizen)
│       ├── components/           # Reusable UI components & Radix primitives
│       └── pages/                # Admin & Citizen pages (Dashboard, AI Tools)
│
└── mobile/                       # Expo React Native mobile app
    ├── package.json              # Node.js dependencies
    ├── app.json                  # Expo configuration
    └── app/                      # Expo Router file-based routing
        ├── _layout.tsx           # Root layout with theme support
        └── (tabs)/               # Tab navigation system
```

---

## Getting Started

### Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| **Python** | 3.10+ | Backend runtime |
| **Node.js** | 18+ | Web & mobile frontend |
| **npm** | 9+ | Package management |
| **Ollama** | Latest | Local LLM server for AI features |
| **Tesseract OCR** | Latest | Document text extraction |

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
#    Create a .env file in the project root with:
#    GOOGLE_SAFE_BROWSING_API_KEY=your_api_key_here
#    GOOGLE_SHEETS_WEBHOOK_URL=your_apps_script_url_here

# 5. Install and start Ollama (required for chatbot & analysis)
#    Download from https://ollama.com
ollama pull llama3.2

# 6. (Optional) Add deepfake model weights
#    Place EfficientNet-B7 weight files in backend/weights/

# 7. Start the backend server
python server.py
# Server runs at http://localhost:8000
```

### Web Frontend Setup

```bash
# 1. Navigate to the web directory
cd web

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# App runs at http://localhost:5173
```

### Mobile App Setup

```bash
# 1. Navigate to the mobile directory
cd mobile

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npx expo start

# 4. Run on your device (Press 'a' for Android, 'i' for iOS)
```

---

<p align="center">
  Built with ❤️ for the <strong>Chhattisgarh Police Department</strong>
  <br />
  <em>Empowering law enforcement with AI-driven cybercrime detection</em>
</p>