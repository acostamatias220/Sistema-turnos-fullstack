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
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '22px', color: '#1a1a2e' }}>Mis turnos</h1>
            <p style={{ color: '#888', fontSize: '14px' }}>Bienvenido, {usuario?.nombre}</p>
          </div>
          <button
            onClick={handleLogout}
            style={{ width: 'auto', padding: '10px 20px', backgroundColor: '#e53e3e' }}
          >
            Cerrar sesión
          </button>
        </div>

        <FormularioTurno onTurnoCreado={cargarTurnos} />

        <Calendario turnos={turnos} />


        {cargando
          ? <p style={{ textAlign: 'center', color: '#888' }}>Cargando turnos...</p>
          : <ListaTurnos turnos={turnos} onTurnoActualizado={cargarTurnos} />
        }

      </div>
    </div>
  )
}

export default Dashboard