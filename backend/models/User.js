import mongoose from 'mongoose';

const roles = ['Student', 'Teacher', 'University', 'Referral'];

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: roles, required: true },

    // Optional, depending on role:
    universityCode: { type: String }, // Teacher
    referralCode: { type: String },   // Referral
    mouUrl: { type: String },         // University (uploaded file path)

    isPhoneVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
