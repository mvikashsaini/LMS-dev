import express from "express";
import multer from "multer";
import path from "path";
import { protect } from "../middleware/auth.js";
import { uploadUniversityDocument, getMyDocuments ,getDocumentsByUniversity, updateDocumentStatus} from "../controllers/universityDocumentController.js";

const router = express.Router();

// ===== Multer Config =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save files in /uploads folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

const upload = multer({ storage });

// ===== Routes =====
router.post(
  "/upload",
  protect, // ✅ only logged in
  upload.single("document"), // field name in frontend form
  uploadUniversityDocument
);

router.get(
  "/my-documents",
  protect,
  getMyDocuments
);

// router.get("/by-university/:universityId", protect, getDocumentsByUniversity);
router.get("/by-university/:universityId", protect, getDocumentsByUniversity);

// Admin update document status
router.put("/status/:docId", protect, updateDocumentStatus);


export default router;
