# Jobboardrepo
# Jobit — Job Application Tracker

A full-stack job application tracker to manage and monitor your job search.

## Features
- Add, edit, and delete job applications
- Track application status — Applied, Interview, Offer, Rejected
- Filter applications by status
- Dashboard with real-time stats
- Notes and URL for each application

## Tech Stack
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Railway)
- **Deployment:** Render (API), Netlify (Frontend)

## Live Demo
- Frontend: https://euphonious-selkie-ba2993.netlify.app
- API: https://jobboardrepo.onrender.com

## Getting Started

### Backend
```bash
cd job-api
npm install
node index.js
```

### Frontend
Open `index.html` in your browser or visit the live demo above.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /jobs | Get all jobs |
| POST | /jobs | Create a job |
| PUT | /jobs/:id | Update a job |
| DELETE | /jobs/:id | Delete a job |

## Author
Built by Wilfred Aikpokpegbe

