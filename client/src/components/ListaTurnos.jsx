import { useState } from 'react'
import api from '../services/api'

function ListaTurnos({ turnos, onTurnoActualizado }) {
  const [editandoId, setEditandoId] = useState(null)
  const [formEdicion, setFormEdicion] = useState({})

  const cancelarTurno = async (id) => {
    if (!confirm('¿Seguro que querés cancelar este turno?')) return
    try {
      await api.patch(`/appointments/${id}/cancelar`)
      onTurnoActualizado()
    } catch (err) {
      alert('Error al cancelar el turno')
    }
  }

  const abrirEdicion = (turno) => {
    setEditandoId(turno.id)
    setFormEdicion({
      fecha: turno.fecha,
      hora: turno.hora.slice(0, 5),
      servicio: turno.servicio,
      notas: turno.notas || ''
    })
  }

  const handleChangeEdicion = (e) => {
    setFormEdicion({ ...formEdicion, [e.target.name]: e.target.value })
  }

  const guardarEdicion = async (id) => {
    try {
      await api.put(`/appointments/${id}`, formEdicion)
      setEditandoId(null)
      onTurnoActualizado()
    } catch (err) {
      alert('Error al modificar el turno')
    }
  }

  const coloresEstado = {
    pendiente: { background: '#fff8e1', color: '#f59e0b' },
    confirmado: { background: '#e8f5e9', color: '#22c55e' },
    cancelado: { background: '#fff5f5', color: '#e53e3e' }
  }

  if (turnos.length === 0) {
    return (
      <div className='card'>
        <p style={{ textAlign: 'center', color: '#888' }}>
          No tenés turnos reservados todavía
        </p>
      </div>
    )
  }

  return (
    <div className='card'>
      <h2 style={{ marginBottom: '16px' }}>Mis turnos</h2>
      <div className='lista-turnos'>
        {turnos.map((turno) => (
          <div key={turno.id} className='turno-item'>

            {editandoId === turno.id ? (
              // Formulario de edición
              <div style={{ width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div className='campo'>
                    <label>Servicio</label>
                    <select name='servicio' value={formEdicion.servicio} onChange={handleChangeEdicion}>
                      <option value='Corte de pelo'>Corte de pelo</option>
                      <option value='Corte y barba'>Corte y barba</option>
                      <option value='Coloración'>Coloración</option>
                      <option value='Consulta odontológica'>Consulta odontológica</option>
                      <option value='Entrenamiento personal'>Entrenamiento personal</option>
                    </select>
                  </div>
                  <div className='campo'>
                    <label>Fecha</label>
                    <input type='date' name='fecha' value={formEdicion.fecha} onChange={handleChangeEdicion} />
                  </div>
                  <div className='campo'>
                    <label>Hora</label>
                    <input type='time' name='hora' value={formEdicion.hora} onChange={handleChangeEdicion} />
                  </div>
                  <div className='campo'>
                    <label>Notas</label>
                    <input type='text' name='notas' value={formEdicion.notas} onChange={handleChangeEdicion} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => guardarEdicion(turno.id)} style={{ width: 'auto', padding: '8px 16px' }}>
                    Guardar
                  </button>
                  <button onClick={() => setEditandoId(null)} style={{ width: 'auto', padding: '8px 16px', backgroundColor: '#888' }}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              // Vista normal del turno
              <>
                <div className='turno-info'>
                  <span className='turno-servicio'>{turno.servicio}</span>
                  <span className='turno-fecha'>
                    {new Date(turno.fecha).toLocaleDateString('es-AR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'UTC'
                    })}
                    {' · '}
                    {turno.hora.slice(0, 5)}hs
                  </span>
                  {turno.notas && (
                    <span className='turno-notas'>{turno.notas}</span>
                  )}
                </div>
                <div className='turno-acciones'>
                  <span className='turno-estado' style={coloresEstado[turno.estado]}>
                    {turno.estado}
                  </span>
                  {turno.estado !== 'cancelado' && (
                    <>
                      <button
                        className='btn-modificar'
                        onClick={() => abrirEdicion(turno)}
                      >
                        Modificar
                      </button>
                      <button
                        className='btn-cancelar'
                        onClick={() => cancelarTurno(turno.id)}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}

export default ListaTurnos