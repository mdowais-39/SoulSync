"# 🗂️ SoulSync Repository Structure

<div align=\"center\">

![Repository Structure](https://img.shields.io/badge/Repo-Structure-blue?style=for-the-badge&logo=git&logoColor=white)
[![Documentation](https://img.shields.io/badge/Docs-Complete-green?style=for-the-badge)](README.md)

**A Complete Guide to Understanding the SoulSync Codebase**

[📁 Directory Overview](#-directory-overview) • [🏗️ Architecture](#️-architecture-layers) • [🔍 File Descriptions](#-detailed-file-descriptions) • [🚀 Getting Started](#-getting-started)

</div>

---

## 📊 Repository Overview

```
SoulSync/
├── 📱 electron-app/              ← Main Desktop Application (Electron + Next.js)
├── 🎥 src app demo/              ← Demo Videos & Assets
├── 📄 Documentation Files        ← Project Documentation
│   ├── README.md                 ← Main project documentation
│   ├── QUICKSTART.md            ← Quick start guide
│   ├── SYSTEM_ARCHITECTURE.md   ← System architecture details
│   └── MEMBERS.md               ← Team members information
├── 📊 AI-PROJECT.pdf.pptx       ← Project presentation
├── 📋 Soul Sync Report.pdf      ← Project report
└── 📦 package-lock.json         ← Root dependencies lock
```

---

## 🎯 Project Type

**SoulSync** is a **Full-Stack Desktop Application** for mental health support combining:
- 🖥️ **Electron Desktop App** (Frontend)
- 🧠 **AI-Powered Backend** (FastAPI + ML Models)
- 🤖 **Crisis Intervention System** (Telegram Bot)

---

## 📁 Directory Overview

### 🌳 Complete File Tree

```
SoulSync/
│
├── 📱 electron-app/                          ← MAIN APPLICATION
│   ├── 🎨 app/                              ← Next.js App Router (Frontend)
│   │   ├── layout.tsx                       ← Root layout component
│   │   ├── page.tsx                         ← Main entry page
│   │   └── globals.css                      ← Global styles
│   │
│   ├── 🧩 components/                       ← React Components
│   │   ├── EmailAuthScreen.tsx              ← Login/Signup interface
│   │   ├── MoodDashboard.tsx               ← Daily mood check-in screen
│   │   ├── ChatDashboard.tsx               ← AI chat interface
│   │   ├── AccountSetup.tsx.old            ← Legacy setup screen
│   │   ├── LandingPage.tsx.old             ← Legacy landing page
│   │   └── LoginScreen.tsx.old             ← Legacy login screen
│   │
│   ├── ⚙️ electron/                         ← Electron Main Process
│   │   ├── main.js                          ← Main process & system tray
│   │   ├── preload.js                       ← Preload script for IPC
│   │   └── icon.png                         ← Application icon
│   │
│   ├── 📚 lib/                              ← Helper Libraries
│   │   ├── supabase.ts                      ← Supabase auth helper (dual-mode)
│   │   ├── store.ts                         ← Zustand state management
│   │   ├── api.ts                           ← Backend API integration
│   │   └── telegram.ts                      ← Telegram integration helper
│   │
│   ├── 📝 Configuration Files
│   │   ├── package.json                     ← Node.js dependencies
│   │   ├── package-lock.json               ← Dependency lock file
│   │   ├── yarn.lock                       ← Yarn lock file
│   │   ├── tsconfig.json                   ← TypeScript configuration
│   │   ├── next.config.js                  ← Next.js configuration
│   │   ├── tailwind.config.ts              ← Tailwind CSS config
│   │   ├── postcss.config.js               ← PostCSS config
│   │   └── env.example                     ← Environment variables template
│   │
│   └── 📖 Documentation
│       ├── README.md                        ← Electron app documentation
│       ├── SETUP.md                         ← Setup instructions
│       ├── QUICK_START.md                  ← Quick start guide
│       └── IMPLEMENTATION_SUMMARY.md       ← Implementation details
│
├── 🎥 src app demo/
│   └── Soulsync webapp-1.mp4               ← Application demo video
│
├── 📄 Root Documentation
│   ├── README.md                            ← Main project README
│   ├── QUICKSTART.md                       ← Quick start guide (5 minutes)
│   ├── SYSTEM_ARCHITECTURE.md              ← Detailed architecture docs
│   └── MEMBERS.md                          ← Team members list
│
├── 📊 Project Assets
│   ├── AI-PROJECT.pdf.pptx                 ← Project presentation
│   └── Soul Sync Report.pdf                ← Comprehensive project report
│
└── 📦 package-lock.json                    ← Root dependency lock
```

---

## 🏗️ Architecture Layers

### Layer 1: Frontend (Electron + Next.js)

```
┌─────────────────────────────────────────────────────────────┐
│                    DESKTOP APPLICATION                       │
│                  (Electron + Next.js 14)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Components Layer:                                           │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐          │
│  │   Auth     │→ │   Mood     │→ │    Chat     │          │
│  │  Screen    │  │ Dashboard  │  │  Dashboard  │          │
│  └────────────┘  └────────────┘  └─────────────┘          │
│                                                              │
│  State Management (Zustand):                                 │
│  • User authentication state                                 │
│  • Chat sessions & history                                   │
│  • Mood tracking data                                        │
│  • UI state management                                       │
│                                                              │
│  Storage Layer (localStorage):                               │
│  • User credentials (hashed)                                 │
│  • Complete chat history                                     │
│  • Preferences & settings                                    │
│  • Privacy-first: All data stays local                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Layer 2: Backend (AI Pipeline)

```
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                            │
│                   (FastAPI + Python)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  API Endpoints:                                              │
│  ├─ POST /register_user      (User registration)            │
│  ├─ POST /register_contact   (Emergency contact setup)      │
│  ├─ POST /chat               (AI conversation)              │
│  └─ POST /alert              (Crisis notification)          │
│                                                              │
│  3-Stage AI Pipeline:                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Stage 1: BERT Emotion Classifier                    │   │
│  │  • Accuracy: 90.74%                                   │   │
│  │  • Detects: Anxiety, Depression, Suicidal, etc.      │   │
│  └────────────────────┬──────────────────────────────────┘   │
│                       ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Stage 2: Microsoft Phi-2 Response Generator         │   │
│  │  • Generates empathetic, context-aware responses     │   │
│  │  • Fine-tuned on mental health conversations         │   │
│  └────────────────────┬──────────────────────────────────┘   │
│                       ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Stage 3: Qwen-3 LLM Personalization                │   │
│  │  • Combines: Emotion + Response + Context           │   │
│  │  • Produces personalized final response              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Layer 3: Crisis Intervention

```
┌─────────────────────────────────────────────────────────────┐
│               TELEGRAM ALERT SYSTEM                          │
│                  (Emergency Response)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Trigger: Suicidal ideation or severe distress detected     │
│     ▼                                                        │
│  Automatic notification sent to emergency contact           │
│     ▼                                                        │
│  Alert includes:                                             │
│  • User identification                                       │
│  • Detected condition type                                   │
│  • Wellness check message                                    │
│  • NO message content (privacy preserved)                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Detailed File Descriptions

### 📱 Core Application Files

#### `electron-app/app/page.tsx`
**Purpose**: Main application entry point
- Manages authentication flow
- Routes between login, mood dashboard, and chat
- Handles app initialization and state

#### `electron-app/components/EmailAuthScreen.tsx`
**Purpose**: User authentication interface
- Email/password login and signup
- Telegram ID collection (required for alerts)
- Form validation and error handling
- Clean, modern UI design

#### `electron-app/components/MoodDashboard.tsx`
**Purpose**: Daily mood check-in
- Opens automatically on every app launch
- Day rating slider (1-10)
- Feelings scale (1-5)
- Rotating mental health tips carousel
- Beautiful animations and transitions

#### `electron-app/components/ChatDashboard.tsx`
**Purpose**: Main AI chat interface
- Real-time messaging with AI
- Adaptive UI based on detected mood (7 mood types)
- Chat history management (rename, delete, export)
- Loading states and error handling
- Mood-specific color schemes

### ⚙️ Electron Configuration

#### `electron-app/electron/main.js`
**Purpose**: Electron main process
- Window management
- System tray functionality
- Inter-process communication (IPC)
- App lifecycle management
- Security configurations

#### `electron-app/electron/preload.js`
**Purpose**: Secure bridge between renderer and main
- Exposes safe APIs to renderer process
- Implements contextBridge for security
- Handles IPC communication

### 📚 Helper Libraries

#### `electron-app/lib/store.ts`
**Purpose**: Global state management (Zustand)
```typescript
Store Contains:
├── user: User authentication data
├── isAuthenticated: Login state
├── moodDashboardCompleted: Daily check-in flag
├── currentMood: Detected emotional state
├── chatSessions: All chat history
└── currentSessionId: Active chat session
```

#### `electron-app/lib/api.ts`
**Purpose**: Backend API integration
- Dual-mode support (real/fake for testing)
- User registration
- Mood detection
- Chat messaging
- Alert triggering
- Error handling and retries

#### `electron-app/lib/supabase.ts`
**Purpose**: Authentication helper
- Google OAuth integration
- Fake mode for development
- Session management
- Auth state listeners

#### `electron-app/lib/telegram.ts`
**Purpose**: Telegram integration helper
- Telegram ID validation
- Emergency contact setup
- Bot API integration

### ⚙️ Configuration Files

#### `electron-app/package.json`
**Key Dependencies**:
```json
{
  \"dependencies\": {
    \"@supabase/supabase-js\": \"^2.39.0\",  // Authentication
    \"axios\": \"^1.6.0\",                    // HTTP client
    \"next\": \"^14.1.0\",                    // React framework
    \"react\": \"^18.2.0\",                   // UI library
    \"zustand\": \"^4.5.0\"                   // State management
  },
  \"devDependencies\": {
    \"electron\": \"^28.0.0\",                // Desktop framework
    \"typescript\": \"^5.3.0\",               // Type safety
    \"tailwindcss\": \"^3.4.0\"               // Styling
  }
}
```

#### `electron-app/tsconfig.json`
**Purpose**: TypeScript configuration
- Strict type checking
- Path aliases
- Module resolution
- JSX settings for React

#### `electron-app/tailwind.config.ts`
**Purpose**: Tailwind CSS configuration
- Custom color palette for mood themes
- Typography settings
- Responsive breakpoints
- Animation configurations

#### `electron-app/next.config.js`
**Purpose**: Next.js configuration
- Output settings for Electron
- Image optimization
- API routes configuration
- Environment variable handling

---

## 🎨 Component Hierarchy

```
App (page.tsx)
│
├── EmailAuthScreen
│   ├── Login Form
│   │   ├── Email Input
│   │   ├── Password Input
│   │   └── Submit Button
│   └── Signup Form
│       ├── Name Input
│       ├── Username Input
│       ├── Email Input
│       ├── Password Input
│       ├── Telegram ID Input ⚠️ Required
│       └── Submit Button
│
├── MoodDashboard ⭐ Opens every app launch
│   ├── Header
│   ├── Day Rating Slider (1-10)
│   ├── Feeling Scale Slider (1-5)
│   ├── Mental Health Tips Carousel
│   │   ├── Exercise Tip
│   │   ├── Breathing Technique Tip
│   │   ├── Sleep Hygiene Tip
│   │   └── Social Connection Tip
│   └── Continue Button
│
└── ChatDashboard
    ├── Sidebar
    │   ├── User Profile Section
    │   ├── New Chat Button
    │   └── Chat History List
    │       └── Chat Item (with rename/delete/export)
    ├── Main Chat Area
    │   ├── Mood Indicator Header
    │   ├── Messages Container
    │   │   ├── User Message
    │   │   └── AI Response
    │   ├── Typing Indicator
    │   └── Message Input
    │       ├── Text Area
    │       └── Send Button
    └── Adaptive Color Scheme
        ├── Normal (Blue gradient)
        ├── Depression (Purple tones)
        ├── Anxiety (Orange tones)
        ├── Bipolar (Mixed colors)
        ├── Stress (Red tones)
        ├── Personality Disorder (Varied)
        └── Suicidal (Critical alert mode)
```

---

## 🚀 Getting Started

### Prerequisites
```bash
✅ Node.js 18+
✅ Yarn package manager
✅ Python 3.8+ (for backend)
✅ Git
```

### Quick Setup (3 Steps)

#### Step 1: Clone Repository
```bash
git clone https://github.com/mdowais-39/SoulSync.git
cd SoulSync/electron-app
```

#### Step 2: Install Dependencies
```bash
yarn install
```

#### Step 3: Run Application
```bash
# Web mode (browser)
yarn dev:next

# Desktop mode (Electron)
yarn dev
```

### Environment Configuration

Create `electron-app/.env.local`:
```env
NEXT_PUBLIC_BACKEND_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 📊 Technology Stack

### Frontend Stack
```
┌─────────────────────────────────────┐
│         Electron 28                 │  ← Desktop Framework
├─────────────────────────────────────┤
│         Next.js 14                  │  ← React Framework
├─────────────────────────────────────┤
│       TypeScript 5.3                │  ← Type Safety
├─────────────────────────────────────┤
│       Tailwind CSS 3.4              │  ← Styling
├─────────────────────────────────────┤
│          Zustand                    │  ← State Management
├─────────────────────────────────────┤
│       Supabase Client               │  ← Authentication
└─────────────────────────────────────┘
```

### Backend Stack
```
┌─────────────────────────────────────┐
│          FastAPI                    │  ← Web Framework
├─────────────────────────────────────┤
│           PyTorch                   │  ← ML Framework
├─────────────────────────────────────┤
│    Transformers (Hugging Face)      │  ← Model Library
├─────────────────────────────────────┤
│       BERT + Phi-2 + Qwen-3         │  ← AI Models
├─────────────────────────────────────┤
│    python-telegram-bot              │  ← Alert System
└─────────────────────────────────────┘
```

---

## 🔐 Security & Privacy

### Data Storage Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    LOCAL DEVICE                              │
│  ✅ User credentials (hashed)                                │
│  ✅ Complete chat history                                    │
│  ✅ User preferences                                         │
│  ✅ Session data                                             │
│                                                              │
│  Privacy Features:                                           │
│  • All data stored locally (localStorage)                    │
│  • No cloud synchronization                                  │
│  • User has full control                                     │
│  • Can export/delete anytime                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                            │
│  ⚠️  Only stores:                                            │
│  • User ID (UUID)                                            │
│  • Username, name, email                                     │
│  • Telegram ID (for emergency alerts)                        │
│                                                              │
│  ❌ NEVER stores:                                            │
│  • Passwords                                                 │
│  • Chat messages                                             │
│  • Personal conversations                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 Model Performance

### Emotion Classification (BERT)

| Metric | Score |
|--------|-------|
| **Accuracy** | **90.74%** |
| **Precision** | **90.80%** |
| **Recall** | **90.74%** |
| **F1-Score** | **90.76%** |

### Per-Emotion Performance

| Emotion | Precision | Recall | F1-Score |
|---------|-----------|--------|----------|
| Anxiety | 0.94 | 0.95 | 0.95 |
| Bipolar | 0.94 | 0.94 | 0.94 |
| Depression | 0.87 | 0.87 | 0.87 |
| Normal | 0.99 | 0.97 | 0.98 |
| Personality Disorder | 0.84 | 0.88 | 0.86 |
| Stress | 0.85 | 0.90 | 0.88 |
| Suicidal | 0.83 | 0.83 | 0.83 |

---

## 🔄 Data Flow Diagram

```
┌──────────┐
│   USER   │
└─────┬────┘
      │
      ▼
┌─────────────────────────────────────┐
│    1. Login & Setup                 │
│    • Email authentication           │
│    • Telegram ID registration       │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    2. Daily Mood Check-in           │
│    • Rate your day (1-10)           │
│    • Feeling scale (1-5)            │
│    • View wellness tips             │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    3. Chat with AI                  │
│    • Send message                   │
│    • Receive empathetic response    │
│    • UI adapts to mood              │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    4. Backend Processing            │
│    ┌─────────────────────────┐      │
│    │ BERT: Detect Emotion    │      │
│    └──────────┬──────────────┘      │
│               ▼                      │
│    ┌─────────────────────────┐      │
│    │ Phi-2: Generate Reply   │      │
│    └──────────┬──────────────┘      │
│               ▼                      │
│    ┌─────────────────────────┐      │
│    │ Qwen-3: Personalize     │      │
│    └──────────┬──────────────┘      │
└───────────────┼──────────────────────┘
                │
                ▼
          ┌─────────────┐
          │ Crisis?     │
          └─────┬───┬───┘
          NO    │   │   YES
                │   │
                │   ▼
                │  ┌──────────────────────┐
                │  │ Send Telegram Alert  │
                │  │ to Emergency Contact │
                │  └──────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│    5. Display Response              │
│    • Show AI message                │
│    • Update mood theme              │
│    • Save to chat history           │
└─────────────────────────────────────┘
```

---

## 🎯 Key Features

### ✨ Implemented Features

✅ **Email Authentication**
- Secure login and signup
- Password validation
- Session management

✅ **Telegram ID Integration**
- Required during signup
- Used for emergency contacts
- Validated format

✅ **Daily Mood Dashboard**
- Opens on every app launch
- Day rating slider
- Feeling scale
- Mental health tips carousel

✅ **AI-Powered Chat**
- Real-time conversations
- Empathetic responses
- Context-aware replies

✅ **7 Mood Detection Types**
1. 😊 Normal
2. 😢 Depression
3. 🆘 Suicidal
4. 😰 Anxiety
5. 🎭 Bipolar
6. 😓 Stress
7. 🌀 Personality Disorder

✅ **Adaptive UI**
- Mood-specific color schemes
- Smooth transitions
- Beautiful animations

✅ **Crisis Intervention**
- Automatic detection
- Telegram bot alerts
- Emergency contact notification

✅ **Chat Management**
- Full history
- Rename conversations
- Delete chats
- Export to JSON

✅ **Privacy-First**
- Local storage
- No cloud sync
- User control over data

✅ **System Tray**
- Minimize to tray
- Quick access
- Background running

---

## 📚 Documentation Files

### Available Documentation

| File | Purpose | Content |
|------|---------|---------|
| `README.md` | Main documentation | Complete project overview, installation, usage, features |
| `QUICKSTART.md` | Quick start guide | Get running in 5 minutes |
| `SYSTEM_ARCHITECTURE.md` | Technical architecture | Detailed system design, data flow, security |
| `MEMBERS.md` | Team information | Project team members |
| `electron-app/README.md` | App-specific docs | Electron app features and setup |
| `electron-app/SETUP.md` | Setup instructions | Detailed setup guide |
| `electron-app/QUICK_START.md` | Quick reference | Quick commands and tips |
| `electron-app/IMPLEMENTATION_SUMMARY.md` | Implementation details | Technical implementation notes |

---

## 🛠️ Development Workflow

### Running the Application

```bash
# Development Mode (Web)
cd electron-app
yarn dev:next
# Opens: http://localhost:3000

# Development Mode (Desktop)
yarn dev
# Launches: Electron window

# Build for Production
yarn build
yarn electron:build
# Outputs: dist/ folder
```

### Project Scripts

```json
{
  \"dev\": \"Next.js dev + Electron\",
  \"dev:next\": \"Next.js only (web mode)\",
  \"dev:electron\": \"Electron only\",
  \"build\": \"Build Next.js\",
  \"start\": \"Start Electron\",
  \"electron:build\": \"Package desktop app\"
}
```

---

## 🌟 Project Highlights

### What Makes SoulSync Special?

1. **🎯 Full-Stack Solution**
   - Complete desktop app + AI backend
   - Not just a prototype, but production-ready

2. **🧠 3-Stage AI Pipeline**
   - BERT (90.74% accuracy) → Phi-2 → Qwen-3
   - Superior emotion detection and response

3. **🚨 Life-Saving Feature**
   - Automatic crisis detection
   - Instant Telegram alerts
   - Can prevent tragedies

4. **🔐 Privacy-First Architecture**
   - All chats stored locally
   - No cloud synchronization
   - User controls everything

5. **🎨 Adaptive UX**
   - 7 mood-based themes
   - Beautiful transitions
   - Empathetic design

6. **📱 Professional Desktop App**
   - Cross-platform (Windows, macOS, Linux)
   - System tray integration
   - Native performance

---

## 📞 Support & Resources

### 🔗 Links

- **Frontend Repository**: [github.com/mdowais-39/SoulSync](https://github.com/mdowais-39/SoulSync)
- **Backend Models**: [huggingface.co/owais39/Soul-Sync](https://huggingface.co/owais39/Soul-Sync)

### 📧 Contact

- **Email**: 392.mdowais@gmail.com
- **Issues**: [GitHub Issues](https://github.com/mdowais-39/SoulSync/issues)

---

## 🤝 Team Members

| Name | Email |
|------|-------|
| Nitul Das | 24bds051@iiitdwd.ac.in |
| Owais Muhammad | 24bds007@iiitdwd.ac.in |
| Ngamchingseh Willis Kipgen | 24bds047@iiitdwd.ac.in |
| Vaasvi Poddar | 24bds086@iiitdwd.ac.in |
| Ayman Pakkada | 24bds007@iiitdwd.ac.in |

---

## 📜 License

**MIT License** - Free to use, modify, and distribute

---

## 🎓 Academic Context

**Institution**: Indian Institute of Information Technology, Dharwad (IIIT Dharwad)
**Project Type**: AI/ML Mental Health Application
**Technologies**: Full-Stack Development, Deep Learning, NLP, Desktop Applications

---

<div align=\"center\">

### 💙 Made with Love for Mental Health Awareness

[![GitHub Stars](https://img.shields.io/badge/⭐-Star%20on%20GitHub-blue?style=for-the-badge)](https://github.com/mdowais-39/SoulSync)
[![Hugging Face](https://img.shields.io/badge/🤗-Hugging%20Face-yellow?style=for-the-badge)](https://huggingface.co/owais39/Soul-Sync)

**SoulSync** | Empowering Mental Wellness Through Technology

*\"Because everyone deserves support, especially when they need it most.\"* 🕊️

---

**Repository Structure Document** | Generated for SoulSync Project
Last Updated: 2025

</div>
"