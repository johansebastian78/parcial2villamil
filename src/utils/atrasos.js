export function hoyTexto() {
  const h = new Date();
  const mes = String(h.getMonth() + 1).padStart(2, "0");
  const dia = String(h.getDate()).padStart(2, "0");
  return h.getFullYear() + "-" + mes + "-" + dia;
}

export function esAtrasada(solicitud) {
  if (solicitud.estado !== "Activo") return false;
  return solicitud.fechaPrevista < hoyTexto();
}
