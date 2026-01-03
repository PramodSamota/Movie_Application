import React, { useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { useMovies } from "../hooks/useMovies";
import MovieGrid from "../components/movies/MovieGrid";
import SortOptions from "../components/movies/SortOptions";
import SearchBar from "../components/movies/SearchBar";
import Pagination from "../components/common/Pagination";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

const HomePage = () => {
  const {
    movies,
    pagination,
    filters,
    isLoading,
    error,
    fetchMovies,
    sortMovies,
    searchMovies,
    clearError,
  } = useMovies();

  useEffect(() => {
    console.log("HomePage mounted");
    fetchMovies(1);

    return () => console.log("HomePage unmounted");
  }, []);

  const handleSortChange = (sortBy, order) => {
    sortMovies(sortBy, order, 1);
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      searchMovies(query, 1);
    } else {
      fetchMovies(1);
    }
  };

  const handlePageChange = (page) => {
    if (filters.searchQuery) {
      searchMovies(filters.searchQuery, page);
    } else {
      sortMovies(filters.sortBy, filters.order, page);
    }
  };

  if (isLoading && movies.length === 0) {
    return <Loading message="Loading movies..." />;
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          IMDb Top 250 Movies
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover the greatest movies of all time
        </Typography>
      </Box>

      {/* Error Message */}
      <ErrorMessage error={error} onClose={clearError} />

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <SearchBar onSearch={handleSearch} initialValue={filters.searchQuery} />
      </Box>

      {/* Sort Options */}
      <Box sx={{ mb: 4 }}>
        <SortOptions
          sortBy={filters.sortBy}
          order={filters.order}
          onSortChange={handleSortChange}
        />
      </Box>

      {/* Loading State */}
      {isLoading && <Loading message="Loading..." />}

      {/* Movies Grid */}
      {!isLoading && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}

      {/* Empty State */}
      {!isLoading && movies.length === 0 && (
        <EmptyState
          message="No movies found"
          description="Try adjusting your search query"
          action={() => {
            handleSearch("");
          }}
          actionLabel="Clear Search"
        />
      )}
    </Container>
  );
};

export default HomePage;
