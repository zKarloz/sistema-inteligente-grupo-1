// RESPONSE: Datos básicos de una persona registrada
export interface Persona {
    id: number;
    nombre: string;
    email: string;
    activo: boolean;
}

// REQUEST: Datos que el frontend enviará para registrar una persona
export interface NuevaPersona {
    nombre: string;
    email: string;
}

// Datos que el frontend enviará para guardar un rostro
export interface RegistroRostro {
    imagen: string;
}

// Resultado devuelto por el reconocimiento facial
export interface ResultadoReconocimiento {
    persona_id: number | null;
    nombre: string | null;
    similitud: number;
    distancia: number;
    umbral: number;
    coincide: boolean;
    probabilidad_calibrada: number | null;
}

// Representa un registro guardado en el historial de reconocimientos
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

// Datos que enviará el frontend para calcular una probabilidad
export interface SolicitudProbabilidad {
    similitud: number;
    distancia: number;
    calidad_imagen: number;
    iluminacion: number;
}

// Respuesta esperada del cálculo de probabilidad
export interface ResultadoProbabilidad {
    probabilidad_calibrada: number;
}