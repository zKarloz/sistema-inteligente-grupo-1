from insightface.utils.storage import ensure_available


ROOT = "modelos_cache"

ensure_available(
    "models",
    "buffalo_sc",
    root=ROOT,
)

print(
    "Modelo buffalo_sc preparado correctamente."
)