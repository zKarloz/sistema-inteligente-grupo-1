import os
import shutil

from insightface.utils.storage import ensure_available


ROOT = "modelos_cache"

origen = ensure_available(
    "models",
    "buffalo_l",
    root=ROOT,
)

destino = os.path.join(
    ROOT,
    "models",
    "buffalo_l_lite",
)

os.makedirs(
    destino,
    exist_ok=True,
)

archivos_necesarios = (
    "det_10g.onnx",
    "w600k_r50.onnx",
)

for archivo in archivos_necesarios:
    origen_archivo = os.path.join(
        origen,
        archivo,
    )

    destino_archivo = os.path.join(
        destino,
        archivo,
    )

    shutil.copy2(
        origen_archivo,
        destino_archivo,
    )

print(
    "Modelo buffalo_l_lite preparado correctamente."
)