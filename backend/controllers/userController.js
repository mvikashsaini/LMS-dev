// controllers/userController.js
import User from "../models/Subadmin.js";
import { roleAccess } from "../config/roleAccess.js";

// Add new user
export const addUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User.create({ name, email, phone, password, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update role
export const updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get role access
export const getRoleAccess = (req, res) => {
  const { role } = req.params;
  res.json(roleAccess[role] || []);
};
