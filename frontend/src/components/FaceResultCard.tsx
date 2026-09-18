import {
    CheckCircle2,
    User,
    XCircle,
} from "lucide-react";

// Importa la interfaz ResultadoReconocimiento de facial.ts
import type { ResultadoReconocimiento } from "../types/facial";
import SimilarityBar from "./SimilarityBar";

// Datos que este componente recibirá
interface FaceResultCardProps {
    resultado: ResultadoReconocimiento;
}

function FaceResultCard({ resultado }: FaceResultCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            {/* Encabezado del resultado */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <User className="text-blue-600" />

                    <h3 className="text-xl font-semibold text-gray-800">
                        Resultado del reconocimiento
                    </h3>
                </div>

                {/* Estado de coincidencia */}
                {resultado.coincide ? (
                    <CheckCircle2 className="text-green-600" />
                ) : (
                    <XCircle className="text-red-600" />
                )}
            </div>

            {/* Persona identificada */}
            <div className="mt-6">
                <p className="text-sm text-gray-500">
                    Identidad candidata
                </p>

                {/* Si existe un nombre, úsalo. Si es null, muestra "Desconocido" */}
                <p className="mt-1 text-2xl font-bold text-gray-800">
                    {resultado.nombre ?? "Desconocido"}
                </p>
            </div>

            {/* Barra de similitud */}
            <SimilarityBar
                similitud={resultado.similitud}
                umbral={resultado.umbral}
            />

            {/* Información adicional */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Distancia */}
                <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                        Distancia
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                        {resultado.distancia.toFixed(2)}
                    </p>
                </div>

                {/* Umbral */}
                <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                        Umbral
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                        {resultado.umbral.toFixed(2)}
                    </p>
                </div>

                {/* Probabilidad calibrada */}
                <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                        Probabilidad calibrada
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                        {resultado.probabilidad_calibrada !== null
                            ? resultado.probabilidad_calibrada.toFixed(2)
                            : "No disponible"}
                    </p>
                </div>
            </div>

            {/* Resultado final */}
            <div
                className={`mt-6 rounded-lg p-4 ${resultado.coincide
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                    }`}
            >
                {/* SI coincide es true --> mostrar mensaje positivo */}
                {/* SI NO --> mostrar mensaje negativo */}
                {resultado.coincide
                    ? "El rostro supera el umbral establecido."
                    : "El rostro no supera el umbral establecido."}
            </div>
        </div>
    );
}

export default FaceResultCard;