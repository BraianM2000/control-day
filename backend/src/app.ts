import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Rutas
import userRoutes from './routes/userRoutes'
import workingDayRoutes from './routes/workingDayRoutes'


app.use('/api/users', userRoutes)
app.use('/api/working-day', workingDayRoutes)

export default app
