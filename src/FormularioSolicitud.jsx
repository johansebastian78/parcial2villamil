import { useState } from "react";
import { validarSolicitud } from "./utils/validaciones.js";

function FormularioSolicitud({ equipos, onRegistrar }) {
  const [solicitante, setSolicitante] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [codigoEquipo, setCodigoEquipo] = useState("");
  const [fechaPrestamo, setFechaPrestamo] = useState("");
  const [fechaPrevista, setFechaPrevista] = useState("");
  const [errores, setErrores] = useState({});

  const disponibles = equipos.filter((e) => e.estado === "Disponible");

  function limpiar() {
    setSolicitante("");
    setTipoUsuario("");
    setCodigoEquipo("");
    setFechaPrestamo("");
    setFechaPrevista("");
    setErrores({});
  }

  function validar() {
    return validarSolicitud({
      solicitante,
      tipoUsuario,
      codigoEquipo,
      fechaPrestamo,
      fechaPrevista,
    });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) return;

    const registrada = onRegistrar({
      solicitante: solicitante.trim(),
      tipoUsuario,
      codigoEquipo,
      fechaPrestamo,
      fechaPrevista,
    });

    if (registrada) limpiar();
  }

  return (
    <form onSubmit={enviar} className="formulario">
      <label>
        Nombre del solicitante
        <input value={solicitante} onChange={(e) => setSolicitante(e.target.value)} />
        {errores.solicitante && <span className="error">{errores.solicitante}</span>}
      </label>

      <label>
        Tipo de usuario
        <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
          <option value="">-- Elige --</option>
          <option>Estudiante</option>
          <option>Docente</option>
        </select>
        {errores.tipoUsuario && <span className="error">{errores.tipoUsuario}</span>}
      </label>

      <label>
        Equipo
        <select value={codigoEquipo} onChange={(e) => setCodigoEquipo(e.target.value)}>
          <option value="">-- Elige --</option>
          {disponibles.map((e) => (
            <option key={e.codigo} value={e.codigo}>
              {e.codigo} - {e.nombre}
            </option>
          ))}
        </select>
        {errores.codigoEquipo && <span className="error">{errores.codigoEquipo}</span>}
      </label>

      <label>
        Fecha de préstamo
        <input
          type="date"
          value={fechaPrestamo}
          onChange={(e) => setFechaPrestamo(e.target.value)}
        />
        {errores.fechaPrestamo && <span className="error">{errores.fechaPrestamo}</span>}
      </label>

      <label>
        Fecha prevista de devolución
        <input
          type="date"
          value={fechaPrevista}
          onChange={(e) => setFechaPrevista(e.target.value)}
        />
        {errores.fechaPrevista && <span className="error">{errores.fechaPrevista}</span>}
      </label>

      <div className="botones">
        <button type="submit">Registrar</button>
        <button type="button" onClick={limpiar}>
          Limpiar
        </button>
      </div>
    </form>
  );
}

export default FormularioSolicitud;
