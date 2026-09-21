import { useState } from "react";
import { Info, LoaderCircle, ScanFace, ShieldCheck, Sparkles } from "lucide-react";

import CameraCapture from "../components/CameraCapture";
import FaceResultCard from "../components/FaceResultCard";

import type { ResultadoReconocimiento } from "../types/facial";
import { reconocerRostro } from "../services/api";

function Reconocimiento() {
    // Guarda la fotografía que se utilizará para el análisis
    const [imagenFacial, setImagenFacial] =
        useState<string | null>(null);

    // Guarda el resultado del reconocimiento
    const [resultado, setResultado] =
        useState<ResultadoReconocimiento | null>(null);

    const [analizando, setAnalizando] = useState(false);

    const [mensaje, setMensaje] = useState("");

    // Actualiza la imagen y elimina resultados anteriores
    function manejarCaptura(imagen: string | null) {
        setImagenFacial(imagen);
        setResultado(null);
    }

    async function analizarRostro() {
        if (!imagenFacial) {
            setMensaje(
                "Captura o selecciona una imagen antes de analizar.",
            );
            return;
        }

        try {
            setAnalizando(true);
            setMensaje("Analizando rostro...");
            setResultado(null);

            const respuesta =
                await reconocerRostro(imagenFacial);

            setResultado(respuesta);
            setMensaje("");
        } catch (error) {
            console.error(
                "Error durante el reconocimiento:",
                error,
            );

            setMensaje(
                "No se pudo completar el reconocimiento facial.",
            );
        } finally {
            setAnalizando(false);
        }
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
                        Reconocimiento facial activo
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted">
                        La imagen será procesada por el backend para
                        generar un embedding facial, comparar los
                        rostros registrados y calcular una probabilidad
                        calibrada.
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
                        disabled={!imagenFacial || analizando}
                        onClick={analizarRostro}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {analizando ? (
                            <LoaderCircle
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <ScanFace size={18} />
                        )}

                        {analizando
                            ? "Analizando rostro..."
                            : "Analizar rostro"}
                    </button>
                    {mensaje && (
                        <p className="mt-4 rounded-lg border border-line bg-surface px-4 py-3 text-xs text-muted">
                            {mensaje}
                        </p>
                    )}


                    {/* Explicación */}
                    <div className="mt-5 flex gap-3 border-t border-line pt-5">
                        <ShieldCheck
                            size={19}
                            className="mt-0.5 shrink-0 text-brand"
                        />

                        <p className="text-xs leading-5 text-muted">
                            La imagen se convierte en un{" "}
                            <strong className="font-semibold text-ink">
                                embedding facial
                            </strong>{" "}
                            y se compara con los rostros registrados en el sistema.
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
                    ) : analizando ? (
                        /* Estado mientras FastAPI analiza el rostro */
                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-brand-100 bg-brand-50 px-6 py-12 text-center">
                            {/* Animación principal */}
                            <div className="relative flex h-20 w-20 items-center justify-center">
                                {/* Círculo exterior pulsante */}
                                <div className="absolute h-20 w-20 animate-ping rounded-full bg-brand-100 opacity-40" />

                                {/* Círculo principal */}
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand">
                                    <LoaderCircle
                                        size={30}
                                        className="animate-spin"
                                    />
                                </div>
                            </div>

                            <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                                Analizando rostro
                            </h3>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                                Procesando la imagen y comparando
                                las características faciales con
                                los registros disponibles.
                            </p>

                            {/* Indicador inferior */}
                            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-brand">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />

                                Procesando reconocimiento...
                            </div>
                        </div>
                    ) : (
                        /* Estado inicial */
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