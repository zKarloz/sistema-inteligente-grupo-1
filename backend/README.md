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

Se integró InsightFace con el modelo ArcFace.

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
3. consulta los rostros registrados;
4. compara el nuevo embedding con los existentes;
5. encuentra la mayor similitud;
6. calcula la distancia;
7. compara la similitud con un umbral;
8. determina si existe coincidencia;
9. guarda el resultado en el historial.

Se utilizó inicialmente un umbral:

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

El dataset utilizado durante las pruebas llegó a 32 registros reales.

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
- conexión del backend desplegado con Supabase;
- conexión del frontend desplegado con el backend.

Comando de producción utilizado en Render:

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
- pruebas de rutas públicas.

Pendiente para una versión más completa:

- autenticación;
- roles y permisos;
- auditoría avanzada;
- migraciones con Alembic;
- límites de tamaño de archivos;
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

# Resultado final

El backend permite:

```text
Registrar una persona
        ↓
Registrar su rostro
        ↓
Generar embedding facial
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
