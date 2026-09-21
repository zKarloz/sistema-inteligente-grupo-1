from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.connection import Base

# Estructura de la tabla personas
class Persona(Base):
    """Representa una persona registrada en el sistema."""

    __tablename__ = "personas"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    nombre: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        index=True,
        nullable=False
    )

    activo: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    embeddings = relationship(
        "FaceEmbedding",
        back_populates="persona",
        cascade="all, delete-orphan"
    )

# Estructura de la tabla face_embeddings
class FaceEmbedding(Base):
    """Almacena el embedding facial asociado a una persona."""

    __tablename__ = "face_embeddings"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    persona_id: Mapped[int] = mapped_column(
        ForeignKey(
            "personas.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    embedding: Mapped[list[float]] = mapped_column(
        ARRAY(Float),
        nullable=False
    )

    modelo: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    persona = relationship(
        "Persona",
        back_populates="embeddings"
    )