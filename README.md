# Sistema de Turnos Fullstack

Aplicación web fullstack para gestión de turnos médicos, peluquerías y entrenadores personales.

## Tecnologías

- **Frontend:** React, Vite, React Router, Axios, FullCalendar
- **Backend:** Node.js, Express, JWT, bcrypt
- **Base de datos:** PostgreSQL, Sequelize ORM

## Funcionalidades

- Registro e inicio de sesión con autenticación JWT
- Contraseñas encriptadas con bcrypt
- Crear, modificar y cancelar turnos
- Vista de calendario mensual
- Rutas protegidas por rol (admin / cliente)
- Arquitectura REST API

## Instalación local

### Backend
```bash
cd server
npm install
# Crear archivo .env con las variables de entorno
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Variables de entorno necesarias en `server/.env`
```
PORT=3000
JWT_SECRET=tu_clave_secreta
DB_HOST=localhost
DB_PORT=5432
DB_NAME=turnos_db
DB_USER=postgres
DB_PASSWORD=tu_password
```