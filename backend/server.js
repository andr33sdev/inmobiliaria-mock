const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- ENDPOINT DE AUTENTICACIÓN SEGURO ---
app.post("/api/login", (req, res) => {
  const { usuario, password } = req.body;

  // Credenciales de acceso seguras (Cambiá esto por lo que quieras en la reunión)
  const USUARIO_VALIDO = "admin";
  const PASSWORD_VALIDO = "ituzaingo2026";

  if (usuario === USUARIO_VALIDO && password === PASSWORD_VALIDO) {
    // Generamos un token simulado seguro para el frontend
    res.json({
      success: true,
      token: "inmo_secure_session_token_xyz_2026",
      message: "Acceso concedido",
    });
  } else {
    res
      .status(401)
      .json({ success: false, error: "Usuario o contraseña incorrectos" });
  }
});

// Inicializar Base de Datos SQLite (Se crea el archivo automáticamente)
const dbPath = path.resolve(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Error al abrir BD:", err.message);
  else console.log("Conectado a la base de datos SQLite.");
});

// Crear tabla de propiedades si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS propiedades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT, tipo TEXT, operacion TEXT, precio REAL, moneda TEXT,
    zona TEXT, hab INTEGER, banos INTEGER, m2 INTEGER,
    imagenes TEXT, descripcion TEXT, mapa TEXT
  )
`);

// --- ENDPOINTS API ---

// 1. Obtener todas las propiedades
app.get("/api/propiedades", (req, res) => {
  db.all("SELECT * FROM propiedades ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Convertir el string de imágenes de vuelta a array
    const result = rows.map((row) => ({
      ...row,
      imagenes: JSON.parse(row.imagenes),
    }));
    res.json(result);
  });
});

// 2. Agregar una propiedad
app.post("/api/propiedades", (req, res) => {
  const {
    titulo,
    tipo,
    operacion,
    precio,
    moneda,
    zona,
    hab,
    banos,
    m2,
    imagenes,
    descripcion,
    mapa,
  } = req.body;
  const imgsString = JSON.stringify(imagenes || []);

  const sql = `INSERT INTO propiedades (titulo, tipo, operacion, precio, moneda, zona, hab, banos, m2, imagenes, descripcion, mapa) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  const params = [
    titulo,
    tipo,
    operacion,
    precio,
    moneda,
    zona,
    hab,
    banos,
    m2,
    imgsString,
    descripcion,
    mapa,
  ];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, message: "Propiedad guardada" });
  });
});

// 3. Modificar una propiedad
app.put("/api/propiedades/:id", (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    tipo,
    operacion,
    precio,
    moneda,
    zona,
    hab,
    banos,
    m2,
    imagenes,
    descripcion,
    mapa,
  } = req.body;
  const imgsString = JSON.stringify(imagenes || []);

  const sql = `UPDATE propiedades SET titulo=?, tipo=?, operacion=?, precio=?, moneda=?, zona=?, hab=?, banos=?, m2=?, imagenes=?, descripcion=?, mapa=? WHERE id=?`;
  const params = [
    titulo,
    tipo,
    operacion,
    precio,
    moneda,
    zona,
    hab,
    banos,
    m2,
    imgsString,
    descripcion,
    mapa,
    id,
  ];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Propiedad actualizada" });
  });
});

// 4. Eliminar una propiedad
app.delete("/api/propiedades/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM propiedades WHERE id = ?", id, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Propiedad eliminada" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
