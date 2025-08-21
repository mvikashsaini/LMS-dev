export function generateOtp(len = 4) {
  let s = '';
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
}

export function getOtpExpiryDate(minutes = Number(process.env.OTP_EXP_MINUTES || 5)) {
  const d = new Date();
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}
