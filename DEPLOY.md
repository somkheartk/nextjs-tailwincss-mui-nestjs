# Digital Ocean Deployment Guide

This guide provides step-by-step instructions for deploying the Admin Panel on Digital Ocean.

## 🚀 One-Click Deploy Options

### Option 1: App Platform (Recommended for Production)

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/somkheartk/nextjs-tailwincss-mui-nestjs/tree/main)

**Steps:**

1. **Click the Deploy Button** above or manually create an app

2. **Configure the App**
   - Choose your region
   - Connect your GitHub repository
   - App Platform will auto-detect the configuration from `.do/app.yaml`

3. **Add Database**
   - Digital Ocean will automatically provision a MongoDB database
   - Connection string will be available as `${db.DATABASE_URL}`

4. **Set Environment Variables**
   - `JWT_SECRET`: Set a strong random string (e.g., use `openssl rand -base64 32`)
   - Other variables are auto-configured from app.yaml

5. **Review and Deploy**
   - Review the configuration
   - Click "Create Resources"
   - Wait for deployment (typically 5-10 minutes)

6. **Access Your Application**
   - Frontend URL will be provided (e.g., https://your-app.ondigitalocean.app)
   - Backend API will be at /api path

7. **Create Admin User**
   ```bash
   curl -X POST https://your-app.ondigitalocean.app/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Admin User",
       "email": "admin@example.com",
       "password": "YourSecurePassword123!",
       "role": "admin"
     }'
   ```

**Cost Estimate:**
- 2x Basic instances ($5/mo each) = $10/mo
- Managed MongoDB database ($15/mo) = $15/mo
- **Total: ~$25/month**

---

### Option 2: Docker on Droplet (Cost-Effective)

**Steps:**

1. **Create a Droplet**
   - Go to [Digital Ocean Console](https://cloud.digitalocean.com/droplets)
   - Click "Create Droplet"
   - Choose Ubuntu 22.04 LTS
   - Select size (minimum 2GB RAM recommended = $12/mo)
   - Choose datacenter region
   - Add SSH key
   - Click "Create Droplet"

2. **SSH into Droplet**
   ```bash
   ssh root@your_droplet_ip
   ```

3. **Run Deployment Script**
   ```bash
   curl -sSL https://raw.githubusercontent.com/somkheartk/nextjs-tailwincss-mui-nestjs/main/deploy-digitalocean.sh | bash
   ```

   Or manually:
   ```bash
   # Update system
   apt-get update && apt-get upgrade -y

   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh

   # Install Docker Compose
   curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   chmod +x /usr/local/bin/docker-compose

   # Clone and deploy
   cd /opt
   git clone https://github.com/somkheartk/nextjs-tailwincss-mui-nestjs.git
   cd nextjs-tailwincss-mui-nestjs
   docker-compose up -d
   ```

4. **Configure Firewall**
   ```bash
   ufw allow 22/tcp
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw allow 3000/tcp
   ufw allow 3001/tcp
   ufw enable
   ```

5. **Access Application**
   - Frontend: `http://your_droplet_ip:3001`
   - Backend: `http://your_droplet_ip:3000`

6. **Set Up Domain (Optional)**
   - Point your domain's A record to droplet IP
   - Update docker-compose.yml with your domain
   - Set up Nginx reverse proxy with SSL

**Cost Estimate:**
- 2GB Droplet = $12/mo
- **Total: $12/month**

---

## 🔒 Production Security Setup

### 1. Set Strong Passwords
Edit `docker-compose.yml`:
```yaml
environment:
  MONGO_INITDB_ROOT_PASSWORD: your-strong-password
  JWT_SECRET: your-random-secret-key
```

### 2. Set Up SSL/TLS with Let's Encrypt

Install Certbot:
```bash
apt-get install certbot python3-certbot-nginx
```

Get certificate:
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 3. Configure Nginx Reverse Proxy

Create `/etc/nginx/sites-available/admin-panel`:
```nginx
upstream backend {
    server localhost:3000;
}

upstream frontend {
    server localhost:3001;
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        rewrite ^/api/(.*) /$1 break;
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/admin-panel /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 4. Set Up Monitoring

Install monitoring tools:
```bash
docker run -d --name=netdata \
  -p 19999:19999 \
  -v netdataconfig:/etc/netdata \
  -v netdatalib:/var/lib/netdata \
  -v netdatacache:/var/cache/netdata \
  -v /etc/passwd:/host/etc/passwd:ro \
  -v /etc/group:/host/etc/group:ro \
  -v /proc:/host/proc:ro \
  -v /sys:/host/sys:ro \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --restart=unless-stopped \
  netdata/netdata
```

### 5. Set Up Backups

MongoDB backup script:
```bash
#!/bin/bash
BACKUP_DIR="/backup/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

docker exec admin_panel_mongodb mongodump \
  --username admin \
  --password password123 \
  --authenticationDatabase admin \
  --out /dump

docker cp admin_panel_mongodb:/dump $BACKUP_DIR/$DATE
```

Add to crontab:
```bash
crontab -e
# Add: 0 2 * * * /root/backup-mongodb.sh
```

---

## 🔧 Troubleshooting

### Services Not Starting
```bash
# Check logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Database Connection Issues
```bash
# Check MongoDB is running
docker ps | grep mongodb

# Check MongoDB logs
docker logs admin_panel_mongodb

# Test connection
docker exec -it admin_panel_mongodb mongo -u admin -p password123
```

### Frontend Can't Connect to Backend
1. Check CORS configuration in backend
2. Verify NEXT_PUBLIC_API_URL in frontend
3. Check firewall rules
4. Verify network configuration

---

## 📊 Monitoring and Logs

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Monitor Resources
```bash
# Docker stats
docker stats

# System resources
htop

# Disk usage
df -h
docker system df
```

---

## 🔄 Updates and Maintenance

### Update Application
```bash
cd /opt/nextjs-tailwincss-mui-nestjs
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Clean Up
```bash
# Remove unused Docker resources
docker system prune -a

# Remove old images
docker image prune -a
```

---

## 📞 Support

For issues with deployment:
1. Check logs first: `docker-compose logs -f`
2. Review this guide
3. Open an issue on GitHub
4. Check Digital Ocean community forums

---

## 🎯 Quick Reference

### Common Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart service
docker-compose restart backend

# Update and redeploy
git pull && docker-compose up -d --build

# Create admin user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"pass123","role":"admin"}'
```

### Default Ports
- Frontend: 3001
- Backend: 3000
- MongoDB: 27017
- Netdata: 19999

### Environment Files
- Backend: `/opt/nextjs-tailwincss-mui-nestjs/backend/.env`
- Frontend: `/opt/nextjs-tailwincss-mui-nestjs/frontend/.env.local`
- Docker: `/opt/nextjs-tailwincss-mui-nestjs/docker-compose.yml`
