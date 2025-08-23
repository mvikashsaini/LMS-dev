import express from "express";
import {
  addUser,
  validateAddUser,
  getUsers,
  updateRole,
  getRoleAccess,
  updateUserStatus,
  deleteUser,
  getStudents,
  getTeacher,
  getUniversity,
  getReferral,
  getPartners,
  getSubAdmin,
  approveUser ,
  updateSubRole
} from "../controllers/userController.js";

const router = express.Router();

router.post("/add", validateAddUser, addUser);
router.get("/", getUsers);
router.get("/students", getStudents);   // ✅ Get only students
router.get("/teachers", getTeacher);   // ✅ Get only teachers
router.get("/university", getUniversity); // ✅ Get only university
router.get("/referral", getReferral); // ✅ Get only referral
router.get("/partners", getPartners); // ✅ Get only partners
router.get("/subadmin", getSubAdmin); // ✅ Get only subadmin
router.put("/role", updateRole);
router.get("/access/:role", getRoleAccess);
router.put("/status", updateUserStatus); // ✅ Update status
router.delete("/:userId", deleteUser);   // ✅ Delete user
router.put("/approve", approveUser);
router.put("/subrole/:id", updateSubRole); // ✅ Update SubRole




export default router;
