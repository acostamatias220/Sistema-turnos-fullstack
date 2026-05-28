const { Appointment } = require('../models/index')

// Crear un turno nuevo
const crearTurno = async (req, res) => {
  try {
    const { fecha, hora, servicio, notas } = req.body

    // Verificar si ya existe un turno en esa fecha y hora
    const turnoExistente = await Appointment.findOne({
      where: { fecha, hora }
    })

    if (turnoExistente) {
      return res.status(400).json({
        error: 'Ya existe un turno reservado en esa fecha y horario'
      })
    }

    const turno = await Appointment.create({
      fecha,
      hora,
      servicio,
      notas,
      userId: req.usuario.id
    })

    res.status(201).json({
      mensaje: 'Turno creado correctamente',
      turno
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el turno' })
  }
}

// Obtener los turnos del usuario logueado
const obtenerMisTurnos = async (req, res) => {
  try {
    const turnos = await Appointment.findAll({
      where: { userId: req.usuario.id },
      order: [['fecha', 'ASC'], ['hora', 'ASC']]
    })

    res.json({ turnos })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los turnos' })
  }
}

// Obtener todos los turnos (solo admin)
const obtenerTodosTurnos = async (req, res) => {
  try {
    const turnos = await Appointment.findAll({
      include: [{
        model: require('../models/User'),
        attributes: ['nombre', 'email'] // incluir datos del usuario en la respuesta
      }],
      order: [['fecha', 'ASC'], ['hora', 'ASC']]
    })

    res.json({ turnos })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los turnos' })
  }
}

// Modificar un turno
const modificarTurno = async (req, res) => {
  try {
    const { id } = req.params
    const { fecha, hora, servicio, notas, estado } = req.body

    const turno = await Appointment.findOne({
      where: { id, userId: req.usuario.id }
    })

    if (!turno) {
      return res.status(404).json({ error: 'Turno no encontrado' })
    }

    // Verificar superposición solo si cambió la fecha o la hora
    if (fecha !== turno.fecha || hora !== turno.hora) {
      const turnoExistente = await Appointment.findOne({
        where: { fecha, hora }
      })

      if (turnoExistente) {
        return res.status(400).json({
          error: 'Ya existe un turno reservado en esa fecha y horario'
        })
      }
    }

    await turno.update({ fecha, hora, servicio, notas, estado })

    res.json({
      mensaje: 'Turno modificado correctamente',
      turno
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar el turno' })
  }
}

// Cancelar un turno
const cancelarTurno = async (req, res) => {
  try {
    const { id } = req.params

    const turno = await Appointment.findOne({
      where: { id, userId: req.usuario.id }
    })

    if (!turno) {
      return res.status(404).json({ error: 'Turno no encontrado' })
    }

    await turno.update({ estado: 'cancelado' })

    res.json({ mensaje: 'Turno cancelado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar el turno' })
  }
}

module.exports = {
  crearTurno,
  obtenerMisTurnos,
  obtenerTodosTurnos,
  modificarTurno,
  cancelarTurno
}