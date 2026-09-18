import { useState } from "react";
import { ScanFace } from "lucide-react";

import CameraCapture from "../components/CameraCapture";
import FaceResultCard from "../components/FaceResultCard";

import type { ResultadoReconocimiento } from "../types/facial";

function Reconocimiento() {
    // Guarda la fotografía que se utilizará para el reconocimiento
    const [imagenFacial, setImagenFacial] = useState<string | null>(null);

    // Guarda el resultado del reconocimiento (datos de la interfaz ResultadoReconocimiento de facial.ts)
    const [resultado, setResultado] =
        useState<ResultadoReconocimiento | null>(null);

    // Simula temporalmente una respuesta del futuro backend
    function analizarRostro() {
        // No permitimos analizar si todavía no existe una fotografía
        if (!imagenFacial) {
            return;
        }

        // Resultado simulado basado en la estructura propuesta por el PDF
        const resultadoSimulado: ResultadoReconocimiento = {
            persona_id: 12,
            nombre: "Carlos",
            similitud: 0.87,
            distancia: 0.26,
            umbral: 0.75,
            coincide: true,
            probabilidad_calibrada: 0.93,
        };

        setResultado(resultadoSimulado);
    }

    // Recibe la fotografía capturada desde CameraCapture
    function manejarCaptura(imagen: string | null) {
        setImagenFacial(imagen);

        // Si se repite la fotografía, eliminamos el resultado anterior
        setResultado(null);
    }

    return (
        <section>
            {/* Encabezado de la página */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">
                    Reconocimiento
                </h2>

                <p className="mt-2 text-gray-500">
                    Captura un rostro y compáralo con los registros existentes.
                </p>
            </div>

            {/* Contenido principal */}
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* Cámara */}
                <div>
                    <CameraCapture onCapture={manejarCaptura} />

                    {/* Botón para iniciar el reconocimiento */}
                    {/* disabled: SI NO existe fotografía --> botón deshabilitado */}
                    <button
                        type="button"
                        onClick={analizarRostro}
                        disabled={!imagenFacial}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        <ScanFace size={20} />
                        Analizar rostro
                    </button>

                    {/* Aviso temporal */}
                    <p className="mt-3 text-center text-sm text-gray-500">
                        El reconocimiento mostrado actualmente utiliza datos simulados.
                    </p>
                </div>

                {/* Resultado */}
                <div>
                    {resultado ? (
                        <FaceResultCard resultado={resultado} />
                    ) : (
                        <div className="flex min-h-80 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-6">
                            <div className="text-center">
                                <ScanFace
                                    size={48}
                                    className="mx-auto text-gray-300"
                                />

                                <h3 className="mt-4 font-semibold text-gray-700">
                                    Sin resultado
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Captura una fotografía y presiona Analizar rostro.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Reconocimiento;