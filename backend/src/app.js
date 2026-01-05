import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import MovieRouter from "./routes/movieRoute.js";
import UserRouter from "./routes/authRoute.js";
import { errorHandler } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

/* Core middleware */
app.use(express.json({ limit: "10kb" }));
app.use(helmet());

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

/* Rate limiting */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
});

app.use("/api/v1", apiLimiter);
app.use("/api/v1/auth", authLimiter);

/* HPP */
app.use(
  hpp({
    whitelist: ["page", "sort", "limit"],
  })
);

/* Routes */
app.get("/", (req, res) => res.status(200).json("Hello World!"));
app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/movies", MovieRouter);

/* Global error handler */
app.use(errorHandler);

export default app;
