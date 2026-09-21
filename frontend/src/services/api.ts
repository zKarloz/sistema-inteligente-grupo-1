import axios from "axios";

import type {
    HistorialReconocimiento,
    NuevaPersona,
    Persona,
    ResultadoProbabilidad,
    ResultadoReconocimiento,
    ResultadoRegistroRostro,
} from "../types/facial";


const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


const api = axios.create({
    baseURL: API_URL,
});


// Convierte la imagen Data URL de React Webcam
// en un archivo que FastAPI pueda recibir.
async function convertirImagenABlob(
    imagen: string,
): Promise<Blob> {
    const respuesta = await fetch(imagen);

    return respuesta.blob();
}


// Registra los datos básicos de una persona.
export async function registrarPersona(
    datos: NuevaPersona,
): Promise<Persona> {
    const respuesta = await api.post<Persona>(
        "/api/personas",
        datos,
    );

    return respuesta.data;
}


// Obtiene las personas registradas.
export async function obtenerPersonas():
    Promise<Persona[]> {
    const respuesta = await api.get<Persona[]>(
        "/api/personas",
    );

    return respuesta.data;
}


// Registra el rostro de una persona.
export async function registrarRostro(
    personaId: number,
    imagen: string,
): Promise<ResultadoRegistroRostro> {
    const imagenBlob =
        await convertirImagenABlob(imagen);

    const formulario = new FormData();

    const extension =
        imagenBlob.type === "image/png"
            ? "png"
            : "jpg";

    formulario.append(
        "imagen",
        imagenBlob,
        `rostro.${extension}`,
    );

    const respuesta =
        await api.post<ResultadoRegistroRostro>(
            `/api/personas/${personaId}/rostro`,
            formulario,
        );

    return respuesta.data;
}


// Ejecuta el reconocimiento facial.
export async function reconocerRostro(
    imagen: string,
): Promise<ResultadoReconocimiento> {
    const imagenBlob =
        await convertirImagenABlob(imagen);

    const formulario = new FormData();

    const extension =
        imagenBlob.type === "image/png"
            ? "png"
            : "jpg";

    formulario.append(
        "imagen",
        imagenBlob,
        `rostro.${extension}`,
    );

    const respuesta =
        await api.post<ResultadoReconocimiento>(
            "/api/reconocimiento",
            formulario,
        );

    return respuesta.data;
}


// Obtiene el historial de reconocimientos.
export async function obtenerHistorial():
    Promise<HistorialReconocimiento[]> {
    const respuesta =
        await api.get<HistorialReconocimiento[]>(
            "/api/reconocimiento/historial",
        );

    return respuesta.data;
}


// Calcula una probabilidad calibrada.
export async function calcularProbabilidad(
    similitud: number,
    calidadImagen: number,
    iluminacion: number,
): Promise<ResultadoProbabilidad> {
    const respuesta =
        await api.post<ResultadoProbabilidad>(
            "/api/probabilidades/prediccion",
            {
                similitud,
                calidad_imagen: calidadImagen,
                iluminacion,
            },
        );

    return respuesta.data;
}


// Entrena el modelo de Machine Learning.
export async function entrenarModelo() {
    const respuesta = await api.post(
        "/api/modelos/entrenar",
    );

    return respuesta.data;
}


// Obtiene las métricas del modelo.
export async function obtenerMetricas() {
    const respuesta = await api.get(
        "/api/modelos/metricas",
    );

    return respuesta.data;
}