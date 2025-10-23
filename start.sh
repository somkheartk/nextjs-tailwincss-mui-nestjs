#!/bin/bash

# Quick Start Script for Admin Panel
# This script helps you get the admin panel running quickly

set -e

echo "🚀 Admin Panel Quick Start"
echo "=========================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment files if they don't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend .env file..."
    cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env.local ]; then
    echo "📝 Creating frontend .env.local file..."
    cp frontend/.env.example frontend/.env.local
fi

# Start services
echo "🐳 Starting Docker containers..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 15

# Check if services are running
if docker ps | grep -q admin_panel_backend; then
    echo "✅ Backend is running"
else
    echo "❌ Backend failed to start"
    docker-compose logs backend
    exit 1
fi

if docker ps | grep -q admin_panel_frontend; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend failed to start"
    docker-compose logs frontend
    exit 1
fi

if docker ps | grep -q admin_panel_mongodb; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB failed to start"
    docker-compose logs mongodb
    exit 1
fi

# Seed database
echo "🌱 Seeding database with initial data..."
sleep 5
docker exec admin_panel_backend npm run seed || echo "⚠️  Seeding skipped (database might already be seeded)"

echo ""
echo "✅ Admin Panel is ready!"
echo ""
echo "📍 Access URLs:"
echo "   Frontend: http://localhost:3001"
echo "   Backend API: http://localhost:3000"
echo ""
echo "🔐 Default Credentials:"
echo "   Admin:"
echo "     Email: admin@example.com"
echo "     Password: password123"
echo ""
echo "   Demo User:"
echo "     Email: demo@example.com"
echo "     Password: demo123"
echo ""
echo "⚠️  Please change these passwords after first login!"
echo ""
echo "📚 Commands:"
echo "   Stop:    docker-compose down"
echo "   Logs:    docker-compose logs -f"
echo "   Restart: docker-compose restart"
echo ""
