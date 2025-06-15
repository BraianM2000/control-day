import { Request, Response } from 'express'
import { workingDay } from '../models/workingDay'

export const ficharEntrada = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const fechaHoy = new Date().toISOString().split('T')[0]
    const horaActual = new Date().toTimeString().split(' ')[0]

    const yaFichado = await workingDay.findOne({ userId, fecha: fechaHoy })
    if (yaFichado) {
      res.status(400).json({ message: 'Ya fichaste hoy' })
      return
    }

    const nuevaJornada = new workingDay({
      userId,
      fecha: fechaHoy,
      horaEntrada: horaActual
    })
    await nuevaJornada.save()
    res.json({ message: 'Entrada registrada' })
  } catch (err) {
    res.status(500).json({ message: 'Error interno al fichar entrada' })
  }
}

export const ficharSalida = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const fechaHoy = new Date().toISOString().split('T')[0]
    const horaActual = new Date().toTimeString().split(' ')[0]

    const jornada = await workingDay.findOne({ userId, fecha: fechaHoy })
    if (!jornada) {
      res.status(404).json({ message: 'No hay jornada registrada' })
      return
    }

    jornada.horaSalida = horaActual
    await jornada.save()
    res.json({ message: 'Salida registrada' })
  } catch (err) {
    res.status(500).json({ message: 'Error interno al fichar salida' })
  }
}

export const obtenerJornadas = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const jornadas = await workingDay.find({ userId }).sort({ fecha: -1 })
    res.json(jornadas)
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener jornadas' })
  }
}
