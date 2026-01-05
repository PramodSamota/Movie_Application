Movie Application - Backend API
A robust RESTful API built with Node.js, Express.js, and MongoDB for managing a movie database with role-based access control (RBAC).
📋 Table of Contents

Features
Tech Stack
Prerequisites
Installation
Environment Variables
Database Setup
Running the Application
API Documentation
Project Structure
Contributing
License

✨ Features

User Authentication & Authorization

JWT-based authentication
Role-based access control (User/Admin)
Secure password hashing with bcrypt
Token refresh mechanism

Movie Management

CRUD operations for movies
Full-text search on title and description
Sort by rating, release date, duration, title
Pagination support
Distributed queue for lazy insertion

Security

Input validation and sanitization
Error handling middleware
Rate limiting
CORS configuration
Helmet for HTTP headers security

Performance

Database indexing for optimized queries
Connection pooling
Concurrency handling

🛠️ Tech Stack

Runtime: Node.js (v18+)
Framework: Express.js
Database: MongoDB with Mongoose ODM
Authentication: JSON Web Tokens (JWT)
Password Hashing: bcryptjs
Validation: express-validator
Environment: dotenv
Security: helmet, cors, express-rate-limit

📦 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or higher) - Download
MongoDB (v5 or higher) - Download

OR use MongoDB Atlas (Cloud database)

npm or yarn package manager
Git - Download

🚀 Installation

1. Clone the Repository
   bashgit clone https://github.com/yourusername/movie-app-backend.git
   cd movie-app-backend
2. Install Dependencies
   bashnpm install
3. Create Environment File
   bashcp .env.example .env

🔐 Environment Variables
Create a .env file in the root directory with the following variables:
env# Server Configuration
PORT=5000
NODE_ENV=development

# Database

MONGODB_URI=mongodb://localhost:27017/movie-app

# OR for MongoDB Atlas:

# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/movie-app?retryWrites=true&w=majority

# JWT Configuration

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key
JWT_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d

# CORS

CLIENT_URL=http://localhost:3000

# Rate Limiting

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
Security Notes:

Never commit .env file to version control
Use strong, random secrets for JWT keys (32+ characters)
Change default secrets before deployment
Use environment-specific configurations

🗄️ Database Setup
Option 1: Local MongoDB

Start MongoDB Service

bash# Windows
net start MongoDB

# macOS (with Homebrew)

brew services start mongodb-community

# Linux (systemd)

sudo systemctl start mongod

Verify MongoDB is Running

bashmongosh

# Should connect to mongodb://127.0.0.1:27017

Option 2: MongoDB Atlas (Cloud)

Create account at MongoDB Atlas
Create a new cluster
Create database user with password
Whitelist your IP address (or use 0.0.0.0/0 for development)
Get connection string and add to .env

Database Indexes
The application automatically creates these indexes:

Movies Collection:

Text index on title and description (for search)
Single field indexes on rating, releaseDate, duration (for sorting)

Users Collection:

Unique index on email
Unique index on username

▶️ Running the Application
Development Mode (with auto-restart)
bashnpm run dev
Production Mode
bashnpm start
Check if Server is Running
Visit: http://localhost:3000/api/health (if you implement health check endpoint)
You should see:
json{
"status": "ok",
"timestamp": "2025-01-05T10:30:00.000Z"
}

📚 API Documentation
Base URL
http://localhost:3000/api/v1
Authentication Endpoints

1. Register User
   httpPOST /auth/register
   Content-Type: application/json

{
"username": "john_doe",
"email": "john@example.com",
"password": "password123",
"role": "user" // Optional: "user" or "admin"
}
Response (201):
json{
"success": true,
"message": "User registered successfully",
"data": {
"user": {
"id": "65a1b2c3d4e5f6g7h8i9j0k1",
"username": "john_doe",
"email": "john@example.com",
"role": "user"
},
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
} 2. Login
httpPOST /auth/login
Content-Type: application/json

{
"email": "john@example.com",
"password": "password123"
}
Response (200):
json{
"success": true,
"message": "Login successful",
"data": {
"user": { /_ user object _/ },
"accessToken": "...",
"refreshToken": "..."
}
}
Movie Endpoints (Public) 3. Get All Movies
httpGET /movies?page=1&limit=10 4. Get Sorted Movies
httpGET /movies/sorted?sortBy=rating&order=desc&page=1&limit=10 5. Search Movies
httpGET /movies/search?query=godfather&page=1&limit=10
Movie Endpoints (Admin Only) 6. Add Movie
httpPOST /movies
Authorization: Bearer {accessToken}
Content-Type: application/json

{
"title": "Inception",
"description": "A thief who steals corporate secrets...",
"rating": 8.8,
"releaseDate": "2010-07-16",
"duration": 148,
"genre": ["Action", "Sci-Fi", "Thriller"],
"director": "Christopher Nolan",
"cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
"posterUrl": "https://example.com/poster.jpg",
"imdbId": "tt1375666",
"rank": 11
} 7. Update Movie
httpPUT /movies/:id
Authorization: Bearer {accessToken}
Content-Type: application/json

{
"rating": 9.0,
"description": "Updated description"
} 8. Delete Movie
httpDELETE /movies/:id
Authorization: Bearer {accessToken}
Status Codes
CodeDescription200OK - Request successful201Created - Resource created202Accepted - Request accepted (queued)400Bad Request - Invalid input401Unauthorized - Invalid/missing token403Forbidden - Insufficient permissions404Not Found - Resource doesn't exist500Internal Server Error

📁 Project Structure
backend/
├── config/
│ ├── db.js # MongoDB connection
│ └── env.js # Environment configuration
├── models/
│ ├── User.js # User schema
│ ├── Movie.js # Movie schema│
├── middleware/
│ ├── auth.js # Authentication middleware
│ ├── errorHandler.js # Error handling
│ └── validation.js # Input validation
├── controllers/
│ ├── authController.js # Auth logic
│ └── movieController.js # Movie CRUD logic
├── routes/
│ ├── authRoutes.js # Auth endpoints
│ └── movieRoutes.js # Movie endpoints

├── app.js # Express app setup
├── server.js # Entry point
├── .env # Environment variables
├── .env.example # Environment template
├── .gitignore # Git ignore rules
├── package.json # Dependencies
└── README.md # This file

🤝 Contributing

Fork the repository
Create feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add some AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors

Your Name - Pramod Samota

🙏 Acknowledgments

IMDb for movie data inspiration
Express.js community
MongoDB documentation
All contributors

📞 Support
For support, email support@movieapp.com or open an issue on GitHub.

🔗 Links

Frontend Repository
API Documentation
Live Demo

Made with ❤️ by Your Name
