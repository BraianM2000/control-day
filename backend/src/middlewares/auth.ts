// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'Token no proporcionado' })
    return
  }

  try {
    const secret = process.env.JWT_SECRET as string
    const decoded = jwt.verify(token, secret)
    ;(req as any).user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' })
  }
}
