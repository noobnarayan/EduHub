# EduHub

"EduHub" is a comprehensive LMS designed to facilitate interactive online learning by connecting instructors (admins) and students through courses and live lectures. The platform emphasizes personalized learning experiences, allowing students to select courses that match their interests and engage deeply with the course content and fellow learners.

## Deployed Links

- Frontend: [https://eduhub.noobnarayan.in/](https://eduhub.noobnarayan.in/)
- Backend: [https://dizzy-hospital-gown-colt.cyclic.app/graphql](https://dizzy-hospital-gown-colt.cyclic.app/graphql)

## Admin and Student Credentials

### Admin

- Email: [admin@example.com]
- Password: [password]

### Student

Student interface is not implemented yet, but you can still login.

- Email: [workmail.narayan@gmail.com]
- Password: [123]

## Installation and Setup

### Frontend

1. Clone the repository.
2. Navigate to the frontend directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.

### Backend

1. Clone the repository.
2. Navigate to the backend directory.
3. Run `npm install` to install dependencies.
4. Rename `.env.sample` to `.env` and fill in the necessary environment variables.
5. Run `npm run dev` to start the development server.

## Environment Variables

### Backend

- PORT: 8000
- MONGODB_URL: mongodb+srv://[username]:[password]@[host]/[database]
- CORS_ORIGIN: \*
- ACCESS_TOKEN_SECRET: [your_access_token_secret]
- ACCESS_TOKEN_EXPIRY: 1d
- REFRESH_TOKEN_SECRET: [your_refresh_token_secret]
- REFRESH_TOKEN_EXPIRY: 10d
- UPSTASH_REDIS_URL: https://[your_upstash_redis_url]
- UPSTASH_REDIS_TOKEN: [your_upstash_redis_token]
