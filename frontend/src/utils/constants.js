// export const API_BASE_URL = "http://localhost:3000/api/v1";
export const API_BASE_URL =
  "https://movieapplication-production-f531.up.railway.app/api/v1";

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  MOVIE_DETAIL: "/movie/:id",
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_ADD_MOVIE: "/admin/movies/add",
  ADMIN_EDIT_MOVIE: "/admin/movies/edit/:id",
};

export const SORT_OPTIONS = [
  { value: "title", label: "Title" },
  { value: "rating", label: "Rating" },
  { value: "releaseDate", label: "Release Date" },
  { value: "duration", label: "Duration" },
];

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
};

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};
