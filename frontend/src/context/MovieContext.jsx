import React, { createContext, useState, useCallback, useEffect } from "react";
import { movieService } from "../services/movieService";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalMovies: 0,
    moviesPerPage: 10,
  });
  const [filters, setFilters] = useState({
    sortBy: "title",
    order: "asc",
    searchQuery: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("MovieProvider mounted");
    return () => console.log("MovieProvider unmounted");
  }, []);

  const fetchMovies = useCallback(
    async (page = 1) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await movieService.getAllMovies(
          page,
          pagination.moviesPerPage
        );

        setMovies(response.data.movies);
        setPagination((prev) => ({
          ...prev,
          ...response.data.pagination,
        }));

        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch movies");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.moviesPerPage]
  );

  const searchMovies = useCallback(
    async (query, page = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        setFilters((prev) => ({ ...prev, searchQuery: query }));

        const response = query.trim()
          ? await movieService.searchMovies(
              query,
              page,
              pagination.moviesPerPage
            )
          : await movieService.getAllMovies(page, pagination.moviesPerPage);

        setMovies(response.data.movies);
        setPagination((prev) => ({
          ...prev,
          ...response.data.pagination,
        }));
      } catch (err) {
        setError(err.response?.data?.message || "Search failed");
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.moviesPerPage]
  );

  const sortMovies = useCallback(
    async (sortBy, order = "asc", page = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        setFilters({ sortBy, order, searchQuery: "" });

        const response = await movieService.getSortedMovies(
          sortBy,
          order,
          page,
          pagination.moviesPerPage
        );

        setMovies(response.data.movies);
        setPagination((prev) => ({
          ...prev,
          ...response.data.pagination,
        }));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to sort movies");
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.moviesPerPage]
  );

  const getMovieById = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await movieService.getMovieById(id);
      setCurrentMovie(response.data);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch movie");
      setIsLoading(false);
      return null;
    }
  }, []);

  const addMovie = async (movieData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await movieService.addMovie(movieData);
      setIsLoading(false);

      // Refresh movies list
      await fetchMovies(pagination.currentPage);

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add movie";
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const updateMovie = async (id, movieData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await movieService.updateMovie(id, movieData);

      // Update movie in list
      setMovies((prev) =>
        prev.map((movie) => (movie._id === id ? response.data.data : movie))
      );

      setIsLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update movie";
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const deleteMovie = async (id) => {
    try {
      setIsLoading(true);
      setError(null);

      await movieService.deleteMovie(id);

      // Remove movie from list
      setMovies((prev) => prev.filter((movie) => movie._id !== id));

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete movie";
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => setError(null);

  const value = {
    movies,
    currentMovie,
    pagination,
    filters,
    isLoading,
    error,
    fetchMovies,
    searchMovies,
    sortMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    clearError,
    setFilters,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
