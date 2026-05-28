const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    // Verificar si el email ya existe
    const usuarioExistente = await User.findOne({ where: { email } })
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese email' })
    }

    // Encriptar la contraseña antes de guardarla
    const passwordEncriptada = await bcrypt.hash(password, 10)

    // Crear el usuario en la base de datos
    const nuevoUsuario = await User.create({
      nombre,
      email,
      password: passwordEncriptada
    })

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Buscar el usuario por email
    const usuario = await User.findOne({ where: { email } })
    if (!usuario) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' })
    }

    // Comparar la contraseña con la encriptada
    const passwordValida = await bcrypt.compare(password, usuario.password)
    if (!passwordValida) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' })
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}

module.exports = { register, login }