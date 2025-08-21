// routes/userRoutes.js
import express from "express";
import { addUser, getUsers, updateRole, getRoleAccess } from "../controllers/userController.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/", getUsers);
router.put("/role", updateRole);
router.get("/access/:role", getRoleAccess);

export default router;
