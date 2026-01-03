import express from "express";
import dotenv from "dotenv";
import MovieRouter from "./routes/movieRoute.js";
import UserRouter from "./routes/authRoute.js";
import cors from "cors";
const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).json("Hello World!"));

app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/movies", MovieRouter);

export default app;
