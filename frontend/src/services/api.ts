import axios from "axios";

// Usa import type porque estas interfaces existen solamente para TypeScript
import type {
    HistorialReconocimiento,
    NuevaPersona,
    Persona,
    RegistroRostro,
    ResultadoProbabilidad,
    ResultadoReconocimiento,
    SolicitudProbabilidad,
    SolicitudReconocimiento,
} from "../types/facial";

// Configuración principal de Axios, crea una instancia reutilizable, para no escribir "http://localhost:8000" en cada endpoint
const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Registra una nueva persona - POST /api/personas
// async: Indica que la función realizará una operación que puede tardar
// await: Espera a que esta operación termine antes de continuar
export async function registrarPersona(
    datos: NuevaPersona,
): Promise<Persona> {
    const respuesta = await api.post<Persona>(
        "/api/personas",
        datos,
    );

    return respuesta.data;
}

// Obtiene todas las personas registradas - GET /api/personas
// Promise<Persona[]>: Esta función no entrega los datos inmediatamente, pero cuando termine entregará un arreglo de Persona
export async function obtenerPersonas(): Promise<Persona[]> {
    const respuesta = await api.get<Persona[]>(
        "/api/personas",
    );

    return respuesta.data;
}

// Guarda la fotografía o representación facial de una persona - POST /api/personas/{id}/rostro
// Se guarda el embedding facial, si por ejemplo personaId = 12; --> /api/personas/${personaId}/rostro
export async function registrarRostro(
    personaId: number,
    datos: RegistroRostro,
): Promise<void> {
    await api.post(
        `/api/personas/${personaId}/rostro`,
        datos,
    );
}

// Envía una fotografía para realizar el reconocimiento facial - POST /api/reconocimiento
export async function reconocerRostro(
    datos: SolicitudReconocimiento,
): Promise<ResultadoReconocimiento> {
    const respuesta = await api.post<ResultadoReconocimiento>(
        "/api/reconocimiento",
        datos,
    );

    return respuesta.data;
}

// Obtiene el historial de reconocimientos - GET /api/reconocimiento/historial
export async function obtenerHistorial(): Promise<
    HistorialReconocimiento[]
> {
    const respuesta = await api.get<HistorialReconocimiento[]>(
        "/api/reconocimiento/historial",
    );

    return respuesta.data;
}

// Solicita al modelo ML una probabilidad calibrada - POST /api/probabilidades/prediccion
export async function calcularProbabilidad(
    datos: SolicitudProbabilidad,
): Promise<ResultadoProbabilidad> {
    const respuesta = await api.post<ResultadoProbabilidad>(
        "/api/probabilidades/prediccion",
        datos,
    );

    return respuesta.data;
}

// ENDPOINTS ML (Machine Learning)

// Solicita al backend iniciar el entrenamiento del modelo ML - POST /api/modelos/entrenar
export async function entrenarModelo(): Promise<void> {
    await api.post("/api/modelos/entrenar");
}

// Obtiene las métricas generadas por el modelo ML - GET /api/modelos/metricas
// Cuando construyamos realmente FastAPI decidiremos su respuesta y reemplazaremos unknown por una interfaz concreta
export async function obtenerMetricas(): Promise<unknown> {
    const respuesta = await api.get(
        "/api/modelos/metricas",
    );

    return respuesta.data;
}

export default api;