# VoteSaathi — 🇮🇳 AI-Powered Election Education for India

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react" alt="React">
  <img src="https://img.shields.io/badge/Shadcn%20UI-4-000000?logo=shadcnui" alt="Shadcn UI">
  <img src="https://img.shields.io/badge/Languages-6-orange" alt="Languages">
</div>

---

## 📌 Full Overview

**VoteSaathi** is an interactive, multilingual web application designed to simplify the Indian electoral process for citizens, especially first-time voters and children. By combining conversational AI, interactive simulations, and strict accessibility standards, VoteSaathi ensures that constitutional rights and voting procedures are easily understood by everyone, regardless of age, language, or technical proficiency.

---

## 1. 🎯 Chosen Vertical
**Civic Tech & Election Process Education**

India has the world's largest electorate (960 million+ registered voters), yet voter turnout in 2024 was ~65.8%. A significant barrier to participation is the complexity of registration, understanding EVMs/VVPATs, and knowing constitutional rights. VoteSaathi directly addresses this knowledge gap by providing a stigma-free, accessible, and educational platform that guides citizens from registration all the way to the ballot box.

---

## 2. 🧠 Approach and Logic

Our approach is built on three core pillars: **Simplicity, Inclusivity, and Active Learning**.

### Design Philosophy & Logic
* **ELI10 (Explain Like I'm 10) Mode:** Complex legal and procedural jargon is automatically distilled into child-friendly language using relatable analogies (e.g., "Voting is like choosing the class captain").
* **Multilingual First:** India is linguistically diverse. The app natively supports English, Hindi, Bengali, Telugu, Marathi, and Tamil, with logic that translates the entire UI, quizzes, and chat responses dynamically.
* **Accessibility Driven:** A persistent top-bar allows users to instantly toggle High Contrast Mode, adjust Font Sizes (A-, A, A+), and use Screen Reader tools. This logic is persisted in `localStorage` to prevent UI flashes across sessions.

### Core Logic Modules
1. **AI Chat Architecture:** Uses a fast, keyword-matched knowledge base covering 7 critical election topics. Input is sanitized, and the logic seamlessly switches between Standard and ELI10 modes based on the user's age or explicit toggle. It is designed to easily swap in an OpenAI API key for live LLM responses.
2. **Eligibility Calculator:** Evaluates age (validating 1-120) and citizenship status to instantly determine voting eligibility according to Article 326 of the Indian Constitution, routing eligible users to the Form 6 Simulator.
3. **Registration Simulator:** Mirrors the exact fields of the real ECI Form 6 (including "Third Gender" options and PIN code validation) so users can practice without fear of making mistakes on the official portal.

---

## 3. 🔄 How the Solution Works

### System Architecture
The application runs entirely in the browser using Next.js (App Router) for fast delivery and React for interactive components.

```text
┌──────────────────────────────────────────────────────────┐
│  User visits VoteSaathi (Accessible TopBar + Navigation) │
├──────────────────────────────────────────────────────────┤
│  ↓ User clicks a CTA → Interactive App Panel opens ↓     │
│                                                          │
│  ┌────────────┬────────────────────────────────────────┐ │
│  │  Sidebar   │  Active Content Panel renders here     │ │
│  │            │                                        │ │
│  │ 🤖 Chat    │  - AI Chat (with ELI10 toggle)         │ │
│  │ 🏛️ Flow    │  - Election Flow (6-step visual path)  │ │
│  │ ✅ Eligible │  - Eligibility Checker form            │ │
│  │ 📝 Form 6  │  - Form 6 Simulator                    │ │
│  │ 🧠 Quiz    │  - Quiz (10 MCQs with explanations)    │ │
│  │ 📍 Map     │  - Polling Stations viewer             │ │
│  └────────────┴────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### Data Flow
1. **State Management:** `Zustand` with `persist` middleware securely stores user preferences (language, age, font size, chat history, high contrast) in the browser's local storage.
2. **Routing & Rendering:** Next.js serves the initial UI. When a user interacts, Framer Motion animates transitions between the Sidebar components smoothly.
3. **Chat API:** The client sends `POST /api/chat` with `{ message, isEli5Mode, userAge, language }`. The server validates the request and returns a markdown-formatted response, which is rendered dynamically into JSX.

---

## 4. 📋 Assumptions Made

To ensure the app is fast, educational, and secure, the following assumptions and constraints were applied:

| Assumption | Rationale |
|------------|-----------|
| **Mock AI by Default** | To ensure the app works instantly offline or without API keys, a robust local keyword-matching AI is used. (Can be upgraded to OpenAI easily via `.env`). |
| **Simulated Submissions** | The Form 6 Simulator is strictly educational. It **does not** collect personal data or submit actual forms to the Election Commission of India. |
| **Mock Polling Data** | While architected for Google Maps integration, polling stations currently use mock Delhi data to demonstrate functionality without requiring live API billing. |
| **Voting Age is 18+** | Hardcoded per Article 326 of the Indian Constitution and the 61st Amendment (1988). |
| **Curated Translations** | All translations are manually provided in a local data file rather than relying on live machine translation to ensure legal terminology is accurate. |

---

## 🛠 Tech Stack & Integrations

* **Framework:** Next.js 16 (App Router) + React 19
* **Language:** TypeScript 5
* **Styling:** Tailwind CSS v4 + Shadcn UI
* **Animations:** Framer Motion 12
* **State Management:** Zustand 5
* **Google Integrations:** 
  * Google Fonts (Inter & Noto Sans Devanagari for multi-script support).
  * Google Cloud Run ready (`Dockerfile` included).
  * Google Maps API structured in components.

---

## 🚀 Quick Setup & Deployment

### Run Locally
```bash
git clone <repo-url>
cd "Election Agent"
npm install
npm run dev
```
Open `http://localhost:3000` (or 3001) in your browser.

### Deploy to Google Cloud Run
Since a `Dockerfile` is provided, deployment is seamless:
```bash
gcloud config set project <your-project-id>
gcloud run deploy election-agent --source . --region us-central1 --allow-unauthenticated
```

---
*Built with ❤️ to strengthen democratic participation in India 🇮🇳*
