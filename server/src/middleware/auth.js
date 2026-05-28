const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
  // El token viene en el header Authorization: Bearer <token>
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token requerido' })
  }

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = datos
    next() // Todo bien, continuar al siguiente paso
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

module.exports = { verificarToken }