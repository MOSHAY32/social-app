// controllers/eventController.js
import Event from "../models/Event.js";

// ============================
// Create a new event
// ============================
export const createEvent = async (req, res) => {
  try {
    const { creatorId, type, place, city, date, maxParticipants } = req.body;

    if (!creatorId || !type || !place || !city || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const event = await Event.create({
      creatorId,
      type,
      place,
      city,
      date,
      maxParticipants
    });

    res.status(201).json({ event, message: "Event created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// Delete an event by ID
// ============================
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: `Event ${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// Get an event by ID
// ============================
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("creatorId", "username email city");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// Get all events
// ============================
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 }).populate("creatorId", "username email city");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};