import { Request, Response } from 'express'
import { WorkingDay  } from '../models/workingDay'
export const createWorkingDay = async (req: any, res: Response): Promise<void> => {

  try {
    const userId = req.user?.id
    const { date, checkIn, checkOut } = req.body

    const exists = await WorkingDay.findOne({ userId, date })
    if (exists) {
      res.status(400).json({ message: 'Working day already exists for this date' })
      return
    }

    const newDay = new WorkingDay({ userId, date, checkIn, checkOut })
    await newDay.save()

    res.status(201).json({ message: 'Working day registered successfully' })
  } catch (err) {
      console.error('Error al registrar jornada:', err)

    res.status(500).json({ message: 'Error registering working day' })
  }
}

export const getUserWorkingDays = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const workingDays = await WorkingDay.find({ userId }).sort({ date: -1 })
    res.json(workingDays)
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving working days' })
  }
}
