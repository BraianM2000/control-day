import { useState } from 'react'
import axios from 'axios'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email, password
      })
      localStorage.setItem('token', res.data.token)
      alert('Login exitoso')
    } catch (err) {
      alert('Login fallido')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage
