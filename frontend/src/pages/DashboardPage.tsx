// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react'
import { checkIn, checkOut, getWorkingDays } from '../services/workingDaysService'

type Jornada = {
  fecha: string
  horaEntrada: string
  horaSalida?: string
}

const DashboardPage = () => {
  const [jornadas, setJornadas] = useState<Jornada[]>([])

  const cargarJornadas = async () => {
    try {
      const res = await getWorkingDays()
      setJornadas(res.data)
    } catch (err) {
      alert('Error al obtener jornadas')
    }
  }

  const handleEntrada = async () => {
    try {
      await checkIn()
      alert('Entrada registrada')
      cargarJornadas()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al fichar entrada')
    }
  }

  const handleSalida = async () => {
    try {
      await checkOut()
      alert('Salida registrada')
      cargarJornadas()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al fichar salida')
    }
  }

  useEffect(() => {
    cargarJornadas()
  }, [])

  return (
    <div>
      <h1>Panel de Control</h1>
      <button onClick={handleEntrada}>Fichar Entrada</button>
      <button onClick={handleSalida}>Fichar Salida</button>

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
