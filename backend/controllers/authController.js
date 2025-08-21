import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

import User from '../models/User.js';
import OtpCode from '../models/OtpCode.js';
import { generateOtp, getOtpExpiryDate } from '../utils/otp.js';
import generateToken from '../utils/generateToken.js';

// ===== Validators =====
export const validateSendOtp = [
  body('phone').isString().trim().isLength({ min: 8 }).withMessage('Valid phone required'),
];

export const validateVerifyOtp = [
  body('phone').isString().trim(),
  body('code').isString().trim().isLength({ min: 4, max: 6 })
];

export const validateRegister = [
  body('fullName').isString().trim().notEmpty(),
  body('email').isEmail(),
  body('phone').isString().trim(),
  body('password').isString().isLength({ min: 6 }),
  body('role').isIn(['Student', 'Teacher', 'University', 'Referral']),
  body('universityCode').optional().isString(),
  body('referralCode').optional().isString(),
];

// ===== Controllers =====

// POST /api/auth/send-otp
export async function sendOtp(req, res) {
  // express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { phone } = req.body;
  const code = generateOtp(4); // e.g., "1234"
  const expiresAt = getOtpExpiryDate();

  // Upsert OTP for this phone
  await OtpCode.findOneAndUpdate(
    { phone },
    { code, expiresAt, verified: false },
    { upsert: true, new: true }
  );

  // NOTE: Integrate SMS/Email provider here. For now, return code in dev (like your UI’s dummy flow):
  res.json({ message: 'OTP sent', devOtp: code, expiresAt });
}

// POST /api/auth/verify-otp
export async function verifyOtp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { phone, code } = req.body;

  const otpDoc = await OtpCode.findOne({ phone });
  if (!otpDoc) return res.status(400).json({ message: 'OTP not found. Send OTP first.' });

  if (otpDoc.verified) return res.json({ message: 'Already verified' });

  if (new Date() > otpDoc.expiresAt) return res.status(400).json({ message: 'OTP expired' });
  if (otpDoc.code !== code) return res.status(400).json({ message: 'Invalid OTP' });

  otpDoc.verified = true;
  await otpDoc.save();

  res.json({ message: 'OTP verified' });
}

// POST /api/auth/register  (multipart/form-data when role=University)
export async function register(req, res) {
  // for multipart, only body fields present will be validated — we run manual checks
  const v = validationResult(req);
  if (!v.isEmpty()) return res.status(400).json({ errors: v.array() });

  const { fullName, email, phone, password, role, universityCode, referralCode } = req.body;

  // Must have verified OTP
  const otpDoc = await OtpCode.findOne({ phone });
  if (!otpDoc || !otpDoc.verified) {
    return res.status(400).json({ message: 'Please verify OTP before signup' });
  }

  // Unique email/phone
  const exists = await User.findOne({ $or: [{ email }, { phone }] });
  if (exists) return res.status(409).json({ message: 'Email or phone already registered' });

  // Role-specific requirement: University needs MoU file
  let mouUrl;
  if (role === 'University') {
    if (!req.file) return res.status(400).json({ message: 'MoU document is required' });
    mouUrl = `/${req.file.path.replace(/\\/g, '/')}`; // public path e.g. /uploads/mou/filename.pdf
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullName,
    email,
    phone,
    passwordHash,
    role,
    universityCode: role === 'Teacher' ? (universityCode || null) : undefined,
    referralCode: role === 'Referral' ? (referralCode || null) : undefined,
    mouUrl,
    isPhoneVerified: true
  });

  // (Optional) Invalidate OTP after use
  await OtpCode.deleteOne({ phone });

  const token = generateToken({ id: user._id, role: user.role });
  res.status(201).json({
    message: 'Account created',
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      mouUrl: user.mouUrl || null,
    }
  });
}

// POST /api/auth/login
export async function login(req, res) {
  const { emailOrPhone, password } = req.body;
  if (!emailOrPhone || !password) return res.status(400).json({ message: 'emailOrPhone and password required' });

  const user = await User.findOne({
    $or: [{ email: emailOrPhone.toLowerCase() }, { phone: emailOrPhone }]
  });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken({ id: user._id, role: user.role });
  res.json({
    message: 'Logged in',
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      mouUrl: user.mouUrl || null,
    }
  });
}
