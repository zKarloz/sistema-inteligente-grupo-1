from fastapi import  APIRouter
from sqlalchemy import text

from app.database.connection import engine

# Nos permite separar las rutas del programa en distintos archivos
router = APIRouter()

# Endpoint GET /api/health
@router.get("/health")
def health_check():
    """Comprueba el estado del backend y la base de datos."""

    database_status = "error"

    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        database_status = "connected"

    except Exception:
        database_status = "disconnected"

    return {
        "status": "ok",
        "backend": "funcionando",
        "database": database_status
    }