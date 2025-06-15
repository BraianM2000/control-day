import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UserModel } from '../models/userModel' 

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findByEmail(email) 

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
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body

  try {
    const existing = await UserModel.findByEmail(email)
    if (existing) {
       res.status(400).json({ message: 'El usuario ya existe' })
       return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({ email, password: hashedPassword })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    )

    res.status(201).json({ token })
  } catch (err) {
    next(err)
  }
}