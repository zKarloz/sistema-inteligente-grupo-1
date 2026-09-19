# Proyecto: Sistema Inteligente de Reconocimiento Facial

Frontend desarrollado paso a paso siguiendo la propuesta del documento técnico del proyecto de **Inteligencia Artificial, Machine Learning y Deep Learning**.

Esta primera etapa corresponde únicamente al **frontend**. El backend con FastAPI, OpenCV, reconocimiento facial real, base de datos y Machine Learning se desarrollará posteriormente.

---

## Tecnologías utilizadas

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Webcam
- Recharts
- Lucide React

---

## Ejecución del proyecto

Abrir la carpeta `frontend`:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Comprobar la compilación:

```bash
npm run build
```

---

# Desarrollo del frontend por fases

## Fase 1 - Creación y limpieza del proyecto

Se creó el proyecto con React, Vite y TypeScript:

```bash
npm create vite@latest frontend -- --template react-ts
```

Después se:

- Instalaron las dependencias iniciales.
- Revisó la estructura generada por Vite.
- Limpió el contenido de demostración.
- Simplificó `App.tsx`.
- Limpió `App.css` e `index.css`.
- Modificó el título de `index.html`.
- Comprobó el funcionamiento con `npm run dev` y `npm run build`.

---

## Fase 2 - Instalación de dependencias

Se instalaron las herramientas necesarias para el frontend.

### Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Se configuró Tailwind mediante `vite.config.ts` e `index.css`.

### Librerías adicionales

```bash
npm install axios react-webcam recharts lucide-react
```

Funciones principales:

- **Axios:** comunicación futura con FastAPI.
- **React Webcam:** acceso a la cámara.
- **Recharts:** gráficos y visualización de resultados.
- **Lucide React:** iconos de la interfaz.

---

## Fase 3 - Estructura del frontend

Se organizó el proyecto separando responsabilidades.

```text
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   ├── CameraCapture.tsx
│   ├── FaceResultCard.tsx
│   ├── SimilarityBar.tsx
│   └── ProbabilityChart.tsx
│
├── config/
│   └── navigation.ts
│
├── pages/
│   ├── Dashboard.tsx
│   ├── RegistroFacial.tsx
│   ├── Reconocimiento.tsx
│   ├── Probabilidades.tsx
│   └── Historial.tsx
│
├── services/
│   └── api.ts
│
├── types/
│   └── facial.ts
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

Responsabilidades principales:

- `pages/`: pantallas completas.
- `components/`: elementos reutilizables.
- `components/layout/`: estructura general de navegación.
- `config/`: configuración reutilizable de navegación y rutas.
- `services/`: comunicación con el backend.
- `types/`: interfaces y tipos de TypeScript.

---

## Fase 4 - Layout y navegación inicial

Se creó la primera estructura general de la aplicación:

- Encabezado.
- Sidebar.
- Área de contenido.
- Navegación entre páginas.

En esta fase se utilizó `useState` para controlar la página activa. Más adelante, durante la Fase 12, esta navegación fue reemplazada por **React Router DOM** para disponer de URLs reales, navegación Atrás/Adelante y recarga de cada ruta.

Páginas principales:

- Dashboard.
- Registro facial.
- Reconocimiento.
- Probabilidades.
- Historial.

---

## Fase 5 - Dashboard inicial

Se desarrolló la primera versión del Dashboard con datos simulados.

Incluyó:

- Personas registradas.
- Cantidad de reconocimientos.
- Coincidencias.
- Tasa de coincidencia.
- Tabla de reconocimientos recientes.
- Diseño responsive para las tarjetas.

Esta pantalla fue rediseñada posteriormente en la Fase 12.

---

## Fase 6 - Registro facial inicial

Se creó el formulario para registrar una persona.

Incluyó:

- Nombre completo.
- Correo electrónico.
- Captura mediante cámara.
- Vista previa de la fotografía.
- Opción para repetir la captura.
- Validaciones básicas.

Se utilizó:

- `useState`
- `SubmitEvent`
- `useRef`
- `react-webcam`
- Props entre componentes.

Por ahora los datos se preparan en el frontend, pero todavía no se envían al backend.

---

## Fase 7 - Reconocimiento facial inicial

Se creó la primera interfaz del módulo de reconocimiento.

Incluyó:

- Reutilización de `CameraCapture`.
- Captura de fotografía.
- Botón para analizar rostro.
- Resultado simulado.
- Identidad candidata.
- Similitud.
- Distancia.
- Umbral.
- Coincidencia.
- Probabilidad calibrada.

También se desarrollaron:

- `FaceResultCard.tsx`
- `SimilarityBar.tsx`

El reconocimiento todavía utiliza datos simulados.

---

## Fase 8 - Probabilidades inicial

Se desarrolló la página de análisis de resultados.

Incluyó:

- Similitud.
- Distancia.
- Umbral.
- Probabilidad calibrada.
- Barra visual de similitud.
- Interpretación de resultados.
- Gráfico de barras con Recharts.

Se mantuvo separada la interpretación de:

- Similitud.
- Umbral.
- Probabilidad calibrada.

El gráfico también fue adaptado para dispositivos pequeños mediante scroll horizontal.

---

## Fase 9 - Historial inicial

Se creó una tabla dinámica de reconocimientos.

Se trabajó con:

- Arreglos.
- `.map()`
- `.filter()`
- `key`
- Filtros mediante `useState`.

Filtros disponibles:

- Todos.
- Coinciden.
- No coinciden.

La tabla muestra:

- Persona.
- Similitud.
- Distancia.
- Umbral.
- Probabilidad.
- Resultado.
- Fecha.

También se agregó scroll horizontal para dispositivos móviles.

---

## Fase 10 - Preparación de la API

Se preparó `services/api.ts` usando Axios.

Funciones creadas:

```text
registrarPersona()
obtenerPersonas()
registrarRostro()
reconocerRostro()
obtenerHistorial()
calcularProbabilidad()
entrenarModelo()
obtenerMetricas()
```

Endpoints preparados:

```text
POST /api/personas
GET  /api/personas
POST /api/personas/{id}/rostro
POST /api/reconocimiento
GET  /api/reconocimiento/historial
POST /api/probabilidades/prediccion
POST /api/modelos/entrenar
GET  /api/modelos/metricas
```

Todavía no se ejecutan estas peticiones porque el backend aún no ha sido construido.

---

## Fase 11 - Responsive y primera revisión

Se realizó una primera revisión general del frontend para mejorar su funcionamiento en diferentes tamaños de pantalla.

Cambios principales:

- Sidebar contraído en dispositivos pequeños.
- Solo se muestran iconos en móvil y tablet.
- Sidebar completo en pantallas grandes.
- Página activa resaltada.
- Padding responsive.
- Corrección de `min-w-0` dentro del layout.
- Scroll horizontal en la tabla del Dashboard.
- Scroll horizontal en la tabla del Historial.
- Scroll horizontal en el gráfico de Probabilidades.
- Revisión de las cinco páginas principales.

---

# Fase 12 - Mejora visual profesional y refactor final

Después de terminar la primera versión funcional se realizó una segunda etapa de diseño y organización para darle al frontend una apariencia más profesional y una estructura más mantenible.

## Fase 12.1 - Identidad visual

Se creó una identidad visual global utilizando Tailwind CSS.

Se definieron:

- Paleta verde principal.
- Colores para fondo, bordes y textos secundarios.
- Tipografía **DM Sans** para el contenido general.
- Tipografía **Manrope** para títulos y números destacados.
- Variables personalizadas mediante `@theme`.
- Estilos globales de foco y accesibilidad.

Colores principales:

```text
brand          #087f70
brand-dark     #102e2c
brand-light    #d9edbd
ink            #203533
muted          #768480
surface        #f5f7f8
line           #e7eceb
```

También se creó una escala `brand-50` a `brand-950` para evitar colores hardcodeados dentro de los componentes.

---

## Fase 12.2 - Layout profesional y React Router

Se reorganizó la estructura general del sistema.

Se instaló React Router DOM:

```bash
npm install react-router-dom
```

Se implementó:

- `BrowserRouter` en `main.tsx`.
- `Routes` y `Route` en `App.tsx`.
- `NavLink` para el sidebar.
- `useLocation()` para identificar la ruta actual.
- `useNavigate()` para navegar desde botones.

Rutas principales:

```text
/                  Dashboard
/registro          Registro facial
/reconocimiento    Reconocimiento
/probabilidades    Probabilidades
/historial         Historial
```

Con esta mejora:

- El botón Atrás/Adelante del navegador funciona.
- Cada página tiene una URL real.
- Al recargar se mantiene la página actual.
- Las rutas pueden compartirse directamente.

También se:

- Extrajo `Sidebar.tsx`.
- Extrajo `Topbar.tsx`.
- Creó `config/navigation.ts`.
- Derivó el tipo de página a partir de la configuración de navegación.
- Añadió `aria-label` a la navegación.
- Eliminó el punto verde redundante del botón activo, manteniendo el fondo y texto verde como indicador.

---

## Fase 12.3 - Rediseño del Dashboard

Se reconstruyó visualmente el Dashboard.

Incluye:

- Hero principal en verde oscuro.
- Botón **Iniciar reconocimiento**.
- Decoración relacionada con reconocimiento facial.
- Cuatro tarjetas de estadísticas generadas con `.map()`.
- Actividad reciente.
- Acceso al historial.
- Tarjeta de siguiente paso para registrar una persona.
- Nota de privacidad.
- Sección para entender una coincidencia.
- Reutilización de `ProbabilityChart`.

Se mantuvieron datos simulados hasta conectar el backend.

---

## Fase 12.4 - Rediseño de Registro Facial

Se reorganizó la página en dos pasos:

```text
01 Información personal
02 Imagen facial
```

Mejoras:

- Formulario más claro y organizado.
- Estado visual de la imagen facial.
- Panel informativo sobre biometría.
- Recomendaciones de captura.
- Reutilización de `CameraCapture`.
- Posibilidad de usar webcam.
- Posibilidad de seleccionar una imagen del dispositivo.

Para la carga de imágenes se utilizó `FileReader` y el archivo se convierte a Data URL, manteniendo el mismo formato que una captura de webcam.

---

## Fase 12.5 - Rediseño de Reconocimiento

Se reorganizó el flujo visual:

```text
Captura facial
      ↓
Analizar rostro
      ↓
Resultado
```

Mejoras principales:

- Panel independiente de captura.
- Panel independiente de resultado.
- Estado vacío mientras no existe análisis.
- Aviso visible de modo demostración.
- `FaceResultCard` rediseñado.
- Identidad candidata.
- Barra de similitud.
- Métricas de distancia, umbral y probabilidad.
- Interpretación del resultado.

También se mejoró `SimilarityBar` para limitar visualmente los porcentajes entre 0 y 100.

---

## Fase 12.6 - Rediseño de Probabilidades

Se reorganizó la página para explicar mejor las métricas.

Incluye:

- Similitud.
- Distancia.
- Umbral.
- Probabilidad calibrada.
- Tarjetas de métricas.
- Barra de similitud.
- Decisión simulada.
- Gráfico con Recharts.
- Explicación conceptual de similitud, umbral y probabilidad.

`ProbabilityChart` fue convertido en un componente reutilizable que se encarga únicamente del gráfico, dejando los contenedores y títulos a cada página.

La distancia no se representa como porcentaje porque no tiene la misma interpretación que similitud, umbral o probabilidad.

---

## Fase 12.7 - Rediseño de Historial

Se mejoró la tabla del historial.

Se añadieron:

- Buscador por persona.
- Filtros de resultado.
- Contador dinámico de registros.
- Avatares con iniciales.
- Badges de coincidencia.
- Estado sin resultados.
- Scroll horizontal responsive.
- Filtros combinados entre búsqueda y resultado.

También se corrigió el movimiento visual de la tabla utilizando:

- `table-fixed`.
- `colgroup` con anchos definidos.
- `scrollbar-gutter: stable` para evitar movimientos cuando la barra vertical aparece o desaparece.

---

## Fase 12.8 - Revisión visual y responsive final

Se realizó una última revisión de coherencia de toda la interfaz.

Cambios finales:

- El Topbar quedó como único encabezado de la página actual.
- Se eliminaron títulos repetidos como `NEXO / ...` dentro de cada página.
- El nombre de la página se mantiene en sidebar, URL y Topbar.
- El contenido comienza directamente con información útil.
- Sidebar responsive con iconos en pantallas pequeñas.
- Topbar fijo mediante `sticky`.
- Footer simplificado.
- Corrección de desplazamientos visuales en Historial.
- Eliminación del indicador circular redundante del sidebar.
- Revisión de colores, espaciados, tablas y gráficos.
- Verificación de navegación mediante React Router.
- Revisión final en PC y dispositivos móviles.

---

# Componentes principales

## `CameraCapture.tsx`

Permite:

- Acceder a la cámara.
- Tomar una fotografía.
- Mostrar una vista previa.
- Repetir la captura.
- Seleccionar una imagen del dispositivo.
- Convertir imágenes a Data URL.
- Enviar la imagen al componente padre.

## `FaceResultCard.tsx`

Muestra:

- Persona candidata.
- Resultado de coincidencia.
- Similitud.
- Distancia.
- Umbral.
- Probabilidad calibrada.
- Interpretación del análisis.

## `SimilarityBar.tsx`

Representa visualmente:

- Similitud facial.
- Umbral configurado.
- Escala de comparación.

## `ProbabilityChart.tsx`

Utiliza Recharts para mostrar:

- Similitud.
- Umbral.
- Probabilidad calibrada.

El componente se mantiene desacoplado del diseño exterior para poder reutilizarse en diferentes páginas.

## `Sidebar.tsx`

Gestiona:

- Navegación principal.
- Estado visual de la ruta activa.
- Diseño responsive.
- Marca visual del sistema.
- Información del proyecto.

## `Topbar.tsx`

Muestra:

- Página actual.
- Descripción breve.
- Estado de modo demostración.

---

# Estado actual del proyecto

Frontend completado:

- [x] React + Vite + TypeScript
- [x] Tailwind CSS
- [x] Identidad visual personalizada
- [x] React Router DOM
- [x] Rutas reales
- [x] Sidebar responsive
- [x] Topbar
- [x] Dashboard
- [x] Registro facial
- [x] Captura mediante cámara
- [x] Carga de imágenes
- [x] Reconocimiento visual
- [x] Resultados simulados
- [x] Probabilidades
- [x] Gráficos
- [x] Historial
- [x] Buscador
- [x] Filtros
- [x] Axios preparado
- [x] Diseño responsive
- [x] Revisión visual final
- [x] Navegación accesible
- [x] Compilación preparada para producción

Pendiente:

- [ ] Backend con FastAPI
- [ ] PostgreSQL / Supabase
- [ ] OpenCV
- [ ] Detección facial real
- [ ] Embeddings faciales
- [ ] InsightFace / modelo preentrenado
- [ ] Reconocimiento real
- [ ] Machine Learning
- [ ] Probabilidades calibradas reales
- [ ] Autenticación y seguridad
- [ ] Auditoría
- [ ] Despliegue final

---

## Próxima etapa

La siguiente etapa será desarrollar el **backend desde cero con Python y FastAPI**, conectarlo posteriormente con PostgreSQL/Supabase y reemplazar progresivamente los datos simulados del frontend por datos reales.

---

> Nota: Los valores de similitud, probabilidades, personas y reconocimientos utilizados actualmente en la interfaz son datos simulados para construir y probar el frontend.
