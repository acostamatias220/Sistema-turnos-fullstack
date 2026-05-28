import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import FormularioTurno from '../components/FormularioTurno'
import ListaTurnos from '../components/ListaTurnos'
import Calendario from '../components/Calendario'

function Dashboard() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const [turnos, setTurnos] = useState([])
  const [cargando, setCargando] = useState(true)

  const cargarTurnos = async () => {
    try {
      const res = await api.get('/appointments/mis-turnos')
      setTurnos(res.data.turnos)
    } catch (err) {
      console.error('Error al cargar turnos:', err)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarTurnos()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <header className='header'>
        <div>
          <h1>TurnosApp</h1>
          <span>Bienvenido, {usuario?.nombre}</span>
        </div>
        <button className='btn-logout' onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <div className='dashboard-body'>
        <div className='dashboard-grid'>
          <div className='dashboard-card'>
            <FormularioTurno onTurnoCreado={cargarTurnos} />
          </div>
          <div className='dashboard-card'>
            <Calendario turnos={turnos} />
          </div>
        </div>

        <div className='dashboard-card'>
          {cargando
            ? <p style={{ textAlign: 'center', color: '#888' }}>Cargando turnos...</p>
            : <ListaTurnos turnos={turnos} onTurnoActualizado={cargarTurnos} />
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard