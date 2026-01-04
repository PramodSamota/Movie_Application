import React from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Chip,
  Typography,
  Paper,
} from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";

const MovieForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = React.useState({
    title: initialData.title || "",
    description: initialData.description || "",
    rating: initialData.rating || "",
    releaseDate: initialData.releaseDate
      ? new Date(initialData.releaseDate).toISOString().split("T")[0]
      : "",
    duration: initialData.duration || "",
    genre: initialData.genre || [],
    director: initialData.director || "",
    cast: initialData.cast || [],
    posterUrl: initialData.posterUrl || "",
    imdbId: initialData.imdbId || "",
    rank: initialData.rank || "",
  });

  const [genreInput, setGenreInput] = React.useState("");
  const [castInput, setCastInput] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && !formData.genre.includes(genreInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        genre: [...prev.genre, genreInput.trim()],
      }));
      setGenreInput("");
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.filter((g) => g !== genreToRemove),
    }));
  };

  const handleAddCast = () => {
    if (castInput.trim() && !formData.cast.includes(castInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        cast: [...prev.cast, castInput.trim()],
      }));
      setCastInput("");
    }
  };

  const handleRemoveCast = (castToRemove) => {
    setFormData((prev) => ({
      ...prev,
      cast: prev.cast.filter((c) => c !== castToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert string numbers to actual numbers
    const processedData = {
      ...formData,
      rating: parseFloat(formData.rating),
      duration: parseInt(formData.duration),
      rank: formData.rank ? parseInt(formData.rank) : undefined,
      releaseDate: new Date(formData.releaseDate),
    };

    onSubmit(processedData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>

          {/* Rating & Duration */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Rating (0-10)"
              name="rating"
              type="number"
              inputProps={{ min: 0, max: 10, step: 0.1 }}
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Duration (minutes)"
              name="duration"
              type="number"
              inputProps={{ min: 1 }}
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Release Date & Rank */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Release Date"
              name="releaseDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Rank (optional)"
              name="rank"
              type="number"
              inputProps={{ min: 1 }}
              value={formData.rank}
              onChange={handleChange}
            />
          </Grid>

          {/* Director */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Director"
              name="director"
              value={formData.director}
              onChange={handleChange}
            />
          </Grid>

          {/* Genres */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Genres
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              {formData.genre.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  onDelete={() => handleRemoveGenre(genre)}
                  color="primary"
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add genre"
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddGenre();
                  }
                }}
              />
              <Button variant="outlined" onClick={handleAddGenre}>
                Add
              </Button>
            </Box>
          </Grid>

          {/* Cast */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Cast
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              {formData.cast.map((actor) => (
                <Chip
                  key={actor}
                  label={actor}
                  onDelete={() => handleRemoveCast(actor)}
                  color="secondary"
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add cast member"
                value={castInput}
                onChange={(e) => setCastInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCast();
                  }
                }}
              />
              <Button variant="outlined" onClick={handleAddCast}>
                Add
              </Button>
            </Box>
          </Grid>

          {/* Poster URL & IMDb ID */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Poster URL"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="IMDb ID"
              name="imdbId"
              value={formData.imdbId}
              onChange={handleChange}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Movie"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default MovieForm;
