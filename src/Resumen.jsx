import { calcularIndicadores } from "./utils/indicadores.js";

function Resumen({ equipos, solicitudes }) {
  const datos = calcularIndicadores(equipos, solicitudes);

  return (
    <div className="resumen">
      <div className="tarjeta">
        Total<strong>{datos.total}</strong>
      </div>
      <div className="tarjeta">
        Disponibles<strong>{datos.disponibles}</strong>
      </div>
      <div className="tarjeta">
        Prestados<strong>{datos.prestados}</strong>
      </div>
      <div className="tarjeta">
        Mantenimiento<strong>{datos.mantenimiento}</strong>
      </div>
      <div className="tarjeta atrasada">
        Atrasados<strong>{datos.atrasados}</strong>
      </div>
    </div>
  );
}

export default Resumen;
