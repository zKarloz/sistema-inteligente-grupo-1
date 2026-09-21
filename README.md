# Sistema Inteligente de Reconocimiento Facial - Grupo 1 - Semestre IV

Proyecto académico de control de acceso mediante reconocimiento facial con Frontend, Backend, Base de Datos, Deep Learning y Machine Learning.

## Arquitectura

```text
Usuario
  ↓
React + Vite + TypeScript
  ↓
Vercel
  ↓
FastAPI
  ↓
Render
  ↓
OpenCV + InsightFace + scikit-learn
  ↓
PostgreSQL / Supabase
```

## Tecnologías

**Frontend:** React, Vite, TypeScript, Tailwind CSS, React Router DOM, Axios, React Webcam, Recharts y Lucide React.  
**Backend:** Python, FastAPI, Uvicorn, SQLAlchemy, OpenCV, NumPy, InsightFace, ONNX Runtime, scikit-learn y joblib.  
**Servicios:** Supabase, Render, Vercel y GitHub.

## Funcionalidades principales

- Registro de personas y de uno o varios rostros por persona.
- Generación y almacenamiento de embeddings.
- Reconocimiento facial mediante similitud coseno.
- Cálculo de distancia, calidad, iluminación y umbral.
- Probabilidad calibrada con Machine Learning.
- Historial de reconocimientos y Dashboard con datos reales.
- Visualización de similitud, probabilidad y resultados.
- Despliegue funcional en Vercel, Render y Supabase.

## Estructura general

```text
sistema-inteligente/
├── README.md
├── frontend/
│   ├── README.md
│   └── src/
└── backend/
    ├── README.md
    ├── app/
    ├── models/
    ├── scripts/preparar_buffalo_sc.py
    └── requirements.txt
```

`backend/modelos_cache/` se genera automáticamente y no se versiona en Git.

## Flujo principal

```text
Registrar persona
  ↓
Registrar uno o más rostros
  ↓
Generar embeddings con buffalo_sc
  ↓
Guardar en Supabase
  ↓
Capturar nuevo rostro
  ↓
Comparar embeddings y tomar la mayor similitud
  ↓
Aplicar umbral
  ↓
Calcular probabilidad ML
  ↓
Guardar historial
  ↓
Mostrar resultado en React
```

## Módulos

**Dashboard:** estadísticas y actividad reciente.  
**Registro Facial:** crea una persona o agrega nuevos rostros a una persona existente.  
**Reconocimiento:** devuelve persona, similitud, distancia, umbral, coincidencia y probabilidad calibrada.  
**Historial:** muestra los intentos almacenados en `recognition_logs`.  
**Probabilidades:** muestra el último análisis, la decisión y sus gráficos.

## Tablas de la Base de datos

```text
personas
face_embeddings
recognition_logs
ml_training_records
```

Una persona puede tener varios registros en `face_embeddings`.

## Reconocimiento facial

El backend utiliza **InsightFace con `buffalo_sc`**, elegido por su menor consumo de memoria en Render. El sistema compara el embedding recibido contra todos los embeddings registrados y conserva la mayor similitud.

Umbral actual: `0.50`.

Durante las pruebas realizadas con personas registradas y desconocidas no se observaron falsos positivos ni falsos negativos. Este resultado corresponde únicamente a esas pruebas.

## Machine Learning

Entradas: `similitud`, `calidad_imagen`, `iluminacion`.

Variable objetivo: `resultado_real`.

Modelo: `LogisticRegression + CalibratedClassifierCV`.

Después de migrar a `buffalo_sc`, el modelo se reentrenó con 20 registros: 10 positivos y 10 negativos. La división de prueba evaluó 5 registros y los 5 fueron clasificados correctamente; estas métricas no representan una precisión universal.

Métricas implementadas: Accuracy, Precision, Recall, F1, matriz de confusión, tasa de falsos positivos y tasa de falsos negativos.

## Endpoints principales

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

## Ejecución local

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate
python -m pip install -r requirements.txt
uvicorn app.main:app --reload --env-file .env
```

Swagger: `http://127.0.0.1:8000/docs`

## Variables de entorno

Frontend:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Backend:

```env
APP_NAME=Sistema Inteligente de Reconocimiento Facial
APP_VERSION=1.0.0
DEBUG=False
DATABASE_URL=...
```

Los archivos `.env` no deben subirse al repositorio.

## Despliegue

- Frontend: Vercel
- Backend: Render
- Base de datos: Supabase

Build del backend:

```bash
pip install -r requirements.txt && python scripts/preparar_buffalo_sc.py
```

Inicio del backend:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Backend:** https://sistema-inteligente-grupo-1.onrender.com  
**Frontend:** https://sistema-inteligente-grupo-1-frontend.vercel.app

Para el desarrollo completo por fases, revisar `frontend/README.md` y `backend/README.md`.
