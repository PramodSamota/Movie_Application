Movie Application - Frontend
A modern, responsive React application for browsing and managing movies with Material-UI design and role-based access control.
📋 Table of Contents

Features
Tech Stack
Prerequisites
Installation
Environment Variables
Running the Application
Project Structure
Key Features
Contributing
License

✨ Features

User Features

Browse movies with beautiful card layout
Search movies by title or description
Sort by rating, release date, duration, or title
View detailed movie information
Responsive design (mobile, tablet, desktop)
Pagination for easy navigation

Admin Features

Add new movies
Edit existing movies
Delete movies with confirmation
Admin dashboard with table view
Protected admin routes

Authentication

User registration and login
JWT-based authentication
Role-based access control
Persistent sessions

UI/UX

Material-UI components
Dark/Light theme support
Smooth animations and transitions
Loading states and error handling
Empty states with helpful messages

🛠️ Tech Stack

Framework: React 18.2+
UI Library: Material-UI (MUI) 5.15+
Routing: React Router v6
State Management: Context API
HTTP Client: Axios
Styling: Emotion (CSS-in-JS)
Icons: Material-UI Icons
Build Tool: Create React App

📦 Prerequisites
Before you begin, ensure you have:

Node.js (v18 or higher) - Download
npm or yarn package manager
Git - Download
Backend API running (see backend README)

🚀 Installation

1. Clone the Repository
   bashgit clone https://github.com/yourusername/movie-app-frontend.git
   cd movie-app-frontend
2. Install Dependencies
   bashnpm install
   Or with yarn:
   bashyarn install
3. Create Environment File
   bashcp .env.example .env

🔐 Environment Variables
Create a .env file in the root directory:
env# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration

REACT_APP_NAME=MovieHub
REACT_APP_VERSION=1.0.0

▶️ Running the Application
Development Mode
bashnpm start
The app will open at: http://localhost:3000
Features in Development:

Hot reloading
Error overlay
Source maps for debugging

📁 Project Structure
frontend/
├── src/
│ ├── components/
│ │ ├── layout/
│ │ │ ├── Layout.jsx
│ │ │ ├── Navbar.jsx
│ │ │ └── Footer.jsx
│ │ ├── movies/
│ │ │ ├── MovieCard.jsx
│ │ │ ├── MovieGrid.jsx
│ │ │ ├── SearchBar.jsx
│ │ │ ├── SortOptions.jsx
│ │ │ └── MovieFilters.jsx
│ │ ├── admin/
│ │ │ └── MovieForm.jsx
│ │ └── common/
│ │ ├── Loading.jsx
│ │ ├── ErrorMessage.jsx
│ │ ├── Pagination.jsx
│ │ ├── ProtectedRoute.jsx
│ │ └── ConfirmDialog.jsx
│ ├── pages/
│ │ ├── HomePage.jsx
│ │ ├── SearchPage.jsx
│ │ ├── MovieDetailPage.jsx
│ │ ├── LoginPage.jsx
│ │ ├── RegisterPage.jsx
│ │ ├── admin/
│ │ │ ├── AdminDashboard.jsx
│ │ │ ├── AddMoviePage.jsx
│ │ │ └── EditMoviePage.jsx
│ │ └── NotFoundPage.jsx
│ ├── context/
│ │ ├── AuthContext.jsx
│ │ └── MovieContext.jsx
│ ├── hooks/
│ │ ├── useAuth.js
│ │ ├── useMovies.js
│ │ └── useDebounce.js
│ ├── services/
│ │ ├── api.js
│ │ ├── authService.js
│ │ └── movieService.js
│ ├── utils/
│ │ ├── constants.js
│ │ ├── formatters.js
│ │ └── validators.js
│ ├── theme/
│ │ └── theme.js
│ ├── App.jsx
│ ├── index.jsx
│ └── routes.jsx
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md

🎯 Key Features

1. Authentication Flow
   javascript// Login
   const { login } = useAuth();
   await login({ email, password });

// Register
const { register } = useAuth();
await register({ username, email, password, role });

// Logout
const { logout } = useAuth();
logout(); 2. Movie Operations
javascript// Fetch movies
const { fetchMovies } = useMovies();
await fetchMovies(page);

// Search movies
const { searchMovies } = useMovies();
await searchMovies(query, page);

// Sort movies
const { sortMovies } = useMovies();
await sortMovies(sortBy, order, page); 3. Protected Routes
javascript// Admin-only route
<Route element={<ProtectedRoute requireAdmin />}>
<Route path="/admin" element={<AdminDashboard />} />
</Route>

🤝 Contributing

Fork the repository
Create feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add some AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors

Your Name - Pramod Samota - https://github.com/pramodsamota

🙏 Acknowledgments

Material-UI for the component library
React community for excellent documentation
All contributors and testers

📞 Support
For support, email pramodsamota21@gmail.com or open an issue on GitHub.

🔗 Links

Backend Repository
Live Demo
API Documentation

Made with ❤️ by Your Name
