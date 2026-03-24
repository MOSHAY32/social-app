import express from "express";
import {addComment, deleteComment, getCommentsByPostId} from "../controllers/commentController.js";



const router = express.Router();

// Routes
router.get("/:id", getCommentsByPostId);
router.post("/", addComment);
router.delete("/:id", deleteComment);

export default router;