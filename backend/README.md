# Backend — Sistema Inteligente de Reconocimiento Facial

Este README resume las fases desarrolladas en el backend del proyecto de reconocimiento facial, siguiendo la propuesta técnica del PDF del curso.

## Tecnologías principales

- Python
- FastAPI
- Uvicorn
- PostgreSQL / Supabase
- SQLAlchemy
- OpenCV
- NumPy
- InsightFace / ArcFace
- ONNX Runtime
- scikit-learn
- joblib

---

## Estructura principal

```text
backend/
├── app/
│   ├── main.py
│   ├── core/
│   │   └── config.py
│   ├── database/
│   │   └── connection.py
│   ├── models/
│   │   ├── persona_model.py
│   │   └── recognition_model.py
│   ├── schemas/
│   │   ├── persona_schema.py
│   │   └── recognition_schema.py
│   ├── services/
│   │   ├── face_service.py
│   │   ├── embedding_service.py
│   │   └── probability_service.py
│   └── api/
│       └── routes/
│           ├── health.py
│           ├── personas.py
│           ├── recognition.py
│           └── probabilities.py
├── models/
│   └── modelo_probabilidad.joblib
├── scripts/
│   └── preparar_buffalo_sc.py
├── modelos_cache/              # generado automáticamente, no se versiona
├── requirements.txt
├── .env
└── .gitignore
```

---

# Fases desarrolladas

## Fase 1 — Backend base / MVP

Se creó la base del backend con FastAPI.

Se realizó:

- creación de la carpeta `backend`;
- entorno virtual de Python;
- archivo `requirements.txt`;
- configuración de FastAPI y Uvicorn;
- archivo `.env`;
- archivo `config.py`;
- conexión con PostgreSQL/Supabase;
- endpoint de prueba `/api/health`;
- comprobación de Swagger.

Comando local utilizado:

```bash
uvicorn app.main:app --reload --env-file .env
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## Fase 2 — Personas y base de datos

Se implementó el registro y consulta de personas.

Archivos principales:

```text
persona_model.py
persona_schema.py
personas.py
```

Endpoints principales:

```text
POST /api/personas
GET  /api/personas
```

La información se almacena en Supabase/PostgreSQL.

Tabla principal:

```text
personas
```

Campos principales:

- id
- nombre
- email
- activo
- created_at

También se conectó el formulario del frontend con el backend.

---

## Fase 3 — Captura y tratamiento facial

Se agregó la recepción de imágenes desde React.

Se utilizó OpenCV para:

- leer los bytes recibidos;
- convertirlos en imagen;
- validar que la imagen sea válida;
- limitar el tamaño recibido a 5 MB;
- reducir imágenes grandes a un máximo de 640 px por su lado mayor;
- detectar rostros;
- preparar la imagen para el siguiente procesamiento.

Archivo principal:

```text
app/services/face_service.py
```

Además se agregaron funciones para calcular:

- calidad de imagen;
- iluminación promedio.

Estas variables posteriormente se utilizaron en Machine Learning.

---

## Fase 4 — Deep Learning y embeddings

Se integró InsightFace para generar representaciones faciales mediante embeddings.

La primera versión utilizó `buffalo_l`. Durante las pruebas en Render, ese paquete superó el límite de memoria disponible de la instancia de 512 MB. Después de probar una carga reducida de `buffalo_l`, se migró finalmente a:

```text
buffalo_sc
```

Esta variante mantiene el flujo de detección y reconocimiento facial, pero utiliza muchos menos recursos y permitió ejecutar el análisis correctamente en producción.

Archivo principal:

```text
app/services/embedding_service.py
```

El flujo implementado fue:

```text
Imagen
   ↓
InsightFace
   ↓
Detección facial
   ↓
Embedding
   ↓
Normalización
   ↓
Almacenamiento en PostgreSQL
```

Los embeddings se guardan en:

```text
face_embeddings
```

Una misma persona puede tener varios embeddings asociados al mismo `persona_id`, permitiendo registrar diferentes fotografías, ángulos o condiciones de captura sin duplicar a la persona.

También se implementó la similitud coseno para comparar dos embeddings.

La similitud indica qué tan cercanos son dos rostros representados matemáticamente.

---

## Fase 5 — Reconocimiento facial

Se creó el endpoint principal:

```text
POST /api/reconocimiento
```

El backend:

1. recibe una imagen;
2. genera su embedding;
3. consulta todos los rostros registrados;
4. compara el nuevo embedding con los embeddings existentes;
5. conserva la mayor similitud encontrada, incluso cuando una persona tiene varias muestras;
6. calcula la distancia;
7. compara la similitud con un umbral;
8. determina si existe coincidencia;
9. guarda el resultado en el historial.

Se mantiene actualmente un umbral:

```text
0.50
```

La distancia utilizada se calcula como:

```text
distancia = 1 - similitud
```

La respuesta incluye datos como:

```text
persona_id
nombre
similitud
distancia
umbral
coincide
probabilidad_calibrada
```

Los intentos se guardan en:

```text
recognition_logs
```

---

## Fase 6 — Probabilidades y Machine Learning

Se implementó un módulo de Machine Learning con scikit-learn.

Tabla utilizada:

```text
ml_training_records
```

Variables utilizadas para entrenar:

```text
similitud
calidad_imagen
iluminacion
resultado_real
```

`resultado_real` representa la verdad conocida del ejemplo:

```text
true  = realmente corresponde a la misma persona
false = realmente corresponde a una persona distinta
```

No se usa la distancia como entrada del modelo porque en esta implementación:

```text
distancia = 1 - similitud
```

por lo que ambas variables contienen información redundante.

### Entrenamiento

Se utilizó:

```text
LogisticRegression
+
CalibratedClassifierCV
```

El modelo genera una probabilidad calibrada.

Después de migrar de `buffalo_l` a `buffalo_sc`, los registros de entrenamiento anteriores se descartaron para no mezclar similitudes generadas por modelos diferentes.

El modelo actual se reentrenó con:

```text
20 registros reales
10 positivos
10 negativos
```

Con una división de prueba del 25 %, el conjunto de evaluación quedó formado por 5 registros. En esa prueba concreta el modelo clasificó correctamente los 5 casos:

```text
Matriz de confusión
[[3, 0],
 [0, 2]]
```

Las métricas obtenidas en ese conjunto fueron Accuracy, Precision, Recall y F1 iguales a 1.0, con tasa de falsos positivos y falsos negativos igual a 0. Estos valores describen únicamente ese pequeño conjunto de prueba y no deben interpretarse como una precisión universal del sistema.

### Métricas implementadas

- Accuracy
- Precision
- Recall
- F1
- Matriz de confusión
- Tasa de falsos positivos
- Tasa de falsos negativos

Endpoints:

```text
POST /api/modelos/datos
POST /api/modelos/entrenar
GET  /api/modelos/metricas
POST /api/probabilidades/prediccion
```

El modelo entrenado se guarda en:

```text
backend/models/modelo_probabilidad.joblib
```

Finalmente, la probabilidad calibrada se integró directamente al reconocimiento facial.

Flujo:

```text
Reconocimiento
     ↓
Similitud + calidad + iluminación
     ↓
Modelo ML
     ↓
Probabilidad calibrada
     ↓
recognition_logs
```

---

## Fase 7 — Integración completa con el frontend

Aunque esta fase involucra React, el backend quedó completamente conectado con las pantallas principales.

Se integraron:

- Registro facial
- Reconocimiento
- Historial
- Dashboard
- Probabilidades

El frontend ahora consume datos reales del backend y Supabase.

Flujo general:

```text
React
   ↓
FastAPI
   ↓
OpenCV + InsightFace
   ↓
Embedding
   ↓
Comparación facial
   ↓
Machine Learning
   ↓
Supabase
   ↓
Dashboard / Historial / Probabilidades
```

---

## Fase 8 — Seguridad básica, producción y despliegue

Se preparó el backend para producción.

Se realizó:

- uso de variables de entorno;
- protección del archivo `.env`;
- configuración de `.gitignore`;
- inclusión controlada del archivo `.joblib`;
- configuración de CORS;
- permiso explícito para el frontend de Vercel;
- configuración de Render;
- migración del modelo facial a `buffalo_sc` para reducir el consumo de memoria;
- preparación automática del modelo durante el build;
- reducción de imágenes grandes antes del análisis;
- límite de 5 MB para imágenes recibidas;
- conexión del backend desplegado con Supabase;
- conexión del frontend desplegado con el backend.

Build Command utilizado en Render:

```bash
pip install -r requirements.txt && python scripts/preparar_buffalo_sc.py
```

El script descarga/prepara `buffalo_sc` durante el build. Los archivos generados se guardan en `modelos_cache/`, carpeta excluida del repositorio.

Start Command utilizado en Render:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Variable utilizada en Vercel:

```text
VITE_API_URL=https://sistema-inteligente-grupo-1.onrender.com
```

La URL del frontend de Vercel fue agregada a CORS en FastAPI.

### Estado de esta fase

Completado:

- despliegue del backend;
- conexión Render ↔ Supabase;
- conexión Vercel ↔ Render;
- configuración CORS;
- variables de entorno;
- pruebas de rutas públicas;
- reconocimiento facial estable con `buffalo_sc`;
- reentrenamiento del modelo `.joblib` con datos compatibles con `buffalo_sc`;
- verificación de consistencia entre `/api/reconocimiento` y `/api/probabilidades/prediccion`.

Pendiente para una versión más completa:

- autenticación;
- roles y permisos;
- auditoría avanzada;
- migraciones con Alembic;
- rate limiting;
- políticas de retención y protección de datos biométricos.

---

# Endpoints principales

```text
GET  /api/health

POST /api/personas
GET  /api/personas

POST /api/personas/{id}/rostro

POST /api/reconocimiento
GET  /api/reconocimiento/historial

POST /api/modelos/datos
POST /api/modelos/entrenar
GET  /api/modelos/metricas

POST /api/probabilidades/prediccion
```

---

# Base de datos

Tablas principales:

```text
personas
face_embeddings
recognition_logs
ml_training_records
```

Relación general:

```text
personas
   │
   └── face_embeddings

personas
   │
   └── recognition_logs

ml_training_records
   │
   └── entrenamiento del modelo ML
```

---

# Ejecutar el backend localmente

Desde la carpeta `backend`:

```bash
.venv\Scripts\activate
```

Luego:

```bash
uvicorn app.main:app --reload --env-file .env
```

API:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

# Variables de entorno

Ejemplo:

```env
APP_NAME=Sistema Inteligente de Reconocimiento Facial
APP_VERSION=1.0.0
DEBUG=False
DATABASE_URL=...
```

El archivo `.env` no debe subirse a GitHub.

---

# Optimización final para producción

Durante las pruebas en Render se detectó un error de memoria al analizar rostros con `buffalo_l`:

```text
Ran out of memory (used over 512MB)
```

Se evaluó una versión reducida de `buffalo_l`, pero el consumo continuó siendo demasiado alto. La solución final fue migrar a `buffalo_sc`.

La migración requirió:

- volver a generar los embeddings faciales;
- volver a validar el umbral de similitud;
- generar nuevos registros de `ml_training_records`;
- reentrenar `modelo_probabilidad.joblib`;
- mantener `preparar_buffalo_sc.py` para los builds de Render.

Se registraron cinco personas y se realizaron pruebas con imágenes distintas a las utilizadas durante el registro, además de personas desconocidas. En estas pruebas no se observaron falsos positivos ni falsos negativos con el umbral actual de `0.50`.

También se comprobó que una predicción realizada inmediatamente después de un reconocimiento devuelve la misma `probabilidad_calibrada` cuando se utilizan los mismos valores de similitud, calidad e iluminación.

---

# Resultado final

El backend permite:

```text
Registrar una persona
        ↓
Registrar uno o más rostros
        ↓
Generar embeddings faciales
        ↓
Guardar embedding
        ↓
Reconocer una nueva imagen
        ↓
Comparar similitud
        ↓
Aplicar umbral
        ↓
Calcular probabilidad con ML
        ↓
Guardar historial
        ↓
Mostrar resultados en React
```

Con esto se completó el flujo principal del sistema inteligente de reconocimiento facial propuesto para el proyecto.
