# Proyecto: Sistema Inteligente de Reconocimiento Facial

Frontend desarrollado paso a paso siguiendo la propuesta del documento técnico del proyecto de **Inteligencia Artificial, Machine Learning y Deep Learning**.

Esta primera etapa corresponde únicamente al **frontend**. El backend con FastAPI, OpenCV, reconocimiento facial real, base de datos y Machine Learning se desarrollará posteriormente.

---

## Tecnologías utilizadas

- React
- Vite
- TypeScript
- Tailwind CSS
- Axios
- React Webcam
- Recharts
- Lucide React

---

## Ejecución del proyecto

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

Se configuró Tailwind mediante `vite.config.ts` y `index.css`.

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
│   ├── CameraCapture.tsx
│   ├── FaceResultCard.tsx
│   ├── SimilarityBar.tsx
│   └── ProbabilityChart.tsx
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

Responsabilidades:

- `pages/`: pantallas completas.
- `components/`: elementos reutilizables.
- `services/`: comunicación con el backend.
- `types/`: interfaces y tipos de TypeScript.

---

## Fase 4 - Layout y navegación

Se creó la estructura general de la aplicación:

- Encabezado principal.
- Sidebar.
- Área de contenido.
- Navegación entre páginas.

Se utilizó `useState` para controlar la página activa sin recargar la aplicación.

Páginas disponibles:

- Dashboard
- Registro facial
- Reconocimiento
- Probabilidades
- Historial

---

## Fase 5 - Dashboard

Se desarrolló el Dashboard con datos simulados.

Incluye:

- Personas registradas.
- Cantidad de reconocimientos.
- Coincidencias.
- Tasa de coincidencia.
- Tabla de reconocimientos recientes.

También se implementó diseño responsive para las tarjetas.

---

## Fase 6 - Registro facial

Se creó el formulario para registrar una persona.

Incluye:

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
- Props entre componentes

Por ahora los datos se preparan en el frontend, pero todavía no se envían al backend.

---

## Fase 7 - Reconocimiento facial

Se creó la interfaz del módulo de reconocimiento.

Incluye:

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

También se desarrollaron los componentes:

- `FaceResultCard.tsx`
- `SimilarityBar.tsx`

El reconocimiento todavía utiliza datos simulados.

---

## Fase 8 - Probabilidades

Se desarrolló la página de análisis de resultados.

Incluye:

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

## Fase 9 - Historial

Se creó una tabla dinámica de reconocimientos.

Se aprendió a trabajar con:

- Arreglos.
- `.map()`
- `.filter()`
- `key`
- Filtros mediante `useState`

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

## Fase 11 - Responsive y revisión final

Se realizó una revisión general del frontend para mejorar su funcionamiento en diferentes tamaños de pantalla.

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

# Componentes principales

## `CameraCapture.tsx`

Permite:

- Acceder a la cámara.
- Tomar una fotografía.
- Mostrar una vista previa.
- Repetir la captura.
- Enviar la imagen al componente padre.

## `FaceResultCard.tsx`

Muestra el resultado de reconocimiento:

- Persona candidata.
- Similitud.
- Distancia.
- Umbral.
- Probabilidad calibrada.
- Coincidencia o no coincidencia.

## `SimilarityBar.tsx`

Representa visualmente:

- Similitud facial.
- Umbral configurado.

## `ProbabilityChart.tsx`

Utiliza Recharts para mostrar:

- Similitud.
- Umbral.
- Probabilidad calibrada.

---

# Estado actual del proyecto

Frontend completado:

- [x] React + Vite + TypeScript
- [x] Tailwind CSS
- [x] Navegación
- [x] Dashboard
- [x] Registro facial
- [x] Cámara
- [x] Reconocimiento visual
- [x] Resultados simulados
- [x] Probabilidades
- [x] Gráficos
- [x] Historial
- [x] Filtros
- [x] Axios preparado
- [x] Diseño responsive

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
