# API Documentation

## Mr. Dentist — Clinic Management System

| Attribute | Detail |
|---|---|
| **Base URL** | `http://localhost:5000/api` |
| **Auth Scheme** | Bearer Token (JWT) |
| **Content-Type** | `application/json` |
| **Rate Limit** | 100 requests / 15 minutes per IP |

---

## 1. Authentication Headers

All protected endpoints require:

```
Authorization: Bearer <jwt_token>
```

The JWT payload contains `{ id, role }` and expires per `JWT_EXPIRES_IN` (default: 7 days).

---

## 2. Standard Response Format

**Success:**
```json
{
  "message": "Operation description",
  "data": { }
}
```

**Error:**
```json
{
  "message": "Error description"
}
```

**Rate Limit (429):**
```json
{
  "success": false,
  "statusCode": 429,
  "message": "Too many requests from this IP, please try again after 15 minutes"
}
```

---

## 3. Auth Endpoints — `/api/auth`

### 3.1 Register

| | |
|---|---|
| **POST** | `/api/auth/register` |
| **Auth** | None |

**Request:**
```json
{
  "name": "Ahmed Hassan",
  "email": "ahmed@example.com",
  "password": "SecureP@ss123",
  "gender": "male",
  "dateofBirth": "1995-03-15",
  "phoneNumber": "+201012345678"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d0e",
    "name": "Ahmed Hassan",
    "email": "ahmed@example.com",
    "gender": "male",
    "role": "patient",
    "dateofBirth": "1995-03-15T00:00:00.000Z",
    "pictureUrl": ""
  }
}
```

**Errors:** `400` Email already in use · `500` Server error

### 3.2 Login

| | |
|---|---|
| **POST** | `/api/auth/login` |
| **Auth** | None |

**Request:**
```json
{
  "email": "ahmed@example.com",
  "password": "SecureP@ss123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d0e",
    "name": "Ahmed Hassan",
    "email": "ahmed@example.com",
    "role": "patient"
  }
}
```

**Errors:** `400` Invalid email or password · `500` Server error

### 3.3 Get Profile

| | |
|---|---|
| **GET** | `/api/auth/profile` |
| **Auth** | `patient`, `doctor`, `admin` |

**Response (200) — Patient:**
```json
{
  "message": "Profile fetched successfully",
  "data": {
    "_id": "664a1b2c3d4e5f6a7b8c9d0e",
    "name": "Ahmed Hassan",
    "email": "ahmed@example.com",
    "role": "patient",
    "phoneNumber": "+201012345678"
  }
}
```

**Errors:** `401` No token / Invalid token · `404` User not found

### 3.4 Update Profile

| | |
|---|---|
| **PUT** | `/api/auth/profile` |
| **Auth** | `patient`, `doctor`, `admin` |

**Request (Patient):**
```json
{
  "name": "Ahmed M. Hassan",
  "email": "ahmed.new@example.com",
  "dateofBirth": "1995-03-15",
  "phoneNumber": "+201098765432"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "data": { "...updated patient with populated user..." }
}
```

### 3.5 Upload Profile Picture

| | |
|---|---|
| **PUT** | `/api/auth/profile/upload-picture` |
| **Auth** | `patient`, `doctor`, `admin` |
| **Content-Type** | `multipart/form-data` |

**Request:** Form field `profilePicture` with image file.

**Response (200):**
```json
{
  "message": "Profile picture updated successfully",
  "pictureUrl": "https://res.cloudinary.com/dgluygqlu/image/upload/v.../mr_dentist/users/photo.jpg",
  "data": { "...updated user..." }
}
```

**Errors:** `400` No image file provided · `500` Cloudinary upload failed

### 3.6 Update Password

| | |
|---|---|
| **PATCH** | `/api/auth/profile/updatepassword` |
| **Auth** | `patient`, `doctor`, `admin` |

**Request:**
```json
{
  "currentPassword": "OldP@ss123",
  "newPassword": "NewP@ss456"
}
```

**Response (200):**
```json
{ "message": "Password updated successfully" }
```

**Errors:** `400` Current password is incorrect · `404` User not found

---

## 4. Doctor Endpoints — `/api/doctors`

### 4.1 Create Doctor (Admin)

| | |
|---|---|
| **POST** | `/api/doctors` |
| **Auth** | `admin` |

**Request:**
```json
{
  "name": "Dr. Sara Mohamed",
  "email": "dr.sara@clinic.com",
  "password": "DocP@ss123",
  "gender": "female",
  "dateofBirth": "1985-07-20",
  "specialty": "Orthodontics",
  "consultationFee": 300,
  "shiftID": 0,
  "branchId": "664b2c3d4e5f6a7b8c9d0e1f",
  "description": "Specialist in dental braces and aligners"
}
```

**Response (201):**
```json
{
  "message": "Doctor created successfully",
  "data": {
    "_id": "664c3d4e5f6a7b8c9d0e1f2a",
    "user": { "_id": "...", "name": "Dr. Sara Mohamed", "email": "dr.sara@clinic.com", "role": "doctor" },
    "specialty": "Orthodontics",
    "consultationFee": 300,
    "shiftID": 0,
    "branchId": "664b2c3d4e5f6a7b8c9d0e1f"
  }
}
```

### 4.2 Get All Doctors

| | |
|---|---|
| **GET** | `/api/doctors` |
| **Auth** | None (public) |

**Response (200):**
```json
{
  "message": "Doctors retrieved successfully",
  "data": [
    {
      "_id": "664c3d4e5f6a7b8c9d0e1f2a",
      "user": { "name": "Dr. Sara Mohamed", "email": "dr.sara@clinic.com" },
      "branchId": { "address": "123 Main St, Cairo", "phoneNumber": "+20221234567" },
      "specialty": "Orthodontics",
      "consultationFee": 300,
      "shiftID": 0
    }
  ]
}
```

### 4.3 Get Doctor by ID

| | |
|---|---|
| **GET** | `/api/doctors/:id` |
| **Auth** | None (public) |

### 4.4 Update Doctor

| | |
|---|---|
| **PUT** | `/api/doctors/:id` |
| **Auth** | `doctor`, `admin` |

### 4.5 Delete Doctor

| | |
|---|---|
| **DELETE** | `/api/doctors/:id` |
| **Auth** | `admin` |

**Response (200):** `{ "message": "Doctor deleted successfully" }`

### 4.6 Get Doctor Reviews

| | |
|---|---|
| **GET** | `/api/doctors/reviews` |
| **Auth** | `doctor` |

**Response (200):**
```json
{
  "message": "Doctor's reviews retrieved successfully",
  "data": [
    { "rating": 5, "comment": "Excellent service!", "patientName": "Ahmed Hassan" }
  ]
}
```

---

## 5. Patient Endpoints — `/api/patients`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/patients` | `admin` | Create patient with user |
| PUT | `/api/patients/:id` | `admin` | Update patient |
| DELETE | `/api/patients/:id` | `admin` | Delete patient + user |
| GET | `/api/patients/:id` | `admin` | Get patient by ID |
| GET | `/api/patients/reviews` | `patient` | Get own reviews |

---

## 6. Clinic Branch Endpoints — `/api/clinicBranches`

### 6.1 Create Branch

| | |
|---|---|
| **POST** | `/api/clinicBranches` |
| **Auth** | `admin` |

**Request:**
```json
{ "address": "456 Nile Ave, Giza", "phone": "+20231234567" }
```

**Response (201):**
```json
{
  "message": "Clinic branch created successfully",
  "data": { "_id": "664b2c3d...", "address": "456 Nile Ave, Giza", "phoneNumber": "+20231234567" }
}
```

### 6.2 Other Branch Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/clinicBranches` | `admin` | List all branches |
| GET | `/api/clinicBranches/:id` | `admin` | Get branch by ID |
| PUT | `/api/clinicBranches/:id` | `admin` | Update branch |
| DELETE | `/api/clinicBranches/:id` | `admin` | Delete branch |

---

## 7. Appointment Endpoints — `/api/appointments`

### 7.1 Get Available Slots

| | |
|---|---|
| **POST** | `/api/appointments/Availableslots/:doctorId` |
| **Auth** | `patient`, `admin` |

**Request:**
```json
{ "date": "2026-06-15" }
```

**Response (200):**
```json
{
  "message": "Available slots retrieved successfully",
  "data": ["08:00", "08:20", "08:40", "09:00", "09:20", "10:00", "..."]
}
```

### 7.2 Book Appointment

| | |
|---|---|
| **POST** | `/api/appointments/:doctorId` |
| **Auth** | `patient` |

**Request:**
```json
{ "appointmentDate": "2026-06-15", "slotTime": "09:00" }
```

**Response (201):**
```json
{
  "message": "Appointment booked successfully",
  "data": {
    "_id": "664d4e5f6a7b8c9d0e1f2a3b",
    "doctor": "664c3d4e5f6a7b8c9d0e1f2a",
    "patient": "664a1b2c3d4e5f6a7b8c9d0e",
    "branch": "664b2c3d4e5f6a7b8c9d0e1f",
    "totalCost": 300,
    "appointmentDate": "2026-06-15T00:00:00.000Z",
    "shiftId": 0,
    "slotTime": "09:00"
  }
}
```

### 7.3 Other Appointment Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/appointments/patient/appointments` | `patient` | My appointments |
| GET | `/api/appointments/doctor/appointments` | `doctor` | My appointments |
| PUT | `/api/appointments/appointments/:id` | `admin` | Reschedule |
| DELETE | `/api/appointments/appointments/:id` | `admin` | Cancel |

---

## 8. Review Endpoints — `/api/reviews`

### 8.1 Create Review

| | |
|---|---|
| **POST** | `/api/reviews/:doctorId` |
| **Auth** | `patient` |

**Request:**
```json
{ "rating": 5, "comment": "Very professional and gentle." }
```

**Response (201):**
```json
{
  "message": "Review created successfully",
  "data": {
    "_id": "664e5f6a7b8c9d0e1f2a3b4c",
    "doctor": "664c3d4e...",
    "patient": "664a1b2c...",
    "rating": 5,
    "comment": "Very professional and gentle."
  }
}
```

**Errors:** `400` Already reviewed this doctor · `404` Patient/Doctor not found

### 8.2 Update Review

| | |
|---|---|
| **PUT** | `/api/reviews/:reviewId` |
| **Auth** | `patient` (owner only) |

**Errors:** `403` Review access denied (not the author)

---

## 9. Error Reference

| Code | Meaning | Common Causes |
|------|---------|---------------|
| `400` | Bad Request | Validation failure, duplicate email, duplicate booking, already reviewed |
| `401` | Unauthorized | Missing or invalid JWT token |
| `403` | Forbidden | Insufficient role permissions |
| `404` | Not Found | Resource does not exist |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Unhandled server exception |

---

## 10. Usage Guidelines & Best Practices

1. **Always store the JWT** returned from `/api/auth/login` and include it as `Authorization: Bearer <token>` on all protected requests.
2. **Check available slots** before booking to avoid `400` duplicate key errors.
3. **Handle 429 responses** by implementing exponential backoff or displaying a user-friendly cooldown message.
4. **Use lowercase emails** — the API normalizes emails to lowercase, but sending lowercase avoids confusion.
5. **Validate `slotTime` format** client-side as `HH:MM` (24-hour) before sending to the API.
6. **Dates should be ISO 8601** format (e.g., `2026-06-15` or `2026-06-15T00:00:00.000Z`).
7. **Profile picture uploads** must use `multipart/form-data` with the field name `profilePicture`.

---

*Document prepared for Mr. Dentist Clinic Management System — Confidential.*
