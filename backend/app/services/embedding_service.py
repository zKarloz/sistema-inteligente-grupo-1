import numpy as np
import onnxruntime as ort

from insightface.app import FaceAnalysis


MODEL_NAME = "buffalo_l_lite"
MODEL_ROOT = "modelos_cache"

_face_app = None


def get_face_app():
    """Carga únicamente detección y reconocimiento."""

    global _face_app

    if _face_app is None:
        opts = ort.SessionOptions()

        # Reducimos el uso de hilos.
        opts.intra_op_num_threads = 1
        opts.inter_op_num_threads = 1

        # Ejecuta las operaciones de forma secuencial.
        opts.execution_mode = (
            ort.ExecutionMode.ORT_SEQUENTIAL
        )

        # Evita reservas adicionales de memoria.
        opts.enable_cpu_mem_arena = False
        opts.enable_mem_pattern = False

        _face_app = FaceAnalysis(
            name=MODEL_NAME,
            root=MODEL_ROOT,
            providers=[
                "CPUExecutionProvider",
            ],
            allowed_modules=[
                "detection",
                "recognition",
            ],
            sess_options=opts,
        )

        _face_app.prepare(
            ctx_id=-1,
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

    # Normalizamos el embedding.
    norma = np.linalg.norm(embedding)

    if norma == 0:
        raise ValueError(
            "El embedding facial no es válido."
        )

    embedding_normalizado = (
        embedding / norma
    ).astype(np.float32)

    return embedding_normalizado.tolist()


def similitud_coseno(
    embedding_a,
    embedding_b,
):
    """Calcula la similitud coseno entre dos embeddings."""

    a = np.asarray(
        embedding_a,
        dtype=np.float32,
    )

    b = np.asarray(
        embedding_b,
        dtype=np.float32,
    )

    denominador = (
        np.linalg.norm(a)
        * np.linalg.norm(b)
    )

    if denominador == 0:
        return 0.0

    return float(
        np.dot(a, b) / denominador
    )