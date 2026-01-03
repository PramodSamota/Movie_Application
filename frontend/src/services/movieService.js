import api from "./api";

export const movieService = {
  getAllMovies: async (page = 1, limit = 10) => {
    const response = await api.get("/movies/allMovies", {
      params: { page, limit },
    });
    return response.data;
  },

  getSortedMovies: async (sortBy, order = "asc", page = 1, limit = 12) => {
    const response = await api.get("/movies/sorted", {
      params: { sortBy, order, page, limit },
    });
    return response.data;
  },

  searchMovies: async (query, page = 1, limit = 12) => {
    const response = await api.get("/movies/search", {
      params: { query, page, limit },
    });
    return response.data;
  },

  getMovieById: async (id) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  addMovie: async (movieData) => {
    const response = await api.post("/movies/addMovie", movieData);
    return response.data;
  },

  updateMovie: async (id, movieData) => {
    const response = await api.put(`/movies/update/${id}`, movieData);
    return response.data;
  },

  deleteMovie: async (id) => {
    const response = await api.delete(`/movies/delete/${id}`);
    return response.data;
  },
};
