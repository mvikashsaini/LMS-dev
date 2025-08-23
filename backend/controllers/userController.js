// controllers/userController.js
// import User from "../models/Subadmin.js";
import e from "express";
import { roleAccess } from "../config/roleAccess.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";


export const validateAddUser = [
  body('fullName').isString().trim().notEmpty(),
  body('email').isEmail(),
  body('phone').isString().trim(),
  body('password').isString().isLength({ min: 6 }),
  body('role').isIn(["SubAdmin"]),
  body('subRole').isIn(["BlogManager", "FinanceManager", "CareerCell", "GovernanceBody","SubAdmin"]), 
];


// Add new user
export const addUser = async (req, res) => {
  try {
  const v = validationResult(req);
  if (!v.isEmpty()) return res.status(400).json({ errors: v.array() });

    const { fullName, email, phone, password, role, subRole, universityCode, referralCode } = req.body;

    // 🔹 Check required fields
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ msg: "fullName, email, password, and role are required" });
    }

    // 🔹 Unique email/phone check
    const exists = await User.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return res.status(409).json({ msg: "Email or phone already registered" });
    }

    // 🔹 Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 🔹 Create user
    const user = await User.create({
      fullName,
      email,
      phone,
      passwordHash,
      role,
      subRole,
      // status: "Active", // default to Active
      isPhoneVerified: true, // since no OTP
    });

    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        subRole: user.subRole || null,
        universityCode: user.universityCode || null,
        referralCode: user.referralCode || null,
        status: user.status,
      },
    });
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

// Get role access
export const getRoleAccess = (req, res) => {
  const { role } = req.params;
  res.json(roleAccess[role] || []);
};

// ✅ Update SubRole Controller
export const updateSubRole = async (req, res) => {
  try {
    const { subRole } = req.body;

    if (!subRole) {
      return res.status(400).json({ msg: "SubRole is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { subRole },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      msg: "SubRole updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        subRole: user.subRole,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("Update SubRole Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update role
export const updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { subRole },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
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

// ✅ Get All Students
export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// ✅ Get All Teacher
export const getTeacher = async (req, res) => {
  try {
    const teacher = await User.find({ role: "Teacher" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//get all university
export const getUniversity = async (req, res) => {
  try {
    const university = await User.find({ role: "University" });
    res.json(university);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get all referral    
export const getReferral = async (req, res) => {
  try {
    const referral = await User.find({ role: "Referral" });
    res.json(referral);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get all patners
export const getPartners = async (req, res) => {
  try {
    const partners = await User.find({ role: "Partner" });
    res.json(partners);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//get all subadmin
export const getSubAdmin = async (req, res) => {
  try {
    const subadmin = await User.find({ role: "SubAdmin" });
    res.json(subadmin);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}



