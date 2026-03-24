import express from "express";
import { createUser, deleteUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// Routes
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);

export default router;