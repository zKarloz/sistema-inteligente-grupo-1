import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BrainCircuit, Gauge, Info, Ruler, ScanFace, Target } from "lucide-react";

import LoadingState from "../components/LoadingState";
import ProbabilityChart from "../components/ProbabilityChart";
import SimilarityBar from "../components/SimilarityBar";
import { obtenerHistorial } from "../services/api";
import type { HistorialReconocimiento } from "../types/facial";

function Probabilidades() {
    // Permite navegar hacia el módulo de reconocimiento
    const navigate = useNavigate();

    // Último reconocimiento con probabilidad calculada
    const [ultimoAnalisis, setUltimoAnalisis] = useState<HistorialReconocimiento | null>(null);

    // Estado de carga
    const [cargando, setCargando] = useState(true);

    // Mensaje de error
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarAnalisis() {
            try {
                setCargando(true);
                setError("");

                const historial =
                    await obtenerHistorial();

                const ultimoConProbabilidad =
                    historial.find(
                        (registro) =>
                            registro.probabilidad_calibrada !==
                            null,
                    );

                setUltimoAnalisis(
                    ultimoConProbabilidad ?? null,
                );
            } catch (error) {
                console.error(
                    "Error al cargar el análisis:",
                    error,
                );

                setError(
                    "No se pudo cargar el último análisis.",
                );
            } finally {
                setCargando(false);
            }
        }

        void cargarAnalisis();
    }, []);

    const similitud = ultimoAnalisis?.similitud ?? 0;

    const distancia = ultimoAnalisis?.distancia ?? 0;

    const umbral = ultimoAnalisis?.umbral ?? 0;

    const probabilidadCalibrada = ultimoAnalisis?.probabilidad_calibrada ?? 0;

    const coincide = ultimoAnalisis?.coincide ?? false;

    const nombreReconocido =
        coincide && ultimoAnalisis?.nombre
            ? ultimoAnalisis.nombre
            : "Desconocido";

    // Métricas que se mostrarán en las tarjetas
    const metricas = [
        {
            titulo: "Similitud",
            valor: similitud.toFixed(2),
            descripcion: "Comparación entre rostros",
            icono: Gauge,
        },
        {
            titulo: "Distancia",
            valor: distancia.toFixed(2),
            descripcion: "Separación entre embeddings",
            icono: Ruler,
        },
        {
            titulo: "Umbral",
            valor: umbral.toFixed(2),
            descripcion: "Límite de aceptación",
            icono: Target,
        },
        {
            titulo: "Probabilidad",
            valor: `${(
                probabilidadCalibrada * 100
            ).toFixed(1)}%`,
            descripcion: "Probabilidad calibrada",
            icono: BrainCircuit,
        },
    ];

    return (
        <div className="mx-auto w-full max-w-[1500px]">

            {/* Aviso informativo */}
            <section className="mb-5 flex flex-col gap-4 rounded-xl border border-brand-100 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                    <Info
                        size={20}
                        className="mt-0.5 shrink-0 text-brand"
                    />

                    <div>
                        <p className="text-sm font-semibold text-ink">
                            Análisis de probabilidad
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted">
                            Los valores mostrados corresponden
                            al último reconocimiento procesado
                            por el modelo facial y Machine Learning.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/reconocimiento")
                    }
                    className="flex shrink-0 items-center gap-2 self-start rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 sm:self-auto"
                >
                    <ScanFace size={17} />

                    Ir a reconocimiento

                    <ArrowRight size={16} />
                </button>
            </section>

            {cargando && (
                <div className="my-5">
                    <LoadingState mensaje="Cargando último análisis..." />
                </div>
            )}

            {error && (
                <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">
                    {error}
                </div>
            )}

            {!cargando &&
                !error &&
                !ultimoAnalisis && (
                    <div className="mb-5 rounded-xl border border-line bg-white p-5 text-sm text-muted">
                        Todavía no existen reconocimientos con
                        probabilidad calibrada. Realiza un
                        reconocimiento para generar un análisis.
                    </div>
                )}

            {!cargando &&
                !error &&
                ultimoAnalisis && (
                    <>
                        {/* Persona del último reconocimiento */}
                        <section
                            className={`mb-4 flex items-center gap-4 rounded-xl border p-4 sm:p-5 ${coincide
                                ? "border-brand-100 bg-brand-50"
                                : "border-red-100 bg-red-50"
                                }`}
                        >
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${coincide
                                    ? "bg-brand-100 text-brand"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                <ScanFace size={21} />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                                    Último reconocimiento
                                </p>

                                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                                    {nombreReconocido}
                                </h2>

                                <p className="mt-1 text-xs text-muted">
                                    {coincide
                                        ? "Persona reconocida por el sistema."
                                        : "Sin coincidencia con una persona registrada."}
                                </p>
                            </div>
                        </section>

                        {/* Tarjetas principales */}
                        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {metricas.map((metrica) => {
                                const Icono = metrica.icono;

                                return (
                                    <article
                                        key={metrica.titulo}
                                        className="rounded-xl border border-line bg-white p-5"
                                    >
                                        {/* Nombre e icono */}
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm text-muted">
                                                {metrica.titulo}
                                            </span>

                                            <Icono
                                                size={19}
                                                className="text-brand"
                                            />
                                        </div>

                                        {/* Valor */}
                                        <strong className="mt-4 block font-display text-3xl font-semibold text-ink">
                                            {metrica.valor}
                                        </strong>

                                        {/* Descripción */}
                                        <span className="mt-2 block text-xs text-muted">
                                            {metrica.descripcion}
                                        </span>
                                    </article>
                                );
                            })}
                        </section>

                        {/* Similitud e interpretación */}
                        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
                            {/* Barra de similitud */}
                            <article className="rounded-xl border border-line bg-white p-5 sm:p-6">
                                <span className="text-xs font-semibold tracking-wider text-muted">
                                    ANÁLISIS DE SIMILITUD
                                </span>

                                <h2 className="mt-2 font-display text-lg font-semibold text-ink">
                                    Comparación facial
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-muted">
                                    La similitud obtenida se compara con el
                                    umbral configurado para decidir si existe
                                    una coincidencia.
                                </p>

                                {/* Barra visual */}
                                <div className="mt-7">
                                    <SimilarityBar
                                        similitud={similitud}
                                        umbral={umbral}
                                    />
                                </div>
                            </article>

                            {/* Resultado de la decisión */}
                            <article
                                className={`flex flex-col rounded-xl border p-5 sm:p-6 ${coincide
                                    ? "border-brand-100 bg-brand-50"
                                    : "border-red-100 bg-red-50"
                                    }`}
                            >
                                <span className="text-xs font-semibold tracking-wider text-muted">
                                    DECISIÓN DEL SISTEMA
                                </span>

                                <div className="mt-5">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-full ${coincide
                                            ? "bg-brand-100 text-brand"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        <ScanFace size={23} />
                                    </div>

                                    <h2 className="mt-4 font-display text-xl font-semibold text-ink">
                                        {coincide
                                            ? "Coincidencia aceptada"
                                            : "Coincidencia rechazada"}
                                    </h2>

                                    <p className="mt-3 text-sm leading-6 text-muted">
                                        {coincide
                                            ? `La similitud de ${similitud.toFixed(
                                                2,
                                            )} supera el umbral de ${umbral.toFixed(
                                                2,
                                            )}.`
                                            : `La similitud de ${similitud.toFixed(
                                                2,
                                            )} no alcanza el umbral de ${umbral.toFixed(
                                                2,
                                            )}.`}
                                    </p>
                                </div>

                                {/* Regla utilizada */}
                                <div className="mt-auto pt-6">
                                    <div className="border-t border-brand-200 pt-5">
                                        <p className="text-xs leading-5 text-muted">
                                            Regla actual:
                                            <strong className="ml-1 font-semibold text-ink">
                                                similitud ≥ umbral
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </section>

                        {/* Gráfico principal */}
                        <section className="mt-5 overflow-hidden rounded-xl border border-line bg-white">
                            {/* Encabezado */}
                            <div className="border-b border-line px-5 py-5 sm:px-6">
                                <span className="text-xs font-semibold tracking-wider text-muted">
                                    VISUALIZACIÓN
                                </span>

                                <h2 className="mt-2 font-display text-lg font-semibold text-ink">
                                    Comparación de indicadores
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-muted">
                                    Los valores se muestran en una escala porcentual
                                    para facilitar su comparación visual.
                                </p>
                            </div>

                            {/* Gráfico */}
                            <div className="p-5 sm:p-6">
                                <ProbabilityChart
                                    similitud={similitud}
                                    umbral={umbral}
                                    probabilidad={
                                        probabilidadCalibrada
                                    }
                                />
                            </div>
                        </section>

                        {/* Explicación conceptual */}
                        <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {/* Similitud */}
                            <article className="rounded-xl border border-line bg-white p-5">
                                <span className="text-xs font-semibold tracking-wider text-brand">
                                    01 · SIMILITUD
                                </span>

                                <h3 className="mt-3 font-display text-base font-semibold text-ink">
                                    ¿Qué tan parecidos son?
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted">
                                    Representa la cercanía entre las características
                                    faciales de dos imágenes.
                                </p>
                            </article>

                            {/* Umbral */}
                            <article className="rounded-xl border border-line bg-white p-5">
                                <span className="text-xs font-semibold tracking-wider text-brand">
                                    02 · UMBRAL
                                </span>

                                <h3 className="mt-3 font-display text-base font-semibold text-ink">
                                    ¿Cuándo aceptamos?
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted">
                                    Es el valor mínimo que debe alcanzar la similitud
                                    para considerar que existe una coincidencia.
                                </p>
                            </article>

                            {/* Probabilidad */}
                            <article className="rounded-xl border border-line bg-white p-5">
                                <span className="text-xs font-semibold tracking-wider text-brand">
                                    03 · PROBABILIDAD
                                </span>

                                <h3 className="mt-3 font-display text-base font-semibold text-ink">
                                    ¿Qué tan confiable es?
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted">
                                    Es una estimación generada por el modelo
                                    de Machine Learning a partir de los datos
                                    obtenidos durante el reconocimiento.
                                </p>
                            </article>
                        </section>
                    </>
                )}
        </div>
    );
}

export default Probabilidades;