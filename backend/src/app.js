import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import MovieRouter from "./routes/movieRoute.js";
import UserRouter from "./routes/authRoute.js";
const app = express();

dotenv.config();
console.log("process.env.MONGODB_URI", process.env.CLIENT_URL);
const CLIENT_URL = process.env.CLIENT_URL;
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(helmet()); // for http headers
app.use(xss()); // for  XSS Protection
app.use(mongoSanitize()); //Data Sanitization (NoSQL Injection)
app.use(hpp()); // HTTP Parameter Pollution Protection

//  Rate Limiting (ANTI-DDOS)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.get("/", (req, res) => res.status(200).json("Hello World!"));

app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/movies", MovieRouter);

export default app;
