import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Alert,
  Snackbar,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import Loading from "../../components/common/Loading";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Pagination from "../../components/common/Pagination";
import { ROUTES } from "../../utils/constants";
import { formatDate, formatDuration } from "../../utils/formatters";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    movies,
    pagination,
    isLoading,
    error,
    fetchMovies,
    deleteMovie,
    clearError,
  } = useMovies();

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    movie: null,
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const handleEdit = (movie) => {
    navigate(ROUTES.ADMIN_EDIT_MOVIE.replace(":id", movie._id));
  };

  const handleDeleteClick = (movie) => {
    setDeleteDialog({ open: true, movie });
  };

  const handleDeleteConfirm = async () => {
    const result = await deleteMovie(deleteDialog.movie._id);

    if (result.success) {
      setSuccessMessage("Movie deleted successfully");
      fetchMovies(pagination.currentPage);
    }

    setDeleteDialog({ open: false, movie: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, movie: null });
  };

  const handleView = (movie) => {
    navigate(`/movie/${movie._id}`);
  };

  const handlePageChange = (page) => {
    fetchMovies(page);
  };

  if (isLoading && movies.length === 0) {
    return <Loading message="Loading movies..." />;
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate(ROUTES.ADMIN_ADD_MOVIE)}
          size="large"
        >
          Add New Movie
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Movies Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie._id} hover>
                <TableCell>
                  {movie.rank && (
                    <Chip
                      label={`#${movie.rank}`}
                      size="small"
                      color="primary"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {movie.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={movie.rating?.toFixed(1)}
                    size="small"
                    color={movie.rating >= 8 ? "success" : "default"}
                  />
                </TableCell>
                <TableCell>{formatDate(movie.releaseDate)}</TableCell>
                <TableCell>{formatDuration(movie.duration)}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {movie.genre?.slice(0, 2).map((g, i) => (
                      <Chip key={i} label={g} size="small" variant="outlined" />
                    ))}
                    {movie.genre?.length > 2 && (
                      <Chip label={`+${movie.genre.length - 2}`} size="small" />
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleView(movie)}
                    title="View"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(movie)}
                    title="Edit"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteClick(movie)}
                    title="Delete"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialog.open}
        title="Delete Movie"
        message={`Are you sure you want to delete "${deleteDialog.movie?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        confirmColor="error"
      />
    </Container>
  );
};

export default AdminDashboard;
