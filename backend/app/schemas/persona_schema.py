# Define qué información puede entrar o salir por nuestra API

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

class PersonaCreate(BaseModel):
    """Datos necesarios para registrar una persona"""

    nombre: str = Field(
        min_length=2,
        max_length=100
    )

    email: str = Field(
        min_length=5,
        max_length=150
    )


class PersonaResponse(BaseModel):
    """Datos que devuelve la API de una persona"""

    id: int
    nombre: str
    email: str
    activo: bool
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )