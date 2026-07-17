import React, { useState, useMemo, useEffect, useRef } from "react";
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
    cochera: 0,
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
    cochera: 1,
    m2: 45,
    imagenes: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672016913-74e40428b52a?auto=format&fit=crop&w=1200&q=80",
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
    cochera: 1,
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
    cochera: 1,
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
    cochera: 0,
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
    cochera: 2,
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
    cochera: 1,
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

const ITEMS_POR_PAGINA = 6;

export default function App() {
  if (window.location.pathname === "/admin") {
    return <AdminPanel />;
  }

  const isPaginaListado = window.location.pathname === "/propiedades";
  const urlParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  const [propiedades, setPropiedades] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  const [zoomIndex, setZoomIndex] = useState(null);

  // Controladores de estado optimizados para el zoom
  const [estaSobreImagen, setEstaSobreImagen] = useState(false);
  const contenedorZoomRef = useRef(null);

  // Estados de Filtros
  const [buscarTexto, setBuscarTexto] = useState("");
  const [filtroZona, setFiltroZona] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState(
    urlParams.get("tipo") || "todos",
  );
  const [filtroOperacion, setFiltroOperacion] = useState(
    urlParams.get("operacion") || "todos",
  );
  const [filtroDormitorios, setFiltroDormitorios] = useState("todos");
  const [filtroCochera, setFiltroCochera] = useState("todos");
  const [precioMaximo, setPrecioMaximo] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("recientes");
  const [paginaActual, setPaginaActual] = useState(1);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [filtrosMovilAbierto, setFiltrosMovilAbierto] = useState(false);

  const API_URL = "https://irigoitiapropiedades.com.ar/api/propiedades";

  useEffect(() => {
    const obtenerPropiedadesBD = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`Respuesta inválida del servidor: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPropiedades(data);
        } else {
          setPropiedades(MOCK_PROPIEDADES);
        }
      } catch (error) {
        console.error(
          "Error conectando a la base de datos, usando respaldo:",
          error,
        );
        setPropiedades(MOCK_PROPIEDADES);
      }
    };
    obtenerPropiedadesBD();
  }, []);

  const limpiarFiltros = () => {
    setBuscarTexto("");
    setFiltroZona("todos");
    setFiltroTipo("todos");
    setFiltroOperacion("todos");
    setFiltroDormitorios("todos");
    setFiltroCochera("todos");
    setPrecioMaximo("");
    setPaginaActual(1);
    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const ejecutarBuscarDesdeHome = () => {
    window.location.href = `/propiedades?operacion=${filtroOperacion}&tipo=${filtroTipo}`;
  };

  const propiedadesFiltradas = useMemo(() => {
    setPaginaActual(1);
    let resultado = [...propiedades];

    resultado = resultado.filter((prop) => {
      const matchTexto =
        buscarTexto === "" ||
        prop.titulo.toLowerCase().includes(buscarTexto.toLowerCase()) ||
        prop.descripcion.toLowerCase().includes(buscarTexto.toLowerCase());
      const matchZona =
        filtroZona === "todos" ||
        prop.zona.toLowerCase().includes(filtroZona.toLowerCase());
      const matchTipo = filtroTipo === "todos" || prop.tipo === filtroTipo;
      const matchOperacion =
        filtroOperacion === "todos" || prop.operacion === filtroOperacion;
      const matchDormitorios =
        filtroDormitorios === "todos" || prop.hab === Number(filtroDormitorios);

      const matchCochera =
        filtroCochera === "todos" ||
        (filtroCochera === "2"
          ? prop.cochera >= 2
          : prop.cochera === Number(filtroCochera));

      const matchPrecio = !precioMaximo || prop.precio <= Number(precioMaximo);

      return (
        matchTexto &&
        matchZona &&
        matchTipo &&
        matchOperacion &&
        matchDormitorios &&
        matchCochera &&
        matchPrecio
      );
    });

    if (ordenarPor === "precio-menor")
      resultado.sort((a, b) => a.precio - b.precio);
    if (ordenarPor === "precio-mayor")
      resultado.sort((a, b) => b.precio - a.precio);
    if (ordenarPor === "recientes") resultado.sort((a, b) => b.id - a.id);

    return resultado;
  }, [
    propiedades,
    buscarTexto,
    filtroZona,
    filtroTipo,
    filtroOperacion,
    filtroDormitorios,
    filtroCochera,
    precioMaximo,
    ordenarPor,
  ]);

  const zonasConStock = [
    ...new Set(
      propiedades
        .filter((p) => p.disponible !== false)
        .map((p) => p.zona)
        .filter(Boolean),
    ),
  ].sort();

  const propiedadesCarrusel = useMemo(() => {
    return [...propiedades].sort((a, b) => b.id - a.id).slice(0, 5);
  }, [propiedades]);

  useEffect(() => {
    if (isPaginaListado || propiedadesCarrusel.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % propiedadesCarrusel.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [propiedadesCarrusel.length, isPaginaListado]);

  const totalPaginas = Math.ceil(
    propiedadesFiltradas.length / ITEMS_POR_PAGINA,
  );
  const propiedadesPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    return propiedadesFiltradas.slice(inicio, inicio + ITEMS_POR_PAGINA);
  }, [propiedadesFiltradas, paginaActual]);

  // 🚀 INTERACCIÓN DIRECTA CON EL DOM: Cambia la posición a nivel hardware, 0% Lag
  const manejarMovimientoMouseZoom = (e) => {
    if (!contenedorZoomRef.current) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Modificación directa sobre el DOM para fluidez total a 120 FPS
    contenedorZoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-inmo-text-dark font-sans antialiased flex flex-col justify-between">
      <div className="sticky top-0 z-50 bg-inmo-primary text-white shadow-md">
        <header className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center border-b border-white/5 relative z-50">
          <a href="/" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
            <div className="hidden md:block">
              <h1 className="font-light text-sm tracking-widest text-inmo-yellow uppercase leading-none">
                Irigoitia Propiedades
              </h1>
              <p className="text-[9px] text-blue-200/50 uppercase tracking-widest font-light mt-1">
                Lorena Irigoitia • Mat. 2382
              </p>
            </div>
          </a>

          <nav className="hidden md:flex items-center space-x-6 text-[11px] font-medium tracking-widest uppercase text-gray-300">
            <a
              href="/"
              className={`transition-colors ${!isPaginaListado ? "text-inmo-yellow font-semibold" : "hover:text-inmo-yellow"}`}
            >
              Inicio
            </a>
            <a
              href="/propiedades"
              className={`transition-colors ${isPaginaListado ? "text-inmo-yellow font-semibold" : "hover:text-inmo-yellow"}`}
            >
              Propiedades
            </a>
            <a
              href="https://wa.me/5491159743064?text=Hola! Me gustaría solicitar una tasación/consulta profesional"
              className="bg-inmo-red px-4 py-2 rounded-lg text-white hover:bg-opacity-90 transition-all font-medium"
            >
              Tasaciones
            </a>
          </nav>

          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden text-gray-300 p-1 focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d={
                  menuAbierto
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 w-[90%] mt-4 p-6 bg-inmo-primary/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex flex-col space-y-4 text-center transition-all duration-300 ease-out origin-top ${menuAbierto ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"}`}
          >
            <a
              href="/"
              onClick={() => setMenuAbierto(false)}
              className="text-xs font-light tracking-widest text-gray-200 border-b border-white/5 pb-2"
            >
              INICIO
            </a>
            <a
              href="/propiedades"
              onClick={() => setMenuAbierto(false)}
              className="text-xs font-light tracking-widest text-gray-200 border-b border-white/5 pb-2"
            >
              PROPIEDADES
            </a>
            <a
              href="https://wa.me/5491159743064?text=Hola! Me gustaría solicitar una tasación/consulta profesional"
              onClick={() => setMenuAbierto(false)}
              className="bg-inmo-red text-white py-2.5 rounded-xl text-xs font-medium tracking-widest"
            >
              TASACIONES
            </a>
          </div>
        </header>
      </div>

      {!isPaginaListado && (
        <div className="bg-inmo-primary text-white pb-10 shrink-0">
          <section className="max-w-4xl mx-auto text-center pt-14 pb-12 px-4">
            <h2 className="text-2xl md:text-3xl font-light mb-2 tracking-wide leading-tight">
              Encontrá tu próximo hogar
            </h2>
            <p className="text-blue-200/70 text-[10px] uppercase tracking-[0.2em] font-light">
              Zona Oeste • Trayectoria Familiar
            </p>
          </section>

          <div className="max-w-4xl mx-auto px-6 hidden sm:block">
            <div className="bg-white p-4 rounded-xl shadow-md grid grid-cols-3 gap-4 border border-gray-100">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1.5 tracking-wider">
                  Operación
                </label>
                <select
                  value={filtroOperacion}
                  onChange={(e) => setFiltroOperacion(e.target.value)}
                  className="w-full bg-gray-50 border-none p-2 rounded-lg text-xs font-normal text-gray-600 outline-none"
                >
                  <option value="todos">Alquiler o Venta</option>
                  <option value="alquiler">En Alquiler</option>
                  <option value="venta">En Venta</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1.5 tracking-wider">
                  Inmueble
                </label>
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full bg-gray-50 border-none p-2 rounded-lg text-xs font-normal text-gray-600 outline-none"
                >
                  <option value="todos">Todos los tipos</option>
                  <option value="casa">Casas</option>
                  <option value="depto">Departamentos</option>
                  <option value="local-galpon">Locales/Galpones</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={ejecutarBuscarDesdeHome}
                  className="w-full h-8 bg-inmo-red text-white text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-opacity-95 transition-all shadow-2xs"
                >
                  Buscar Propiedades
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isPaginaListado && (
        <section className="bg-white border-b border-gray-100 py-10 px-6 shrink-0">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <div className="space-y-2">
              <h3 className="text-base font-normal tracking-wide text-inmo-primary uppercase">
                Asesoramiento Personalizado Inmobiliario
              </h3>
              <p className="text-xs text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                Entendemos el value de tu tiempo y de tu patrimonio. Si estás
                buscando tasar tu casa para la venta, encontrar un alquiler
                seguro o dar el siguiente paso en <strong>Zona Oeste</strong>,
                estamos listos para acompañarte en cada firma con transparencia
                absoluta y calidez familiar.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2 text-xs">
              <a
                href="https://wa.me/5491159743064?text=Hola! Me gustaría solicitar más información"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#25D366] text-white font-semibold px-5 py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#20ba5a] transition-all shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.946 1.694 5.86l-.999 3.647 3.794-.996z" />
                </svg>
                <span>Consultar por WhatsApp</span>
              </a>
              <a
                href="mailto:info@irigoitiapropiedades.com.ar"
                className="w-full sm:w-auto bg-transparent border border-gray-200 text-gray-600 font-medium px-5 py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <span>Enviar Correo Electrónico</span>
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex-grow">
        {!isPaginaListado ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                <h3 className="font-light text-lg text-inmo-primary tracking-wide">
                  Últimas propiedades agregadas
                </h3>
                <span className="text-[11px] text-gray-400">
                  Novedades en tiempo real
                </span>
              </div>

              {propiedadesCarrusel.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center text-gray-400 font-light text-sm border border-gray-100">
                  No hay ingresos disponibles.
                </div>
              ) : (
                <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-2xs p-4 flex flex-col justify-between min-h-[360px]">
                  {propiedadesCarrusel.map(
                    (prop, idx) =>
                      idx === currentSlide && (
                        <div
                          key={prop.id}
                          className="animate-scaleIn flex flex-col h-full justify-between space-y-4"
                        >
                          <div className="h-82 rounded-xl overflow-hidden relative">
                            <img
                              src={prop.imagenes[0]}
                              className="w-full h-full object-cover"
                              alt="slide"
                            />
                            <span
                              className={`absolute top-3 left-3 text-[9px] font-medium uppercase px-2 py-0.5 rounded text-white tracking-widest shadow-xs ${prop.operacion === "venta" ? "bg-inmo-red" : "bg-inmo-primary"}`}
                            >
                              {prop.operacion}
                            </span>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                              {prop.zona}
                            </p>
                            <h4 className="font-normal text-gray-800 text-base line-clamp-1 mt-0.5">
                              {prop.titulo}
                            </h4>
                            <p className="text-xs font-light text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">
                              {prop.descripcion}
                            </p>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                            <span className="text-lg font-semibold text-inmo-primary tracking-tight">
                              {prop.moneda} {prop.precio.toLocaleString()}
                            </span>
                            <button
                              onClick={() => setPropiedadSeleccionada(prop)}
                              className="bg-inmo-primary text-white text-xs font-medium py-2 px-4 rounded-xl shadow-2xs hover:bg-opacity-95 transition-all"
                            >
                              Ver detalles
                            </button>
                          </div>
                        </div>
                      ),
                  )}
                  <div className="flex justify-center space-x-1.5 pt-4">
                    {propiedadesCarrusel.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-5 bg-inmo-primary" : "w-1.5 bg-gray-200"}`}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="space-y-4">
                <h3 className="font-light text-lg text-inmo-primary border-b border-gray-200/60 pb-3">
                  Nuestra Oficina
                </h3>
                <div className="w-full h-[320px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200/60 relative">
                  <iframe
                    src="https://maps.google.com/maps?q=Brandsen%203625,%20Ituzaingo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="OficinaHome"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
            <div className="lg:hidden w-full">
              <button
                onClick={() => setFiltrosMovilAbierto(true)}
                className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white p-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M3 6h18v2H3V6zm3 5h12v2H6v-2zm3 5h6v2H9v-2z" />
                </svg>
                <span>Filtrar y Buscar Propiedades</span>
              </button>
            </div>

            <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-inmo-primary">
                  Filtros Avanzados
                </h3>
                <button
                  onClick={limpiarFiltros}
                  className="text-[10px] font-medium text-inmo-red uppercase tracking-wider hover:underline"
                >
                  Limpiar
                </button>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                  Palabras clave
                </label>
                <input
                  type="text"
                  placeholder="Ej: Apto crédito, piscina..."
                  value={buscarTexto}
                  onChange={(e) => setBuscarTexto(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-xs outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                  Tipo de Operación
                </label>
                <select
                  value={filtroOperacion}
                  onChange={(e) => setFiltroOperacion(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-xs outline-none"
                >
                  <option value="todos">Todos</option>
                  <option value="venta">En Venta</option>
                  <option value="alquiler">En Alquiler</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                  Ubicación
                </label>
                <select
                  value={filtroZona}
                  onChange={(e) => setFiltroZona(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-xs outline-none"
                >
                  <option value="todos">Cualquier zona</option>
                  {zonasConStock.map((zona) => (
                    <option key={zona} value={zona}>
                      {zona}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                  Tipo de Inmueble
                </label>
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-xs outline-none"
                >
                  <option value="todos">Todos los inmuebles</option>
                  <option value="casa">Casas / Chalets</option>
                  <option value="depto">Departamentos</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                    Dorm.
                  </label>
                  <select
                    value={filtroDormitorios}
                    onChange={(e) => setFiltroDormitorios(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-xs outline-none"
                  >
                    <option value="todos">Todos</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                    Cocheras
                  </label>
                  <select
                    value={filtroCochera}
                    onChange={(e) => setFiltroCochera(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-xs outline-none"
                  >
                    <option value="todos">Todos</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2+</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                  Precio Máximo
                </label>
                <input
                  type="number"
                  placeholder="Ej: 150000"
                  value={precioMaximo}
                  onChange={(e) => setPrecioMaximo(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-xs outline-none"
                />
              </div>
            </aside>

            <main className="lg:col-span-9 space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 gap-3">
                <div>
                  <h2 className="text-lg font-light text-gray-800 tracking-wide">
                    Propiedades Disponibles
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {propiedadesFiltradas.length} inmuebles coinciden
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Ordenar por:</span>
                  <select
                    value={ordenarPor}
                    onChange={(e) => setOrdenarPor(e.target.value)}
                    className="bg-white border border-gray-200 p-1.5 rounded-lg text-gray-600 text-xs outline-none"
                  >
                    <option value="recientes">Más recientes</option>
                    <option value="precio-menor">Precio: Menor a Mayor</option>
                    <option value="precio-mayor">Precio: Mayor a Menor</option>
                  </select>
                </div>
              </div>

              {propiedadesFiltradas.length === 0 ? (
                <div className="bg-white p-16 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm font-light">
                  No hay propiedades con los filtros seleccionados.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {propiedadesPaginadas.map((prop) => (
                    <div
                      key={prop.id}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col group h-full"
                    >
                      <div className="h-44 relative overflow-hidden shrink-0">
                        <img
                          src={prop.imagenes[0]}
                          className="w-full h-full object-cover"
                          alt="prop"
                        />
                        <span
                          className={`absolute top-3 left-3 text-[9px] font-medium uppercase px-2 py-0.5 rounded text-white tracking-widest shadow-xs ${prop.operacion === "venta" ? "bg-inmo-red" : "bg-inmo-primary"}`}
                        >
                          {prop.operacion}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                        <div className="space-y-1.5">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                            {prop.zona}
                          </p>
                          <h4 className="font-normal text-gray-800 text-sm leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-inmo-primary transition-colors">
                            {prop.titulo}
                          </h4>
                          <div className="flex space-x-2 text-[10px] text-gray-400 font-light pt-1">
                            <span>🛏️ {prop.hab} dorm.</span>
                            <span>🛁 {prop.banos} bñ.</span>
                            <span>🚗 {prop.cochera} coch.</span>
                            <span>📐 {prop.m2} m²</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2.5 border-t border-gray-50 shrink-0">
                          <span className="text-base font-semibold text-inmo-primary tracking-tight">
                            {prop.moneda} {prop.precio.toLocaleString()}
                          </span>
                          <button
                            onClick={() => setPropiedadSeleccionada(prop)}
                            className="bg-transparent hover:bg-gray-50 text-inmo-primary border border-gray-200 text-xs font-medium py-1.5 px-3 rounded-xl transition-all"
                          >
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalPaginas > 1 && (
                <div className="flex justify-center items-center space-x-1.5 pt-6">
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
                    onClick={() => setPaginaActual((prev) => prev - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 text-xs font-bold transition"
                  >
                    →
                  </button>
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {filtrosMovilAbierto && (
        <div className="fixed inset-0 z-[150] flex flex-col justify-end lg:hidden animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setFiltrosMovilAbierto(false)}
          ></div>
          <div className="relative bg-white w-full rounded-t-3xl shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto text-xs text-gray-700">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800">
                Filtros de Búsqueda
              </h3>
              <button
                onClick={() => {
                  limpiarFiltros();
                  setFiltrosMovilAbierto(false);
                }}
                className="text-[10px] font-bold text-inmo-red uppercase tracking-wider"
              >
                Limpiar Todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🛠️ MODAL DE DETALLE DE PROPIEDAD: MAXIMIZADO */}
      {propiedadSeleccionada && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-inmo-primary/30 backdrop-blur-md"
            onClick={() => setPropiedadSeleccionada(null)}
          ></div>
          <div className="relative bg-white w-full max-w-7xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-modalIn">
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
                {/* 🎯 BOTÓN DE WHATSAPP RECUPERADO: A la izquierda del precio y con mensaje automático completo */}
                <a
                  href={`https://wa.me/5491159743064?text=${encodeURIComponent(
                    `Hola! Solicito información sobre la siguiente propiedad:\n\n` +
                      `*Título:* ${propiedadSeleccionada.titulo}\n` +
                      `*Valor:* ${propiedadSeleccionada.moneda} ${propiedadSeleccionada.precio.toLocaleString()}\n\n` +
                      `*Descripción:* ${propiedadSeleccionada.descripcion}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-xs transition-all active:scale-98 shrink-0"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.946 1.694 5.86l-.999 3.647 3.794-.996z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <div className="text-left sm:text-right shrink-0">
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                    Valor
                  </p>
                  <p className="text-xl font-light text-inmo-primary tracking-tight leading-none">
                    {propiedadSeleccionada.moneda}{" "}
                    {propiedadSeleccionada.precio.toLocaleString()}
                  </p>
                </div>

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
              {/* FOTOS DEL MODAL: Sin ningún tipo de zoom antes de hacer clic */}
              <div className="md:col-span-7 space-y-4">
                <div
                  className="rounded-2xl overflow-hidden h-64 sm:h-[420px] cursor-pointer relative group shadow-2xs"
                  onClick={() => {
                    setZoomIndex(0);
                    setEstaSobreImagen(false);
                  }}
                >
                  <img
                    src={propiedadSeleccionada.imagenes[0]}
                    className="w-full h-full object-cover"
                    alt="main"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-light tracking-widest bg-black/20">
                    Click para abrir pantalla completa
                  </div>
                </div>

                {propiedadSeleccionada.imagenes.length > 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {propiedadSeleccionada.imagenes
                      .slice(1, 3)
                      .map((img, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl overflow-hidden h-24 sm:h-32 cursor-pointer relative group shadow-xs"
                          onClick={() => {
                            setZoomIndex(idx + 1);
                            setEstaSobreImagen(false);
                          }}
                        >
                          <img
                            src={img}
                            className="w-full h-full object-cover"
                            alt={`sub${idx + 1}`}
                          />
                          {idx === 1 &&
                            propiedadSeleccionada.imagenes.length > 3 && (
                              <div className="absolute inset-0 bg-inmo-primary/70 backdrop-blur-xs flex flex-col items-center justify-center text-white transition-all group-hover:bg-inmo-primary/80">
                                <span className="text-base font-light">
                                  +{propiedadSeleccionada.imagenes.length - 3}
                                </span>
                                <span className="text-[9px] tracking-wider font-light">
                                  IMÁGENES
                                </span>
                              </div>
                            )}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { l: "Amb.", v: propiedadSeleccionada.hab },
                      { l: "Baños", v: propiedadSeleccionada.banos },
                      { l: "Coch.", v: propiedadSeleccionada.cochera },
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
                    <h4 className="text-[14px] font-bold uppercase tracking-wider text-inmo-primary">
                      Detalles
                    </h4>
                    {/* 🎯 whitespace-pre-line: Renderiza los saltos de línea exactamente como se crearon */}
                    <p className="text-md text-gray-500 leading-relaxed whitespace-pre-line text-left">
                      {propiedadSeleccionada.descripcion}
                    </p>
                  </div>
                </div>
                <div className="h-44 rounded-xl overflow-hidden border border-gray-200 shadow-2xs mt-2 relative">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(propiedadSeleccionada.mapa || propiedadSeleccionada.zona)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="MapaFicha"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔍 LIGHTBOX CON ZOOM INTERACTIVO INTEGRADO ("CON LA IMAGEN ABIERTA") */}
      {zoomIndex !== null && propiedadSeleccionada && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center select-none animate-fadeIn">
          <div
            className="absolute inset-0 bg-inmo-primary/95 backdrop-blur-2xl transition-all"
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
            onClick={() => {
              setEstaSobreImagen(false);
              setZoomIndex(
                (prev) =>
                  (prev - 1 + propiedadSeleccionada.imagenes.length) %
                  propiedadSeleccionada.imagenes.length,
              );
            }}
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

          <div className="relative w-[90vw] h-[80vh] z-10 flex items-center justify-center">
            <div
              className="absolute left-0 w-1/4 h-full z-20 cursor-w-resize sm:hidden"
              onClick={() =>
                setZoomIndex(
                  (prev) =>
                    (prev - 1 + propiedadSeleccionada.imagenes.length) %
                    propiedadSeleccionada.imagenes.length,
                )
              }
            ></div>
            <div
              className="absolute right-0 w-1/4 h-full z-20 cursor-e-resize sm:hidden"
              onClick={() =>
                setZoomIndex(
                  (prev) => (prev + 1) % propiedadSeleccionada.imagenes.length,
                )
              }
            ></div>

            {/* 🎯 CONTENEDOR MAESTRO DE LUPA DIGITAL OPTIMIZADO */}
            <div
              ref={contenedorZoomRef}
              className={`w-full h-full max-w-5xl rounded-2xl bg-contain bg-center bg-no-repeat border border-white/10 shadow-2xl transition-all ${estaSobreImagen ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              style={{
                backgroundImage: `url(${propiedadSeleccionada.imagenes[zoomIndex]})`,
                backgroundSize: estaSobreImagen ? "150%" : "contain",
                backgroundPosition: estaSobreImagen ? undefined : "center",
                transition: estaSobreImagen
                  ? "background-position 0.05s ease-out"
                  : "background-size 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-position 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onClick={(e) => {
                e.stopPropagation(); // Evita que se cierre el lightbox de fondo al hacer click en la foto
                const nuevoEstado = !estaSobreImagen;
                setEstaSobreImagen(nuevoEstado);

                // Si desactivamos el zoom con el segundo click, centramos la imagen inmediatamente
                if (!nuevoEstado && contenedorZoomRef.current) {
                  contenedorZoomRef.current.style.backgroundPosition = "center";
                }
              }}
              onMouseMove={(e) => {
                // Si no hicieron click previo para activar la lupa, el movimiento no hace nada
                if (!estaSobreImagen) return;
                manejarMovimientoMouseZoom(e);
              }}
              onMouseLeave={() => {
                // Si el mouse sale del recuadro de la foto, apagamos el zoom por comodidad
                setEstaSobreImagen(false);
                if (contenedorZoomRef.current) {
                  contenedorZoomRef.current.style.backgroundPosition = "center";
                }
              }}
            ></div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-[10px] font-light tracking-widest uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5">
              {zoomIndex + 1} / {propiedadSeleccionada.imagenes.length}
            </div>
          </div>

          <button
            onClick={() => {
              setEstaSobreImagen(false);
              setZoomIndex(
                (prev) => (prev + 1) % propiedadSeleccionada.imagenes.length,
              );
            }}
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

      <footer className="bg-inmo-primary text-gray-300 py-8 px-6 border-t border-white/5 text-center shrink-0">
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
