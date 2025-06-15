// src/models/Jornada.ts
import { Schema, model } from 'mongoose'

const workingDaySchema = new Schema({
  userId: { type: String, required: true },
  fecha: { type: String, required: true },
  horaEntrada: String,
  horaSalida: String
})

export const workingDay = model('Jornada', workingDaySchema)
