# Task Management API

A RESTful API built with NestJS and MongoDB for managing projects and tasks with authentication and authorization.

##  Features

- User Authentication (Signup / Signin)
- JWT Authentication
- Role-Based Authorization
- Project CRUD Operations
- Task CRUD Operations
- Project Ownership Authorization
- Search & Pagination
- MongoDB Relationships (Populate)
- Swagger API Documentation
- Environment Variables (.env)

##  Tech Stack

- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- class-validator
- Swagger

##  Installation

```bash
npm install
```

## ▶ Run the Project

```bash
npm run start:dev
```

##  Environment Variables

Create a `.env` file using `.env.example`:

```env
PORT=3000
DATABASE_URL=mongodb://localhost/management
JWT_SECRET=your_secret
```

## 📖 API Documentation

After running the project, open:

```
http://localhost:3000/api
```