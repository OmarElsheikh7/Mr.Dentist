# Technical Requirements Document (TRD)

## Mr. Dentist — Clinic Management System

| Attribute          | Detail                                      |
| ------------------ | ------------------------------------------- |
| **Document Type**  | Technical Requirements Document (TRD)       |
| **Version**        | 1.0.0                                       |
| **Last Updated**   | 2026-05-19                                  |
| **Audience**       | Software Engineers · DevOps · Architects    |

---

## 1. System Architecture Overview

Mr. Dentist follows a **three-tier layered architecture** with a decoupled React frontend communicating over REST with an Express backend, persisting data in MongoDB Atlas.

### 1.1 Architecture Diagram

```mermaid
graph TB
    subgraph Client["Presentation Layer (Browser)"]
        REACT["React SPA<br/>Vite · React Router · Formik"]
        AXIOS["Axios HTTP Client"]
        REACT --> AXIOS
    end

    subgraph Server["Service Layer (Node.js)"]
        EXPRESS["Express 5 Server"]
        RATE["Rate Limiter<br/>100 req / 15 min"]
        CORS["CORS Middleware"]
        AUTH_MW["Auth Middleware<br/>JWT Verification"]
        RBAC["Role Authorization<br/>authorizeRoles()"]
        ERR["Error Handler<br/>Middleware"]

        subgraph Routes["Route Handlers"]
            R_AUTH["AuthRoute"]
            R_DOC["DoctorRoute"]
            R_PAT["PatientRoute"]
            R_APT["AppointmentRoute"]
            R_REV["ReviewRoute"]
            R_BR["ClinicBranchRoute"]
        end

        subgraph Controllers["Controllers"]
            C_AUTH["AuthController"]
            C_DOC["DoctorController"]
            C_PAT["PatientController"]
            C_APT["AppointmentController"]
            C_REV["ReviewController"]
            C_BR["ClinicBranchController"]
        end

        EXPRESS --> RATE --> CORS
        CORS --> Routes
        Routes --> AUTH_MW --> RBAC --> Controllers
        Controllers --> ERR
    end

    subgraph DAL["Data Access Layer"]
        subgraph Repos["Repositories"]
            RP_USER["UserRepository"]
            RP_DOC["DoctorRepository"]
            RP_PAT["PatientRepository"]
            RP_APT["AppointmentRepository"]
            RP_REV["ReviewRepository"]
            RP_BR["ClinicBranchRepository"]
        end

        subgraph Models["Mongoose Models"]
            M_USER["User"]
            M_DOC["Doctor"]
            M_PAT["Patient"]
            M_APT["Appointment"]
            M_REV["Review"]
            M_BR["ClinicBranch"]
        end

        subgraph Helpers["Helpers"]
            H_SLOT["SlotsHelper"]
            H_AUTH["AuthHelper"]
            H_CLOUD["CloudinaryHelper"]
        end

        Repos --> Models
        RP_APT --> H_SLOT
        Controllers --> H_AUTH
        Controllers --> H_CLOUD
    end

    subgraph External["External Services"]
        MONGO["MongoDB Atlas<br/>Replica Set"]
        CLOUD["Cloudinary CDN<br/>Image Storage"]
    end

    AXIOS -->|"REST API<br/>JSON over HTTPS"| EXPRESS
    Models -->|"Mongoose Driver"| MONGO
    H_CLOUD -->|"Upload API"| CLOUD
    Controllers --> Repos
```

---

## 2. Technology Stack

### 2.1 Backend

| Category              | Technology                     | Version   | Purpose                                                    |
| --------------------- | ------------------------------ | --------- | ---------------------------------------------------------- |
| **Runtime**           | Node.js                        | 18+ LTS   | JavaScript server-side runtime                             |
| **Framework**         | Express                        | 5.2.x     | HTTP server, routing, middleware pipeline                  |
| **ODM**               | Mongoose                       | 9.6.x     | MongoDB object modelling, schema validation, transactions  |
| **Authentication**    | jsonwebtoken (JWT)             | 9.0.x     | Stateless token-based authentication                       |
| **Password Hashing**  | bcrypt                         | 6.0.x     | Salted password hashing (10 rounds)                        |
| **Rate Limiting**     | express-rate-limit             | 8.5.x     | IP-based request throttling                                |
| **CORS**              | cors                           | 2.8.x     | Cross-Origin Resource Sharing support                      |
| **File Upload**       | multer                         | 2.1.x     | Multipart form-data parsing for file uploads               |
| **Image CDN**         | cloudinary                     | 2.10.x    | Cloud-based image storage and delivery                     |
| **Environment Config**| dotenv                         | 17.4.x    | Environment variable management                            |
| **Dev Server**        | nodemon                        | 3.1.x     | Hot-reload development server                              |

### 2.2 Frontend

| Category              | Technology                     | Version   | Purpose                                                    |
| --------------------- | ------------------------------ | --------- | ---------------------------------------------------------- |
| **Library**           | React                          | 19.2.x    | Component-based UI library                                 |
| **Build Tool**        | Vite                           | 8.0.x     | Fast development server and build tool                     |
| **Routing**           | React Router DOM               | 7.14.x    | Client-side routing and navigation                         |
| **Forms**             | Formik                         | 2.4.x     | Declarative form state management                          |
| **Validation**        | Yup                            | 1.7.x     | Schema-based form validation                               |
| **HTTP Client**       | Axios                          | 1.16.x    | Promise-based HTTP client for API calls                    |
| **UI Framework**      | Bootstrap                      | 5.3.x     | Responsive CSS framework and component library             |
| **Linting**           | ESLint                         | 10.2.x    | Code quality and consistency                               |
| **React Plugin**      | @vitejs/plugin-react           | 6.0.x     | Vite integration for React (Fast Refresh)                  |

### 2.3 Database

| Category              | Technology                     | Detail                                                     |
| --------------------- | ------------------------------ | ---------------------------------------------------------- |
| **Database**          | MongoDB                        | NoSQL document database                                    |
| **Hosting**           | MongoDB Atlas                  | Managed cloud service (replica set with 3 nodes)           |
| **Connection**        | Mongoose Driver                | SSL-encrypted, authenticated via connection string         |

### 2.4 Third-Party Services

| Service               | Usage                          | Integration Method                                         |
| --------------------- | ------------------------------ | ---------------------------------------------------------- |
| **MongoDB Atlas**     | Database hosting               | Connection string via `MONGO_URL` env variable             |
| **Cloudinary**        | Profile image storage          | SDK (`cloudinary.v2`) with API key/secret authentication   |

---

## 3. Infrastructure Requirements

### 3.1 Server Configuration

| Aspect                     | Requirement                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| **Node.js Version**        | ≥ 18.0.0 (LTS recommended)                                          |
| **Operating System**       | Linux (Ubuntu 22.04+), macOS, or Windows 10+                        |
| **Memory**                 | Minimum 512 MB RAM (development); 1 GB+ (production)                |
| **CPU**                    | 1 vCPU minimum (development); 2+ vCPUs (production)                 |
| **Storage**                | 1 GB for application code and temporary uploads                     |
| **Network**                | Outbound HTTPS access to MongoDB Atlas and Cloudinary               |

### 3.2 Database Configuration

| Aspect                     | Requirement                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| **MongoDB Version**        | ≥ 6.0 (Atlas-managed)                                               |
| **Replica Set**            | 3-node replica set (Atlas default) — required for multi-document transactions |
| **Authentication**         | SCRAM-SHA-256 via connection string credentials                      |
| **Encryption**             | TLS/SSL in transit (enforced by `?ssl=true` in connection string)   |
| **Indexes**                | Compound unique index on `appointments.{doctor, appointmentDate, shiftId, slotTime}` |

### 3.3 Environment Variables

| Variable                   | Required | Description                                               | Example                          |
| -------------------------- | -------- | --------------------------------------------------------- | -------------------------------- |
| `PORT`                     | Yes      | HTTP server listening port                                | `5000`                           |
| `MONGO_URL`                | Yes      | MongoDB Atlas connection string                           | `mongodb://user:pass@...`        |
| `JWT_SECRET`               | Yes      | Secret key for JWT signing                                | `your_strong_secret_key`         |
| `JWT_EXPIRES_IN`           | Yes      | JWT token expiration duration                             | `7d`                             |
| `CLOUDINARY_CLOUD_NAME`    | Yes      | Cloudinary cloud name                                     | `dgluygqlu`                      |
| `CLOUDINARY_API_KEY`       | Yes      | Cloudinary API key                                        | `123456789012345`                |
| `CLOUDINARY_SECRET_KEY`    | Yes      | Cloudinary API secret                                     | `abcdef...`                      |

---

## 4. Component Specifications

### 4.1 Middleware Pipeline

Requests flow through the following middleware chain in order:

```mermaid
flowchart LR
    A["Incoming Request"] --> B["express.json()"]
    B --> C["cors()"]
    C --> D["express-rate-limit<br/>100 req / 15 min"]
    D --> E["Route Matching"]
    E --> F{"Protected<br/>Route?"}
    F -->|Yes| G["protect()<br/>JWT Verification"]
    G --> H["authorizeRoles()<br/>RBAC Check"]
    H --> I["Controller"]
    F -->|No| I
    I --> J{"Error<br/>Thrown?"}
    J -->|Yes| K["errorHandler<br/>Middleware"]
    J -->|No| L["Response Sent"]
    K --> L
```

### 4.2 Authentication Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    participant DB as Database

    Note over C,S: Registration
    C->>S: POST /api/auth/register
    S->>S: Validate input
    S->>S: bcrypt.hash(password, 10)
    S->>DB: Create User + Patient
    DB-->>S: Created records
    S-->>C: 201 + User data

    Note over C,S: Login
    C->>S: POST /api/auth/login
    S->>DB: findUserByEmail(email)
    DB-->>S: User record
    S->>S: bcrypt.compare(password, hash)
    S->>S: jwt.sign({id, role}, secret, {expiresIn})
    S-->>C: 200 + JWT Token

    Note over C,S: Authenticated Request
    C->>S: GET /api/auth/profile<br/>Authorization: Bearer <token>
    S->>S: jwt.verify(token, secret)
    S->>S: Check role permissions
    S->>DB: Find user data
    DB-->>S: User + role data
    S-->>C: 200 + Profile data
```

### 4.3 Shift-Based Slot Generation

The system operates on three predefined 8-hour shifts, generating 20-minute appointment slots:

| Shift ID | Name      | Start  | End    | Total Slots | Example Slots             |
| -------- | --------- | ------ | ------ | ----------- | ------------------------- |
| `0`      | Morning   | 08:00  | 16:00  | 24          | 08:00, 08:20, …, 15:40   |
| `1`      | Afternoon | 16:00  | 00:00  | 24          | 16:00, 16:20, …, 23:40   |
| `2`      | Night     | 00:00  | 08:00  | 24          | 00:00, 00:20, …, 07:40   |

The `SlotsHelper.generateSlots()` function handles overnight shifts (where `end ≤ start`) by advancing the end date by one day.

### 4.4 Transaction Management

Certain operations span multiple collections and require **ACID guarantees** via MongoDB multi-document transactions:

| Operation                    | Collections Involved       | Transaction Scope                      |
| ---------------------------- | -------------------------- | -------------------------------------- |
| Create Doctor with User      | `users`, `doctors`         | Create User → Create Doctor            |
| Update Doctor + User         | `users`, `doctors`         | Update User → Update Doctor            |
| Delete Doctor + User         | `users`, `doctors`         | Delete User → Delete Doctor            |
| Create Patient with User     | `users`, `patients`        | Create User → Create Patient           |
| Update Patient + User        | `users`, `patients`        | Update User → Update Patient           |
| Delete Patient + User        | `users`, `patients`        | Delete User → Delete Patient           |

All transactions use `mongoose.startSession()` with explicit `commitTransaction()` / `abortTransaction()` and `endSession()` in a `finally` block.

---

## 5. Security Architecture

| Security Control         | Implementation                                                                  |
| ------------------------ | ------------------------------------------------------------------------------- |
| **Authentication**       | JWT (HS256) with configurable expiration; token passed via `Authorization` header |
| **Password Storage**     | bcrypt with 10 salt rounds                                                       |
| **Authorization**        | Role-based middleware (`authorizeRoles`) checks `req.user.role` per route        |
| **Rate Limiting**        | 100 requests / 15 minutes per IP; returns 429 with descriptive message          |
| **Input Validation**     | Mongoose schema validators, regex patterns, enum constraints                    |
| **CORS**                 | Enabled via `cors()` middleware (all origins in development)                    |
| **Error Handling**       | Centralized middleware; stack traces only in development (`NODE_ENV`)           |
| **Data Integrity**       | Compound unique indexes; MongoDB transactions for cross-collection operations    |

---

## 6. Project Structure

```
Mr.Dentist/
├── Index.js                          # Application entry point
├── package.json                      # Backend dependencies and scripts
├── .env                              # Environment variables (not committed)
├── .gitignore
│
├── enums/
│   └── shift.enum.js                 # Shift definitions (Morning/Afternoon/Night)
│
├── DataAccessLayer/
│   ├── Helper/
│   │   └── SlotsHelper.js            # Time-slot generation utility
│   ├── Models/
│   │   ├── User.js                   # User schema (shared identity)
│   │   ├── Doctor.js                 # Doctor schema (extends User)
│   │   ├── Patient.js                # Patient schema (extends User)
│   │   ├── ClinicBranch.js           # Clinic branch schema
│   │   ├── Appointment.js            # Appointment schema (compound unique index)
│   │   └── Review.js                 # Review schema
│   └── Repositories/
│       ├── UserRepository.js         # User CRUD operations
│       ├── DoctorRepository.js       # Doctor CRUD (transactional)
│       ├── PatientRepository.js      # Patient CRUD (transactional)
│       ├── ClinicBranchRepository.js # Branch CRUD operations
│       ├── AppointmentRepository.js  # Appointment booking & slot logic
│       └── ReviewRepository.js       # Review CRUD operations
│
├── ServiceLayer/
│   ├── Controllers/
│   │   ├── AuthController.js         # Authentication & profile management
│   │   ├── DoctorController.js       # Doctor endpoints
│   │   ├── PatientController.js      # Patient endpoints
│   │   ├── ClinicBranchController.js # Branch endpoints
│   │   ├── AppointmentController.js  # Appointment endpoints
│   │   └── ReviewController.js       # Review endpoints
│   ├── Helpers/
│   │   ├── AuthHelper.js             # JWT token generation
│   │   └── CloudinaryHelper.js       # Image upload (Multer + Cloudinary)
│   ├── Middleware/
│   │   ├── AuthMiddleware.js         # JWT verification & RBAC
│   │   └── ErrorHandlerMiddleware.js # Global error handler
│   └── Routes/
│       ├── AuthRoute.js              # /api/auth/*
│       ├── DoctorRoute.js            # /api/doctors/*
│       ├── PatientRoute.js           # /api/patients/*
│       ├── ClinicBranchRoute.js      # /api/clinicBranches/*
│       ├── AppointmentRoute.js       # /api/appointments/*
│       └── ReviewRoute.js            # /api/reviews/*
│
└── PresentationLayer/                # React Frontend (Vite)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx                   # Root component with routing
        ├── main.jsx                  # React DOM entry point
        ├── context/
        │   └── AuthContext.jsx       # Auth state provider
        ├── hooks/
        │   ├── useAuth.js            # Authentication hook
        │   ├── useDoctor.js          # Doctor data hook
        │   └── useReviews.js         # Reviews data hook
        ├── services/
        │   ├── authService.js        # Auth API calls
        │   ├── doctorService.js      # Doctor API calls
        │   ├── patientService.js     # Patient API calls
        │   └── appointmentService.js # Appointment API calls
        ├── components/
        │   ├── common/               # Shared UI (Navbar, Footer, ProtectedRoute)
        │   ├── appointments/         # Appointment components
        │   ├── doctors/              # Doctor components
        │   └── patients/             # Patient components
        ├── pages/                    # Page-level components
        └── utils/
            └── validators.js         # Yup validation schemas
```

---

## 7. Deployment Considerations

| Aspect               | Recommendation                                                                  |
| --------------------- | ------------------------------------------------------------------------------- |
| **Process Manager**   | PM2 or Docker container for production                                          |
| **Reverse Proxy**     | Nginx or cloud load balancer (TLS termination)                                  |
| **CI/CD**             | GitHub Actions for linting, testing, and deployment                             |
| **Logging**           | Structured logging with Winston or Pino (recommended upgrade)                   |
| **Monitoring**        | Application Performance Monitoring (APM) via Datadog, New Relic, or similar     |
| **Frontend Hosting**  | Static build deployed to CDN (Vercel, Netlify, or S3 + CloudFront)             |

---

*Document prepared for Mr. Dentist Clinic Management System — Confidential.*
