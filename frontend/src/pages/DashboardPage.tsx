import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWorkingDays, registerWorkingDay } from '../services/workingDaysService'

type Jornada = {
  fecha: string
  horaEntrada: string
  horaSalida?: string
}

const DashboardPage = () => {
  const [jornadas, setJornadas] = useState<Jornada[]>([])
  const [form, setForm] = useState({
    fecha: '',
    horaEntrada: '',
    horaSalida: '',
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
      await registerWorkingDay({
        date: form.fecha,
        checkIn: form.horaEntrada,
        checkOut: form.horaSalida,
      })
      alert('Jornada registrada')
      setForm({ fecha: '', horaEntrada: '', horaSalida: '' })

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
    <div>
      <h1>Panel de Control</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <form onSubmit={handleSubmit}>
        <h2>Registrar Jornada Manualmente</h2>
        <div>
          <label>Fecha: </label>
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora de Entrada: </label>
          <input type="time" name="horaEntrada" value={form.horaEntrada} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora de Salida: </label>
          <input type="time" name="horaSalida" value={form.horaSalida} onChange={handleChange} required />
        </div>
        <button type="submit">Registrar Jornada</button>
      </form>

      <h2>Historial de Jornadas</h2>
      <table border={1}>
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
              <td>{j.fecha}</td>
              <td>{j.horaEntrada}</td>
              <td>{j.horaSalida || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardPage
