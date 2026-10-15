# MediaTrack

Aplicación web para controlar el préstamo de equipos audiovisuales.

## Requisitos
- Node.js 18 o superior
- npm

## Instalación
```bash
npm install
cp .env.example .env
```

## Ejecución
```bash
npm run dev
```

## Generar el build
```bash
npm run build
npm run preview
```

## Estructura del proyecto
```
mediatrack/
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── README.md
├── package.json
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── config.js
    ├── utils/
    │   ├── atrasos.js
    │   ├── validaciones.js
    │   ├── filtros.js
    │   └── indicadores.js
    ├── Resumen.jsx
    ├── Inventario.jsx
    ├── FiltrosInventario.jsx
    ├── FormularioSolicitud.jsx
    └── ListaPrestamos.jsx
```

## Variables de entorno
| Variable | Para qué sirve |
|---|---|
| VITE_APP_NAME | Nombre que se muestra en el título |

## Plan de pruebas

### CR-01: atrasos
Cómo se verificó el error en la versión 1.0.0: se creó una solicitud con fecha prevista de hoy y se vio que aparecía como ATRASADA. El error pasaba porque la fecha se comparaba con la hora actual: "2026-10-14" se lee como las 00:00 (hora UTC), que en Colombia es el día anterior en la tarde, así que la fecha de hoy ya parecía vencida.

| Caso | Resultado esperado |
|---|---|
| Fecha prevista de ayer, solicitud Activa | Atrasada |
| Fecha prevista de hoy, solicitud Activa | No atrasada |
| Fecha prevista de mañana, solicitud Activa | No atrasada |
| Fecha prevista de ayer, solicitud Devuelta | No atrasada |

### CR-02: límite de días
| Caso | Resultado esperado |
|---|---|
| Estudiante, préstamo de 3 días | Se registra |
| Estudiante, préstamo de 4 días | Error: "Un Estudiante puede prestar máximo 3 días." |
| Docente, préstamo de 7 días | Se registra |
| Docente, préstamo de 8 días | Error: "Un Docente puede prestar máximo 7 días." |

## Respuestas de análisis

1. **¿Qué va en el equipo y qué en la solicitud?** El equipo guarda sus datos propios: código, nombre, categoría, estado, ubicación y valor. La solicitud guarda lo del préstamo: quién lo pidió, tipo de usuario, qué equipo, fechas y su estado.

2. **¿Por qué los estados son distintos?** Porque hablan de cosas diferentes. El equipo puede estar Disponible, Prestado o en Mantenimiento. La solicitud solo está Activa o Devuelta. Si fueran el mismo dato, al devolver un equipo que va a mantenimiento no se podría representar.

3. **¿Cómo evito que dos solicitudes usen el mismo equipo?** El formulario solo muestra equipos Disponibles. Además, al registrar reviso otra vez que esté Disponible y que no exista otra solicitud Activa con ese código. Al confirmar, el equipo pasa a Prestado.

4. **¿Qué se recalcula al devolver?** El estado de la solicitud, el estado del equipo y el resumen (disponibles, prestados, mantenimiento y atrasados). El resumen se recalcula solo, porque sale del estado.

5. **¿Por qué no modificar el arreglo del useState?** React solo se da cuenta de que algo cambió si recibe un arreglo nuevo. Si lo modifico directamente, la pantalla puede no actualizarse. Por eso uso `map`, `filter` y el operador `...`.

6. **¿Cómo combino búsqueda y filtros sin dañar el inventario?** Guardo el texto, la categoría y el estado en tres estados. Con `filter` creo una lista nueva donde se deben cumplir las tres condiciones. El arreglo original `equipos` nunca se toca.

7. **¿Por qué no subir node_modules ni .env?** `node_modules` es muy pesada y se recrea con `npm install`. Los `.env` pueden tener datos privados. El `.env.example` es una plantilla sin datos secretos que muestra qué variables hay que crear.

8. **Tipos de mantenimiento:**
   - CR-01 es *correctivo*: arregla un error que ya existía (los préstamos con fecha prevista de hoy salían como atrasados).
   - CR-02 es *evolutivo*: agrega una función nueva que antes no existía (límite de 3 días para Estudiante y 7 para Docente).
   - CR-03 es *preventivo*: no arregla nada ni agrega nada nuevo. Solo ordena el código (la lógica pasa a src/utils) para que después sea más fácil mantenerlo, y la aplicación se ve igual.

9. **Ventaja del archivo de configuración y 1.1.0 vs 2.0.0:** si los límites están en un solo archivo, cuando cambie la política solo edito ese archivo y no busco números por todo el código. CR-02 sube a 1.1.0 porque agrega una función nueva sin romper lo que ya funcionaba (cambio *minor*). Se subiría a 2.0.0 solo si el cambio rompiera la compatibilidad.
