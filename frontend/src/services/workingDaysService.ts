// src/services/workingDaysService.ts
import axios from 'axios'

const API = 'http://localhost:5000/api/working-day'

export const getWorkingDays = () => {
  const token = localStorage.getItem('token')
  return axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const registerWorkingDay = (data: {
  date: string
  checkIn: string
  checkOut: string
}) => {
  const token = localStorage.getItem('token')
  return axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
