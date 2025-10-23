# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Browser                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend (Port 3001)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  • React Components with MUI                         │   │
│  │  • TailwindCSS for styling                           │   │
│  │  • Context API for state management                  │   │
│  │  • Axios for API calls                               │   │
│  │  • JWT token handling                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   NestJS Backend (Port 3000)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Controllers                                         │   │
│  │  ├── AuthController (login, register)               │   │
│  │  └── UsersController (CRUD operations)              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Services                                            │   │
│  │  ├── AuthService (JWT, bcrypt)                      │   │
│  │  └── UsersService (business logic)                  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Guards & Middleware                                 │   │
│  │  ├── JwtAuthGuard (protected routes)                │   │
│  │  ├── ValidationPipe (DTO validation)                │   │
│  │  └── CORS (cross-origin)                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Mongoose ODM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Database (Port 27017)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Collections                                         │   │
│  │  └── users                                           │   │
│  │     ├── _id (ObjectId)                               │   │
│  │     ├── name (String)                                │   │
│  │     ├── email (String, unique)                       │   │
│  │     ├── password (String, hashed)                    │   │
│  │     ├── role (String)                                │   │
│  │     ├── isActive (Boolean)                           │   │
│  │     ├── createdAt (Date)                             │   │
│  │     └── updatedAt (Date)                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌────────┐                                      ┌────────┐
│ Client │                                      │Backend │
└───┬────┘                                      └───┬────┘
    │                                               │
    │  1. POST /auth/login                          │
    │  { email, password }                          │
    ├──────────────────────────────────────────────►│
    │                                               │
    │                     2. Validate credentials   │
    │                        (bcrypt.compare)       │
    │                                               │
    │                     3. Generate JWT token     │
    │                                               │
    │  4. Return { access_token, user }             │
    │◄──────────────────────────────────────────────┤
    │                                               │
    │  5. Store token in localStorage               │
    │                                               │
    │  6. GET /users                                │
    │  Authorization: Bearer <token>                │
    ├──────────────────────────────────────────────►│
    │                                               │
    │                     7. Verify JWT token       │
    │                        (JwtAuthGuard)         │
    │                                               │
    │  8. Return users data                         │
    │◄──────────────────────────────────────────────┤
    │                                               │
```

## Data Flow

### User Registration
1. User submits registration form
2. Frontend validates input
3. POST request to `/auth/register`
4. Backend validates DTO with class-validator
5. Password is hashed with bcrypt
6. User document is created in MongoDB
7. Auto-login after successful registration

### User Login
1. User submits login form
2. POST request to `/auth/login`
3. Backend finds user by email
4. Password is compared with bcrypt
5. JWT token is generated
6. Token and user info returned to frontend
7. Token stored in localStorage
8. User redirected to dashboard

### Protected Routes
1. Frontend includes JWT token in Authorization header
2. Backend validates token with JwtAuthGuard
3. Request proceeds if token is valid
4. 401 Unauthorized if token is invalid/missing

## Technology Stack Details

### Frontend (Next.js)
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: 
  - TailwindCSS for utility classes
  - Material-UI (MUI) for components
  - Emotion for CSS-in-JS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Authentication**: JWT tokens in localStorage

### Backend (NestJS)
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: 
  - JWT (JSON Web Tokens)
  - Passport.js with passport-jwt strategy
- **Validation**: class-validator, class-transformer
- **Security**: bcrypt for password hashing

### Database (MongoDB)
- **Version**: 7.0
- **ODM**: Mongoose
- **Features**:
  - Document-based storage
  - Automatic timestamps
  - Schema validation
  - Indexing on unique fields

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Digital Ocean (App Platform or Droplets)

## Security Features

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Passwords never stored in plain text

2. **Authentication**
   - JWT tokens with expiration
   - Secure token storage
   - Protected API routes

3. **Validation**
   - Input validation with class-validator
   - DTO (Data Transfer Objects) pattern
   - Type checking with TypeScript

4. **CORS**
   - Configured for specific origins
   - Credentials support

5. **Environment Variables**
   - Sensitive data in .env files
   - Not committed to version control

## Scalability Considerations

### Horizontal Scaling
- Stateless backend design
- JWT tokens (no session storage)
- Can run multiple backend instances behind load balancer

### Database Scaling
- MongoDB supports:
  - Replication for high availability
  - Sharding for horizontal scaling
  - Indexing for performance

### Caching (Future Enhancement)
- Redis for session/token caching
- API response caching
- Database query caching

### Load Balancing (Future Enhancement)
- Nginx or cloud load balancer
- Distribute traffic across instances
- Health checks and auto-scaling

## Development vs Production

### Development
- Hot reload for both frontend and backend
- Debug mode enabled
- Development database
- Detailed error messages

### Production
- Optimized builds
- Minified assets
- Production database with backups
- Error logging and monitoring
- Security headers
- Rate limiting
