import { useState } from "react";
import { esAtrasada } from "./utils/atrasos.js";

function ListaPrestamos({ solicitudes, onDevolver }) {
  const [aMantenimiento, setAMantenimiento] = useState([]);

  function cambiarCasilla(id) {
    if (aMantenimiento.includes(id)) {
      setAMantenimiento(aMantenimiento.filter((x) => x !== id));
    } else {
      setAMantenimiento([...aMantenimiento, id]);
    }
  }

  function devolver(id) {
    const va = aMantenimiento.includes(id);
    const texto = va
      ? "¿Confirmas la devolución? El equipo pasará a Mantenimiento."
      : "¿Confirmas la devolución? El equipo quedará Disponible.";
    if (window.confirm(texto)) {
      onDevolver(id, va);
    }
  }

  if (solicitudes.length === 0) {
    return <p>Todavía no hay solicitudes.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Solicitante</th>
          <th>Tipo</th>
          <th>Equipo</th>
          <th>Préstamo</th>
          <th>Devolución prevista</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {solicitudes.map((s) => (
          <tr key={s.id} className={esAtrasada(s) ? "fila-atrasada" : ""}>
            <td>{s.id}</td>
            <td>{s.solicitante}</td>
            <td>{s.tipoUsuario}</td>
            <td>{s.codigoEquipo}</td>
            <td>{s.fechaPrestamo}</td>
            <td>{s.fechaPrevista}</td>
            <td>
              {s.estado}
              {esAtrasada(s) && <strong> (ATRASADO)</strong>}
            </td>
            <td>
              {s.estado === "Activo" && (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={aMantenimiento.includes(s.id)}
                      onChange={() => cambiarCasilla(s.id)}
                    />
                    A mantenimiento
                  </label>
                  <button onClick={() => devolver(s.id)}>Devolver</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaPrestamos;
