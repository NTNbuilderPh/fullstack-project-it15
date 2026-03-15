# API Documentation

Base URL: `http://127.0.0.1:8000/api`

## Authentication

- Scheme: Bearer Token (Laravel Sanctum)
- Header format:

```http
Authorization: Bearer <token>
Accept: application/json
```

## Public Endpoints

### `GET /health`
- Purpose: API health check
- Auth: Not required
- Success `200`:

```json
{
  "message": "API is running."
}
```

### `POST /login`
- Purpose: Authenticate user and return API token
- Auth: Not required
- Body:

```json
{
  "email": "admin@uddn.edu.ph",
  "password": "password123"
}
```

- Success `200`:

```json
{
  "message": "Login successful.",
  "token": "1|exampleTokenValue",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@uddn.edu.ph",
    "email_verified_at": null,
    "created_at": "2026-03-15T14:35:32.000000Z",
    "updated_at": "2026-03-15T14:35:32.000000Z"
  }
}
```

- Validation/Error `422`:

```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": ["The provided credentials are incorrect."]
  }
}
```

### `GET /weather-proxy`
- Purpose: Return current weather + 5-day forecast from Open-Meteo
- Auth: Not required
- Query options:
  - `city=Tagum`
  - or `latitude=7.4467&longitude=125.8094&timezone=Asia/Manila`

- Success `200` (example):

```json
{
  "latitude": 7.5,
  "longitude": 125.75,
  "timezone": "Asia/Manila",
  "current": {
    "time": "2026-03-15T23:00",
    "temperature_2m": 22.3,
    "relative_humidity_2m": 77,
    "weather_code": 2,
    "wind_speed_10m": 7.7
  },
  "daily": {
    "time": ["2026-03-15", "2026-03-16"],
    "weather_code": [2, 2],
    "temperature_2m_max": [31.1, 30.4],
    "temperature_2m_min": [22.2, 22.0],
    "precipitation_sum": [0.0, 0.2]
  },
  "location": {
    "label": "Tagum, Davao Region, Philippines",
    "latitude": 7.4475,
    "longitude": 125.8046,
    "timezone": "Asia/Manila"
  }
}
```

- Common errors:
  - `404` city not found
  - `422` invalid query values (for example only one coordinate provided)
  - `429` weather provider rate-limited
  - `502` upstream weather/geocoding service unavailable

## Protected Endpoints (Bearer Token Required)

### `GET /me`
- Purpose: Return currently authenticated user
- Success `200`:

```json
{
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@uddn.edu.ph"
  }
}
```

### `POST /logout`
- Purpose: Revoke current access token
- Success `200`:

```json
{
  "message": "Logged out successfully."
}
```

### `GET /students`
- Purpose: Paginated student list with course relation
- Query params:
  - `per_page` (1..100, default `20`)
  - `search` (student number/first/last name)
  - `course_id`
- Success `200` (trimmed):

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 470,
      "student_number": "2025-00470",
      "full_name": "Adolphus Prosacco",
      "gender": "Female",
      "course_id": 1,
      "year_level": "3rd Year",
      "status": "Regular",
      "is_present": true,
      "course": {
        "id": 1,
        "course_code": "BSIT",
        "course_name": "Bachelor of Science in Information Technology",
        "department": "CCS"
      }
    }
  ],
  "per_page": 20,
  "total": 500
}
```

### `GET /students/{id}`
- Purpose: Single student with course relation
- Success `200`: same object shape as each item in `/students.data`

### `GET /courses`
- Purpose: List all courses with student counts
- Success `200` (trimmed):

```json
[
  {
    "id": 20,
    "course_code": "BSAGRI",
    "course_name": "Bachelor of Science in Agriculture",
    "department": "CA",
    "students_count": 27
  }
]
```

### `GET /dashboard/stats`
- Purpose: KPI cards for dashboard
- Success `200`:

```json
{
  "students_count": 500,
  "courses_count": 20,
  "school_days_count": 260,
  "male_students_count": 241,
  "female_students_count": 259,
  "present_students_count": 427
}
```

### `GET /dashboard/enrollment-trends`
- Purpose: Monthly enrollment totals for bar chart
- Success `200`:

```json
[
  { "month": "2025-06", "total": 59 },
  { "month": "2025-07", "total": 41 }
]
```

### `GET /dashboard/course-distribution`
- Purpose: Students per course for pie chart
- Success `200`:

```json
[
  {
    "course": "BSIT",
    "course_name": "Bachelor of Science in Information Technology",
    "department": "CCS",
    "students": 21
  }
]
```

### `GET /dashboard/attendance-patterns`
- Purpose: School-day attendance timeseries for line chart
- Success `200`:

```json
[
  {
    "date": "2025-06-02",
    "attendance_count": 457,
    "type": "class_day",
    "title": "Regular Class Day"
  }
]
```

## Default Demo Credentials

- Email: `admin@uddn.edu.ph`
- Password: `password123`
