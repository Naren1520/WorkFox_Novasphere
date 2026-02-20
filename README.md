# WorkFox 🦊

> Decentralized Freelance Platform on Algorand Blockchain

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://workfox.netlify.app)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**🌐 Live:** [workfox.netlify.app](https://workfox.netlify.app)

---

## 🏛️ System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React 19 + TypeScript]
        B[Vite 7]
        C[TailwindCSS]
        D[React Router]
    end
    
    subgraph "Authentication"
        E[Google OAuth 2.0]
        F[JWT Tokens]
    end
    
    subgraph "Blockchain"
        G[Algorand SDK]
        H[Pera Wallet]
        I[Smart Contracts]
        J[Task Storage]
    end
    
    subgraph "AI Services"
        K[Gemini 2.0 Flash]
    end
    
    A --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    A --> K
```

---

## 🔄 Application Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth
    participant W as Wallet
    participant B as Blockchain
    participant AI as AI Bot

    U->>F: Visit Site
    F->>U: Show Loader (5s)
    U->>A: Login with Google
    A->>F: JWT Token
    F->>U: Landing Page
    
    alt Create Task (Client)
        U->>W: Connect Wallet
        W->>U: Address
        U->>F: Create Task Form
        F->>B: Submit Transaction
        B->>F: Task Created
    end
    
    alt Claim Task (Freelancer)
        U->>F: Browse Tasks
        U->>B: Claim Task
        B->>F: Task Claimed
        U->>B: Submit Work
        B->>F: Work Submitted
    end
    
    U->>AI: Ask Question
    AI->>U: AI Response
```

---

## 🏗️ Project Structure

```
WorkFoxx_Novasphere/
│
├── 📁 public/
│   ├── images/logo.png
│   └── _redirects
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── AIChatbot.tsx       # 🤖 AI Assistant
│   │   ├── Header.tsx          # 🧭 Navigation
│   │   ├── Footer.tsx          # 📄 Footer
│   │   ├── LoadingScreen.tsx   # ⏳ Loader
│   │   └── TaskCard.tsx        # 📋 Task Display
│   │
│   ├── 📁 contexts/
│   │   └── AuthContext.tsx     # 🔐 Auth State
│   │
│   ├── 📁 pages/
│   │   ├── LandingPage.tsx     # 🏠 Home
│   │   ├── Login.tsx           # 🔑 Auth
│   │   ├── TaskBoard.tsx       # 👨‍💻 For Freelancers
│   │   ├── CreateTask.tsx      # 💼 For Clients
│   │   ├── Dashboard.tsx       # 📊 User Dashboard
│   │   ├── Profile.tsx         # 👤 User Profile
│   │   ├── Developers.tsx      # 🛠️ Dev Docs
│   │   └── AboutUs.tsx         # ℹ️ About
│   │
│   ├── frontend-integration.ts # ⛓️ Blockchain
│   ├── WalletProvider.tsx      # 👛 Wallet
│   └── App.tsx                 # 🎯 Root
│
├── .env.example
├── netlify.toml
└── package.json
```

---

## 🎯 Smart Contract Flow

```mermaid
stateDiagram-v2
    [*] --> OPEN: create_task()
    OPEN --> CLAIMED: claim_task()
    OPEN --> REFUNDED: refund_task()
    CLAIMED --> SUBMITTED: submit_work()
    SUBMITTED --> APPROVED: approve_task()
    SUBMITTED --> REJECTED: reject_task()
    REJECTED --> SUBMITTED: submit_work()
    APPROVED --> [*]
    REFUNDED --> [*]
```

### Task States

| State | Code | Description |
|-------|------|-------------|
| 🟢 OPEN | 0 | Available for claiming |
| 🔵 CLAIMED | 1 | Assigned to freelancer |
| 🟡 SUBMITTED | 2 | Work submitted |
| 🟣 APPROVED | 3 | Payment released |
| 🔴 REJECTED | 4 | Work rejected |
| ⚪ REFUNDED | 5 | Funds returned |

---

## 🚀 Quick Start

### 1️⃣ Clone & Install

```bash
git clone https://github.com/Naren1520/WorkFoxx_Novasphere.git
cd WorkFoxx_Novasphere
npm install
```

### 2️⃣ Configure

```bash
cp .env.example .env
# Add your keys:
# VITE_GEMINI_API_KEY=your_key
# VITE_GOOGLE_CLIENT_ID=your_client_id
```

### 3️⃣ Run

```bash
npm run dev
# Open http://localhost:5173
```

---

## 🔐 Authentication Flow

```mermaid
graph LR
    A[Landing Page] -->|5s| B[Login Page]
    B -->|Google OAuth| C[Authentication]
    C -->|Success| D[JWT Token]
    D -->|Store| E[localStorage]
    E --> F[Protected Routes]
    F -->|Logout| B
```

---

## 💳 Payment Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant SC as Smart Contract
    participant F as Freelancer
    
    C->>SC: create_task() + ALGO
    Note over SC: Funds in Escrow
    F->>SC: claim_task()
    Note over SC: Task Assigned
    F->>SC: submit_work(proof)
    Note over SC: Work Submitted
    C->>SC: approve_task()
    SC->>F: Transfer ALGO
    Note over F: Payment Received
```

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%">

### Frontend
- ⚛️ React 19
- 📘 TypeScript
- ⚡ Vite 7
- 🎨 TailwindCSS
- 🧭 React Router

</td>
<td width="50%">

### Backend/Services
- ⛓️ Algorand Blockchain
- 👛 Pera Wallet
- 🔐 Google OAuth
- 🤖 Gemini 2.0 AI
- 🚀 Netlify

</td>
</tr>
</table>

---

## 🗺️ Features Map

```mermaid
mindmap
  root((WorkFox))
    For Clients
      Create Tasks
      Set Bounties
      Review Work
      Approve/Reject
      Get Refunds
    For Freelancers
      Browse Tasks
      Claim Tasks
      Submit Work
      Receive Payment
      Build Profile
    Platform
      Google Login
      Wallet Connect
      AI Chatbot
      Profile Management
      Real-time Updates
```

---

## 🔧 Configuration

### Google OAuth

```
Console: console.cloud.google.com/apis/credentials

JavaScript Origins:
├── http://localhost:5173
└── https://workfox.netlify.app

Redirect URIs:
├── http://localhost:5173
├── http://localhost:5173/login
├── https://workfox.netlify.app
└── https://workfox.netlify.app/login
```

### Gemini API

```
Get Key: aistudio.google.com/app/apikey
Add to: .env → VITE_GEMINI_API_KEY
```

---

## 📊 Data Models

### User Profile
```typescript
{
  name: string
  email: string
  phone: string
  address: string
  role: 'freelancer' | 'client' | 'both'
  bio: string
}
```

### Task
```typescript
{
  taskId: number
  client: string
  freelancer: string
  amount: bigint
  deadline: bigint
  status: 0-5
  title: string
  description: string
  proofHash: string
}
```

---

## 🚢 Deployment

```mermaid
graph LR
    A[Git Push] --> B[GitHub]
    B --> C[Netlify]
    C --> D[Build]
    D --> E[Deploy]
    E --> F[Live Site]
```

### Build Config
```toml
[build]
  command = "rm -rf node_modules package-lock.json && npm install && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

---

## 📈 Performance

| Metric | Target | Status |
|--------|--------|--------|
| First Paint | < 1.5s | ✅ |
| Interactive | < 3.5s | ✅ |
| Lighthouse | > 90 | ✅ |
| Bundle Size | < 500KB | ✅ |

---

## 🔒 Security

```mermaid
graph TD
    A[Security Layers] --> B[OAuth 2.0]
    A --> C[JWT Tokens]
    A --> D[Smart Contracts]
    A --> E[Input Validation]
    
    B --> F[Google Auth]
    C --> G[Session Management]
    D --> H[Access Control]
    E --> I[XSS Prevention]
```

---

## 🗺️ Roadmap

```mermaid
gantt
    title Development Roadmap
    dateFormat  YYYY-MM
    section Phase 1
    Core Platform           :done, 2024-01, 2024-02
    Smart Contracts        :done, 2024-01, 2024-02
    Auth & AI              :done, 2024-02, 2024-02
    
    section Phase 2
    Dispute System         :active, 2024-03, 2024-04
    Rating System          :2024-03, 2024-04
    Multi-currency         :2024-04, 2024-05
    
    section Phase 3
    Mobile App             :2024-06, 2024-08
    Milestones             :2024-07, 2024-08
    Team Features          :2024-08, 2024-09
    
    section Phase 4
    DAO Governance         :2024-10, 2024-11
    Token Economics        :2024-11, 2024-12
    Cross-chain            :2024-12, 2025-01
```

---

## 🤝 Contributing

```mermaid
graph LR
    A[Fork Repo] --> B[Create Branch]
    B --> C[Make Changes]
    C --> D[Test]
    D --> E[Commit]
    E --> F[Push]
    F --> G[Pull Request]
    G --> H[Review]
    H --> I[Merge]
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📞 Support

<table>
<tr>
<td align="center">
<img src="https://img.icons8.com/color/96/000000/github--v1.png" width="48"/>
<br><b>GitHub</b>
<br><a href="https://github.com/Naren1520/WorkFoxx_Novasphere/issues">Issues</a>
</td>
<td align="center">
<img src="https://img.icons8.com/color/96/000000/discord-logo.png" width="48"/>
<br><b>Discord</b>
<br><a href="#">Community</a>
</td>
<td align="center">
<img src="https://img.icons8.com/color/96/000000/email.png" width="48"/>
<br><b>Email</b>
<br><a href="mailto:support@workfox.app">Support</a>
</td>
</tr>
</table>

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 🙏 Built With

<p align="center">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Algorand-000000?style=for-the-badge&logo=algorand&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
</p>

---

<p align="center">
<b>Built with ❤️ on Algorand</b>
<br>
<sub>Decentralizing the Future of Work</sub>
</p>
