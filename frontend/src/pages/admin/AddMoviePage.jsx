import React, { useState } from "react";
import { Container, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import MovieForm from "../../components/admin/MovieForm";
import { ROUTES } from "../../utils/constants";

const AddMoviePage = () => {
  const navigate = useNavigate();
  const { addMovie } = useMovies();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (movieData) => {
    setLoading(true);
    setError("");

    const result = await addMovie(movieData);

    if (result.success) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else {
      setError(result.error || "Failed to add movie");
    }

    setLoading(false);
  };

  const handleCancel = () => {
    navigate(ROUTES.ADMIN_DASHBOARD);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Add New Movie
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Fill in the details to add a new movie to the collection
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError("")} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <MovieForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </Box>
    </Container>
  );
};

export default AddMoviePage;
