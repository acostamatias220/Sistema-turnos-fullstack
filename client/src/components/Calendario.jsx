import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

function Calendario({ turnos }) {
  // Convertir los turnos al formato que FullCalendar entiende
  const eventos = turnos.map((turno) => ({
    id: turno.id,
    title: `${turno.hora.slice(0, 5)}hs · ${turno.servicio}`,
    date: turno.fecha,
    backgroundColor:
      turno.estado === 'cancelado' ? '#e53e3e' :
      turno.estado === 'confirmado' ? '#22c55e' : '#667eea',
    borderColor: 'transparent'
  }))

  return (
    <div className='card' style={{ marginBottom: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>Calendario</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        locale='es'
        events={eventos}
        height='auto'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        buttonText={{ today: 'Hoy' }}
      />
    </div>
  )
}

export default Calendario