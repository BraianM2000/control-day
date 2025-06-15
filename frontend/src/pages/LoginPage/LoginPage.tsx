// src/pages/LoginPage.tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../services/authService'
import './LoginPage.scss'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="login-page">

      <form onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
