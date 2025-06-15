import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWorkingDays, registerWorkingDay } from '../../services/workingDaysService'
import './DashboardPage.scss'

type Jornada = {
  date: string
  checkIn: string
  checkOut?: string
}

const DashboardPage = () => {
  const [jornadas, setJornadas] = useState<Jornada[]>([])
  const [form, setForm] = useState({
    date: '',
    checkIn: '',
    checkOut: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const cargarJornadas = async () => {
      try {
        const res = await getWorkingDays()
        setJornadas(res.data)
      } catch (err) {
        alert('Error al obtener jornadas')
      }
    }

    cargarJornadas()
  }, [navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registerWorkingDay(form)
      alert('Jornada registrada')
      setForm({ date: '', checkIn: '', checkOut: '' })

      const res = await getWorkingDays()
      setJornadas(res.data)
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al registrar jornada')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Panel de Control</h1>
        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <form className="dashboard__form" onSubmit={handleSubmit}>
        <h2>Registrar Jornada Manualmente</h2>
        <div>
          <label>Fecha: </label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora de Entrada: </label>
          <input type="time" name="checkIn" value={form.checkIn} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora de Salida: </label>
          <input type="time" name="checkOut" value={form.checkOut} onChange={handleChange} required />
        </div>
        <button type="submit">Registrar Jornada</button>
      </form>

      <h2>Historial de Jornadas</h2>
      <table className="dashboard__table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Entrada</th>
            <th>Salida</th>
          </tr>
        </thead>
        <tbody>
          {jornadas.map((j, i) => (
            <tr key={i}>
              <td>{j.date}</td>
              <td>{j.checkIn}</td>
              <td>{j.checkOut || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardPage
