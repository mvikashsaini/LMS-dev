import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    phone: { type: Number, required: true, index: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

otpSchema.index({ phone: 1 }, { unique: true });

export default mongoose.model("Otp", otpSchema);
