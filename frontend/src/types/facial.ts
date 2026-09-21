// RESPONSE: Datos básicos de una persona registrada
export interface Persona {
    id: number;
    nombre: string;
    email: string;
    activo: boolean;
    created_at: string;
}


// REQUEST: Datos que el frontend enviará para registrar una persona
export interface NuevaPersona {
    nombre: string;
    email: string;
}


// Datos que el frontend utiliza para registrar un rostro
export interface RegistroRostro {
    imagen: string;
}


// Respuesta después de registrar el rostro de una persona
export interface ResultadoRegistroRostro {
    success: boolean;
    persona_id: number;
    nombre: string;
    embedding_id: number;
    modelo: string;
    message: string;
}


// Resultado devuelto por el reconocimiento facial
export interface ResultadoReconocimiento {
    success: boolean;
    persona_id: number | null;
    nombre: string | null;
    similitud: number;
    distancia: number;
    calidad_imagen: number;
    iluminacion: number;
    umbral: number;
    coincide: boolean;
    probabilidad_calibrada: number | null;
}


// Representa un registro guardado en el historial
export interface HistorialReconocimiento {
    id: number;
    persona_id: number | null;
    nombre: string | null;
    similitud: number;
    distancia: number;
    umbral: number;
    coincide: boolean;
    probabilidad_calibrada: number | null;
    created_at: string;
}


// Datos enviados para realizar un reconocimiento
export interface SolicitudReconocimiento {
    imagen: string;
}


// Datos para calcular una probabilidad
export interface SolicitudProbabilidad {
    similitud: number;
    calidad_imagen: number;
    iluminacion: number;
}


// Respuesta esperada del cálculo de probabilidad
export interface ResultadoProbabilidad {
    success: boolean;
    probabilidad_calibrada: number;
}