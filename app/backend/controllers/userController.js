// controllers/userController.js
import User from "../models/User.js";

// ➤ Create user
export const createUser = async (req, res) => {
  try {
    const { clerkId, username, email, city } = req.body;

    if (!clerkId || !username) {
      return res.status(400).json({ message: "clerkId and username are required" });
    }

    // לבדוק אם המשתמש כבר קיים
    let user = await User.findOne({ clerkId });
    if (user) {
      return res.status(200).json({ user, message: "User already exists" });
    }

    user = await User.create({ clerkId, username, email, city });
    res.status(201).json({ user, message: "User added" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➤ Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ deletedUser, message: "User deleted" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➤ Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➤ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};