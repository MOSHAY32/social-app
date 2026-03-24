import express from "express";
import { createEvent, deleteEvent, getEventById, getAllEvents} from "../controllers/eventController.js";

const router = express.Router();

// Routes
router.get("/:id", getEventById);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);
router.get("/", getAllEvents);

export default router;