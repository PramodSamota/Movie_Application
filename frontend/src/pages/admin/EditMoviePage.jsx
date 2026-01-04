import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import MovieForm from "../../components/admin/MovieForm";
// import MovieForm from "../../components/admin/MovieForm";
import Loading from "../../components/common/Loading";
import { ROUTES } from "../../utils/constants";

const EditMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovieById, updateMovie } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const data = await getMovieById(id);

      if (data) {
        setMovie(data);
      } else {
        setError("Movie not found");
      }

      setLoading(false);
    };

    fetchMovie();
  }, [id, getMovieById]);

  const handleSubmit = async (movieData) => {
    setSaving(true);
    setError("");

    const result = await updateMovie(id, movieData);

    if (result.success) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else {
      setError(result.error || "Failed to update movie");
    }

    setSaving(false);
  };

  const handleCancel = () => {
    navigate(ROUTES.ADMIN_DASHBOARD);
  };

  if (loading) {
    return <Loading message="Loading movie details..." />;
  }

  if (error && !movie) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Edit Movie
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Update the movie details below
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError("")} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {movie && (
          <MovieForm
            initialData={movie}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={saving}
          />
        )}
      </Box>
    </Container>
  );
};

export default EditMoviePage;
