function FiltrosInventario({
  busqueda,
  categoria,
  estado,
  onBusqueda,
  onCategoria,
  onEstado,
}) {
  function limpiar() {
    onBusqueda("");
    onCategoria("Todas");
    onEstado("Todos");
  }

  return (
    <div className="filtros">
      <input
        type="text"
        placeholder="Buscar por nombre o código"
        value={busqueda}
        onChange={(e) => onBusqueda(e.target.value)}
      />

      <select value={categoria} onChange={(e) => onCategoria(e.target.value)}>
        <option>Todas</option>
        <option>Audio</option>
        <option>Video</option>
        <option>Iluminación</option>
        <option>Accesorios</option>
      </select>

      <select value={estado} onChange={(e) => onEstado(e.target.value)}>
        <option>Todos</option>
        <option>Disponible</option>
        <option>Prestado</option>
        <option>Mantenimiento</option>
      </select>

      <button onClick={limpiar}>Limpiar filtros</button>
    </div>
  );
}

export default FiltrosInventario;
