from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

# Será la base que utilizarán nuestros futuros modelos
Base = declarative_base()


# Verificamos que exista una URL de base de datos.
if not settings.DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL no está configurada en el archivo .env"
    )

# Motor de conexión entre SQLAlchemy y PostgreSQL.
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True
)

# Crea sesiones para interactuar con la base de datos
# Una sesión permitirá hacer cosas como: guardar, buscar, editar o eliminar una persona; o también guardar un reconocimiento 
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Endpoint empieza
def get_db():
    """Crea una sesión y la cierra después de utilizarla."""

    # Abre conexión
    db = SessionLocal()

    # Consultar / guardar información, termina endpoint
    try:
        yield db
    finally:
        # Cerrar conexión
        db.close()