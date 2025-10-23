#!/bin/bash

# Digital Ocean Droplet Deployment Script
# This script sets up the admin panel on a fresh Ubuntu/Debian droplet

set -e

echo "🚀 Starting Admin Panel Deployment..."

# Update system
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Start Docker
systemctl start docker
systemctl enable docker

# Clone repository
echo "📥 Cloning repository..."
cd /opt
git clone https://github.com/somkheartk/nextjs-tailwincss-mui-nestjs.git
cd nextjs-tailwincss-mui-nestjs

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check service status
echo "✅ Checking service status..."
docker-compose ps

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://$(curl -s ifconfig.me):3001"
echo "   Backend API: http://$(curl -s ifconfig.me):3000"
echo ""
echo "📝 Next steps:"
echo "   1. Create an admin user using the API"
echo "   2. Configure your domain (optional)"
echo "   3. Set up SSL/TLS certificates"
echo ""
