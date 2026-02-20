# WorkFox - Decentralized Freelance Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://workfox.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)

> A decentralized freelance marketplace built on Algorand blockchain, enabling trustless task management and secure payments through smart contracts.

**Live Demo:** [https://workfox.netlify.app](https://workfox.netlify.app)

---

##  Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Smart Contract Integration](#smart-contract-integration)
- [Authentication Flow](#authentication-flow)
- [Deployment](#deployment)
- [License](#license)

---

##  Overview

WorkFox is a next-generation freelance platform that leverages blockchain technology to eliminate intermediaries, reduce fees, and ensure transparent, secure transactions. Built on the Algorand blockchain, it provides instant finality, low transaction costs, and carbon-negative operations.

### Problem Statement

Traditional freelance platforms suffer from:
- High platform fees (15-20%)
- Payment delays and disputes
- Lack of transparency
- Centralized control
- Geographic restrictions

### Our Solution

WorkFox addresses these issues through:
- **Zero platform fees** - Direct peer-to-peer transactions
- **Smart contract escrow** - Automated, trustless payment release
- **Instant settlements** - Sub-3-second transaction finality
- **Global accessibility** - Borderless, permissionless access
- **Transparent operations** - All transactions on-chain

---

##  Key Features

### For Clients
- **Task Creation** - Post tasks with ALGO bounties
- **Escrow Protection** - Funds held securely in smart contracts
- **Work Verification** - Review and approve submissions
- **Refund Mechanism** - Automated refunds for unclaimed tasks

### For Freelancers
- **Task Discovery** - Browse available opportunities
- **Instant Claims** - Claim tasks with wallet signature
- **Proof Submission** - Submit work with IPFS hash
- **Immediate Payment** - Receive ALGO upon approval

### Platform Features
- **Google OAuth** - Seamless authentication
- **AI Assistant** - Gemini 2.0-powered chatbot
- **Profile Management** - Customizable user profiles
- **Real-time Updates** - Live task status tracking
- **Responsive Design** - Mobile-first UI/UX

---

##  Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **TailwindCSS** - Utility-first styling
- **React Router** - Client-side routing

### Blockchain
- **Algorand** - Layer-1 blockchain
- **AlgoSDK** - Algorand JavaScript SDK
- **Pera Wallet** - Wallet integration
- **Smart Contracts** - PyTeal-based contracts

### Authentication & AI
- **Google OAuth 2.0** - User authentication
- **Gemini 2.0 Flash** - AI chatbot
- **JWT** - Token-based auth

### Deployment
- **Netlify** - Frontend hosting
- **GitHub** - Version control
- **Node.js 20+** - Runtime environment

---

##  Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  React   │  │   Vite   │  │Tailwind  │  │  Router  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Layer                      │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  Google OAuth    │         │   JWT Tokens     │         │
│  └──────────────────┘         └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Blockchain Layer                         │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  Algorand SDK    │         │  Pera Wallet     │         │
│  └──────────────────┘         └──────────────────┘         │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │ Smart Contracts  │         │  Task Storage    │         │
│  └──────────────────┘         └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      AI Services Layer                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Gemini 2.0 Flash API                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Authentication → Wallet Connection → Smart Contract
     ↓              ↓                  ↓                ↓
  UI Update ← State Update ← Transaction ← Blockchain Confirmation
```

---

##  Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Git**
- **Pera Wallet** (mobile or browser extension)
- **Google Cloud Account** (for OAuth)
- **Gemini API Key** (for AI chatbot)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naren1520/WorkFoxx_Novasphere.git
   cd WorkFoxx_Novasphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:5173
   ```

---

##  Configuration

### Google OAuth Setup

1. **Create Google Cloud Project**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project: "WorkFox"

2. **Configure OAuth Consent Screen**
   - Navigate to: APIs & Services → OAuth consent screen
   - User Type: External
   - Add scopes: `email`, `profile`, `openid`

3. **Create OAuth 2.0 Credentials**
   - Navigate to: APIs & Services → Credentials
   - Create OAuth Client ID → Web application
   - Add authorized origins:
     - `http://localhost:5173` (development)
     - `https://workfox.netlify.app` (production)
   - Add redirect URIs:
     - `http://localhost:5173`
     - `http://localhost:5173/login`
     - `https://workfox.netlify.app`
     - `https://workfox.netlify.app/login`

4. **Copy Client ID**
   - Add to `.env` file as `VITE_GOOGLE_CLIENT_ID`

### Gemini API Setup

1. **Get API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create new API key

2. **Add to Environment**
   - Add to `.env` file as `VITE_GEMINI_API_KEY`

### Algorand Configuration

The smart contract is pre-deployed on Algorand TestNet:
- **App ID**: Configured in `src/contract.json`
- **Network**: TestNet
- **Node**: `https://testnet-api.algonode.cloud`

---

##  Project Structure

```
WorkFoxx_Novasphere/
├── public/
│   ├── images/
│   │   └── logo.png              # Application logo
│   └── _redirects                # Netlify redirects
├── src/
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── AIChatbot.tsx        # Gemini AI chatbot
│   │   ├── Footer.tsx           # Site footer
│   │   ├── Header.tsx           # Navigation header
│   │   ├── LoadingScreen.tsx    # Initial loader
│   │   └── TaskCard.tsx         # Task display card
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication state
│   ├── pages/
│   │   ├── AboutUs.tsx          # About page
│   │   ├── CreateTask.tsx       # Task creation (Clients)
│   │   ├── Dashboard.tsx        # User dashboard
│   │   ├── Developers.tsx       # Developer docs
│   │   ├── LandingPage.tsx      # Home page
│   │   ├── Login.tsx            # Authentication
│   │   ├── Profile.tsx          # User profile
│   │   ├── TaskBoard.tsx        # Task listing (Freelancers)
│   │   └── TaskDetails.tsx      # Task details
│   ├── App.tsx                  # Root component
│   ├── contract.json            # Smart contract config
│   ├── contract-abi.json        # Contract ABI
│   ├── frontend-integration.ts  # Blockchain integration
│   ├── WalletProvider.tsx       # Wallet context
│   ├── index.css                # Global styles
│   └── main.tsx                 # Entry point
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── netlify.toml                 # Netlify config
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config
└── README.md                    # This file
```

---

##  Smart Contract Integration

### Contract Architecture

The WorkFox smart contract manages the entire task lifecycle:

```python
# Task States
OPEN = 0       # Available for claiming
CLAIMED = 1    # Assigned to freelancer
SUBMITTED = 2  # Work submitted
APPROVED = 3   # Payment released
REJECTED = 4   # Work rejected
REFUNDED = 5   # Funds returned to client
```

### Key Methods

#### `create_task(title, description, deadline)`
- **Caller**: Client
- **Payment**: Task bounty + MBR (Minimum Balance Requirement)
- **Action**: Creates task, locks funds in escrow
- **Returns**: Task ID

#### `claim_task(task_id)`
- **Caller**: Freelancer
- **Action**: Assigns task to caller
- **Validation**: Task must be OPEN

#### `submit_work(task_id, proof_hash)`
- **Caller**: Freelancer (task owner)
- **Action**: Submits IPFS hash of completed work
- **Validation**: Task must be CLAIMED

#### `approve_task(task_id)`
- **Caller**: Client (task creator)
- **Action**: Releases payment to freelancer
- **Validation**: Task must be SUBMITTED

#### `reject_task(task_id)`
- **Caller**: Client (task creator)
- **Action**: Rejects submission, allows resubmission
- **Validation**: Task must be SUBMITTED

#### `refund_task(task_id)`
- **Caller**: Client (task creator)
- **Action**: Returns funds if deadline passed and unclaimed
- **Validation**: Task must be OPEN, deadline passed

---

##  Authentication Flow

### User Journey

```
1. Landing Page (5s loader)
   ↓
2. Login Page (Google OAuth)
   ↓
3. Google Authentication
   ↓
4. JWT Token Generation
   ↓
5. Store in localStorage
   ↓
6. Redirect to Home
   ↓
7. Access Protected Routes
```

### Session Management

- **Storage**: `localStorage` for persistence
- **Session**: `sessionStorage` for loading screen state
- **Token**: JWT decoded from Google credential
- **Expiry**: Managed by Google OAuth

### Protected Routes

All routes except `/login` require authentication:
- `/` - Landing page
- `/tasks` - Task board (Freelancers)
- `/create` - Create task (Clients)
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/developers` - Developer docs
- `/about` - About page

---

## 🚢 Deployment

### Netlify Deployment

1. **Connect Repository**
   ```bash
   # Already connected to:
   # https://github.com/Naren1520/WorkFoxx_Novasphere.git
   ```

2. **Configure Build Settings**
   - Build command: `rm -rf node_modules package-lock.json && npm install && npm run build`
   - Publish directory: `dist`
   - Node version: `20`

3. **Set Environment Variables**
   - Navigate to: Site settings → Environment variables
   - Add:
     - `VITE_GEMINI_API_KEY`
     - `VITE_GOOGLE_CLIENT_ID`

4. **Deploy**
   ```bash
   git push origin main
   # Netlify auto-deploys on push
   ```

### Manual Deployment

```bash
# Build for production
npm run build

# Preview build
npm run preview

# Deploy to Netlify
netlify deploy --prod
```

---

## 🔄 Development Workflow

### Branch Strategy

```
main (production)
  ↓
develop (staging)
  ↓
feature/* (features)
  ↓
bugfix/* (fixes)
```

### Commit Convention

```
feat: Add new feature
fix: Bug fix
docs: Documentation update
style: Code style changes
refactor: Code refactoring
test: Add tests
chore: Maintenance tasks
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Google OAuth login/logout
- [ ] Wallet connection (Pera)
- [ ] Task creation with payment
- [ ] Task claiming
- [ ] Work submission
- [ ] Task approval/rejection
- [ ] Profile management
- [ ] AI chatbot functionality
- [ ] Responsive design (mobile/tablet/desktop)

### Test Accounts

- **TestNet ALGO**: Use [Algorand Dispenser](https://bank.testnet.algorand.network/)
- **Test Wallet**: Create via Pera Wallet app
  
---

## 🔒 Security Considerations

### Best Practices Implemented

1. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` as template
   - Rotate keys regularly

2. **Authentication**
   - OAuth 2.0 standard
   - JWT token validation
   - Secure session management

3. **Smart Contracts**
   - Audited contract logic
   - Access control checks
   - Reentrancy protection

4. **Frontend**
   - Input sanitization
   - XSS prevention
   - CSRF protection

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Algorand Foundation** - Blockchain infrastructure
- **Google** - OAuth and Gemini AI
- **Pera Wallet** - Wallet integration
- **Netlify** - Hosting platform
- **Open Source Community** - Various libraries and tools

---

## 📈 Roadmap

### Phase 1 (Current)
- [x] Core platform functionality
- [x] Smart contract integration
- [x] Google OAuth
- [x] AI chatbot
- [x] Profile management

### Phase 2 (Q2 2024)
- [ ] Dispute resolution system
- [ ] Rating and review system
- [ ] Multi-currency support
- [ ] Advanced search filters
- [ ] Notification system

### Phase 3 (Q3 2024)
- [ ] Mobile app (React Native)
- [ ] Escrow milestones
- [ ] Team collaboration
- [ ] API for third-party integrations
- [ ] Analytics dashboard

### Phase 4 (Q4 2024)
- [ ] DAO governance
- [ ] Token economics
- [ ] Cross-chain support
- [ ] Enterprise features
- [ ] White-label solution

---

**Built with ❤️ on Algorand**

*Last Updated: February 2024*
