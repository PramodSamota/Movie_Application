import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Typography,
  Chip,
  Rating,
  Button,
  Paper,
  Divider,
  IconButton,
  Card,
  CardMedia,
} from "@mui/material";
import {
  ArrowBack,
  Edit,
  Delete,
  CalendarToday,
  AccessTime,
  Person,
  Movie as MovieIcon,
  Star,
} from "@mui/icons-material";
import { useMovies } from "../hooks/useMovies";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { formatDate, formatDuration } from "../utils/formatters";
import { ROUTES } from "../utils/constants";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovieById, deleteMovie, error, clearError } = useMovies();
  const { isAdmin } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const data = await getMovieById(id);
      setMovie(data);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id, getMovieById]);

  const handleEdit = () => {
    navigate(ROUTES.ADMIN_EDIT_MOVIE.replace(":id", movie._id));
  };

  const handleDeleteClick = () => {
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    const result = await deleteMovie(movie._id);
    if (result.success) {
      navigate(ROUTES.HOME);
    }
    setDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialog(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading message="Loading movie details..." />;
  }

  if (!movie) {
    return (
      <Container>
        <Box sx={{ py: 8, textAlign: "center" }}>
          <MovieIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Movie not found
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Back Button */}
        <IconButton onClick={handleBack} sx={{ mb: 2 }} aria-label="go back">
          <ArrowBack />
        </IconButton>

        {/* Error Message */}
        <ErrorMessage error={error} onClose={clearError} />

        <Grid container spacing={4}>
          {/* Movie Poster */}
          <Grid item xs={12} md={4}>
            <Card elevation={4}>
              <CardMedia
                component="img"
                image={
                  movie.posterUrl ||
                  "https://via.placeholder.com/400x600?text=No+Image"
                }
                alt={movie.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 600,
                  objectFit: "cover",
                }}
              />
            </Card>

            {/* Admin Actions */}
            {isAdmin && (
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Grid>

          {/* Movie Details */}
          <Grid item xs={12} md={8}>
            {/* Title & Rank */}
            <Box sx={{ mb: 3 }}>
              {movie.rank && (
                <Chip
                  label={`#${movie.rank} in Top 250`}
                  color="primary"
                  size="medium"
                  sx={{ mb: 2 }}
                />
              )}
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight="bold"
              >
                {movie.title}
              </Typography>
            </Box>

            {/* Rating */}
            <Paper
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: "primary.light",
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Star sx={{ fontSize: 48 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {movie.rating?.toFixed(1)}/10
                  </Typography>
                  <Rating
                    value={movie.rating / 2}
                    precision={0.1}
                    readOnly
                    size="large"
                  />
                </Box>
              </Box>
            </Paper>

            {/* Movie Info */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CalendarToday sx={{ mr: 1, color: "text.secondary" }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Release Date
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formatDate(movie.releaseDate)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AccessTime sx={{ mr: 1, color: "text.secondary" }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formatDuration(movie.duration)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {movie.director && (
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Person sx={{ mr: 1, color: "text.secondary" }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Director
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {movie.director}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>

            {/* Genres */}
            {movie.genre && movie.genre.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Genres
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {movie.genre.map((g, index) => (
                    <Chip
                      key={index}
                      label={g}
                      color="primary"
                      variant="outlined"
                      size="medium"
                    />
                  ))}
                </Box>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Plot Summary
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {movie.description}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Cast
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {movie.cast.map((actor, index) => (
                    <Chip
                      key={index}
                      label={actor}
                      color="secondary"
                      variant="outlined"
                      size="medium"
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* IMDb Link */}
            {movie.imdbId && (
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  href={`https://www.imdb.com/title/${movie.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: "#F5C518",
                    color: "#000",
                    "&:hover": {
                      backgroundColor: "#E6B800",
                    },
                  }}
                >
                  View on IMDb
                </Button>
              </Box>
            )}

            {/* Metadata */}
            <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: "divider" }}>
              <Typography variant="caption" color="text.secondary">
                Added on {formatDate(movie.createdAt)}
                {movie.addedBy && ` by ${movie.addedBy.username}`}
              </Typography>
              {movie.updatedAt !== movie.createdAt && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Last updated on {formatDate(movie.updatedAt)}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteDialog}
          title="Delete Movie"
          message={`Are you sure you want to delete "${movie.title}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          confirmText="Delete"
          confirmColor="error"
        />
      </Box>
    </Container>
  );
};

export default MovieDetailPage;
