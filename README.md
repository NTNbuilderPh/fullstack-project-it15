# IT15/L Integrative Programming Final Project

Full-stack academic dashboard built with React frontend and Laravel REST API backend.

## Quick Setup

### Backend

```bash
cd laravel-backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Backend base URL: `http://127.0.0.1:8000/api`

### Frontend

```bash
cd react-frontend
npm install
npm start
```

Frontend URL: `http://127.0.0.1:5173`

## Demo Login

- Email: `admin@uddn.edu.ph`
- Password: `password123`

## Features Implemented

- Login + Sanctum authentication
- Protected dashboard route + logout
- Seeded data:
  - 500+ students
  - 20 courses
  - school day records (attendance/holidays/events)
- Dashboard visualizations:
  - bar chart (enrollment trends)
  - pie chart (course distribution)
  - line chart (attendance patterns)
- Weather integration:
  - current weather
  - 5-day forecast
  - city search
  - geolocation support
  - rate-limit/error handling
- Responsive UI with loading skeleton states

## Documentation

- API documentation: [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)
- Technologies with versions: [docs/TECHNOLOGIES.md](docs/TECHNOLOGIES.md)
- 3-5 minute video script/guide: [docs/VIDEO_DEMO_GUIDE.md](docs/VIDEO_DEMO_GUIDE.md)

## Screenshots

Submission screenshots are in `docs/screenshots/`:

1. `01-login-page.png`
2. `02-dashboard-overview.png`
3. `03-dashboard-charts.png`
4. `04-students-and-weather.png`
5. `05-mobile-dashboard.png`

## Project Structure

```text
fullstack-project-it15-main/
|-- laravel-backend/
|-- react-frontend/
`-- docs/
    |-- API_DOCUMENTATION.md
    |-- TECHNOLOGIES.md
    |-- VIDEO_DEMO_GUIDE.md
    `-- screenshots/
```
=======
# fullstack-project-it15
5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
