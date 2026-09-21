from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.models.recognition_model import MLTrainingRecord
from app.schemas.recognition_schema import ProbabilityRequest, TrainingRecordCreate
from app.services.probability_service import entrenar_modelo, obtener_metricas, predecir_probabilidad


router = APIRouter()


@router.post("/modelos/datos")
def registrar_dato_entrenamiento(
    datos: TrainingRecordCreate,
    db: Session = Depends(get_db)
):
    """Guarda un resultado real para entrenar ML."""

    registro = MLTrainingRecord(
        similitud=datos.similitud,
        calidad_imagen=datos.calidad_imagen,
        iluminacion=datos.iluminacion,
        resultado_real=datos.resultado_real
    )

    db.add(registro)
    db.commit()
    db.refresh(registro)

    return {
        "success": True,
        "id": registro.id,
        "message": "Dato de entrenamiento registrado."
    }


@router.post("/modelos/entrenar")
def entrenar(
    db: Session = Depends(get_db)
):
    """Entrena el modelo con los datos almacenados."""

    registros = (
        db.query(MLTrainingRecord)
        .all()
    )

    try:
        metricas = entrenar_modelo(
            registros
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    return {
        "success": True,
        "metricas": metricas
    }


@router.get("/modelos/metricas")
def metricas():
    """Devuelve las métricas del modelo entrenado."""

    try:
        resultado = obtener_metricas()

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    return resultado


@router.post("/probabilidades/prediccion")
def prediccion(
    datos: ProbabilityRequest
):
    """Calcula una probabilidad calibrada."""

    try:
        probabilidad = predecir_probabilidad(
            datos.similitud,
            datos.calidad_imagen,
            datos.iluminacion
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    return {
        "success": True,
        "probabilidad_calibrada":
            round(probabilidad, 4)
    }