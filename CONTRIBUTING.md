# Contributing to Admin Panel

Thank you for considering contributing to this project! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:
- Clear description of the feature
- Use cases and benefits
- Possible implementation approach

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/nextjs-tailwincss-mui-nestjs.git
   cd nextjs-tailwincss-mui-nestjs
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   # Backend
   cd backend
   npm run test
   npm run build
   
   # Frontend
   cd frontend
   npm run lint
   npm run build
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Wait for review

## Development Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB (for local dev without Docker)

### Local Development

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run start:dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Edit .env.local with your configuration
   npm run dev
   ```

3. **Database**
   ```bash
   # With Docker
   docker run -d -p 27017:27017 mongo:7
   
   # Seed database
   cd backend
   npm run seed
   ```

## Code Style

### TypeScript
- Use TypeScript for all new code
- Enable strict mode
- Add types for all functions and variables
- Use interfaces over type aliases when possible

### Naming Conventions
- **Files**: kebab-case (e.g., `user-service.ts`)
- **Classes**: PascalCase (e.g., `UserService`)
- **Functions**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

### Backend (NestJS)
- Follow NestJS best practices
- Use dependency injection
- Write unit tests for services
- Use DTOs for validation
- Document APIs with Swagger (if added)

### Frontend (Next.js)
- Use functional components with hooks
- Follow React best practices
- Use TypeScript interfaces for props
- Keep components small and focused
- Use meaningful component names

### Commits
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add user profile page
fix: resolve login authentication issue
docs: update deployment guide
```

## Testing

### Backend Tests
```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage
```

### Frontend Tests
```bash
cd frontend
npm run lint          # Linting
npm run build         # Build test
```

## Documentation

- Update README.md for user-facing changes
- Update inline code comments for complex logic
- Add JSDoc comments for public APIs
- Update DEPLOY.md for deployment-related changes

## Review Process

1. All PRs require at least one review
2. CI checks must pass
3. Code must follow style guidelines
4. Tests must be included for new features
5. Documentation must be updated

## Community

- Be respectful and professional
- Help others in issues and discussions
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## Questions?

Feel free to:
- Open an issue for questions
- Start a discussion
- Contact maintainers

Thank you for contributing! 🎉
