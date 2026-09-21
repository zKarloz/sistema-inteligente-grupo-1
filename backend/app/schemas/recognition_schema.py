from datetime import datetime

from pydantic import BaseModel, Field


class RecognitionResponse(BaseModel):
    success: bool
    persona_id: int | None
    nombre: str | None
    similitud: float
    distancia: float
    umbral: float
    coincide: bool
    probabilidad_calibrada: float | None

class RecognitionHistoryResponse(BaseModel):
    id: int
    persona_id: int | None
    nombre: str | None
    similitud: float
    distancia: float
    umbral: float
    coincide: bool
    probabilidad_calibrada: float | None
    created_at: datetime


class TrainingRecordCreate(BaseModel):
    similitud: float = Field(ge=-1, le=1)
    calidad_imagen: float = Field(ge=0, le=1)
    iluminacion: float = Field(ge=0, le=1)
    resultado_real: bool

class ProbabilityRequest(BaseModel):
    similitud: float = Field(ge=-1, le=1)
    calidad_imagen: float = Field(ge=0, le=1)
    iluminacion: float = Field(ge=0, le=1)