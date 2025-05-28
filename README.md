# 🎮 GameHaven API

<div align="center">

![GameHaven Logo](https://img.shields.io/badge/🎮-GameHaven-blue?style=for-the-badge&logoColor=white)

**A powerful RESTful API for the ultimate digital video game marketplace**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-brightgreen?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange?style=flat-square&logo=express)](https://expressjs.com/)

[🚀 Quick Start](#-quick-start) • [📖 API Docs](#-api-documentation) • [🛠️ Tech Stack](#️-tech-stack) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ Features

<div align="center">
  
GameHaven API provides everything you need to build a modern gaming marketplace:

| Feature | Description | Status |
|---------|-------------|---------|
| 🔐 **Authentication** | JWT-based user auth with role management | 🕒 In Progress |
| 🎮 **Game Management** | CRUD operations for game catalog | 🕒 In Progress |
| 🛒 **Shopping Cart** | Persistent cart with real-time updates | 🕒 In Progress |
| 📦 **Order Processing** | Complete order lifecycle management | 🕒 In Progress |
| ⭐ **Review System** | User reviews and ratings | 🕒 In Progress |
| 🔍 **Search & Filter** | Advanced game discovery | 🕒 In Progress |
| 📊 **Admin Dashboard** | Administrative controls | 🕒 In Progress |
| 🔒 **Security** | Input validation & sanitization | 🕒 In Progress |

</div>

## 🛠️ Tech Stack

<div align="center">

| Backend | Database | Authentication | Validation |
|---------|----------|----------------|------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) | ![Express Validator](https://img.shields.io/badge/Express_Validator-000000?style=for-the-badge&logo=express&logoColor=white) |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) | ![Bcrypt](https://img.shields.io/badge/Bcrypt-3178C6?style=for-the-badge&logo=letsencrypt&logoColor=white) | |

</div>

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

```bash
# Check your versions
node --version    # v14.0.0 or higher
npm --version     # v6.0.0 or higher
mongod --version  # v4.4 or higher
```

## 🚀 Quick Start

### 1️⃣ Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/gamehaven-api.git
cd gamehaven-api

# Install dependencies
npm install
```

### 2️⃣ Environment Setup

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/gamehaven

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Optional: Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 3️⃣ Database Setup

```bash
# Start MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4️⃣ Launch the API

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start

# Run tests
npm test
```

🎉 **Success!** Your API is now running at `http://localhost:3000`

## 📖 API Documentation

<div align="center">
  
<h3> 🔐 Authentication Endpoints </h3>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `GET` | `/api/auth/profile` | Get user profile | ✅ |
| `PUT` | `/api/auth/profile` | Update profile | ✅ |
| `POST` | `/api/auth/logout` | User logout | ✅ |

</div>

<div align="center">

<h3> 🎮 Game Management </h3>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/games` | Get all games | ❌ |
| `GET` | `/api/games/:id` | Get game by ID | ❌ |
| `POST` | `/api/games` | Create new game | 👑 Admin |
| `PUT` | `/api/games/:id` | Update game | 👑 Admin |
| `DELETE` | `/api/games/:id` | Delete game | 👑 Admin |
| `GET` | `/api/games/search` | Search games | ❌ |

</div>

<div align="center">

<h3> 🛒 Shopping Cart </h3>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/cart` | Get user's cart | ✅ |
| `POST` | `/api/cart` | Add item to cart | ✅ |
| `PUT` | `/api/cart/:id` | Update cart item | ✅ |
| `DELETE` | `/api/cart/:id` | Remove from cart | ✅ |
| `DELETE` | `/api/cart` | Clear entire cart | ✅ |

</div>

<div align="center">

<h3> 📦 Order Management </h3>
  
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/orders` | Get user's orders | ✅ |
| `POST` | `/api/orders` | Create new order | ✅ |
| `GET` | `/api/orders/:id` | Get order details | ✅ |
| `PUT` | `/api/orders/:id/cancel` | Cancel order | ✅ |

</div>

<div align="center">

<h3> ⭐ Review System </h3>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/games/:id/reviews` | Get game reviews | ❌ |
| `POST` | `/api/games/:id/reviews` | Add review | ✅ |
| `PUT` | `/api/reviews/:id` | Update review | ✅ |
| `DELETE` | `/api/reviews/:id` | Delete review | ✅ |

</div>

## 📁 Project Structure

```
gamehaven-api/
├── 📂 src/
│   ├── 📂 config/          # Database & app configuration
│   ├── 📂 controllers/     # Route controllers
│   ├── 📂 middleware/      # Custom middleware
│   ├── 📂 models/          # Mongoose models
│   ├── 📂 routes/          # API routes
│   ├── 📂 services/        # Business logic
│   ├── 📂 utils/           # Helper functions
│   └── 📄 app.js           # Express app setup
├── 📂 tests/               # Test files
├── 📂 docs/                # Additional documentation
├── 📄 .env.example         # Environment variables template
├── 📄 .gitignore           # Git ignore rules
├── 📄 package.json         # Dependencies & scripts
└── 📄 README.md            # You are here!
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm run test:auth
npm run test:games
npm run test:orders
```

## 🔧 Configuration

<div align="center">

<h2> Environment Variables </h2>
  
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | ❌ | `3000` |
| `MONGODB_URI` | MongoDB connection string | ✅ | - |
| `JWT_SECRET` | JWT signing secret | ✅ | - |
| `JWT_EXPIRE` | JWT expiration time | ❌ | `7d` |
| `NODE_ENV` | Environment mode | ❌ | `development` |

</div>

### API Response Format

All API responses follow this consistent structure:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## 🤝 Contributing

We love contributions! Here's how you can help make GameHaven API even better:

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make** your changes
5. **Test** your changes
   ```bash
   npm test
   ```
6. **Commit** with conventional commits
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push** to your fork
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Create** a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for gamers, by gamers**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/gamehaven-api?style=social)](https://github.com/yourusername/gamehaven-api/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/gamehaven-api?style=social)](https://github.com/yourusername/gamehaven-api/network/members)

[⬆️ Back to Top](#-gamehaven-api)

</div>
