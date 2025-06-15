import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { findUserByEmail } from '../models/userModel'

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body

  try {
    const user = await findUserByEmail(email)

    if (!user) {
      res.status(401).json({ message: 'Usuario no encontrado' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(401).json({ message: 'Contraseña incorrecta' })
      return
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    )

    res.json({ token })
  } catch (error) {
    next(error)
  }
}
