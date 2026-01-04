import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/constants";

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
