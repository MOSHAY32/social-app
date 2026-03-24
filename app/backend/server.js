import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import app from "./app.js";
import { connectDB } from "./utils/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();


// Routes
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

startServer();