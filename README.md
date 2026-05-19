# 🦷 Mr. Dentist — Clinic Management System

<div align="center">

**A full-stack, enterprise-grade dental clinic management platform built with React, Node.js, Express, and MongoDB.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-Private-red)](#)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Mr. Dentist is a multi-branch dental clinic management system that digitises the patient journey — from registration and doctor discovery through appointment booking and post-visit reviews. The platform enforces role-based access control (Patient, Doctor, Admin) across every endpoint and features a shift-based scheduling engine with database-level double-booking prevention.

---

## Features

- **🔐 JWT Authentication** — Secure registration, login, and token-based session management
- **👥 Role-Based Access Control** — Three roles (Patient, Doctor, Admin) with granular permissions
- **🏥 Multi-Branch Management** — Administer multiple clinic locations with dedicated contact info
- **📅 Smart Appointment Booking** — Shift-aware slot generation with compound-index double-booking prevention
- **⭐ Review System** — Patient ratings (1–5) with duplicate-review prevention
- **📸 Profile Picture Upload** — Cloudinary-powered image storage
- **🛡️ Rate Limiting** — 100 requests per 15 minutes per IP
- **⚠️ Global Error Handling** — Centralized middleware with environment-aware stack traces
- **🔄 ACID Transactions** — MongoDB multi-document transactions for cross-collection operations

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, Vite 8, React Router 7, Formik, Yup, Axios, Bootstrap 5 |
| **Backend** | Node.js 18+, Express 5, Mongoose 9, JWT, bcrypt |
| **Database** | MongoDB Atlas (Replica Set) |
| **Cloud** | Cloudinary (image storage) |
| **Dev Tools** | Nodemon, ESLint, Vite Dev Server |

---

## Architecture

```
┌─────────────────────────────────────────────┐
│           Presentation Layer                │
│   React SPA · Vite · React Router · Formik  │
├─────────────────────────────────────────────┤
│             Service Layer                   │
│   Routes → Middleware → Controllers         │
│   (JWT Auth · RBAC · Rate Limit · Errors)   │
├─────────────────────────────────────────────┤
│           Data Access Layer                 │
│   Repositories → Mongoose Models → MongoDB  │
└─────────────────────────────────────────────┘
```

---

## Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **MongoDB Atlas** account (or local MongoDB with replica set for transactions)
- **Cloudinary** account (for profile picture uploads)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/Mr.Dentist.git
cd Mr.Dentist
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd PresentationLayer
npm install
cd ..
```

---

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
PORT=5000

# Database
MONGO_URL=mongodb://username:password@host1:27017,host2:27017,host3:27017/?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&appName=ClinicSystem

# Authentication
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRES_IN=7d

# Cloudinary (for profile picture uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
```

> ⚠️ **Important:** Never commit the `.env` file. It is already listed in `.gitignore`.

---

## Usage

### Running the Backend

**Development mode** (with hot-reload via Nodemon):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The API server starts on `http://localhost:5000`.

### Running the Frontend

```bash
cd PresentationLayer
npm run dev
```

The Vite dev server starts on `http://localhost:5173` (default).

### Available Scripts

#### Backend (`/`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nodemon Index.js` | Start dev server with auto-reload |
| `start` | `node Index.js` | Start production server |

#### Frontend (`/PresentationLayer`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start Vite dev server |
| `build` | `vite build` | Build for production |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint .` | Run ESLint for code quality |

---

## Project Structure

```
Mr.Dentist/
├── Index.js                     # Entry point
├── package.json                 # Backend dependencies
├── .env                         # Environment config (not committed)
├── enums/
│   └── shift.enum.js            # Shift definitions
├── DataAccessLayer/
│   ├── Helper/SlotsHelper.js    # Slot generation
│   ├── Models/                  # Mongoose schemas
│   └── Repositories/            # Data access functions
├── ServiceLayer/
│   ├── Controllers/             # Request handlers
│   ├── Helpers/                 # Auth & Cloudinary utils
│   ├── Middleware/              # Auth & error middleware
│   └── Routes/                  # Express route definitions
├── PresentationLayer/           # React frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── context/             # Auth context provider
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/               # Page components
│   │   ├── services/            # API service functions
│   │   └── utils/               # Validation schemas
│   └── vite.config.js
└── docs/                        # Project documentation
```

---

## API Reference

| Group | Base Path | Key Endpoints |
|-------|-----------|---------------|
| **Auth** | `/api/auth` | `POST /register`, `POST /login`, `GET /profile`, `PUT /profile` |
| **Doctors** | `/api/doctors` | `GET /`, `GET /:id`, `POST /` (admin), `PUT /:id`, `DELETE /:id` (admin) |
| **Patients** | `/api/patients` | `POST /`, `GET /:id`, `PUT /:id`, `DELETE /:id` (all admin) |
| **Branches** | `/api/clinicBranches` | Full CRUD (admin only) |
| **Appointments** | `/api/appointments` | `POST /:id` (book), `POST /Availableslots/:id`, `GET /patient/appointments` |
| **Reviews** | `/api/reviews` | `POST /:id` (create), `PUT /:id` (update) |

> 📖 Full API documentation with sample requests/responses is available in [`docs/05-api-documentation.md`](docs/05-api-documentation.md).

---

## Contributing

### Git Workflow

This project follows a **feature-branch workflow**:

1. **Create a branch** from `main` for each feature or fix:
   ```bash
   git checkout -b feature/appointment-reminders
   ```

2. **Commit with descriptive messages** following conventional commits:
   ```bash
   git commit -m "feat(appointments): add email reminder 24h before slot"
   git commit -m "fix(auth): normalize email to lowercase on login"
   git commit -m "docs(readme): update installation instructions"
   ```

3. **Push and open a Pull Request** targeting `main`:
   ```bash
   git push origin feature/appointment-reminders
   ```

4. **Code review** — at least one approval required before merging.

5. **Merge** via squash-and-merge to keep `main` history clean.

### Branch Naming Conventions

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New functionality | `feature/patient-notifications` |
| `fix/` | Bug fixes | `fix/slot-overlap-validation` |
| `docs/` | Documentation only | `docs/api-swagger-spec` |
| `refactor/` | Code restructuring | `refactor/repository-pattern` |

### Code Style

- Run `eslint .` in the frontend before committing.
- Follow the existing layered architecture — controllers should not access Mongoose models directly.
- Use MongoDB transactions for any operation spanning multiple collections.

---

## License

This project is **private and proprietary**. All rights reserved.

---

<div align="center">
  <sub>Built with ❤️ by the Mr. Dentist Development Team</sub>
</div>