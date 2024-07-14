import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authroute.js";
import connectDB from "./config/db.js";
import cors from "cors";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin:
    "https://hacktasolutions-bcw1wvdpw-usman-ahmads-projects-93615401.vercel.app", // Update this to your frontend's URL
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
// Database Connectiony
connectDB();

// Routes

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Server side of Hackta Solutions");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
