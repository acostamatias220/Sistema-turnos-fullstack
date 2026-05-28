import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

function Register() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)
    setError('')
    try {
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className='container'>
      <div className='card'>
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className='campo'>
            <label>Nombre</label>
            <input
              type='text'
              name='nombre'
              value={form.nombre}
              onChange={handleChange}
              placeholder='Tu nombre'
              required
            />
          </div>
          <div className='campo'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='tu@email.com'
              required
            />
          </div>
          <div className='campo'>
            <label>Contraseña</label>
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              placeholder='Mínimo 6 caracteres'
              required
            />
          </div>
          {error && <p className='error'>{error}</p>}
          <button type='submit' disabled={cargando}>
            {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>
        <p className='link'>
          ¿Ya tenés cuenta? <Link to='/login'>Iniciá sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Register