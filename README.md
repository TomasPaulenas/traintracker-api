# TrainTracker API

Backend API for **TrainTracker**, a full-stack workout tracking application.

This API provides authentication and CRUD operations for workouts and exercises, using JWT authentication and PostgreSQL for persistence.

## Tech Stack

* Node.js
* Express
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT Authentication
* bcrypt

## Features

* User registration and login
* JWT authentication
* Workout management
* Exercise management
* Exercise notes
* Ownership validation (users can only access their own data)
* REST API architecture

## API Endpoints

### Auth

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/user
```

### Workouts

```
GET    /api/workouts
GET    /api/workouts/:id
POST   /api/workouts
PATCH  /api/workouts/:id
DELETE /api/workouts/:id
```

### Exercises

```
GET    /api/exercises
GET    /api/exercises/:id
POST   /api/exercises
PATCH  /api/exercises/:id
DELETE /api/exercises/:id
```

## Environment Variables

The API requires the following environment variables:

```
DATABASE_URL
JWT_SECRET
PORT
FRONTEND_URL
```

## Health Check

```
GET /api/health
```

Returns a simple response to verify that the API is running.

## Project Context

This API is part of the **TrainTracker full-stack project**
