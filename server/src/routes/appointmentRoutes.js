const express = require('express')
const router = express.Router()
const { verificarToken } = require('../middleware/auth')
const {
  crearTurno,
  obtenerMisTurnos,
  obtenerTodosTurnos,
  modificarTurno,
  cancelarTurno
} = require('../controllers/appointmentController')

// Todas estas rutas requieren token JWT
router.post('/', verificarToken, crearTurno)
router.get('/mis-turnos', verificarToken, obtenerMisTurnos)
router.get('/todos', verificarToken, obtenerTodosTurnos)
router.put('/:id', verificarToken, modificarTurno)
router.patch('/:id/cancelar', verificarToken, cancelarTurno)

module.exports = router