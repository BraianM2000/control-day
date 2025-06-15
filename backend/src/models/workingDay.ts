import mongoose from 'mongoose'

const workingDaySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String }
})

export const WorkingDay = mongoose.model('WorkingDay', workingDaySchema)
