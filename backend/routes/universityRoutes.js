// routes/universityRoutes.js
import express from "express";
import { updateUniversityCode } from "../controllers/universityController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.put("/update-university-code", protect, updateUniversityCode);

export default router;
