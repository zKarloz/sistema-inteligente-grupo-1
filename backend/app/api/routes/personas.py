from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.persona_model import FaceEmbedding, Persona

from app.schemas.persona_schema import PersonaCreate, PersonaResponse
from app.services.face_service import leer_imagen
from app.services.embedding_service import MODEL_NAME, generar_embedding

router = APIRouter()

# Endpoint POST /api/personas (registrar personas)
@router.post(
    "",
    response_model=PersonaResponse,
    status_code=status.HTTP_201_CREATED
)
def crear_persona(
    datos: PersonaCreate,
    db: Session = Depends(get_db)
):
    """Registra una nueva persona."""

    persona_existente = (
        db.query(Persona)
        .filter(Persona.email == datos.email)
        .first()
    )

    if persona_existente:
        raise HTTPException(
            status_code=400,
            detail="Ya existe una persona con ese correo."
        )

    nueva_persona = Persona(
        nombre=datos.nombre,
        email=datos.email
    )

    db.add(nueva_persona)
    db.commit()
    db.refresh(nueva_persona)

    return nueva_persona

# Endpoint para consultar las personas existentes
@router.get(
    "",
    response_model=list[PersonaResponse]
)
def listar_personas(
    db: Session = Depends(get_db)
):
    """Devuelve todas las personas registradas."""

    personas = db.query(Persona).all()

    return personas

# Endpoint POST /api/personas/1/rostro
@router.post("/{persona_id}/rostro")
async def registrar_rostro(
    persona_id: int,
    imagen: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Genera y guarda el embedding facial de una persona."""

    persona = (
        db.query(Persona)
        .filter(Persona.id == persona_id)
        .first()
    )

    if not persona:
        raise HTTPException(
            status_code=404,
            detail="Persona no encontrada."
        )

    tipos_permitidos = [
        "image/jpeg",
        "image/png"
    ]

    if imagen.content_type not in tipos_permitidos:
        raise HTTPException(
            status_code=400,
            detail="Solo se permiten imágenes JPG o PNG."
        )

    image_bytes = await imagen.read()

    try:
        image = leer_imagen(image_bytes)

        embedding = generar_embedding(image)

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    nuevo_embedding = FaceEmbedding(
        persona_id=persona.id,
        embedding=embedding,
        modelo=MODEL_NAME
    )

    db.add(nuevo_embedding)
    db.commit()
    db.refresh(nuevo_embedding)

    return {
        "success": True,
        "persona_id": persona.id,
        "nombre": persona.nombre,
        "embedding_id": nuevo_embedding.id,
        "modelo": nuevo_embedding.modelo,
        "message": "Rostro registrado correctamente."
    }