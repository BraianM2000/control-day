// src/routes/jornadaRoutes.ts
import { Router } from 'express'
import { createWorkingDay, getUserWorkingDays } from '../controllers/workingDayController'
import { authenticateToken } from '../middlewares/auth'

const router = Router()

// Ruta para registrar jornada manualmente (fecha, entrada, salida)
router.post('/', authenticateToken, createWorkingDay)

// Ruta para obtener el historial del usuario
router.get('/', authenticateToken, getUserWorkingDays)

export default router
