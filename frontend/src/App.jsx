import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ROUTES } from "./utils/constants";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AddMoviePage = lazy(() => import("./pages/admin/AddMoviePage"));
const EditMoviePage = lazy(() => import("./pages/admin/EditMoviePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
// const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Loading fallback
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="60vh"
  >
    <CircularProgress size={60} />
  </Box>
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetailPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

          {/* Admin Routes - Protected */}
          <Route element={<ProtectedRoute requireAdmin />}>
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            <Route path={ROUTES.ADMIN_ADD_MOVIE} element={<AddMoviePage />} />
            <Route path={ROUTES.ADMIN_EDIT_MOVIE} element={<EditMoviePage />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
