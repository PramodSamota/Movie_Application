import { Router } from "express";
// import {
//   getAllMovies,
//   getSortedMovies,
//   searchMovies,
//   addMovie,
//   updateMovie,
//   deleteMovie,
// } from "../controllers/movieController";
// import { authenticate, authorizeAdmin } from "../middleware/authMiddleware";
const router = Router();

router.get("/movies", getAllMovies);
router.get("/movies/sorted", getSortedMovies);
router.get("/movies/search", searchMovies);

// Movie routes (admin only)
// router.post("/movies", authenticate, authorizeAdmin, addMovie);
// router.put("/movies/:id", authenticate, authorizeAdmin, updateMovie);
// router.delete("/movies/:id", authenticate, authorizeAdmin, deleteMovie);

export default router;
