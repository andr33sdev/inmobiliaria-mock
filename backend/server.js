const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Importamos el pool de conexiones que creamos en db.js

const app = express();

// Configuración de límites para soportar las imágenes en Base64
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- ENDPOINTS DE LA API (AHORA CON MYSQL) ---

// 1. Obtener todas las propiedades
app.get("/api/propiedades", async (req, res) => {
  try {
    // MySQL ya se encarga de ordenarlas al revés de forma nativa y eficiente con ORDER BY id DESC
    const [rows] = await pool.query(
      "SELECT * FROM propiedades ORDER BY id DESC",
    );

    // Como las imágenes están guardadas como texto largo plano,
    // las volvemos a transformar en un Array de JavaScript para que React las lea bien
    const propiedadesFormateadas = rows.map((p) => ({
      ...p,
      imagenes: p.imagenes ? JSON.parse(p.imagenes) : [],
    }));

    res.json(propiedadesFormateadas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Agregar una propiedad
app.post("/api/propiedades", async (req, res) => {
  try {
    const query = `
      INSERT INTO propiedades 
      (titulo, tipo, operacion, precio, moneda, zona, hab, cochera, banos, m2, imagenes, descripcion, mapa) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Pasamos el array de imágenes a texto plano con JSON.stringify antes de insertarlo en LONGTEXT
    const values = [
      req.body.titulo,
      req.body.tipo || "casa",
      req.body.operacion || "venta",
      Number(req.body.precio),
      req.body.moneda || "u$s",
      req.body.zona,
      Number(req.body.hab || 0),
      Number(req.body.cochera || 0),
      Number(req.body.banos || 0),
      Number(req.body.m2 || 0),
      JSON.stringify(req.body.imagenes || []),
      req.body.descripcion,
      req.body.mapa,
    ];

    // Ejecutamos la consulta. MySQL genera el nuevo ID de forma automática (AUTO_INCREMENT)
    const [result] = await pool.query(query, values);

    res.json({
      id: result.insertId,
      message: "Propiedad guardada con éxito en SQL",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Modificar una propiedad
app.put("/api/propiedades/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      UPDATE propiedades SET 
      titulo=?, tipo=?, operacion=?, precio=?, moneda=?, zona=?, 
      hab=?, cochera=?, banos=?, m2=?, imagenes=?, descripcion=?, mapa=? 
      WHERE id=?
    `;

    const values = [
      req.body.titulo,
      req.body.tipo,
      req.body.operacion,
      Number(req.body.precio),
      req.body.moneda,
      req.body.zona,
      Number(req.body.hab || 0),
      Number(req.body.cochera || 0),
      Number(req.body.banos || 0),
      Number(req.body.m2 || 0),
      JSON.stringify(req.body.imagenes || []),
      req.body.descripcion,
      req.body.mapa,
      Number(id),
    ];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }

    res.json({ message: "Propiedad actualizada con éxito en SQL" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Eliminar una propiedad
app.delete("/api/propiedades/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM propiedades WHERE id = ?", [
      Number(id),
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }

    res.json({ message: "Propiedad eliminada con éxito de SQL" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. Autenticación del panel de control (Mantiene la seguridad en memoria)
app.post("/api/login", (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === "admin" && password === "ituzaingo2026") {
    res.json({ success: true, token: "inmo_secure_session_token_xyz_2026" });
  } else {
    res
      .status(401)
      .json({ success: false, error: "Usuario o contraseña incorrectos" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Backend profesional corriendo con motor MySQL en puerto ${PORT}`,
  ),
);
