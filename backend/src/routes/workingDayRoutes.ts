// src/routes/jornadaRoutes.ts
import { Router } from 'express'
import { checkIn, checkOut, getWorkingDays } from '../controllers/workingDayController'
import { authenticateToken } from '../middlewares/auth'
    
const router = Router()

router.post('/entrada', authenticateToken, checkIn)
router.post('/salida', authenticateToken, checkOut)
router.get('/', authenticateToken, getWorkingDays)

export default router
