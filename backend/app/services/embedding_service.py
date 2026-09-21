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

        opts.intra_op_num_threads = 1
        opts.inter_op_num_threads = 1

        opts.execution_mode = (
            ort.ExecutionMode.ORT_SEQUENTIAL
        )

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