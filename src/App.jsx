import { useState, useEffect } from "react";
import Resumen from "./Resumen.jsx";
import FiltrosInventario from "./FiltrosInventario.jsx";
import Inventario from "./Inventario.jsx";
import FormularioSolicitud from "./FormularioSolicitud.jsx";
import ListaPrestamos from "./ListaPrestamos.jsx";
import { filtrarEquipos } from "./utils/filtros.js";
import { motivoRechazo } from "./utils/validaciones.js";

const NOMBRE_APP = import.meta.env.VITE_APP_NAME || "MediaTrack";

const equiposIniciales = [
  { codigo: "CAM-001", nombre: "Cámara Canon", categoria: "Video", estado: "Disponible", ubicacion: "Estante A", valor: 3500000 },
  { codigo: "CAM-002", nombre: "Cámara Sony", categoria: "Video", estado: "Prestado", ubicacion: "Estante A", valor: 4200000 },
  { codigo: "MIC-001", nombre: "Micrófono de solapa", categoria: "Audio", estado: "Disponible", ubicacion: "Estante B", valor: 350000 },
  { codigo: "MIC-002", nombre: "Micrófono de mano", categoria: "Audio", estado: "Mantenimiento", ubicacion: "Taller", valor: 280000 },
  { codigo: "LUZ-001", nombre: "Panel de luz LED", categoria: "Iluminación", estado: "Disponible", ubicacion: "Estante C", valor: 600000 },
  { codigo: "TRI-001", nombre: "Trípode profesional", categoria: "Accesorios", estado: "Disponible", ubicacion: "Estante C", valor: 250000 },
];

const solicitudesIniciales = [
  {
    id: "SOL-001",
    solicitante: "Laura Gómez",
    tipoUsuario: "Estudiante",
    codigoEquipo: "CAM-002",
    fechaPrestamo: "2026-09-25",
    fechaPrevista: "2026-10-01",
    estado: "Activo",
  },
];

function App() {
  const [equipos, setEquipos] = useState(() => {
    const guardado = localStorage.getItem("equipos");
    return guardado ? JSON.parse(guardado) : equiposIniciales;
  });
  const [solicitudes, setSolicitudes] = useState(() => {
    const guardado = localStorage.getItem("solicitudes");
    return guardado ? JSON.parse(guardado) : solicitudesIniciales;
  });
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [estado, setEstado] = useState("Todos");
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    localStorage.setItem("equipos", JSON.stringify(equipos));
  }, [equipos]);

  useEffect(() => {
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
  }, [solicitudes]);

  const equiposVisibles = filtrarEquipos(equipos, busqueda, categoria, estado);

  function registrarSolicitud(datos) {
    const equipo = equipos.find((e) => e.codigo === datos.codigoEquipo);

    const motivo = motivoRechazo(equipo, solicitudes);
    if (motivo) {
      setMensaje({ tipo: "error", texto: motivo });
      return false;
    }

    const numero = solicitudes.length + 1;
    const id = "SOL-" + String(numero).padStart(3, "0");
    const nueva = { id, ...datos, estado: "Activo" };

    setSolicitudes([...solicitudes, nueva]);
    setEquipos(
      equipos.map((e) =>
        e.codigo === datos.codigoEquipo ? { ...e, estado: "Prestado" } : e
      )
    );
    setMensaje({ tipo: "exito", texto: "Solicitud " + id + " registrada." });
    return true;
  }

  function devolverEquipo(idSolicitud, enviarAMantenimiento) {
    const solicitud = solicitudes.find((s) => s.id === idSolicitud);
    if (!solicitud) return;

    setSolicitudes(
      solicitudes.map((s) =>
        s.id === idSolicitud ? { ...s, estado: "Devuelto" } : s
      )
    );
    setEquipos(
      equipos.map((e) =>
        e.codigo === solicitud.codigoEquipo
          ? { ...e, estado: enviarAMantenimiento ? "Mantenimiento" : "Disponible" }
          : e
      )
    );
    setMensaje({ tipo: "exito", texto: "Devolución registrada para " + idSolicitud + "." });
  }

  return (
    <div className="contenedor">
      <h1>{NOMBRE_APP}</h1>

      {mensaje && (
        <div className={"mensaje " + mensaje.tipo}>
          <span>{mensaje.texto}</span>
          <button onClick={() => setMensaje(null)}>X</button>
        </div>
      )}

      <Resumen equipos={equipos} solicitudes={solicitudes} />

      <h2>Inventario</h2>
      <FiltrosInventario
        busqueda={busqueda}
        categoria={categoria}
        estado={estado}
        onBusqueda={setBusqueda}
        onCategoria={setCategoria}
        onEstado={setEstado}
      />
      <Inventario equipos={equiposVisibles} />

      <h2>Nueva solicitud</h2>
      <FormularioSolicitud
        equipos={equipos}
        onRegistrar={registrarSolicitud}
      />

      <h2>Préstamos</h2>
      <ListaPrestamos solicitudes={solicitudes} onDevolver={devolverEquipo} />
    </div>
  );
}

export default App;
