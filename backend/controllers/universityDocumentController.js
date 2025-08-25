import UniversityDocument from "../models/UniversityDocument.js";
import User from "../models/User.js";

// ===== Upload Document =====
export const uploadUniversityDocument = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from auth.js
    const user = await User.findById(userId);

    if (!user || user.role !== "University") {
      return res.status(403).json({ message: "Only University users can upload documents" });
    }

    const { docType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const document = await UniversityDocument.create({
      universityId: userId, // ✅ auto link to logged-in university
      docType,
      fileUrl: `/uploads/${req.file.filename}`,
      status: "Pending", // default
    });

    res.status(201).json({ message: "Document uploaded successfully", document });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ===== Get My Documents =====
export const getMyDocuments = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || user.role !== "University") {
      return res.status(403).json({ message: "Only University users can fetch documents" });
    }

    const documents = await UniversityDocument.find({ universityId: userId });

    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Documents by University (Admin)
export const getDocumentsByUniversity = async (req, res) => {
  try {
    const { universityId } = req.params;

    // optional: check if logged-in user is admin
    // if (req.user.role !== "SuperAdmin") return res.status(403).json({ message: "Admins only" });

    console.log(res);
    
    const documents = await UniversityDocument.find({ universityId }).populate("universityId", "fullName email");
    res.status(200).json({ documents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch documents", error: err.message });
  }
};

// ===== Update Document Status =====
export const updateDocumentStatus = async (req, res) => {
  try {
    const { docId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["Pending", "Approved", "Rejected", "Reupload"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const doc = await UniversityDocument.findById(docId);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    doc.status = status;
    await doc.save();

    res.status(200).json({ message: "Document status updated", document: doc });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};