from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.models.persona_model import FaceEmbedding, Persona
from app.models.recognition_model import RecognitionLog

from app.services.embedding_service import generar_embedding, similitud_coseno
from app.services.face_service import calcular_calidad_imagen, calcular_iluminacion, leer_imagen
from app.services.probability_service import predecir_probabilidad

router = APIRouter()


# Umbral provisional.
# Más adelante lo ajustaremos con pruebas y Machine Learning.
UMBRAL_SIMILITUD = 0.50


@router.post("")
async def reconocer_persona(
    imagen: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Compara un rostro con los registrados."""

    if imagen.content_type not in [
        "image/jpeg",
        "image/png"
    ]:
        raise HTTPException(
            status_code=400,
            detail="Solo se permiten imágenes JPG o PNG."
        )

    image_bytes = await imagen.read()

    try:
        image = leer_imagen(image_bytes)

        # Características de la fotografía para Machine Learning
        calidad_imagen = calcular_calidad_imagen(image)
        iluminacion = calcular_iluminacion(image)

        # Genera el embedding facial
        embedding_nuevo = generar_embedding(image)

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    embeddings_guardados = (
        db.query(FaceEmbedding)
        .join(
            Persona,
            Persona.id == FaceEmbedding.persona_id
        )
        .filter(
            Persona.activo.is_(True)
        )
        .all()
    )

    if not embeddings_guardados:
        raise HTTPException(
            status_code=400,
            detail="No existen rostros activos registrados."
        )

    mejor_embedding = None
    mejor_similitud = -1.0

    for registro in embeddings_guardados:
        similitud = similitud_coseno(
            embedding_nuevo,
            registro.embedding
        )

        if similitud > mejor_similitud:
            mejor_similitud = similitud
            mejor_embedding = registro

    distancia = 1 - mejor_similitud

    # Intenta calcular una probabilidad con el modelo ML entrenado.
    probabilidad_calibrada = None

    try:
        probabilidad_calibrada = predecir_probabilidad(
            mejor_similitud,
            calidad_imagen,
            iluminacion
        )
    except ValueError:
        # El reconocimiento puede funcionar aunque todavía
        # no exista un modelo de Machine Learning entrenado.
        probabilidad_calibrada = None

    coincide = (
        mejor_similitud >= UMBRAL_SIMILITUD
    )

    persona = None

    if coincide and mejor_embedding:
        persona = (
            db.query(Persona)
            .filter(
                Persona.id
                == mejor_embedding.persona_id,
                Persona.activo.is_(True)
            )
            .first()
        )

    log = RecognitionLog(
        persona_id=persona.id if persona else None,
        similitud=mejor_similitud,
        distancia=distancia,
        umbral=UMBRAL_SIMILITUD,
        coincide=bool(persona),
        probabilidad_calibrada=probabilidad_calibrada
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return {
        "success": True,
        "persona_id": persona.id if persona else None,
        "nombre": persona.nombre if persona else None,
        "similitud": round(mejor_similitud, 4),
        "distancia": round(distancia, 4),
        "calidad_imagen": round(calidad_imagen, 4),
        "iluminacion": round(iluminacion, 4),
        "umbral": UMBRAL_SIMILITUD,
        "coincide": bool(persona),
        "probabilidad_calibrada": (
            round(probabilidad_calibrada, 4)
            if probabilidad_calibrada is not None
            else None
        )
    }


@router.get("/historial")
def obtener_historial(
    db: Session = Depends(get_db)
):
    """Devuelve los intentos de reconocimiento."""

    registros = (
        db.query(RecognitionLog)
        .order_by(RecognitionLog.created_at.desc())
        .all()
    )

    historial = []

    for registro in registros:
        nombre = None

        if registro.persona_id:
            persona = (
                db.query(Persona)
                .filter(
                    Persona.id
                    == registro.persona_id
                )
                .first()
            )

            if persona:
                nombre = persona.nombre

        historial.append({
            "id": registro.id,
            "persona_id": registro.persona_id,
            "nombre": nombre,
            "similitud": registro.similitud,
            "distancia": registro.distancia,
            "umbral": registro.umbral,
            "coincide": registro.coincide,
            "probabilidad_calibrada":
                registro.probabilidad_calibrada,
            "created_at": registro.created_at
        })

    return historial