import { esAtrasada } from "./atrasos.js";

export function calcularIndicadores(equipos, solicitudes) {
  return {
    total: equipos.length,
    disponibles: equipos.filter((e) => e.estado === "Disponible").length,
    prestados: equipos.filter((e) => e.estado === "Prestado").length,
    mantenimiento: equipos.filter((e) => e.estado === "Mantenimiento").length,
    atrasados: solicitudes.filter(esAtrasada).length,
  };
}
