import mongoose from "mongoose";

const roles = ["SuperAdmin", "SubAdmin", "Student", "Teacher", "University", "Referral"];
const subAdminRoles = ["BlogManager", "FinanceManager", "CareerCell", "GovernanceBody"];
const statuses = ["Pending", "Active", "Suspended", "Rejected"]; // you can expand as needed

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: roles, required: true },
    subRole: { type: String, enum: subAdminRoles, },
    universityCode: { type: String},
    referralCode: { type: String, required: function () { return this.role === "Referral"; } },
    isPhoneVerified: { type: Boolean, default: false },
    status: { type: String, enum: statuses, default: "Pending" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

// required: function () { return this.role === "SubAdmin"; } 