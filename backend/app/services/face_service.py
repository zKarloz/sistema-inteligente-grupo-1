import cv2
import numpy as np


MAX_BYTES = 5 * 1024 * 1024

_haar = None


def leer_imagen(image_bytes: bytes):
    """Convierte los bytes recibidos en una imagen OpenCV."""

    if len(image_bytes) > MAX_BYTES:
        raise ValueError(
            "La imagen es demasiado pesada (máximo 5 MB)."
        )

    image_array = np.frombuffer(
        image_bytes,
        dtype=np.uint8,
    )

    image = cv2.imdecode(
        image_array,
        cv2.IMREAD_COLOR,
    )

    if image is None:
        raise ValueError(
            "No se pudo leer la imagen."
        )

    return image


def _get_haar():
    """Carga el detector Haar una sola vez."""

    global _haar

    if _haar is None:
        _haar = cv2.CascadeClassifier(
            cv2.data.haarcascades
            + "haarcascade_frontalface_default.xml"
        )

    return _haar


def detectar_rostros(image):
    """Realiza una detección facial básica con OpenCV."""

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY,
    )

    return _get_haar().detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(80, 80),
    )


def calcular_calidad_imagen(image):
    """Calcula una estimación simple de nitidez."""

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY,
    )

    varianza = cv2.Laplacian(
        gray,
        cv2.CV_32F,
    ).var()

    return float(
        min(varianza / 1000.0, 1.0)
    )


def calcular_iluminacion(image):
    """Devuelve iluminación normalizada entre 0 y 1."""

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY,
    )

    return float(
        np.mean(gray) / 255.0
    )