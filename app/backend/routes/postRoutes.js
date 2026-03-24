import express from "express";
import { getPosts, createPost, deletePost } from "../controllers/postController.js";

const router = express.Router();

// Routes
router.get("/", getPosts);
router.post("/", createPost);
router.delete("/", deletePost);

export default router;