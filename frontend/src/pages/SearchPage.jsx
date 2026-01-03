import React, { useState, useCallback } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { useMovies } from "../hooks/useMovies";
import MovieGrid from "../components/movies/MovieGrid";
import SearchBar from "../components/movies/SearchBar";
import MovieFilters from "../components/movies/MovieFilters";
import Pagination from "../components/common/Pagination";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

const SearchPage = () => {
  const { movies, pagination, isLoading, error, searchMovies, clearError } =
    useMovies();

  const [currentQuery, setCurrentQuery] = useState("");

  const handleSearch = useCallback(
    (query) => {
      setCurrentQuery(query);
      if (query.trim()) {
        searchMovies(query, 1);
      }
    },
    [searchMovies]
  );

  const handlePageChange = (page) => {
    if (currentQuery) {
      searchMovies(currentQuery, page);
    }
  };

  const handleFilterChange = (filters) => {
    // In a real app, you'd send these filters to the backend
    console.log("Filters applied:", filters);
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Search Movies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find your favorite movies by title, description, or filters
        </Typography>
      </Box>

      {/* Error Message */}
      <ErrorMessage error={error} onClose={clearError} />

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <MovieFilters onFilterChange={handleFilterChange} />
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={9}>
          {isLoading && <Loading message="Searching..." />}

          {!isLoading && movies.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom>
                Found {pagination.totalMovies} movies
              </Typography>
              <MovieGrid movies={movies} />
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {!isLoading && movies.length === 0 && currentQuery && (
            <EmptyState
              message="No results found"
              description={`No movies match "${currentQuery}". Try different keywords.`}
            />
          )}

          {!isLoading && movies.length === 0 && !currentQuery && (
            <EmptyState
              message="Start searching"
              description="Enter a movie title or description to search"
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
