import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

// Ruta protegida — redirige al login si no hay usuario logueado
const RutaProtegida = ({ children }) => {
  const { usuario, cargando } = useAuth()
  if (cargando) return <div>Cargando...</div>
  return usuario ? children : <Navigate to='/login' />
}

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={
        <RutaProtegida>
          <Dashboard />
        </RutaProtegida>
      } />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default App
