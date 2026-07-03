const mysql = require('mysql2/promise');

// Creamos un "Pool" (una piscina de conexiones grupales) 
// Esto evita que el servidor se sature si entran muchos usuarios a la vez
const pool = mysql.createPool({
  host: 'localhost',                  // Al estar en el mismo servidor, va 'localhost' siempre
  user: 'andr33s_inmo',   // El usuario que creaste en Ferozo
  password: '14V/UHfYdqjl9dB',          // La clave de esa base de datos
  database: 'andr33s_inmo',      // El nombre exacto de la base de datos
  waitForConnections: true,
  connectionLimit: 10,                // Capacidad de respuestas simultáneas
  queueLimit: 0
});

module.exports = pool;