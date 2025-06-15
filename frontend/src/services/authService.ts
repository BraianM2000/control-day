import axios from 'axios'

const API = 'http://localhost:5000/api/users'

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API}/login`, { email, password })
  localStorage.setItem('token', res.data.token)
}

export const register = async (email: string, password: string) => {
  const res = await axios.post(`${API}/register`, { email, password })
  localStorage.setItem('token', res.data.token)
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}
