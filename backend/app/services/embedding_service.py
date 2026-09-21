import numpy as np
import onnxruntime as ort

from insightface.app import FaceAnalysis


MODEL_NAME = "buffalo_l"

_face_app = None


def get_face_app():
    """Carga el modelo facial una sola vez."""

    global _face_app

    if _face_app is None:
        session_options = ort.SessionOptions()

        # Un solo hilo para reducir consumo.
        session_options.intra_op_num_threads = 1
        session_options.inter_op_num_threads = 1

        # Ejecución secuencial.
        session_options.execution_mode = (
            ort.ExecutionMode.ORT_SEQUENTIAL
        )

        # Evita que ONNX reserve memoria adicional.
        session_options.enable_cpu_mem_arena = False
        session_options.enable_mem_pattern = False

        _face_app = FaceAnalysis(
            name=MODEL_NAME,
            providers=["CPUExecutionProvider"],
            allowed_modules=[
                "detection",
                "recognition",
            ],
            sess_options=session_options,
        )

        _face_app.prepare(
            ctx_id=0,
            det_size=(320, 320),
        )

    return _face_app


def generar_embedding(image):
    """Detecta un rostro y genera su embedding facial."""

    face_app = get_face_app()

    rostros = face_app.get(image)

    if len(rostros) == 0:
        raise ValueError(
            "No se detectó ningún rostro."
        )

    if len(rostros) > 1:
        raise ValueError(
            "La imagen debe contener un solo rostro."
        )

    embedding = rostros[0].embedding

    if embedding is None:
        raise ValueError(
            "No se pudo generar el embedding facial."
        )

    # Normalizamos el vector para facilitar
    # las comparaciones posteriores.
    norma = np.linalg.norm(embedding)

    if norma == 0:
        raise ValueError(
            "El embedding facial no es válido."
        )

    embedding_normalizado = embedding / norma

    return embedding_normalizado.tolist()

def similitud_coseno(embedding_a, embedding_b):
    """Calcula la similitud coseno entre dos embeddings."""

    a = np.array(embedding_a)
    b = np.array(embedding_b)

    denominador = (
        np.linalg.norm(a)
        * np.linalg.norm(b)
    )

    if denominador == 0:
        return 0.0

    return float(
        np.dot(a, b) / denominador
    )