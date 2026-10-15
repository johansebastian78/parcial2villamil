# Changelog

## [1.1.0]

### Added
- Límite de duración del préstamo: 3 días para Estudiante y 7 días para Docente, con mensaje de error claro (CR-02).
- Archivo `src/config.js` con los límites de días (CR-02).
- Carpeta `src/utils/` con la lógica de negocio: atrasos, validaciones, filtros e indicadores (CR-03).
- Plan de pruebas en el README (CR-01 y CR-02).
- Los datos se guardan en localStorage y se conservan al recargar la página (bonificación).

### Changed
- Las validaciones, la detección de atrasos, los filtros y los indicadores salieron de los componentes y ahora son funciones independientes. La aplicación se ve igual (CR-03).

### Fixed
- Un préstamo con fecha prevista de hoy ya no aparece como atrasado. Solo se marca atraso si la fecha prevista es anterior a hoy (CR-01).

## [1.0.0]

### Added
- Inventario, solicitudes, devoluciones, búsqueda, filtros y resumen de operación.
