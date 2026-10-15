export function filtrarEquipos(equipos, busqueda, categoria, estado) {
  const texto = busqueda.toLowerCase();
  return equipos.filter((e) => {
    const coincideTexto =
      e.nombre.toLowerCase().includes(texto) ||
      e.codigo.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "Todas" || e.categoria === categoria;
    const coincideEstado = estado === "Todos" || e.estado === estado;
    return coincideTexto && coincideCategoria && coincideEstado;
  });
}
