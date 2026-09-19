import {
    BarChart3,
    History,
    LayoutDashboard,
    ScanFace,
    UserPlus,
} from "lucide-react";

// Configuración principal de navegación
export const navegacion = [
    {
        id: "dashboard",
        nombre: "Dashboard",
        descripcion: "Resumen general del sistema",
        ruta: "/",
        icono: LayoutDashboard,
    },
    {
        id: "registro",
        nombre: "Registro facial",
        descripcion: "Registro de personas y captura facial",
        ruta: "/registro",
        icono: UserPlus,
    },
    {
        id: "reconocimiento",
        nombre: "Reconocimiento",
        descripcion: "Comparación e identificación facial",
        ruta: "/reconocimiento",
        icono: ScanFace,
    },
    {
        id: "probabilidades",
        nombre: "Probabilidades",
        descripcion: "Similitud, umbral y análisis probabilístico",
        ruta: "/probabilidades",
        icono: BarChart3,
    },
    {
        id: "historial",
        nombre: "Historial",
        descripcion: "Intentos y resultados de reconocimiento",
        ruta: "/historial",
        icono: History,
    },
] as const;

// Tipo generado automáticamente desde los IDs anteriores
export type Pagina =
    (typeof navegacion)[number]["id"];