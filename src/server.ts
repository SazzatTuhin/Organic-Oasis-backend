import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Middleware setup

app.use(cors()); //Enable CORS
app.use(helmet()); // Secure HTTP headers
app.use(morgan("combined")); // Logging HTTP requests
app.use(express.json()); // Parse JSON bodies

// Health check route

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is runing healthy" });
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
