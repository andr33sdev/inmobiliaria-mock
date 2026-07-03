import React, { useState, useEffect } from "react";

export default function AdminPanel() {
  const [propiedades, setPropiedades] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    tipo: "casa",
    operacion: "venta",
    precio: "",
    moneda: "u$s",
    zona: "",
    hab: "",
    banos: "",
    cochera: "",
    m2: "",
    imagenes: [],
    descripcion: "",
    mapa: "",
  });
  const [editId, setEditId] = useState(null);
  const [procesandoImagenes, setProcesandoImagenes] = useState(false);

  // --- ESTADOS DE SEGURIDAD (LOGIN) ---
  const [token, setToken] = useState(sessionStorage.getItem("inmo_token"));
  const [credenciales, setCredenciales] = useState({
    usuario: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const API_URL = "https://irigoitiapropiedades.com.ar/api"; // Cambiar por la IP de DonWeb en producción

  const cargarPropiedades = async () => {
    if (!token) return;
    const res = await fetch(`${API_URL}/propiedades`);
    const data = await res.json();
    setPropiedades(data);
  };

  useEffect(() => {
    if (token) cargarPropiedades();
  }, [token]);

  // Manejador del Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credenciales),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("inmo_token", data.token);
        setToken(data.token);
      } else {
        setLoginError(data.error || "Error de autenticación");
      }
    } catch (err) {
      setLoginError("No se pudo conectar con el servidor de seguridad.");
    }
  };

  // Cerrar Sesión Seguro
  const handleLogout = () => {
    sessionStorage.removeItem("inmo_token");
    setToken(null);
    setCredenciales({ usuario: "", password: "" });
  };

  // Procesador de imágenes (HTML5 Canvas compression)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setProcesandoImagenes(true);
    const base64Images = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1000;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
          base64Images.push(compressedBase64);

          if (base64Images.length === files.length) {
            // Combinar con las imágenes que ya estaban cargadas previamente
            setForm((prev) => ({
              ...prev,
              imagenes: [...prev.imagenes, ...base64Images],
            }));
            setProcesandoImagenes(false);
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
    // Resetear el input para permitir volver a subir el mismo archivo si se desea
    e.target.value = "";
  };

  // --- LOGICA DE REORDENAMIENTO Y ELIMINACIÓN DE FOTOS ---
  const moverFoto = (index, direccion) => {
    const nuevasFotos = [...form.imagenes];
    const [fotoMovida] = nuevasFotos.splice(index, 1);
    const nuevaPosicion = direccion === "subir" ? index - 1 : index + 1;
    nuevasFotos.splice(nuevaPosicion, 0, fotoMovida);
    setForm({ ...form, imagenes: nuevasFotos });
  };

  const eliminarFoto = (index) => {
    const nuevasFotos = form.imagenes.filter((_, i) => i !== index);
    setForm({ ...form, imagenes: nuevasFotos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (procesandoImagenes)
      return alert(
        "Por favor espere a que las imágenes terminen de optimizarse.",
      );

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/propiedades/${editId}`
      : `${API_URL}/propiedades`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      titulo: "",
      tipo: "casa",
      operacion: "venta",
      precio: "",
      moneda: "u$s",
      zona: "",
      hab: "",
      banos: "",
      cochera: "",
      m2: "",
      imagenes: [],
      descripcion: "",
      mapa: "",
    });
    setEditId(null);
    cargarPropiedades();
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro querés borrar esta propiedad del catálogo?")) {
      await fetch(`${API_URL}/propiedades/${id}`, { method: "DELETE" });
      cargarPropiedades();
    }
  };

  // --- RENDERING CONDICIONAL DE SEGURIDAD ---
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans antialiased text-slate-200">
        <div className="w-full max-w-sm bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center space-y-6">
          <div>
            <h2 className="text-base font-light tracking-[0.25em] text-amber-400 uppercase">
              Panel de Control
            </h2>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase mt-1">
              Irigoitia Propiedades • Autenticación
            </p>
          </div>

          <form
            onSubmit={handleLoginSubmit}
            className="space-y-3 text-xs text-left"
          >
            <div>
              <label className="block text-[9px] uppercase tracking-widest text-slate-400 mb-1">
                Operador
              </label>
              <input
                type="text"
                placeholder="Usuario"
                value={credenciales.usuario}
                onChange={(e) =>
                  setCredenciales({ ...credenciales, usuario: e.target.value })
                }
                className="w-full bg-slate-900/60 border border-slate-700 text-slate-100 p-3 rounded-xl outline-none focus:border-amber-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-widest text-slate-400 mb-1">
                Clave de Seguridad
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={credenciales.password}
                onChange={(e) =>
                  setCredenciales({ ...credenciales, password: e.target.value })
                }
                className="w-full bg-slate-900/60 border border-slate-700 text-slate-100 p-3 rounded-xl outline-none focus:border-amber-400 transition"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-[11px] font-light pt-1 text-center">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-amber-400 text-slate-900 py-3 rounded-xl font-medium uppercase tracking-widest pt-3.5 hover:bg-amber-300 transition-colors shadow-md"
            >
              Ingresar Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- CORE DE ADMINISTRACIÓN (SOLO ACCESIBLE CON TOKEN ACTIVO) ---
  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 font-sans antialiased">
      {/* Mini Topbar del Admin */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex justify-between items-center text-xs">
        <p className="font-light text-gray-400 tracking-wider uppercase">
          SISTEMA ABM INMOBILIARIO ACTIVADO
        </p>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 font-medium tracking-wide"
        >
          CERRAR SESIÓN ✕
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
        {/* Formulario Fino */}
        <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-800 mb-4">
            {editId ? "Modificar Registro" : "Publicar Propiedad"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <input
              type="text"
              placeholder="Título Comercial"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full bg-gray-50 p-2 rounded-lg border-none text-gray-800 focus:ring-1 focus:ring-gray-200"
              required
            />

            <div className="grid grid-cols-2 gap-2">
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className="w-full bg-gray-50 p-2 rounded-lg border-none text-gray-600"
              >
                <option value="casa">Casa</option>
                <option value="depto">Depto</option>
              </select>
              <select
                value={form.operacion}
                onChange={(e) =>
                  setForm({ ...form, operacion: e.target.value })
                }
                className="w-full bg-gray-50 p-2 rounded-lg border-none text-gray-600"
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <select
                value={form.moneda}
                onChange={(e) => setForm({ ...form, moneda: e.target.value })}
                className="bg-gray-50 p-2 rounded-lg border-none text-gray-600"
              >
                <option value="u$s">u$s</option>
                <option value="$">$</option>
              </select>
              <input
                type="number"
                placeholder="Precio"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                className="col-span-2 bg-gray-50 p-2 rounded-lg border-none text-gray-800"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Zona (Ej: Ituzaingó Norte, Parque Leloir)"
              value={form.zona}
              onChange={(e) => setForm({ ...form, zona: e.target.value })}
              className="w-full bg-gray-50 p-2 rounded-lg border-none text-gray-800"
              required
            />

            <div className="grid grid-cols-4 gap-2">
              <input
                type="number"
                placeholder="Amb."
                value={form.hab}
                onChange={(e) => setForm({ ...form, hab: e.target.value })}
                className="bg-gray-50 p-2 rounded-lg border-none text-gray-800"
              />
              <input
                type="number"
                placeholder="Baños"
                value={form.banos}
                onChange={(e) => setForm({ ...form, banos: e.target.value })}
                className="bg-gray-50 p-2 rounded-lg border-none text-gray-800"
              />
              <input
                type="number"
                placeholder="Cocheras"
                value={form.cochera}
                onChange={(e) => setForm({ ...form, cochera: e.target.value })}
                className="bg-gray-50 p-2 rounded-lg border-none text-gray-800"
              />
              <input
                type="number"
                placeholder="M2 Totales"
                value={form.m2}
                onChange={(e) => setForm({ ...form, m2: e.target.value })}
                className="bg-gray-50 p-2 rounded-lg border-none text-gray-800"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                Adjuntar Fotos del Inmueble
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full bg-gray-50 p-2 rounded-lg text-gray-500 text-2xs cursor-pointer"
              />
              {procesandoImagenes && (
                <p className="text-red-500 text-[10px] animate-pulse mt-1">
                  Optimizando imágenes locales...
                </p>
              )}

              {/* --- GESTOR DE ORDEN VISUAL DE IMÁGENES --- */}
              {form.imagenes.length > 0 && !procesandoImagenes && (
                <div className="mt-3 space-y-1.5">
                  <p className="text-gray-400 text-[9px] uppercase tracking-wider font-semibold">
                    Organizar orden de fotos (La primera es la portada)
                  </p>
                  <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-100">
                    {form.imagenes.map((img, index) => (
                      <div
                        key={index}
                        className="relative bg-white border border-gray-200 rounded-lg p-1 flex flex-col justify-between items-center shadow-2xs"
                      >
                        <img
                          src={img}
                          alt={`preview-${index}`}
                          className="w-full h-10 object-cover rounded"
                        />

                        {index === 0 && (
                          <span className="absolute top-1 left-1 bg-amber-400 text-slate-900 text-[7px] px-1 rounded font-bold uppercase tracking-2xs">
                            Portada
                          </span>
                        )}

                        {/* Botonera de control posicional */}
                        <div className="flex justify-between w-full mt-1.5 px-0.5">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moverFoto(index, "subir")}
                            className="text-[10px] text-gray-400 hover:text-slate-900 disabled:opacity-10 cursor-pointer"
                            title="Mover hacia adelante"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            onClick={() => eliminarFoto(index)}
                            className="text-[10px] text-red-400 hover:text-red-600 font-bold cursor-pointer"
                            title="Eliminar esta foto"
                          >
                            ✕
                          </button>
                          <button
                            type="button"
                            disabled={index === form.imagenes.length - 1}
                            onClick={() => moverFoto(index, "bajar")}
                            className="text-[10px] text-gray-400 hover:text-slate-900 disabled:opacity-10 cursor-pointer"
                            title="Mover hacia atrás"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <textarea
              placeholder="Descripción comercial de la ficha..."
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
              className="w-full bg-gray-50 p-2 rounded-lg border-none h-16 text-gray-800"
            />

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                Ubicación de Google Maps
              </label>
              <input
                type="text"
                placeholder="Ej: Brandsen 3600, Ituzaingo"
                value={form.mapa}
                onChange={(e) => setForm({ ...form, mapa: e.target.value })}
                className="w-full bg-gray-50 p-2 rounded-lg border-none text-gray-800"
                required
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={procesandoImagenes}
                className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-medium uppercase tracking-wider disabled:opacity-40 hover:bg-slate-800 transition"
              >
                {editId ? "Guardar Cambios" : "Publicar Registro"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({
                      titulo: "",
                      tipo: "casa",
                      operacion: "venta",
                      precio: "",
                      moneda: "u$s",
                      zona: "",
                      hab: "",
                      banos: "",
                      cochera: "",
                      m2: "",
                      imagenes: [],
                      descripcion: "",
                      mapa: "",
                    });
                  }}
                  className="bg-gray-100 px-3 rounded-xl"
                >
                  ✕
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Listado de Propiedades */}
        <div className="md:col-span-7 space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-4">
            Propiedades publicadas ({propiedades.length})
          </h3>
          <div className="max-h-[75vh] overflow-y-auto space-y-2 pr-2">
            {propiedades.map((p) => (
              <div
                key={p.id}
                className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center text-xs shadow-2xs"
              >
                <div className="max-w-[70%] flex items-center gap-3">
                  {p.imagenes && p.imagenes.length > 0 && (
                    <img
                      src={p.imagenes[0]}
                      alt="Mini portada"
                      className="w-10 h-10 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                    />
                  )}
                  <div className="truncate">
                    <p className="font-normal text-gray-800 truncate">
                      {p.titulo}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
                      {p.moneda} {p.precio.toLocaleString()} • {p.zona}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditId(p.id);
                      setForm(p);
                    }}
                    className="text-slate-800 border border-gray-100 px-2.5 py-1 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(p.id)}
                    className="text-red-500 border border-gray-100 px-2.5 py-1 rounded-lg hover:bg-red-50 font-medium"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
