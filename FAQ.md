# Frequently Asked Questions (FAQ)

## General Questions

### What is this project?
This is a full-stack admin panel built with Next.js (frontend), NestJS (backend), and MongoDB (database). It demonstrates modern web development practices with TypeScript, includes authentication, user management, and is ready for production deployment.

### Who is this for?
- Developers learning full-stack development
- Teams needing a quick admin panel starter
- Projects requiring user management with authentication
- Anyone wanting to see Next.js + NestJS + MongoDB in action

### What can I build with this?
You can use this as a foundation for:
- Admin dashboards
- SaaS applications
- Content management systems
- User management portals
- Any application requiring authentication and CRUD operations

## Setup Questions

### Do I need Docker?
For the easiest setup, yes. Docker containers ensure consistency across all environments. However, you can run the frontend and backend separately without Docker if you have Node.js and MongoDB installed.

### What are the system requirements?
- **With Docker**: 4GB RAM, 10GB disk space
- **Without Docker**: Node.js 18+, MongoDB 7+, 2GB RAM

### How do I get started quickly?
```bash
git clone https://github.com/somkheartk/nextjs-tailwincss-mui-nestjs.git
cd nextjs-tailwincss-mui-nestjs
./start.sh
```
Visit http://localhost:3001 and login with admin@example.com / password123

### The start script doesn't work. What should I do?
1. Make sure Docker is running: `docker ps`
2. Check if ports 3000, 3001, 27017 are available
3. Make the script executable: `chmod +x start.sh`
4. Try manual setup instead (see README.md)

## Development Questions

### How do I run just the frontend?
```bash
cd frontend
npm install
npm run dev
```
The frontend will be at http://localhost:3001

### How do I run just the backend?
```bash
cd backend
npm install
npm run start:dev
```
Make sure MongoDB is running first.

### Can I use a different database?
Yes, but you'll need to modify the backend. NestJS supports PostgreSQL, MySQL, and other databases through TypeORM. See [NestJS database documentation](https://docs.nestjs.com/techniques/database).

### How do I add new API endpoints?
1. Create a new module: `nest g module feature-name`
2. Create controller: `nest g controller feature-name`
3. Create service: `nest g service feature-name`
4. Add your business logic
5. Register in app.module.ts

### How do I add new pages in the frontend?
1. Create a new folder in `frontend/src/app/`
2. Add `page.tsx` in that folder
3. Next.js will automatically create the route
4. Add navigation links in your components

### How do I customize the styling?
- **TailwindCSS**: Edit `tailwind.config.ts`
- **MUI Theme**: Create a theme provider in the layout
- **Global CSS**: Edit `globals.css`

## Authentication Questions

### How does authentication work?
1. User logs in with email/password
2. Backend validates credentials
3. JWT token is generated and returned
4. Frontend stores token in localStorage
5. Token is sent with each API request
6. Backend validates token for protected routes

### How long do tokens last?
24 hours by default. You can change this in `backend/src/auth/auth.module.ts`:
```typescript
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '24h' }, // Change this
}),
```

### How do I add password reset?
You'll need to:
1. Add email service (nodemailer, sendgrid)
2. Create reset token generation
3. Create reset endpoints in auth controller
4. Add reset page in frontend

### Can I use OAuth (Google, GitHub)?
Yes, you can integrate OAuth with Passport.js. You'll need to:
1. Install passport strategies (`passport-google-oauth20`, etc.)
2. Configure OAuth in auth module
3. Add OAuth buttons in frontend
4. Handle OAuth callbacks

## Deployment Questions

### How do I deploy to production?
See [DEPLOY.md](DEPLOY.md) for detailed instructions. Quick options:
- Digital Ocean App Platform (easiest)
- Digital Ocean Droplet with Docker
- Any VPS with Docker support
- Vercel (frontend) + Railway (backend + DB)

### What's the cheapest way to deploy?
A single Digital Ocean Droplet with Docker Compose (~$12/month) running all services is the most cost-effective.

### Do I need a domain name?
No, but it's recommended for production. You can use the IP address provided by your hosting service initially.

### How do I set up SSL/HTTPS?
See the SSL section in [DEPLOY.md](DEPLOY.md). Use Let's Encrypt with Certbot for free SSL certificates.

### Can I deploy frontend and backend separately?
Yes! Deploy:
- Frontend to Vercel, Netlify, or Digital Ocean
- Backend to Railway, Heroku, or Digital Ocean
- Database to MongoDB Atlas or Digital Ocean Managed Database

Just update the environment variables to point to the correct URLs.

## Database Questions

### How do I backup the database?
```bash
# Using mongodump
docker exec admin_panel_mongodb mongodump --out /backup

# Or use MongoDB Atlas for automatic backups
```

### How do I restore a backup?
```bash
docker exec admin_panel_mongodb mongorestore /backup
```

### Can I see the database contents?
Yes, use MongoDB Compass or any MongoDB client:
```
mongodb://admin:password123@localhost:27017
```

### How do I reset the database?
```bash
docker compose down -v  # Removes volumes
docker compose up -d
```

### How do I seed sample data?
```bash
cd backend
npm run seed
```

## Troubleshooting

### Port already in use error
```bash
# Find what's using the port
lsof -i :3000  # or :3001, :27017

# Kill the process or change ports in docker-compose.yml
```

### Cannot connect to MongoDB
1. Check if MongoDB is running: `docker ps`
2. Check connection string in `.env`
3. Try: `docker compose restart mongodb`
4. Check logs: `docker compose logs mongodb`

### Frontend can't reach backend
1. Check CORS configuration in backend
2. Verify `NEXT_PUBLIC_API_URL` in frontend
3. Check if backend is running
4. Test API directly: `curl http://localhost:3000`

### Docker build fails
1. Check Docker is running
2. Try: `docker compose build --no-cache`
3. Check disk space: `df -h`
4. Remove old images: `docker system prune -a`

### Login doesn't work
1. Check backend logs: `docker compose logs backend`
2. Verify user exists (run seed script)
3. Check browser console for errors
4. Verify JWT_SECRET is set

### Build errors
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check Node.js version (needs 18+)
4. Clear build caches

## Performance Questions

### How many users can this handle?
With default setup: hundreds to thousands of concurrent users. For more:
- Add Redis caching
- Use MongoDB replica sets
- Deploy multiple backend instances with load balancer
- Use CDN for frontend assets

### How do I optimize performance?
1. Enable caching (Redis)
2. Add database indexes
3. Optimize API queries
4. Use pagination for large datasets
5. Implement rate limiting
6. Use CDN for static assets

### Is it production-ready?
The core functionality is production-ready, but you should:
- Change all default passwords
- Set up monitoring
- Configure backups
- Enable rate limiting
- Set up error tracking (Sentry)
- Add comprehensive logging

## Security Questions

### Is this secure?
Basic security is implemented:
- Password hashing with bcrypt
- JWT authentication
- Input validation
- CORS protection
- Environment variables for secrets

For production, also add:
- Rate limiting
- HTTPS/SSL
- Security headers
- Regular updates
- Penetration testing

### How do I change default passwords?
1. Update seed script or register new admin
2. Delete old admin user
3. Change MongoDB password in docker-compose.yml
4. Update JWT_SECRET in .env

### Should I commit .env files?
NO! .env files contain secrets and should never be committed. Use .env.example as templates.

## Contributing Questions

### How can I contribute?
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. We welcome:
- Bug reports
- Feature requests
- Code contributions
- Documentation improvements
- Testing and feedback

### I found a bug. What should I do?
Create an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

### Can I use this commercially?
Yes! This project is MIT licensed. You can use it for commercial projects.

## Additional Resources

- [README.md](README.md) - Main documentation
- [DEPLOY.md](DEPLOY.md) - Deployment guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Material-UI Docs](https://mui.com)
- [TailwindCSS Docs](https://tailwindcss.com)

## Still have questions?

Feel free to:
- Open an issue on GitHub
- Start a discussion
- Check existing issues for similar questions
