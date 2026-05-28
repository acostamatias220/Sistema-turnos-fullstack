const express = require('express')
const cors = require('cors')
require('dotenv').config()
const sequelize = require('./config/database')
require('./models/index')
const authRoutes = require('./routes/authRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sistema-turnos-fullstack.vercel.app'
  ],
  credentials: true
}))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)

app.get('/', (req, res) => {
  res.json({ mensaje: '¡Servidor funcionando correctamente!' })
})

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa')
    // sync() crea las tablas en la BD si no existen todavía
    return sequelize.sync()
  })
  .then(() => {
    console.log('Tablas creadas correctamente')
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error:', error.message)
  })