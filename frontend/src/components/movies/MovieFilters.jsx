import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";

const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Animation",
];

const MovieFilters = ({ onFilterChange }) => {
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1900, new Date().getFullYear()]);

  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const handleGenreToggle = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      ratingRange,
      genres: selectedGenres,
      yearRange,
    });
  };

  const handleClearFilters = () => {
    setRatingRange([0, 10]);
    setSelectedGenres([]);
    setYearRange([1900, new Date().getFullYear()]);
    onFilterChange(null);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FilterList sx={{ mr: 1 }} />
        <Typography variant="h6">Filters</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Rating Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>
          Rating: {ratingRange[0]} - {ratingRange[1]}
        </Typography>
        <Slider
          value={ratingRange}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          step={0.5}
        />
      </Box>

      {/* Genre Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Genres</Typography>
        <FormGroup>
          {GENRES.map((genre) => (
            <FormControlLabel
              key={genre}
              control={
                <Checkbox
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreToggle(genre)}
                />
              }
              label={genre}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Year Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>
          Year: {yearRange[0]} - {yearRange[1]}
        </Typography>
        <Slider
          value={yearRange}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          min={1900}
          max={new Date().getFullYear()}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" fullWidth onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" fullWidth onClick={handleClearFilters}>
          Clear
        </Button>
      </Box>
    </Paper>
  );
};

export default MovieFilters;
