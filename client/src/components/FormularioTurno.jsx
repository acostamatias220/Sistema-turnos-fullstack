import { useState } from 'react'
import api from '../services/api'

function FormularioTurno({ onTurnoCreado }) {
  const [form, setForm] = useState({
    fecha: '',
    hora: '',
    servicio: '',
    notas: ''
  })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)
    setError('')
    try {
      await api.post('/appointments', form)
      setForm({ fecha: '', hora: '', servicio: '', notas: '' })
      onTurnoCreado() // avisa al Dashboard que recargue la lista
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear el turno')
    } finally {
      setCargando(false)
    }
  }

  return (
    
      <form onSubmit={handleSubmit}>
        <div className='campo'>
          <label>Servicio</label>
          <select name='servicio' value={form.servicio} onChange={handleChange} required>
            <option value=''>Seleccioná un servicio</option>
            <option value='Corte de pelo'>Corte de pelo</option>
            <option value='Corte y barba'>Corte y barba</option>
            <option value='Coloración'>Coloración</option>
            <option value='Consulta odontológica'>Consulta odontológica</option>
            <option value='Entrenamiento personal'>Entrenamiento personal</option>
          </select>
        </div>
        <div className='campo'>
          <label>Fecha</label>
          <input
            type='date'
            name='fecha'
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className='campo'>
          <label>Hora</label>
          <input
            type='time'
            name='hora'
            value={form.hora}
            onChange={handleChange}
            required
          />
        </div>
        <div className='campo'>
          <label>Notas (opcional)</label>
          <textarea
            name='notas'
            value={form.notas}
            onChange={handleChange}
            placeholder='Alguna indicación especial...'
            rows={3}
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button type='submit' disabled={cargando}>
          {cargando ? 'Reservando...' : 'Reservar turno'}
        </button>
      </form>
  )
}

export default FormularioTurno