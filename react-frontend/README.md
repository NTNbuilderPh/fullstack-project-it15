# React Frontend (IT15 Dashboard)

## Setup

```bash
npm install
npm start
```

Default URL: `http://127.0.0.1:5173`

## Environment

Create `.env` from `.env.example`:

```bash
copy .env.example .env
```

Required variable:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Features

- Login with validation
- Protected dashboard route
- Recharts visualizations (bar, pie, line)
- Weather widget:
  - current weather
  - 5-day forecast
  - city search
  - geolocation search
- Responsive UI with loading skeleton states
