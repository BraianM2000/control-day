import { pool } from '../db/client'

export interface User {
  id: string
  email: string
  password: string
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0] || null
  }

  static async findById(id: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0] || null
  }

  static async create(user: { email: string; password: string }): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [user.email, user.password]
    )
    return result.rows[0]
  }
}
