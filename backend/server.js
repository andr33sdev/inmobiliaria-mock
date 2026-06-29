const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Configuración de límites para soportar las imágenes en Base64
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Ruta del archivo que actuará como nuestra Base de Datos
const dbPath = path.resolve(__dirname, "database.json");

// Inicializar el archivo JSON con un array vacío si no existe
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

// Funciones auxiliares para leer y escribir de forma síncrona y ultra veloz
const leerPropiedades = () => {
  const fileData = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(fileData);
};

const guardarPropiedades = (datos) => {
  fs.writeFileSync(dbPath, JSON.stringify(datos, null, 2));
};

// --- ENDPOINTS DE LA API ---

// 1. Obtener todas las propiedades
app.get("/api/propiedades", (req, res) => {
  try {
    const propiedades = leerPropiedades();
    // Las ordenamos para que las últimas cargadas aparezcan primero
    res.json(propiedades.reverse());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Agregar una propiedad
app.post("/api/propiedades", (req, res) => {
  try {
    const propiedades = leerPropiedades();

    // Autoincrementar ID de forma manual y segura
    const nuevoId =
      propiedades.length > 0
        ? Math.max(...propiedades.map((p) => p.id)) + 1
        : 1;

    const nuevaPropiedad = {
      id: nuevoId,
      titulo: req.body.titulo,
      tipo: req.body.tipo,
      operacion: req.body.operacion,
      precio: Number(req.body.precio),
      moneda: req.body.moneda,
      zona: req.body.zona,
      hab: Number(req.body.hab || 0),
      cochera: Number(req.body.cochera || 0),
      banos: Number(req.body.banos || 0),
      m2: Number(req.body.m2 || 0),
      imagenes: req.body.imagenes || [], // Al ser JSON, guardamos el array directo sin hacerle Stringify!
      descripcion: req.body.descripcion,
      mapa: req.body.mapa,
    };

    propiedades.push(nuevaPropiedad);
    guardarPropiedades(propiedades);

    res.json({ id: nuevoId, message: "Propiedad guardada con éxito" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Modificar una propiedad
app.put("/api/propiedades/:id", (req, res) => {
  try {
    const { id } = req.params;
    const propiedades = leerPropiedades();
    const index = propiedades.findIndex((p) => p.id === Number(id));

    if (index === -1)
      return res.status(404).json({ error: "Propiedad no encontrada" });

    // Actualizamos los campos manteniendo el mismo ID
    propiedades[index] = {
      ...propiedades[index],
      ...req.body,
      id: Number(id),
      precio: Number(req.body.precio),
      hab: Number(req.body.hab || 0),
      cochera: Number(req.body.cochera || 0),
      banos: Number(req.body.banos || 0),
      m2: Number(req.body.m2 || 0),
    };

    guardarPropiedades(propiedades);
    res.json({ message: "Propiedad actualizada con éxito" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Eliminar una propiedad
app.delete("/api/propiedades/:id", (req, res) => {
  try {
    const { id } = req.params;
    const propiedades = leerPropiedades();
    const nuevasPropiedades = propiedades.filter((p) => p.id !== Number(id));

    guardarPropiedades(nuevasPropiedades);
    res.json({ message: "Propiedad eliminada con éxito" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. Autenticación del panel de control
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
  console.log(`Backend de contingencia corriendo en puerto ${PORT}`),
);
