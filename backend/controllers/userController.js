// controllers/userController.js
// import User from "../models/Subadmin.js";
import { roleAccess } from "../config/roleAccess.js";
import User from "../models/User.js";

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


export const updateUserStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "Status updated successfully", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get All Students
export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



// Update only the 'status' field of a user
export const approveUser = async (req, res) => {
  try {
    const { userId, status } = req.body; // expects { userId, status }

    if (!userId || !status)
      return res.status(400).json({ msg: "userId and status are required" });

    const user = await User.findByIdAndUpdate(
      userId,
      { status },           // only update the status field
      { new: true }
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "Status updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
