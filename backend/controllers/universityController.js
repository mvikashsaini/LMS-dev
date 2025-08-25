// controllers/universityController.js
import User from "../models/User.js";

export const updateUniversityCode = async (req, res) => {
  try {
    const { universityCode } = req.body;

    if (!universityCode) {
      return res.status(400).json({ message: "universityCode is required" });
    }

    // logged-in user's id from JWT
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "University") {
      return res.status(403).json({ message: "Only University role can set universityCode" });
    }

    // optional: prevent overriding once set
    // if (user.universityCode) {
    //   return res.status(400).json({ message: "University code already set. Cannot update again." });
    // }

    user.universityCode = universityCode;
    await user.save();

    return res.status(200).json({
      message: "University code updated successfully",
      universityCode: user.universityCode,
    });
  } catch (error) {
    console.error("Error updating university code:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
