// backend/app.js
import express from "express";
import cors from "cors";

const app = express();


app.use(cors());
app.use(express.json());

// import userRoutes from "./routes/userRoutes.js";
// app.use("/api/users", userRoutes);

export default app;