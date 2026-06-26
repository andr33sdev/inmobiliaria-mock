import React, { useState, useMemo, useEffect } from "react";
import logo from "./assets/logo.png";
import AdminPanel from "./components/AdminPanel";

const MOCK_PROPIEDADES = [
  {
    id: 1,
    titulo: "Casa Americana con Parque y Parrilla",
    tipo: "casa",
    operacion: "venta",
    precio: 125000,
    moneda: "u$s",
    zona: "Ituzaingó Norte (Cerca de la plaza)",
    hab: 3,
    banos: 2,
    m2: 150,
    imagenes: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    descripcion:
      "Excelente propiedad ubicada en el corazón de Ituzaingó Norte. Cuenta con amplio living comedor, cocina integrada totalmente equipada, tres dormitorios luminosos y un jardín espectacular con parrilla ideal para reuniones familiares. Ubicación de primer nivel cerca de la Plaza 20 de Febrero.",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.671384739178!2d-58.6723225!3d-34.6377488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbe3412ad5db7%3A0x6338fb308a0d24c!2sPlaza%2020%20de%20Febrero!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar",
  },
  {
    id: 2,
    titulo: "Departamento 2 Ambientes Impecable",
    tipo: "depto",
    operacion: "alquiler",
    precio: 350000,
    moneda: "$",
    zona: "Centro Residencial - Brandsen al 3000",
    hab: 1,
    banos: 1,
    m2: 45,
    imagenes: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    ],
    descripcion:
      "Departamento moderno en zona altamente residencial sobre la calle Brandsen. Edificio seguro con bajas expensas. Ambiente muy luminoso, cocina con muebles bajo mesada a medida y balcón al contrafrente.",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.5937107871635!2d-58.6660124!3d-34.6397063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbe2b5cd3028f%3A0x5df57cf84918f0a0!2sBrandsen%25203000%252C%2520Ituzaing%25C3%25B3!5e0!3m2!1ses-419!2sar!4v1700000000001!5m2!1ses-419!2sar",
  },
  {
    id: 3,
    titulo: "Duplex Moderno con Cochera Propia",
    tipo: "casa",
    operacion: "venta",
    precio: 98000,
    moneda: "u$s",
    zona: "Ituzaingó Sur (Excelente Entorno)",
    hab: 2,
    banos: 2,
    m2: 90,
    imagenes: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    ],
    descripcion:
      "Duplex funcional en inmejorable zona residencial de Ituzaingó Sur, cercano a la avenida Mariano Acosta. Desarrollado en dos plantas con patio privado y entrada de vehículo automatizada.",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.342191543187!2d-58.6781223!3d-34.6460561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbe4523e10ab7%3A0x86bd7cbda819ad37!2sItuzaing%25C3%25B3%2520Sur!5e0!3m2!1ses-419!2sar!4v1700000000002!5m2!1ses-419!2sar",
  },
  {
    id: 4,
    titulo: "PH 3 Ambientes con Fondo Libre",
    tipo: "casa",
    operacion: "alquiler",
    precio: 420000,
    moneda: "$",
    zona: "Barrio Aeronáutico - Ituzaingó",
    hab: 2,
    banos: 1,
    m2: 65,
    imagenes: [
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=1200&q=80",
    ],
    descripcion:
      "Propiedad en planta baja sin expensas en el tranquilo Barrio Aeronáutico. Entrada independiente, cocina comedor amplia, dos dormitorios cómodos con placard y fondo libre con lavadero cubierto.",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.123456789012!2d-58.685000!3d-34.625000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzMwLjAiUyA1OMKwNDEnMDYuMCJX!5e0!3m2!1ses-419!2sar!4v1700000000003!5m2!1ses-419!2sar",
  },
  {
    id: 5,
    titulo: "Chalet Tradicional en Parque Leloir",
    tipo: "casa",
    operacion: "venta",
    precio: 185000,
    moneda: "u$s",
    zona: "Parque Leloir (Zona Exclusiva)",
    hab: 4,
    banos: 3,
    m2: 220,
    imagenes: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    descripcion:
      "Chalet de categoría en la prestigiosa reserva ecológica de Parque Leloir, a pocas cuadras del circuito gastronómico de Martín Fierro. Gran arboleda, piscina, quincho completo y dependencias.",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.112345678901!2d-58.691000!3d-34.612000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCwDM2JzQMyLjAiUyA1OMKwNDEnMjcuNlc!5e0!3m2!1ses-419!2sar!4v1700000000004!5m2!1ses-419!2sar",
  },
  {
    id: 6,
    titulo: "Monoambiente Luminoso a Estrenar",
    tipo: "depto",
    operacion: "alquiler",
    precio: 220000,
    moneda: "$",
    zona: "A metros de la Estación Ituzaingó",
    hab: 1,
    banos: 1,
    m2: 32,
    imagenes: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672016913-74e40428b52a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    ],
    descripcion:
      "Excelente unidad funcional a metros de la estación de tren línea Sarmiento. Ideal estudiantes o profesionales. Sanitarios de primera calidad, aberturas modernas y excelente conectividad de colectivos.",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.612345678901!2d-58.669000!3d-34.639000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCwDM4JzIwLjAiUyA1OMKwNDAnMDguNFJX!5e0!3m2!1ses-419!2sar!4v1700000000005!5m2!1ses-419!2sar",
  },
  {
    id: 7,
    titulo: "Casa Quinta con Gran Piscina",
    tipo: "casa",
    operacion: "venta",
    precio: 140000,
    moneda: "u$s",
    zona: "Villa Udaondo - Ituzaingó",
    hab: 3,
    banos: 2,
    m2: 180,
    imagenes: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    ],
    descripcion:
      "Propiedad de descanso en el histórico entorno de Villa Udaondo. Posee una forestación añeja excelente, amplio lote de terreno, quincho semicubierto perimetrado y piscina.",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.912345678901!2d-58.699000!3d-34.595000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCwDM1JzQyLjAiUyA1OMKwNDEnNTYuNFJX!5e0!3m2!1ses-419!2sar!4v1700000000006!5m2!1ses-419!2sar",
  },
];

const ITEMS_POR_PAGINA = 3;

export default function App() {
  if (window.location.pathname === "/admin") {
    return <AdminPanel />;
  }

  const [propiedades, setPropiedades] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  const [zoomIndex, setZoomIndex] = useState(null);

  const [operacion, setOperacion] = useState("todos");
  const [tipo, setTipo] = useState("todos");
  const [precioMax, setPrecioMax] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const API_URL = "http://localhost:5000/api/propiedades";

  useEffect(() => {
    const obtenerPropiedadesBD = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data && data.length > 0) {
          setPropiedades(data);
        } else {
          setPropiedades(MOCK_PROPIEDADES);
        }
      } catch (error) {
        console.error("Error conectando con backend:", error);
        setPropiedades(MOCK_PROPIEDADES);
      }
    };
    obtenerPropiedadesBD();
  }, []);

  useEffect(() => {
    if (menuAbierto || propiedadSeleccionada || zoomIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuAbierto, propiedadSeleccionada, zoomIndex]);

  useEffect(() => {
    if (zoomIndex === null || !propiedadSeleccionada) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setZoomIndex(null);
      if (e.key === "ArrowRight")
        setZoomIndex(
          (prev) => (prev + 1) % propiedadSeleccionada.imagenes.length,
        );
      if (e.key === "ArrowLeft")
        setZoomIndex(
          (prev) =>
            (prev - 1 + propiedadSeleccionada.imagenes.length) %
            propiedadSeleccionada.imagenes.length,
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomIndex, propiedadSeleccionada]);

  const propiedadesFiltradas = useMemo(() => {
    setPaginaActual(1);
    return propiedades.filter((prop) => {
      const matchOperacion =
        operacion === "todos" || prop.operacion === operacion;
      const matchTipo = tipo === "todos" || prop.tipo === tipo;
      const matchPrecio = !precioMax || prop.precio <= Number(precioMax);
      return matchOperacion && matchTipo && matchPrecio;
    });
  }, [propiedades, operacion, tipo, precioMax]);

  const totalPaginas = Math.ceil(
    propiedadesFiltradas.length / ITEMS_POR_PAGINA,
  );
  const propiedadesPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    return propiedadesFiltradas.slice(inicio, inicio + ITEMS_POR_PAGINA);
  }, [propiedadesFiltradas, paginaActual]);

  return (
    <div className="min-h-screen bg-gray-50 text-inmo-text-dark font-sans antialiased">
      <div
        className={`fixed inset-0 bg-inmo-primary/10 backdrop-blur-md z-40 transition-opacity duration-300 ${menuAbierto ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuAbierto(false)}
      ></div>

      <div className="bg-inmo-primary text-white relative">
        {/* HEADER INTEGRADO CON MENÚ RESPONSIVO PREMIUM */}
        <header className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-white/5 relative z-50">
          {/* Identidad de Marca */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Irigoitia Propiedades"
              className="h-12 w-auto object-contain"
            />
            {/* Cambiado a hidden md:block para que en mobile y tablets SOLO se vea el logo */}
            <div className="hidden md:block">
              <h1 className="font-light text-base tracking-widest text-inmo-yellow leading-tight">
                IRIGOITIA PROPIEDADES
              </h1>
              <p className="text-[10px] text-blue-200/50 uppercase tracking-widest font-light mt-0.5">
                Lorena Irigoitia • Mat. 2382 Morón
              </p>
            </div>
          </div>

          {/* NAVEGACIÓN DESKTOP (Se oculta en mobile de forma sincronizada) */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-medium tracking-wider text-gray-300">
            <a
              href="#propiedades"
              className="hover:text-inmo-yellow transition-colors"
            >
              Propiedades
            </a>
            <a
              href="#nosotros"
              className="hover:text-inmo-yellow transition-colors"
            >
              Nosotros
            </a>
            <a
              href="https://wa.me/1159743064"
              className="border border-inmo-red bg-inmo-red/10 hover:bg-inmo-red px-3 py-1.5 rounded-lg text-white font-medium transition-all"
            >
              Tasaciones
            </a>
          </nav>

          {/* BOTÓN HAMBURGUESA MINIMALISTA (Solo visible en Mobile) */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden text-gray-300 hover:text-white p-1 focus:outline-none transition-colors"
            aria-label="Menú de navegación"
          >
            {menuAbierto ? (
              <svg
                className="w-5 h-5 transition-transform duration-300 rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* DESPLEGABLE MÓVIL CON ANIMACIÓN SUAVE Y TRANSPARENCIA */}
          <div
            className={`absolute top-full left-0 right-0 mt-2 mx-6 p-5 bg-inmo-primary/98 backdrop-blur-md rounded-xl border border-white/10 shadow-xl md:hidden flex flex-col space-y-4 text-center text-xs font-light tracking-widest text-gray-200 transition-all duration-300 ease-in-out origin-top ${
              menuAbierto
                ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
                : "opacity-0 -translate-y-2 pointer-events-none scale-98"
            }`}
          >
            <a
              href="#propiedades"
              onClick={() => setMenuAbierto(false)}
              className="py-1.5 hover:text-inmo-yellow border-b border-white/5 transition-colors block"
            >
              PROPIEDADES
            </a>
            <a
              href="#nosotros"
              onClick={() => setMenuAbierto(false)}
              className="py-1.5 hover:text-inmo-yellow border-b border-white/5 transition-colors block"
            >
              NOSOTROS
            </a>
            <a
              href="https://wa.me/1159743064"
              onClick={() => setMenuAbierto(false)}
              className="mt-2 bg-inmo-red border border-inmo-red hover:bg-opacity-90 text-white py-2.5 rounded-lg font-medium tracking-widest block transition-all shadow-sm"
            >
              TASACIONES GRATUITAS
            </a>
          </div>
        </header>

        <section className="max-w-4xl mx-auto text-center pt-12 pb-8 px-4">
          <h2 className="text-2xl md:text-3xl font-light mb-2 tracking-wide leading-tight">
            Encontrá tu próximo hogar en el barrio
          </h2>
          <p className="text-blue-200/70 text-[10px] uppercase tracking-[0.2em] font-light">
            Ituzaingó • Trayectoria Familiar
          </p>
        </section>

        <div className="max-w-5xl mx-auto px-6 pb-10">
          <div className="bg-white p-4 rounded-xl shadow-md grid grid-cols-1 sm:grid-cols-4 gap-4 border border-gray-100">
            {["operacion", "tipo", "precioMax"].map((filtro, idx) => (
              <div key={idx}>
                <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1.5 tracking-wider">
                  {filtro === "precioMax"
                    ? "Presupuesto Máximo"
                    : filtro === "operacion"
                      ? "Operación"
                      : "Inmueble"}
                </label>
                {filtro === "precioMax" ? (
                  <input
                    type="number"
                    placeholder="Ej: 300000"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                    className="w-full bg-gray-50 border-none p-2 rounded-lg text-xs font-normal focus:ring-1 focus:ring-inmo-primary text-gray-700"
                  />
                ) : (
                  <select
                    value={filtro === "operacion" ? operacion : tipo}
                    onChange={(e) =>
                      filtro === "operacion"
                        ? setOperacion(e.target.value)
                        : setTipo(e.target.value)
                    }
                    className="w-full bg-gray-50 border-none p-2 rounded-lg text-xs font-normal focus:ring-1 focus:ring-inmo-primary text-gray-600"
                  >
                    {filtro === "operacion" ? (
                      <>
                        <option value="todos">Alquiler o Venta</option>
                        <option value="alquiler">En Alquiler</option>
                        <option value="venta">En Venta</option>
                      </>
                    ) : (
                      <>
                        <option value="todos">Todos los tipos</option>
                        <option value="casa">Casas</option>
                        <option value="depto">Departamentos</option>
                      </>
                    )}
                  </select>
                )}
              </div>
            ))}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setOperacion("todos");
                  setTipo("todos");
                  setPrecioMax("");
                }}
                className="w-full h-8 bg-gray-50 text-gray-400 text-xs font-medium rounded-lg hover:bg-gray-100 transition"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>

      <main
        id="propiedades"
        className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        <div className="lg:col-span-7 space-y-5">
          <div className="flex justify-between items-center border-b border-gray-200/60 pb-3">
            <h3 className="font-light text-lg text-inmo-primary tracking-wide">
              Propiedades Destacadas
            </h3>
            <span className="text-[11px] text-gray-400">
              {propiedadesFiltradas.length} opciones en vivo
            </span>
          </div>

          <div className="space-y-4">
            {propiedadesPaginadas.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-xl overflow-hidden shadow-2xs border border-gray-100 hover:shadow-sm transition-all flex flex-col sm:flex-row h-auto sm:h-40 group"
              >
                <div className="sm:w-44 h-40 sm:h-full relative overflow-hidden flex-shrink-0">
                  <img
                    src={prop.imagenes[0]}
                    className="w-full h-full object-cover"
                    alt="img"
                  />
                  <span
                    className={`absolute top-2 left-2 text-[9px] font-medium uppercase px-2 py-0.5 rounded text-white tracking-widest ${prop.operacion === "venta" ? "bg-inmo-red" : "bg-inmo-primary"}`}
                  >
                    {prop.operacion}
                  </span>
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-[9px] font-medium text-gray-400 uppercase tracking-widest mb-0.5">
                      {prop.zona}
                    </p>
                    <h4 className="font-normal text-gray-700 text-base line-clamp-1 group-hover:text-inmo-primary transition-colors">
                      {prop.titulo}
                    </h4>
                    <div className="flex space-x-3 mt-2 text-[11px] text-gray-400 font-light">
                      <span>🛏️ {prop.hab} dorm.</span>
                      <span>🛁 {prop.banos} baño</span>
                      <span>📐 {prop.m2} m²</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
                    <span className="text-lg font-semibold text-inmo-primary tracking-tight">
                      {prop.moneda} {prop.precio.toLocaleString()}
                    </span>
                    <button
                      onClick={() => setPropiedadSeleccionada(prop)}
                      className="bg-transparent hover:bg-gray-50 text-inmo-primary border border-gray-200 text-xs font-medium py-1.5 px-3 rounded-lg transition-all"
                    >
                      Ver ficha
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="flex justify-center items-center space-x-1.5 pt-4">
              <button
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual((prev) => prev - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 text-xs font-bold transition"
              >
                ←
              </button>
              {[...Array(totalPaginas)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPaginaActual(index + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${paginaActual === index + 1 ? "bg-inmo-primary text-white shadow-xs" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual((prev) => prev + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 text-xs font-bold transition"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* MAPA REPARADO DE LA OFICINA GENERAL (Brandsen 3625, Ituzaingó) */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <h3 className="font-light text-lg text-inmo-primary border-b border-gray-200/60 pb-3">
              Nuestra Oficina
            </h3>
            <div className="w-full h-[320px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200/60 relative">
              <iframe
                src="https://maps.google.com/maps?q=Brandsen%203625,%20Ituzaingo&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Oficina"
              ></iframe>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
              <h4 className="font-medium text-[10px] text-inmo-red uppercase tracking-widest mb-1.5">
                Trayectoria Inmobiliaria
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                Conducida por <strong>Lorena Irigoitia</strong>, Martillera
                Pública (Mat. 2382 - Morón). Más de 20 años de trato directo y
                transparente en Ituzaingó.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DETALLE PROPIEDAD */}
      {propiedadSeleccionada && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-inmo-primary/30 backdrop-blur-md"
            onClick={() => setPropiedadSeleccionada(null)}
          ></div>

          <div className="relative bg-white w-full max-w-5xl max-h-[88vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-modalIn">
            <div className="bg-white p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10 shrink-0">
              <div className="max-w-[100%] sm:max-w-[55%]">
                <h2 className="text-base font-normal text-gray-800 leading-tight line-clamp-1">
                  {propiedadSeleccionada.titulo}
                </h2>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">
                  {propiedadSeleccionada.zona}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-5">
                <div className="text-left sm:text-right">
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                    Valor
                  </p>
                  <p className="text-xl font-light text-inmo-primary tracking-tight leading-none">
                    {propiedadSeleccionada.moneda}{" "}
                    {propiedadSeleccionada.precio.toLocaleString()}
                  </p>
                </div>

                <a
                  href={`https://wa.me/5491159743064?text=Hola! Solicito información sobre: ${propiedadSeleccionada.titulo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-xs transition-all active:scale-98"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.946 1.694 5.86l-.999 3.647 3.794-.996z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => setPropiedadSeleccionada(null)}
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition shrink-0"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 space-y-3">
                <div
                  className="rounded-2xl overflow-hidden h-52 sm:h-64 cursor-pointer relative group shadow-2xs"
                  onClick={() => setZoomIndex(0)}
                >
                  <img
                    src={propiedadSeleccionada.imagenes[0]}
                    className="w-full h-full object-cover"
                    alt="main"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-light tracking-widest bg-black/20">
                    Click para ampliar
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-xl overflow-hidden h-24 cursor-pointer relative group"
                    onClick={() => setZoomIndex(1)}
                  >
                    <img
                      src={propiedadSeleccionada.imagenes[1]}
                      className="w-full h-full object-cover"
                      alt="sub1"
                    />
                  </div>
                  <div
                    className="rounded-xl overflow-hidden h-24 cursor-pointer relative group"
                    onClick={() => setZoomIndex(2)}
                  >
                    <img
                      src={propiedadSeleccionada.imagenes[2]}
                      className="w-full h-full object-cover"
                      alt="sub2"
                    />
                    {propiedadSeleccionada.imagenes.length > 3 && (
                      <div className="absolute inset-0 bg-inmo-primary/70 backdrop-blur-xs flex flex-col items-center justify-center text-white transition-all group-hover:bg-inmo-primary/80">
                        <span className="text-base font-light">
                          +{propiedadSeleccionada.imagenes.length - 2}
                        </span>
                        <span className="text-[9px] tracking-wider font-light">
                          IMÁGENES
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { l: "Ambientes", v: propiedadSeleccionada.hab },
                      { l: "Baños", v: propiedadSeleccionada.banos },
                      { l: "Sup.", v: `${propiedadSeleccionada.m2}m²` },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 p-2 rounded-xl text-center border border-gray-100"
                      >
                        <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">
                          {item.l}
                        </p>
                        <p className="text-xs font-normal text-inmo-primary">
                          {item.v}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-inmo-primary">
                      Detalles
                    </h4>
                    <p className="text-xs font-light text-gray-500 leading-relaxed text-justify line-clamp-4">
                      {propiedadSeleccionada.descripcion}
                    </p>
                  </div>
                </div>

                {/* MAPA REPARADO DE CADA PROPIEDAD DINÁMICA POR TEXTO PLANO */}
                <div className="h-40 rounded-xl overflow-hidden border border-gray-200 shadow-2xs mt-2 relative">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(propiedadSeleccionada.mapa || propiedadSeleccionada.zona)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="MapaProp"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX NAVEGABLE */}
      {zoomIndex !== null && propiedadSeleccionada && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center select-none animate-fadeIn">
          <div
            className="absolute inset-0 bg-inmo-primary/90 backdrop-blur-2xl transition-all"
            onClick={() => setZoomIndex(null)}
          ></div>

          <button
            onClick={() => setZoomIndex(null)}
            className="absolute top-5 right-6 text-white/60 hover:text-white bg-white/10 p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-all z-[210] focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={() =>
              setZoomIndex(
                (prev) =>
                  (prev - 1 + propiedadSeleccionada.imagenes.length) %
                  propiedadSeleccionada.imagenes.length,
              )
            }
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/10 backdrop-blur-md transition-all z-[210] focus:outline-none group hidden sm:flex shadow-md"
          >
            <svg
              className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="relative max-w-[90vw] max-h-[80vh] z-10 flex items-center justify-center">
            <div
              className="absolute left-0 w-1/2 h-full z-20 cursor-w-resize sm:hidden"
              onClick={() =>
                setZoomIndex(
                  (prev) =>
                    (prev - 1 + propiedadSeleccionada.imagenes.length) %
                    propiedadSeleccionada.imagenes.length,
                )
              }
            ></div>
            <div
              className="absolute right-0 w-1/2 h-full z-20 cursor-e-resize sm:hidden"
              onClick={() =>
                setZoomIndex(
                  (prev) => (prev + 1) % propiedadSeleccionada.imagenes.length,
                )
              }
            ></div>

            <img
              src={propiedadSeleccionada.imagenes[zoomIndex]}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/5 animate-scaleIn"
              alt="zoom"
            />

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-[10px] font-light tracking-widest uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5">
              {zoomIndex + 1} / {propiedadSeleccionada.imagenes.length}
            </div>
          </div>

          <button
            onClick={() =>
              setZoomIndex(
                (prev) => (prev + 1) % propiedadSeleccionada.imagenes.length,
              )
            }
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/10 backdrop-blur-md transition-all z-[210] focus:outline-none group hidden sm:flex shadow-md"
          >
            <svg
              className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      <footer className="bg-inmo-primary text-gray-300 py-8 px-6 mt-16 border-t border-white/5 text-center">
        <p className="text-xs font-light tracking-widest text-inmo-yellow mb-2 uppercase">
          Irigoitia Propiedades
        </p>
        <p className="text-[10px] font-light max-w-xs mx-auto leading-relaxed">
          Brandsen 3625, Ituzaingó • 4481-1841
          <br />
          Gestión Inmobiliaria Profesional
        </p>
      </footer>

      <style>{`
        @keyframes modalIn { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-modalIn { animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
