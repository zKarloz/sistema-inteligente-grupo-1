from pathlib import Path

import joblib
import numpy as np

from sklearn.calibration import CalibratedClassifierCV
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score
)
from sklearn.model_selection import train_test_split


BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = (
    BASE_DIR
    / "models"
    / "modelo_probabilidad.joblib"
)


def entrenar_modelo(registros):
    """Entrena y calibra el modelo de probabilidades."""

    if len(registros) < 12:
        raise ValueError(
            "Se necesitan al menos 12 registros de entrenamiento."
        )

    X = np.array([
        [
            registro.similitud,
            registro.calidad_imagen,
            registro.iluminacion
        ]
        for registro in registros
    ])

    y = np.array([
        int(registro.resultado_real)
        for registro in registros
    ])

    clases, cantidades = np.unique(
        y,
        return_counts=True
    )

    if len(clases) < 2:
        raise ValueError(
            "Se necesitan ejemplos positivos y negativos."
        )

    if cantidades.min() < 4:
        raise ValueError(
            "Se necesitan al menos 4 ejemplos de cada resultado."
        )

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.25,
        random_state=42,
        stratify=y
    )

    modelo_base = LogisticRegression(
        max_iter=1000
    )

    modelo = CalibratedClassifierCV(
        estimator=modelo_base,
        method="sigmoid",
        cv=2
    )

    modelo.fit(
        X_train,
        y_train
    )

    predicciones = modelo.predict(
        X_test
    )

    matriz = confusion_matrix(
        y_test,
        predicciones,
        labels=[0, 1]
    )

    tn, fp, fn, tp = matriz.ravel()

    tasa_falsos_positivos = (
        fp / (fp + tn)
        if (fp + tn) > 0
        else 0
    )

    tasa_falsos_negativos = (
        fn / (fn + tp)
        if (fn + tp) > 0
        else 0
    )

    metricas = {
        "accuracy": float(
            accuracy_score(
                y_test,
                predicciones
            )
        ),
        "precision": float(
            precision_score(
                y_test,
                predicciones,
                zero_division=0
            )
        ),
        "recall": float(
            recall_score(
                y_test,
                predicciones,
                zero_division=0
            )
        ),
        "f1": float(
            f1_score(
                y_test,
                predicciones,
                zero_division=0
            )
        ),
        "matriz_confusion": matriz.tolist(),
        "tasa_falsos_positivos":
            float(tasa_falsos_positivos),
        "tasa_falsos_negativos":
            float(tasa_falsos_negativos),
        "registros_utilizados":
            len(registros)
    }

    MODEL_PATH.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    joblib.dump(
        {
            "modelo": modelo,
            "metricas": metricas
        },
        MODEL_PATH
    )

    return metricas


def predecir_probabilidad(
    similitud,
    calidad_imagen,
    iluminacion
):
    """Calcula la probabilidad calibrada de coincidencia."""

    if not MODEL_PATH.exists():
        raise ValueError(
            "El modelo todavía no ha sido entrenado."
        )

    paquete = joblib.load(
        MODEL_PATH
    )

    modelo = paquete["modelo"]

    datos = np.array([[
        similitud,
        calidad_imagen,
        iluminacion
    ]])

    probabilidad = modelo.predict_proba(
        datos
    )[0][1]

    return float(probabilidad)


def obtener_metricas():
    """Obtiene las métricas del último entrenamiento."""

    if not MODEL_PATH.exists():
        raise ValueError(
            "El modelo todavía no ha sido entrenado."
        )

    paquete = joblib.load(
        MODEL_PATH
    )

    return paquete["metricas"]