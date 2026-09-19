import { useState } from "react";
import {
    Info,
    ScanFace,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import CameraCapture from "../components/CameraCapture";
import FaceResultCard from "../components/FaceResultCard";

import type { ResultadoReconocimiento } from "../types/facial";

function Reconocimiento() {
    // Guarda la fotografía que se utilizará para el análisis
    const [imagenFacial, setImagenFacial] =
        useState<string | null>(null);

    // Guarda el resultado del reconocimiento
    const [resultado, setResultado] =
        useState<ResultadoReconocimiento | null>(null);

    // Actualiza la imagen y elimina resultados anteriores
    function manejarCaptura(imagen: string | null) {
        setImagenFacial(imagen);
        setResultado(null);
    }

    // Simula temporalmente la respuesta futura del backend
    function analizarRostro() {
        if (!imagenFacial) {
            return;
        }

        const resultadoSimulado: ResultadoReconocimiento = {
            persona_id: 12,
            nombre: "Carlos Pérez",
            similitud: 0.87,
            distancia: 0.26,
            umbral: 0.75,
            coincide: true,
            probabilidad_calibrada: 0.93,
        };

        setResultado(resultadoSimulado);
    }

    return (
        <div className="mx-auto w-full max-w-[1500px]">

            {/* Aviso de demostración */}
            <section className="mb-5 flex gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4">
                <Info
                    size={20}
                    className="mt-0.5 shrink-0 text-brand"
                />

                <div>
                    <p className="text-sm font-semibold text-ink">
                        Reconocimiento en modo demostración
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted">
                        La captura de imagen es real, pero los valores de
                        identidad, similitud y probabilidad todavía son
                        simulados hasta conectar FastAPI y el modelo facial.
                    </p>
                </div>
            </section>

            {/* Cámara y resultado */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {/* Panel de captura */}
                <article className="rounded-xl border border-line bg-white p-5 sm:p-6">
                    {/* Paso 01 */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand">
                            01
                        </div>

                        <div>
                            <h2 className="font-display text-lg font-semibold text-ink">
                                Captura facial
                            </h2>

                            <p className="mt-1 text-xs text-muted">
                                Prepara la imagen que será analizada.
                            </p>
                        </div>
                    </div>

                    {/* Cámara reutilizable */}
                    <CameraCapture
                        onCapture={manejarCaptura}
                    />

                    {/* Acción de reconocimiento */}
                    <button
                        type="button"
                        disabled={!imagenFacial}
                        onClick={analizarRostro}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ScanFace size={18} />

                        Analizar rostro
                    </button>

                    {/* Explicación */}
                    <div className="mt-5 flex gap-3 border-t border-line pt-5">
                        <ShieldCheck
                            size={19}
                            className="mt-0.5 shrink-0 text-brand"
                        />

                        <p className="text-xs leading-5 text-muted">
                            La imagen deberá convertirse posteriormente en
                            un <strong className="font-semibold text-ink">
                                embedding facial
                            </strong>{" "}
                            para poder compararse con los rostros registrados.
                        </p>
                    </div>
                </article>

                {/* Panel de resultado */}
                <article className="flex min-h-[500px] flex-col rounded-xl border border-line bg-white p-5 sm:p-6">
                    {/* Paso 02 */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand">
                            02
                        </div>

                        <div>
                            <h2 className="font-display text-lg font-semibold text-ink">
                                Resultado
                            </h2>

                            <p className="mt-1 text-xs text-muted">
                                Interpretación de la comparación facial.
                            </p>
                        </div>
                    </div>

                    {/* Resultado disponible */}
                    {resultado ? (
                        <FaceResultCard
                            resultado={resultado}
                        />
                    ) : (
                        /* Estado vacío */
                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand">
                                <Sparkles size={28} />
                            </div>

                            <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                                Esperando análisis
                            </h3>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                                Captura o selecciona una fotografía y
                                presiona “Analizar rostro” para visualizar
                                el resultado.
                            </p>
                        </div>
                    )}
                </article>
            </section>
        </div>
    );
}

export default Reconocimiento;