# Sistema Inteligente de Reconocimiento Facial - Grupo 1 - Semestre IV

Proyecto académico de control de acceso mediante reconocimiento facial, integrando Frontend, Backend, Base de Datos, Deep Learning y Machine Learning.

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
**Backend:** Python, FastAPI, Uvicorn, SQLAlchemy, OpenCV, NumPy, InsightFace / ArcFace, ONNX Runtime, scikit-learn y joblib.  
**Servicios:** Supabase, Render, Vercel y GitHub.

## Funcionalidades principales

- Registro de personas.
- Registro facial mediante cámara o imagen.
- Generación y almacenamiento de embeddings.
- Reconocimiento facial con similitud coseno.
- Cálculo de distancia y umbral.
- Cálculo de calidad e iluminación de imagen.
- Probabilidad calibrada con Machine Learning.
- Historial de reconocimientos.
- Dashboard con estadísticas reales.
- Visualización de similitud, probabilidad y resultados.

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
    └── requirements.txt
```

Documentación detallada:

```text
frontend/README.md
backend/README.md
```

## Flujo principal

```text
Registrar persona
  ↓
Registrar rostro
  ↓
Generar embedding
  ↓
Guardar en Supabase
  ↓
Capturar nuevo rostro
  ↓
Comparar embeddings
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

**Dashboard:** personas registradas, reconocimientos, accesos aceptados, rechazados y actividad reciente.  
**Registro Facial:** crea una persona y asocia una imagen facial.  
**Reconocimiento:** devuelve persona, similitud, distancia, umbral, coincidencia y probabilidad calibrada.  
**Historial:** muestra los intentos de reconocimiento guardados.  
**Probabilidades:** muestra el último análisis con probabilidad calibrada y gráficos.

## Base de datos

Tablas principales:

```text
personas
face_embeddings
recognition_logs
ml_training_records
```

## Machine Learning

Entradas:

```text
similitud
calidad_imagen
iluminacion
```

Variable objetivo:

```text
resultado_real
```

Modelo:

```text
LogisticRegression + CalibratedClassifierCV
```

Métricas: Accuracy, Precision, Recall, F1, matriz de confusión, falsos positivos y falsos negativos.

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

Swagger:

```text
http://127.0.0.1:8000/docs
```

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

**Backend:** https://sistema-inteligente-grupo-1.onrender.com  
**Frontend:** https://sistema-inteligente-grupo-1-frontend.vercel.app

Para el desarrollo completo por fases, revisar `frontend/README.md` y `backend/README.md`.
