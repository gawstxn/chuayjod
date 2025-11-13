import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev_secret_key'

// สร้าง token หลังยืนยัน PIN ถูกต้อง
export function signPinToken() {
  return jwt.sign({ auth: true }, SECRET, { expiresIn: '30m' })
}

// ตรวจสอบ token ว่ายังใช้ได้ไหม
export function verifyPinToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET)
    // ตรวจว่ามีค่า auth=true จริง ๆ ด้วย
    if (typeof decoded === 'object' && decoded.auth === true) return decoded
    return null
  } catch {
    return null
  }
}