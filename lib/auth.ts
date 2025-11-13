import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev_secret_key'

export function signPinToken() {
  return jwt.sign({ auth: true }, SECRET, { expiresIn: '30m' })
}

export function verifyPinToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET)
    if (typeof decoded === 'object' && decoded.auth === true) return decoded
    return null
  } catch {
    return null
  }
}