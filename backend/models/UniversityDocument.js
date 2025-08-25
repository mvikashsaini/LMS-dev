import mongoose from "mongoose";

const docStatuses = ["Pending", "Approved", "Rejected", "Reupload"];

const universityDocumentSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // ✅ auto links to University user
      required: true,
    },
    docType: {
      type: String,
      required: true,
      enum: ["Accreditation", "License", "Certificate", "Other"], // you can expand
    },
    fileUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: docStatuses,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("UniversityDocument", universityDocumentSchema);
