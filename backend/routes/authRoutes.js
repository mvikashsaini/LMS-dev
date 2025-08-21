import { Router } from 'express';
import { validateSendOtp, validateVerifyOtp, validateRegister, sendOtp, verifyOtp, register, login } from '../controllers/authController.js';
import { uploadMou } from '../middleware/upload.js';

const router = Router();

router.post('/send-otp', validateSendOtp, sendOtp);
router.post('/verify-otp', validateVerifyOtp, verifyOtp);

// Role === "University" must send multipart/form-data with field name `mou`
router.post('/register', uploadMou, validateRegister, register);

router.post('/login', login);

export default router;
