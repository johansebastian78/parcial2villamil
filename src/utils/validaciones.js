import { LIMITES_DIAS } from "../config.js";

export function validarSolicitud(datos) {
  const nuevos = {};
  if (datos.solicitante.trim() === "") nuevos.solicitante = "Escribe el nombre.";
  if (datos.tipoUsuario === "") nuevos.tipoUsuario = "Elige el tipo de usuario.";
  if (datos.codigoEquipo === "") nuevos.codigoEquipo = "Elige un equipo.";
  if (datos.fechaPrestamo === "") nuevos.fechaPrestamo = "Elige la fecha de préstamo.";
  if (datos.fechaPrevista === "") nuevos.fechaPrevista = "Elige la fecha de devolución.";

  const hayFechas = datos.fechaPrestamo !== "" && datos.fechaPrevista !== "";

  if (hayFechas && datos.fechaPrevista < datos.fechaPrestamo) {
    nuevos.fechaPrevista = "La devolución no puede ser antes del préstamo.";
  }

  if (hayFechas && datos.tipoUsuario !== "") {
    const milisegundos = new Date(datos.fechaPrevista) - new Date(datos.fechaPrestamo);
    const dias = milisegundos / (1000 * 60 * 60 * 24);
    const maximo = LIMITES_DIAS[datos.tipoUsuario];
    if (dias > maximo) {
      nuevos.fechaPrevista =
        "Un " + datos.tipoUsuario + " puede prestar máximo " + maximo + " días.";
    }
  }
  return nuevos;
}

export function motivoRechazo(equipo, solicitudes) {
  if (!equipo || equipo.estado !== "Disponible") {
    return "Ese equipo no está disponible.";
  }
  const yaTieneActiva = solicitudes.some(
    (s) => s.codigoEquipo === equipo.codigo && s.estado === "Activo"
  );
  if (yaTieneActiva) {
    return "Ese equipo ya tiene una solicitud activa.";
  }
  return null;
}
