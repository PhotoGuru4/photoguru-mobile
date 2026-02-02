# 📸 PhotoGuru – Customer Mobile Application

PhotoGuru is a modern **mobile application (Android)** designed for **Customers** to discover photography concepts, book photographers, communicate in real time, and use **AI-powered Photo Guide with voice instructions**. The platform is part of the PhotoGuru ecosystem, which connects **Customers (mobile app)** and **Photographers (web app)**, enhanced with AI-powered photo guidance.

This repository focuses on the **Mobile Application for Customers**.

---

## 🎯 Project Overview

PhotoGuru helps customers:

* Discover photography **concepts**
* View detailed **concept & photographer information**
* Book photography sessions easily
* Communicate with photographers via **real-time chat**
* Use **AI Photo Guide** with voice instructions
* Manage and complete bookings

The system works together with:

* 🖥 **Photographer Web App** – for managing portfolio, concepts, bookings, and chat
* 🧠 **Backend & AI Services** – for data, real-time chat, and AI-powered photo guidance

---

## 👥 Target Users

| Role | Platform | Purpose |
|------|----------|---------|
| **Customer** | Mobile App (Android) | Search concepts, book photographers, chat, use AI Photo Guide |
| Photographer | Web Application (Desktop) | Manage portfolio, concepts, bookings, and chat with customers |

---

## ⚙️ Tech Stack (Mobile – Customer)

| Technology | Purpose |
|-----------|---------|
| **React Native (Expo)** | Mobile application framework |
| **TypeScript** | Type safety & maintainability |
| **NativeWind** | Utility-first styling (Tailwind-like) |
| **React Navigation** | Screen navigation & flow management |
| **TanStack Query** | Server-state & API caching |
| **Axios** | HTTP client for REST APIs |
| **Firebase SDK** | Real-time chat |
| **expo-camera** | Camera for AI Photo Guide |
| **expo-speech** | Voice instruction (Text-to-Speech) |
| **expo-location** | Location access |
| **react-native-maps** | Map display |
| **Zustand** | Global state management |

---

## 🧩 Key Features

### 🔐 Authentication

* Register & login as **Customer**
* Secure session handling

### 🔍 Concept Search & Discovery

* Search concepts by keyword
* Filter concepts by location
* Browse concept lists with relevant results

### 📖 Concept Detail

* View concept images
* Read descriptions and pricing
* View photographer information
* Start chat with photographer

### 💬 Real-time Chat

* Direct 1-1 chat with photographers
* Send booking requests through chat
* Receive real-time message updates

### 📅 Booking Management

* Send booking requests
* Track booking statuses:
    * Pending
    * Confirmed
    * Completed
    * Rejected
* Mark booking as **Completed** after the photo session

### 🧠 AI Photo Guide

* Camera interface with AI guidance
* Real-time analysis of camera frames
* Voice instructions using Text-to-Speech
* Capture photos while receiving AI guidance

---

## 🗂 Project Structure

The project follows a **Feature-based Architecture** optimized for React Native & Expo.

```
src/
├── assets/                 # Images, icons, static files
├── features/               # Domain-based features
│   └── auth/
│       ├── components/     # Auth UI components
│       ├── hooks/
│       │   ├── mutations/
│       │   └── queries/
│       ├── services/       # Auth API services
│       └── types/          # Auth types
├── lib/                    # Third-party configurations
├── navigation/             # React Navigation setup
├── screens/                # Screen-level components
├── shared/                 # Reusable resources
│   ├── components/
│   │   ├── common/         # Common UI components
│   │   └── ui/             # Higher-level UI components
│   ├── constants/
│   │   ├── form/           # Form validation rules
│   │   └── messages/       # Global messages & error texts
│   ├── guards/             # Auth & route guards
│   ├── hooks/
│   │   ├── mutations/
│   │   └── queries/
│   ├── services/           # Shared API services
│   ├── types/              # Shared TypeScript types
│   └── utils/              # Utility functions
├── store/                  # Zustand global stores
└── App.tsx                 # Root component
```

---

## 🚀 Getting Started

### 1️⃣ Installation

```bash
npm install
```

### 2️⃣ Run Expo Development Server

```bash
npx expo start
```

### 3️⃣ Run on Android Emulator / Device

```bash
npx expo start --android
```

---

## 🔧 Configuration & Tooling

* **Environment Variables**: Managed via `.env`
* **State Management**: TanStack Query + Zustand
* **Navigation**: React Navigation
* **Styling**: NativeWind
* **Real-time**: Firebase Firestore
* **AI Integration**: Google Gemini API (via backend)

---

## 🔗 Related Systems

* **Photographer Web App**: React + Vite
* **Backend**: NestJS + PostgreSQL + Prisma
* **Real-time Chat**: Firebase Firestore
* **AI Photo Guide**: Google Gemini API
* **Image Storage**: Cloudinary

---

## 📌 Notes

* This mobile app is optimized for Android usage
* Designed with a mobile-first user experience
* AI Photo Guide is a core feature of the application
* Built for scalability and future iOS expansion