from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.api.routes.personas import router as personas_router
from app.api.routes.recognition import router as recognition_router
from app.api.routes.probabilities import router as probabilities_router

from app.core.config import settings
from app.database.connection import Base, engine

from app.models.persona_model import FaceEmbedding, Persona
from app.models.recognition_model import MLTrainingRecord, RecognitionLog

# Creamos en PostgreSQL las tablas que todavía no existan.
Base.metadata.create_all(bind=engine)

# FastAPI() crea nuestra aplicación
app = FastAPI(
    title=settings.APP_NAME,
    description="API para reconocimiento facial y análisis de probabilidades",
    version=settings.APP_VERSION
)

# Conecta las rutas que escribimos en otros archivos
app.include_router(
    health_router,
    prefix="/api",
    tags=["Health"]
)

# Endpoint POST /api/personas
app.include_router(
    personas_router,
    prefix="/api/personas",
    tags=["Personas"]
)

app.include_router(
    recognition_router,
    prefix="/api/reconocimiento",
    tags=["Reconocimiento"]
)

app.include_router(
    probabilities_router,
    prefix="/api",
    tags=["Machine Learning"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://sistema-inteligente-grupo-1-frontend.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint GET /Root
@app.get("/")
def root():
    """Ruta principal de la API"""

    return {
        "message": "API de reconocimiento facial funcionando"
    }