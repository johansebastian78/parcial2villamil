function Inventario({ equipos }) {
  if (equipos.length === 0) {
    return <p>No hay equipos que coincidan con la búsqueda.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Estado</th>
          <th>Ubicación</th>
          <th>Valor (COP)</th>
        </tr>
      </thead>
      <tbody>
        {equipos.map((e) => (
          <tr key={e.codigo}>
            <td>{e.codigo}</td>
            <td>{e.nombre}</td>
            <td>{e.categoria}</td>
            <td>
              <span className={"estado " + e.estado.toLowerCase()}>{e.estado}</span>
            </td>
            <td>{e.ubicacion}</td>
            <td>{e.valor.toLocaleString("es-CO")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Inventario;
