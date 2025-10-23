# Admin Panel - Next.js + TailwindCSS + MUI + NestJS + MongoDB

A modern, full-stack admin panel built with Next.js, TailwindCSS, Material-UI (MUI), NestJS, and MongoDB.

## 🚀 Features

- **Frontend**: Next.js 16 with TypeScript, TailwindCSS, and Material-UI
- **Backend**: NestJS with MongoDB integration
- **Authentication**: JWT-based authentication system
- **User Management**: Full CRUD operations for users
- **Responsive Design**: Mobile-friendly interface with MUI components
- **Docker Support**: Fully containerized with Docker Compose
- **One-Click Deploy**: Ready for Digital Ocean deployment

## 📋 Prerequisites

- Node.js 18+ (for local development)
- Docker and Docker Compose (for containerized deployment)
- MongoDB (included in Docker setup)

## 🏃 Quick Start

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/somkheartk/nextjs-tailwincss-mui-nestjs.git
cd nextjs-tailwincss-mui-nestjs
```

2. **Set up Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run start:dev
```

3. **Set up Frontend**
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

### Docker Deployment

1. **Start all services**
```bash
docker-compose up -d
```

2. **Access the application**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- MongoDB: localhost:27017

## 🔐 Default Credentials

To create an admin user, you can use the API directly:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

Then login with:
- Email: admin@example.com
- Password: password123

## 🌊 Digital Ocean One-Click Deploy

### Option 1: Using Docker Compose on Droplet

1. **Create a Droplet**
   - Go to Digital Ocean Console
   - Create a new Droplet with Docker pre-installed
   - Choose your preferred size (minimum 2GB RAM recommended)

2. **SSH into your Droplet**
```bash
ssh root@your_droplet_ip
```

3. **Clone and deploy**
```bash
git clone https://github.com/somkheartk/nextjs-tailwincss-mui-nestjs.git
cd nextjs-tailwincss-mui-nestjs
docker-compose up -d
```

4. **Configure domain (optional)**
   - Point your domain to the Droplet IP
   - Update environment variables in docker-compose.yml

### Option 2: Using Digital Ocean App Platform

1. **Fork this repository** to your GitHub account

2. **Create a new App**
   - Go to Digital Ocean App Platform
   - Click "Create App"
   - Connect your GitHub repository

3. **Configure Components**
   
   **MongoDB Database:**
   - Add a managed MongoDB database
   - Note the connection string

   **Backend Service:**
   - Set build command: `cd backend && npm install && npm run build`
   - Set run command: `cd backend && node dist/main`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Random secure string
     - `FRONTEND_URL`: Your frontend URL
   - Set HTTP port: 3000

   **Frontend Service:**
   - Set build command: `cd frontend && npm install && npm run build`
   - Set run command: `cd frontend && node .next/standalone/server.js`
   - Add environment variables:
     - `NEXT_PUBLIC_API_URL`: Your backend URL
   - Set HTTP port: 3001

4. **Deploy**
   - Review and create the app
   - Digital Ocean will automatically deploy your application

## 📁 Project Structure

```
.
├── backend/                  # NestJS Backend
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── users/           # Users module
│   │   ├── app.module.ts    # Main application module
│   │   └── main.ts          # Application entry point
│   ├── Dockerfile           # Backend Docker configuration
│   └── package.json
├── frontend/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   ├── lib/             # Utilities
│   │   └── types/           # TypeScript types
│   ├── Dockerfile           # Frontend Docker configuration
│   └── package.json
├── docker-compose.yml        # Docker Compose configuration
└── README.md
```

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/admin_panel
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3001
```

### Frontend Environment Variables

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Axios
- **State Management**: React Context API

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **Validation**: class-validator

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Ready for Nginx/Traefik
- **Database**: MongoDB

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Users (Protected)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🧪 Testing

### Backend
```bash
cd backend
npm run test
npm run test:e2e
```

### Frontend
```bash
cd frontend
npm run lint
npm run build
```

## 🚀 Production Deployment

### Security Checklist
- [ ] Change all default passwords
- [ ] Set strong JWT_SECRET
- [ ] Configure CORS properly
- [ ] Set up SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Configure logging and monitoring

### Performance Optimization
- [ ] Enable Redis for caching
- [ ] Configure CDN for static assets
- [ ] Set up load balancing
- [ ] Optimize database indexes
- [ ] Enable compression

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.
