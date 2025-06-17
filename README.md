<div align="center">

# 🎮 GameHaven Marketplace API

_A comprehensive digital video game marketplace REST API built with modern technologies, designed for scalability and ease of use._

<!-- Live Demo Badge -->
  <div style="margin: 30px 0;">
    <a href="https://gamehaven-marketplace-api.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/🚀_LIVE_SWAGGER_DEMO-Click_Here-FF6B6B?style=for-the-badge&labelColor=4ECDC4&color=FF6B6B" alt="Live Swagger Demo" style="height: 40px;" />
    </a>
  </div>

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#️-project-structure)
- [API Documentation](#-api-documentation)
- [Security](#-security-features)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Team](#-team-roles)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### Core Functionality

- **User Management**: Complete user registration, authentication, and profile management
- **Game Catalog**: Browse, search, and filter games with detailed information
- **Shopping Cart**: Add, remove, and manage items in shopping cart
- **Order Processing**: Complete order lifecycle from cart to completion
- **Reviews & Ratings**: User feedback system for games
- **Admin Panel**: Administrative controls for game and user management

### Technical Features

- **RESTful API Design**: Clean, consistent API endpoints
- **JWT Authentication**: Secure token-based authentication
- **File Upload Support**: Image uploads for game covers with validation
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Global error handling with meaningful responses
- **Request Logging**: Detailed request logging for monitoring
- **Role-Based Access**: User and Admin role separation

## 🛠️ Tech Stack

| Category           | Technology                |
| ------------------ | ------------------------- |
| **Runtime**        | Node.js (v18+)            |
| **Framework**      | Express.js                |
| **Database**       | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT)     |
| **File Upload**    | Multer                    |
| **Validation**     | Express Validator         |
| **Logging**        | Morgan + Custom Logger    |
| **Code Quality**   | Prettier                  |
| **Security**       | bcryptjs, Helmet          |

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** v18.0.0 or higher
- **MongoDB** v6.0 or higher (running locally or cloud instance)
- **npm** v8.0.0 or **yarn** v1.22.0
- **Git** for version control

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gamehaven-marketplace-api.git
cd gamehaven-marketplace-api
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/gamehaven

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# File Upload
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880

# API Configuration
API_VERSION=v1
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

### 4. Database Setup

Ensure MongoDB is running and accessible. The application will automatically create the database and collections on first run.

### 5. Start the Application

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start

# Run with debugging
npm run debug
```

## ⚙️ Configuration

### Environment Variables

| Variable         | Description               | Default     | Required |
| ---------------- | ------------------------- | ----------- | -------- |
| `PORT`           | Server port               | 3000        | No       |
| `NODE_ENV`       | Environment mode          | development | No       |
| `MONGODB_URI`    | MongoDB connection string | -           | Yes      |
| `JWT_SECRET`     | JWT signing secret        | -           | Yes      |
| `JWT_EXPIRES_IN` | JWT expiration time       | 7d          | No       |
| `UPLOAD_PATH`    | File upload directory     | uploads     | No       |
| `MAX_FILE_SIZE`  | Max file size in bytes    | 5MB         | No       |

## 🎯 Usage

### Quick Start

1. Start the server: `npm run dev`
2. The API will be available at `http://localhost:3000`
3. API documentation is available at `http://localhost:3000/api-docs` (if Swagger is configured)

### Example Requests

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get games (requires authentication)
curl -X GET http://localhost:3000/api/games \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🏗️ Project Structure

```
gamehaven-marketplace-api/
├── 📁 src/
│   ├── 📁 config/
│   │   └── database.js          # Database connection
│   ├── 📁 controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── cart.controller.js   # Cart management
│   │   ├── game.controller.js   # Game operations
│   │   ├── order.controller.js  # Order processing
│   │   └── review.controller.js # Review system
│   ├── 📁 middleware/
│   │   ├── auth.middleware.js   # Authentication middleware
│   │   ├── error.middleware.js  # Error handling
│   │   ├── logger.middleware.js # Request logging
│   │   └── upload.middleware.js # File upload handling
│   ├── 📁 models/
│   │   ├── user.model.js        # User schema
│   │   ├── game.model.js        # Game schema
│   │   ├── cart.model.js        # Cart schema
│   │   ├── order.model.js       # Order schema
│   │   └── review.model.js      # Review schema
│   ├── 📁 routes/
│   │   ├── index.js             # Route aggregator
│   │   ├── auth.routes.js       # Authentication routes
│   │   ├── game.routes.js       # Game routes
│   │   ├── cart.routes.js       # Cart routes
│   │   ├── order.routes.js      # Order routes
│   │   └── review.routes.js     # Review routes
│   ├── 📁 services/
│   │   ├── cart.service.js      # Cart business logic
│   │   └── order.service.js     # Order business logic
│   └── app.js                   # Application entry point
├── 📁 uploads/                  # File upload directory
├── 📁 tests/                    # Test files
├── 📁 docs/                     # Documentation
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 📚 API Documentation

### Swagger UI

The API documentation is available through Swagger UI at:

- Development: `http://localhost:3000/docs`
- Production: `https://gamehaven-marketplace-api.vercel.app/docs`

### Base URL

```
Development: http://localhost:3000/api
Production: https://gamehaven-marketplace-api.vercel.app/api
```

### Authentication Endpoints

| Method | Endpoint         | Description         | Auth Required |
| ------ | ---------------- | ------------------- | ------------- |
| POST   | `/auth/register` | Register new user   | No            |
| POST   | `/auth/login`    | User login          | No            |
| POST   | `/auth/logout`   | User logout         | Yes           |
| GET    | `/auth/profile`  | Get user profile    | Yes           |
| PUT    | `/auth/profile`  | Update user profile | Yes           |

### Game Endpoints

| Method | Endpoint            | Description               | Auth Required |
| ------ | ------------------- | ------------------------- | ------------- |
| GET    | `/games`            | Get all games             | No            |
| GET    | `/games/:id`        | Get single game           | No            |
| POST   | `/games`            | Create game (Admin)       | Yes           |
| PUT    | `/games/:id`        | Update game (Admin)       | Yes           |
| DELETE | `/games/:id`        | Delete game (Admin)       | Yes           |
| POST   | `/games/:id/upload` | Upload game cover (Admin) | Yes           |

### Cart Endpoints

| Method | Endpoint               | Description           | Auth Required |
| ------ | ---------------------- | --------------------- | ------------- |
| GET    | `/cart`                | Get user cart         | Yes           |
| POST   | `/cart/add`            | Add item to cart      | Yes           |
| PUT    | `/cart/update`         | Update cart item      | Yes           |
| DELETE | `/cart/remove/:gameId` | Remove item from cart | Yes           |
| DELETE | `/cart/clear`          | Clear entire cart     | Yes           |

### Request/Response Examples

#### User Registration

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64a7b8c9d1e2f3g4h5i6j7k8",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Create Game (Admin)

```http
POST /api/games
Content-Type: multipart/form-data
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "The Legend of Zelda: Breath of the Wild",
  "description": "An action-adventure game set in a vast open world",
  "price": 59.99,
  "platform": "Nintendo Switch",
  "genre": "Adventure",
  "stock": 50,
  "coverImage": (binary)
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "game": {
      "id": "64a7b8c9d1e2f3g4h5i6j7k8",
      "title": "The Legend of Zelda: Breath of the Wild",
      "description": "An action-adventure game set in a vast open world",
      "price": 59.99,
      "platform": "Nintendo Switch",
      "genre": "Adventure",
      "stock": 50,
      "coverImage": "https://example.com/images/zelda.jpg"
    }
  }
}
```

## 🚀 Deployment

### Vercel Deployment

The API is deployed on Vercel. The deployment process is automated through GitHub integration:

1. Push changes to the main branch
2. Vercel automatically builds and deploys
3. Environment variables are configured in Vercel dashboard

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRES_IN=7d
```

### Project Structure

```
gamehaven-marketplace-api/
├── 📁 src/
│   ├── 📁 config/
│   │   ├── database.js          # Database connection
│   │   └── swagger.js           # Swagger documentation config
│   ├── 📁 controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── cart.controller.js   # Cart management
│   │   └── game.controller.js   # Game operations
│   ├── 📁 middleware/
│   │   ├── auth.middleware.js   # Authentication middleware
│   │   ├── error.middleware.js  # Error handling
│   │   └── upload.middleware.js # File upload handling
│   ├── 📁 models/
│   │   ├── user.model.js        # User schema
│   │   ├── game.model.js        # Game schema
│   │   └── cart.model.js        # Cart schema
│   ├── 📁 routes/
│   │   ├── auth.routes.js       # Authentication routes
│   │   ├── game.routes.js       # Game routes
│   │   └── cart.routes.js       # Cart routes
│   ├── 📁 public/              # Static files
│   │   └── index.html          # Swagger UI
│   └── app.js                  # Application entry point
├── 📁 uploads/                 # File upload directory
├── .env.example               # Environment template
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies and scripts
├── vercel.json              # Vercel configuration
└── README.md                # This file
```

### Vercel Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/app.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/docs",
      "dest": "/public/index.html"
    },
    {
      "src": "/api-docs.json",
      "dest": "/src/app.js"
    },
    {
      "src": "/api/(.*)",
      "dest": "/src/app.js"
    }
  ]
}
```

## 🔐 Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Implementation**: Secure token-based authentication
- **Input Validation**: Comprehensive request validation using express-validator
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Cross-origin resource sharing controls
- **Helmet Integration**: Security headers middleware
- **Environment Variables**: Sensitive data protection
- **Role-Based Access Control**: User and Admin role separation
- **File Upload Security**: File type and size validation

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration
```

## 🚀 Deployment

### Docker Deployment

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 👥 Team Roles

| Team Member            | Role                     | Responsibilities                                           |
| ---------------------- | ------------------------ | ---------------------------------------------------------- |
| **Mohamed Gamal**      | 👑 **Team Leader**       | User Registration, User Login, Authentication & Validation |
| **Abdelrhman Mohamed** | 🛒 **Cart Specialist**   | Add Game to Cart, View Cart Implementation                 |
| **Mohamed Rafat**      | 🎮 **Game Catalog Lead** | View Games Catalog, Single Game View                       |
| **Rahaf Hazem**        | 💼 **Orders & Admin**    | Place Order, Admin Game Management                         |

## 🔄 Development Workflow

### Individual Team Member Workflow

#### 👑 Mohamed Gamal (Team Leader - Authentication)

**Tasks**: User Registration & Login, Authentication Middleware, Validation

- **Branch**: `feat/auth-system`
- **Files to work on**:
  - `src/controllers/auth.controller.js`
  - `src/middleware/auth.middleware.js`
  - `src/models/user.model.js`
  - `src/routes/auth.routes.js`
- **Commits**:
  - `feat(auth): implement user registration endpoint`
  - `feat(auth): add login functionality with JWT`
  - `feat(middleware): create authentication middleware`
  - `feat(validation): add input validation for auth routes`

#### 🛒 Abdelrhman Mohamed (Cart Management)

**Tasks**: Shopping Cart Operations

- **Branch**: `feat/cart-management`
- **Files to work on**:
  - `src/controllers/cart.controller.js`
  - `src/models/cart.model.js`
  - `src/routes/cart.routes.js`
  - `src/services/cart.service.js`
- **Commits**:
  - `feat(cart): implement add item to cart functionality`
  - `feat(cart): create view cart endpoint`
  - `feat(cart): add update cart item quantity`
  - `feat(cart): implement remove item from cart`

#### 🎮 Mohamed Rafat (Game Catalog)

**Tasks**: Game Display and Management

- **Branch**: `feat/game-catalog`
- **Files to work on**:
  - `src/controllers/game.controller.js`
  - `src/models/game.model.js`
  - `src/routes/game.routes.js`
  - `src/middleware/upload.middleware.js`
- **Commits**:
  - `feat(games): create view all games endpoint`
  - `feat(games): implement single game view`
  - `feat(games): add game search and filter functionality`
  - `feat(upload): implement game cover image upload`

#### 💼 Rahaf Hazem (Orders & Admin)

**Tasks**: Order Processing and Admin Features

- **Branch**: `feat/orders-admin`
- **Files to work on**:
  - `src/controllers/order.controller.js`
  - `src/models/order.model.js`
  - `src/routes/order.routes.js`
  - `src/services/order.service.js`
- **Commits**:
  - `feat(orders): implement place order functionality`
  - `feat(orders): create order history endpoint`
  - `feat(admin): add admin game management features`
  - `feat(admin): implement order status management`

### Branch Strategy

- `main` - Production ready code
- `develop` - Integration branch
- `feat/feature-name` - Feature development
- `fix/bug-name` - Bug fixes
- `docs/doc-name` - Documentation updates

### Commit Convention

```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc)
- refactor: Code refactoring
- test: Adding or updating tests
- chore: Maintenance tasks
- perf: Performance improvements
- ci: CI/CD changes
- build: Build system changes
- revert: Reverting previous commits

Examples:
feat(auth): add JWT token refresh functionality
fix(cart): resolve cart item duplication issue
docs(readme): update API documentation
refactor(models): optimize database queries
style(controllers): format code with prettier
test(auth): add unit tests for login functionality
chore(deps): update dependencies to latest versions
perf(database): optimize query performance
```

### Code Quality Standards

- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **Conventional Commits**: Standardized commit messages

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feat/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feat/amazing-feature`)
5. **Open** a Pull Request

### Pull Request Guidelines

- Provide clear description of changes
- Include relevant tests
- Update documentation if needed
- Ensure all checks pass

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/gamehaven-marketplace-api/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/gamehaven-marketplace-api/discussions)
- **Email**: support@gamehaven.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- MongoDB team for the robust database solution
- All contributors who helped make this project better

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star!**

_Made with ❤️ by the GameHaven Team_

</div>
