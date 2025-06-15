import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Rutas
import userRoutes from './routes/userRoutes'
app.use('/api/users', userRoutes)

export default app
