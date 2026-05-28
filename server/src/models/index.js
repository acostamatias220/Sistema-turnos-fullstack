const User = require('./User')
const Appointment = require('./Appointment')

// Un usuario puede tener muchos turnos
User.hasMany(Appointment, { foreignKey: 'userId' })
// Cada turno pertenece a un usuario
Appointment.belongsTo(User, { foreignKey: 'userId' })

module.exports = { User, Appointment }