from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.connection import Base

# Estructura de la tabla recognition_logs
class RecognitionLog(Base):
    """Guarda cada intento de reconocimiento facial."""

    __tablename__ = "recognition_logs"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    persona_id: Mapped[int | None] = mapped_column(
        ForeignKey(
            "personas.id",
            ondelete="SET NULL"
        ),
        nullable=True,
        index=True
    )

    similitud: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    distancia: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    umbral: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    coincide: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False
    )

    probabilidad_calibrada: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

# Estructura de la tabla ml_training_records
class MLTrainingRecord(Base):
    """Dato utilizado para entrenar el modelo de Machine Learning."""

    __tablename__ = "ml_training_records"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    similitud: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    calidad_imagen: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    iluminacion: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    resultado_real: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )