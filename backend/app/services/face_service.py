import cv2
import numpy as np


def leer_imagen(image_bytes: bytes):
    """Convierte los bytes recibidos en una imagen de OpenCV."""

    image_array = np.frombuffer(
        image_bytes,
        dtype=np.uint8
    )

    image = cv2.imdecode(
        image_array,
        cv2.IMREAD_COLOR
    )

    if image is None:
        raise ValueError(
            "No se pudo leer la imagen."
        )

    return image


def detectar_rostros(image):
    """Detecta rostros de forma básica utilizando OpenCV."""

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    detector = cv2.CascadeClassifier(
        cv2.data.haarcascades
        + "haarcascade_frontalface_default.xml"
    )

    rostros = detector.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(80, 80)
    )

    return rostros


def calcular_calidad_imagen(image):
    """
    Estima la nitidez de la imagen.

    Utiliza la varianza del Laplaciano:
    una imagen borrosa suele producir un valor bajo.
    """

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    varianza = cv2.Laplacian(
        gray,
        cv2.CV_64F
    ).var()

    # Normalizamos aproximadamente entre 0 y 1.
    calidad = min(
        varianza / 1000.0,
        1.0
    )

    return float(calidad)


def calcular_iluminacion(image):
    """
    Estima la iluminación promedio de la imagen.

    0 = imagen muy oscura
    1 = imagen muy clara
    """

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    promedio = np.mean(gray)

    iluminacion = promedio / 255.0

    return float(iluminacion)