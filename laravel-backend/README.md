# Laravel Backend (IT15 Dashboard API)

## Setup

```bash
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Base URL: `http://127.0.0.1:8000/api`

## Demo Login

- Email: `admin@uddn.edu.ph`
- Password: `password123`

## Main API Groups

- Auth: `/login`, `/me`, `/logout`
- Dashboard: `/dashboard/stats`, `/dashboard/enrollment-trends`, `/dashboard/course-distribution`, `/dashboard/attendance-patterns`
- Students/Courses: `/students`, `/students/{id}`, `/courses`
- Weather proxy: `/weather-proxy` (supports city or latitude/longitude query params)
