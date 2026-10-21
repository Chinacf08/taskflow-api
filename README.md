
# TaskFlow API

**Independent Backend Development Portfolio Project**

TaskFlow is a REST API for managing personal tasks, developed with NestJS, TypeScript, and MongoDB.

This is an independent portfolio project created for learning and demonstration purposes. It is not affiliated with any employer or client project.

## Features

- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Create, read, update, and delete tasks
- Task statuses: `todo`, `in_progress`, and `done`
- Task ownership and user access control
- Request validation
- Swagger/OpenAPI documentation
- MongoDB database integration
- Automated unit tests

## Tech Stack

- **Backend:** NestJS 12, Node.js, TypeScript
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, Passport, bcrypt
- **Documentation:** Swagger/OpenAPI
- **Testing:** Jest
- **Tools:** Docker, Git, npm

## Requirements

- Node.js 24.9 or newer
- npm
- Docker Desktop or a local MongoDB installation
- Git (optional)

## Installation

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd taskflow-api
```

Replace `YOUR_REPOSITORY_URL` with the GitHub repository URL after publication.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file using `.env.example` as a template.

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1h
```

Replace `JWT_SECRET` with a strong, randomly generated secret.

Never commit your actual `.env` file.

### 4. Start MongoDB

```bash
docker compose up -d
```

### 5. Start the application

```bash
npm run start:dev
```

The application will run at:

http://localhost:3000

## API Documentation

Swagger documentation is available at:

http://localhost:3000/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive a JWT |
| GET | `/api/tasks` | Retrieve the user's tasks |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/:id` | Retrieve a specific task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Task endpoints require JWT authentication.

## Authentication

After logging in, the API returns a JWT access token.

Include the token in requests to protected endpoints:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Users can only access tasks belonging to their own account.

## Testing

Build the application:

```bash
npm run build
```

Run unit tests using ESM support:

### Windows PowerShell

```powershell
$env:NODE_OPTIONS="--experimental-vm-modules"
npm.cmd test
```

### macOS / Linux

```bash
NODE_OPTIONS=--experimental-vm-modules npm test
```

The project includes unit tests that verify:

- Invalid task identifiers are rejected.
- Users cannot delete tasks belonging to other accounts.

## Security

TaskFlow implements:

- JWT-based authentication
- Password hashing
- Task ownership validation
- Request validation
- Environment-based configuration
- Protected API endpoints

The most recent local production dependency audit reported zero known vulnerabilities:

```bash
npm audit --omit=dev
```

This project is intended for demonstration purposes and is not production-hardened.

Additional integration tests, rate limiting, monitoring, and deployment security controls would be required before production use.

## Project Structure

```text
src/
  auth/
  tasks/
  main.ts
```

The project separates authentication and task management into dedicated NestJS modules.

## Project Purpose

TaskFlow was developed to demonstrate practical backend development skills, including REST API design, authentication, access control, database integration, and automated testing.

The application is an independent portfolio project.
