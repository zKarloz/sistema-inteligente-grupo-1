# Permite leer variables del sistema
import os

# Reune toda la configuración en un solo lugar
class Settings:
    """Configuración general del backend"""

    APP_NAME = os.getenv(
        "APP_NAME",
        "Sistema Inteligente de Reconocimiento Facial"
    )

    APP_VERSION = os.getenv(
        "APP_VERSION",
        "1.0.0"
    )

    DEBUG = os.getenv(
        "DEBUG",
        "False"
    ).lower() == "true"

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        ""
    )

settings = Settings()