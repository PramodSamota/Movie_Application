import { Router } from "express";
import {
  getAllMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getSortedMovies,
  searchMovies,
} from "../controllers/movieController.js";
import { verifyUser, authorizeAdmin } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/AllMovies", getAllMovies);
router.get("/sorted", getSortedMovies);
router.get("/search", searchMovies);

// Movie routes (admin only)
router.post("/addMovie", verifyUser, authorizeAdmin, addMovie);
router.put("/update/:id", verifyUser, authorizeAdmin, updateMovie);
router.delete("/delete/:id", verifyUser, authorizeAdmin, deleteMovie);

export default router;
