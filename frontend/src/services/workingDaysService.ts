// src/services/jornadaService.ts
import axios from 'axios'

const API = 'http://localhost:5000/api/working-day'

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export const checkIn = async () => {
  return axios.post(`${API}/entrada`, {}, authHeader())
}

export const checkOut = async () => {
  return axios.post(`${API}/salida`, {}, authHeader())
}

export const getWorkingDays = async () => {
  return axios.get(API, authHeader())
}
