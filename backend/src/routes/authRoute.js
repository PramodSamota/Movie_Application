import { Router } from "express";
import {
  login,
  register,
  refreshAccessToken,
  logout,
  getAllUser,
  getme,
} from "../controllers/authController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => res.status(200).json("Hello World!"));
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.get("/logout", verifyUser, logout);
router.get("/users", getAllUser);
router.get("/me", verifyUser, getme);

export default router;
