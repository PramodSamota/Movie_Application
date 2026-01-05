# 🎬 MovieHub - Full Stack Application

A comprehensive movie management platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring role-based access control, advanced search capabilities, and a modern Material-UI interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

MovieHub is a full-stack web application that allows users to browse, search, and manage a comprehensive movie database inspired by IMDb's Top 250 movies. The platform features user authentication, role-based access control, and an intuitive interface for both regular users and administrators.

### Live Demo
- **Frontend:** [https://movie-application-teal-xi.vercel.app](https://movie-application-teal-xi.vercel.app)
- **Backend API:** [https://movieapplication-production-f531.up.railway.app](https://movieapplication-production-f531.up.railway.app)

---

## ✨ Features

### 👤 User Features

- **Browse Movies**
  - View movies in responsive grid layout
  - Pagination for easy navigation
  - Beautiful card design with ratings and genres

- **Search & Filter**
  - Full-text search by title or description
  - Sort by rating, release date, duration, or title
  - Advanced filtering by genre, rating range, and year

- **Movie Details**
  - Comprehensive movie information
  - Cast and crew details
  - Direct links to IMDb
  - Responsive design

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Role-based access control (User/Admin)
- Secure password hashing
- Token refresh mechanism
- Persistent sessions

### 👨‍💼 Admin Features

- **Movie Management**
  - Add new movies with complete details
  - Edit existing movie information
  - Delete movies with confirmation
  - Bulk operations support

- **Admin Dashboard**
  - Table view with sorting and filtering
  - Quick actions (edit/delete)
  - Movie statistics
  - User management (future feature)

### 🎨 User Experience

- Modern Material-UI design
- Responsive layout (mobile, tablet, desktop)
- Dark/Light theme support
- Loading states and skeleton screens
- Error handling with user-friendly messages
- Smooth animations and transitions

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2+ | UI Framework |
| Material-UI | 5.15+ | Component Library |
| React Router | 6.20+ | Client-side routing |
| Axios | 1.6+ | HTTP client |
| Context API | - | State management |
| Emotion | 11.11+ | CSS-in-JS styling |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.18+ | Web framework |
| MongoDB | 5+ | Database |
| Mongoose | 8+ | ODM |
| JWT | 9+ | Authentication |
| bcryptjs | 2.4+ | Password hashing |

### DevOps & Tools

- **Version Control:** Git & GitHub
- **API Testing:** Postman
- **Deployment:** Vercel (Frontend), Railway (Backend)
- **Database Hosting:** MongoDB Atlas
  

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Browser   │  │   Mobile   │  │   Tablet   │            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
└────────┼────────────────┼────────────────┼──────────────────┘
         │                │                │
         └────────────────┴────────────────┘
                          │
         ┌────────────────▼────────────────┐
         │      React Frontend (Port 5173) │
         │  ┌──────────────────────────┐   │
         │  │  Components & Pages      │   │
         │  ├──────────────────────────┤   │
         │  │  Context API (State)     │   │
         │  ├──────────────────────────┤   │
         │  │  Axios (HTTP Client)     │   │
         │  └──────────────────────────┘   │
         └────────────────┬────────────────┘
                          │ REST API
         ┌────────────────▼────────────────┐
         │   Express Backend (Port 3000)   │
         │  ┌──────────────────────────┐   │
         │  │  Routes & Controllers    │   │
         │  ├──────────────────────────┤   │
         │  │  Middleware (Auth, CORS) │   │
         │  ├──────────────────────────┤   │
         │  │  Business Logic          │   │
         │  └──────────────────────────┘   │
         └────────────────┬────────────────┘
                          │
         ┌────────────────▼────────────────┐
         │      MongoDB Database           │
         │  ┌──────────────────────────┐   │
         │  │  Users Collection        │   │
         │  ├──────────────────────────┤   │
         │  │  Movies Collection       │   │
         │  ├──────────────────────────┤   │
         │  │  QueueJobs Collection    │   │
         │  └──────────────────────────┘   │
         └─────────────────────────────────┘
```

---

## 📦 Prerequisites

Before starting, ensure you have the following installed:

### Required Software

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended)
- **Git** - [Download](https://git-scm.com/)

### Optional Tools

- **Postman** - For API testing
- **VS Code** - Recommended code editor
- **MongoDB Compass** - Database GUI

### Verify Installation

```bash
node --version    # Should be v18+
npm --version     # Should be v8+
mongod --version  # Should be v5+
git --version     # Any recent version
```

---

## ⚡ Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/movie-app.git
cd movie-app

# Run setup script
npm run setup

# Start both frontend and backend
npm run dev
```

### Option 2: Manual Setup

```bash
# Clone repository
git clone https://github.com/yourusername/movie-app.git
cd movie-app

# Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev

# Setup Frontend (new terminal)
cd ../frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm start
```

### Access the Application

- **Frontend:** http://localhost:513
- **Backend API:** http://localhost:3000

---

## 🔧 Detailed Setup

### Backend Setup

#### 1. Navigate to Backend Directory

```bash
cd backend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Create Environment File

```bash
cp .env.example .env
```

#### 4. Configure Environment Variables

Edit `.env` file:

```env
# Server
PORT=5000


# Database
MONGODB_URI=mongodb://localhost:27017/movie-app
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-app

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
REFRESH_TOKEN_SECRET=your-super-secret-refresh-key-min-32-characters
JWT_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:5173
```

#### 5. Start MongoDB

**Local MongoDB:**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**MongoDB Atlas:**
- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create cluster and database user
- Get connection string and update `.env`

#### 6. Start Backend Server

```bash
npm run dev
```

Backend should be running at: http://localhost:3000

### Frontend Setup

#### 1. Navigate to Frontend Directory

```bash
cd frontend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Create Environment File

```bash
cp .env.example .env
```

#### 4. Configure Environment Variables

Edit `.env` file:

```env
VITE_APP_API_URL=http://localhost:3000/api/v1

```

#### 5. Start Frontend Server

```bash
npm start
```

Frontend should open automatically at: http://localhost:3000

---

## 📁 Project Structure

```
movie-app/
├── backend/                    # Backend API
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Movie.js           # Movie schema
│   │   
│   ├── middleware/
│   │   ├── auth.js            # Authentication
│   │   └── errorHandler.js    # Error handling
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   └── movieController.js # Movie CRUD
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── movieRoutes.js     # Movie endpoints
│   
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/                   # React Frontend
│   
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Layout components
│   │   │   ├── movies/       # Movie components│   │   │  
│   │   │   └── common/       # Shared components
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── admin/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── MovieContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useMovies.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── movieService.js
│   │   ├── theme/
│   │   │   └── theme.js
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── .env
│   └── package.json
├── README.md                   # This file

```

---

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user"
    },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Movie Endpoints

#### Get All Movies

```http
GET /movies?page=1&limit=10
```

#### Search Movies

```http
GET /movies/search?query=godfather&page=1&limit=10
```

#### Sort Movies

```http
GET /movies/sorted?sortBy=rating&order=desc&page=1&limit=10
```

#### Add Movie (Admin Only)

```http
POST /movies
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Inception",
  "description": "A thief who steals corporate secrets...",
  "rating": 8.8,
  "releaseDate": "2010-07-16",
  "duration": 148,
  "genre": ["Action", "Sci-Fi"],
  "director": "Christopher Nolan",
  "cast": ["Leonardo DiCaprio"],
  "posterUrl": "https://...",
  "imdbId": "tt1375666"
}
```

#### Update Movie (Admin Only)

```http
PUT /movies/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 9.0,
  "description": "Updated description"
}
```

#### Delete Movie (Admin Only)

```http
DELETE /movies/:id
Authorization: Bearer {token}
```

### Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |


---


### Integration Tests

```bash
npm run test:integration
```

### E2E Tests (Cypress)

```bash
cd frontend
npm run cypress:open       # Interactive mode
npm run cypress:run        # Headless mode
```

---

## 🚀 Deployment

### Backend Deployment (Railway)

#### 1. Install Railway CLI

```bash
npm install -g @railway/cli
```

#### 2. Login and Initialize

```bash
railway login
cd backend
railway init
```

#### 3. Add Environment Variables

```bash
railway variables set MONGODB_URI=your_mongodb_atlas_uri
railway variables set JWT_SECRET=your_jwt_secret
railway variables set REFRESH_TOKEN_SECRET=your_refresh_secret
railway variables set CLIENT_URL=your_frontend_url
```

#### 4. Deploy

```bash
railway up
```

Your backend will be live at: `https://your-project.railway.app`

### Frontend Deployment (Vercel)

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Build and Deploy

```bash
cd frontend
vercel login
vercel
```

#### 3. Set Environment Variables

```bash
vercel env add REACT_APP_API_URL production
# Enter your Railway backend URL
```

#### 4. Production Deployment

```bash
vercel --prod
```

Your frontend will be live at: `https://your-project.vercel.app`

### Alternative Deployment Options

**Backend:**
- Heroku
- AWS EC2
- DigitalOcean
- Render

**Frontend:**
- Netlify
- AWS S3 + CloudFront
- GitHub Pages (static build)
- Firebase Hosting



---

## 🔒 Security Considerations

### Backend Security

- ✅ JWT authentication with short-lived tokens
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Input validation and sanitization
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ CORS configuration
- ✅ Helmet for HTTP headers
- ✅ NoSQL injection prevention
- ✅ XSS protection

### Frontend Security

- ✅ Environment variables for configuration
- ✅ No sensitive data in localStorage
- ✅ HTTPS only in production
- ✅ Content Security Policy
- ✅ Input sanitization
- ✅ Secure token storage

---

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start

**Error:** `MongoNetworkError: failed to connect`

**Solution:**
1. Check if MongoDB is running: `mongosh`
2. Verify MONGODB_URI in `.env`
3. Check MongoDB logs

#### Frontend can't connect to backend

**Error:** `Network Error` or `CORS policy`

**Solution:**
1. Verify backend is running on port 3000
2. Check REACT_APP_API_URL in frontend `.env`
3. Verify CORS settings in backend allow frontend URL

#### Authentication not working

**Error:** `Invalid token` or `Token expired`

**Solution:**
1. Check JWT_SECRET matches between environments
2. Verify token format: `Bearer <token>`
3. Check token expiration settings
4. Clear browser localStorage

#### Grid layout showing one column

**Solution:**
1. Check Material-UI version is 5.x
2. Verify Grid has `container` and `item` props
3. Ensure breakpoints defined (xs, sm, md, lg)
4. Clear browser cache

---

## 📊 Performance Optimization

### Backend

- Database indexing for faster queries
- Connection pooling (10 max, 2 min)
- Response compression
- Caching frequently accessed data

### Frontend

- Code splitting with React.lazy
- Memoization (React.memo, useMemo)
- Debounced search (500ms)
- Image lazy loading
- Minified production build
- CDN for static assets

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Keep PRs focused and small


---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Pramod Samota** - Full Stack Developer - [LinkedIn](https://linkedin.com/in/pramodsamota)

---

## 🙏 Acknowledgments

- **IMDb** - For movie data inspiration
- **Material-UI** - For the beautiful component library
- **MongoDB** - For the robust database
- **Express.js** - For the flexible backend framework
- **React** - For the powerful frontend library
- **All Contributors** - Thank you for your support!

---

## 📞 Support

- **Email:** pramod_ks@es.iitr.ac.in
- **GitHub Issues:** [Create an issue](https://github.com/yourusername/movie-app/issues)

---

## 🔗 Links

- **Live Demo:** [https://movie-application-teal-xi.vercel.app](https://movie-application-teal-xi.vercel.app)
- **API Docs:** [https://api.moviehub.com/docs](https://api.moviehub.com/docs)
- **GitHub:** [https://movieapplication-production-f531.up.railway.app](https://movieapplication-production-f531.up.railway.app)

---

## 📈 Roadmap

### Phase 1 (Current)
- ✅ User authentication
- ✅ Movie CRUD operations
- ✅ Search and filter
- ✅ Responsive design

### Phase 2 (Q2 2026)
- [ ] User reviews and ratings
- [ ] Watchlist functionality
- [ ] Social features (follow users)
- [ ] Email notifications



---

**Made with ❤️ by Pramod Samota**

**⭐ Star this repo if you find it helpful!**
