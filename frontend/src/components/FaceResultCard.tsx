import { CheckCircle2, ShieldCheck, User, XCircle } from "lucide-react";

import SimilarityBar from "./SimilarityBar";

import type { ResultadoReconocimiento } from "../types/facial";

// Datos necesarios para mostrar un resultado facial
interface FaceResultCardProps {
    resultado: ResultadoReconocimiento;
}

function FaceResultCard({
    resultado,
}: FaceResultCardProps) {
    return (
        <div className="flex flex-1 flex-col">
            {/* Resultado principal */}
            <div
                className={`rounded-xl border p-5 ${resultado.coincide
                    ? "border-brand-100 bg-brand-50"
                    : "border-red-100 bg-red-50"
                    }`}
            >
                <div className="flex items-start gap-4">
                    {/* Icono del resultado */}
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${resultado.coincide
                            ? "bg-brand-100 text-brand"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {resultado.coincide ? (
                            <CheckCircle2 size={24} />
                        ) : (
                            <XCircle size={24} />
                        )}
                    </div>

                    <div>
                        <span className="text-xs font-semibold tracking-wider text-muted">
                            RESULTADO DEL ANÁLISIS
                        </span>

                        <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                            {resultado.coincide
                                ? "Coincidencia encontrada"
                                : "Sin coincidencia"}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted">
                            {resultado.coincide
                                ? "El nivel de similitud supera el umbral configurado."
                                : "La similitud obtenida no alcanza el umbral requerido."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Persona identificada */}
            <section className="mt-5 rounded-xl border border-line p-5">
                <span className="text-xs font-semibold tracking-wider text-muted">
                    IDENTIDAD CANDIDATA
                </span>

                <div className="mt-4 flex items-center gap-4">
                    {/* Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                        <User size={22} />
                    </div>

                    <div>
                        <p className="font-display text-lg font-semibold text-ink">
                            {resultado.nombre ??
                                "Persona desconocida"}
                        </p>

                        <p className="mt-1 text-xs text-muted">
                            {resultado.persona_id
                                ? `ID de persona: ${resultado.persona_id}`
                                : "Sin identificación registrada"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Similitud facial */}
            <section className="mt-5 rounded-xl border border-line p-5">
                <div className="mb-5">
                    <span className="text-xs font-semibold tracking-wider text-muted">
                        SIMILITUD FACIAL
                    </span>

                    <p className="mt-2 text-sm text-muted">
                        Comparación entre el rostro analizado y el registro candidato.
                    </p>
                </div>

                <SimilarityBar
                    similitud={resultado.similitud}
                    umbral={resultado.umbral}
                />
            </section>

            {/* Métricas */}
            <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Distancia */}
                <article className="rounded-lg border border-line bg-surface p-4">
                    <span className="text-xs text-muted">
                        Distancia
                    </span>

                    <strong className="mt-2 block font-display text-xl font-semibold text-ink">
                        {resultado.distancia.toFixed(2)}
                    </strong>
                </article>

                {/* Umbral */}
                <article className="rounded-lg border border-line bg-surface p-4">
                    <span className="text-xs text-muted">
                        Umbral
                    </span>

                    <strong className="mt-2 block font-display text-xl font-semibold text-ink">
                        {resultado.umbral.toFixed(2)}
                    </strong>
                </article>

                {/* Probabilidad */}
                <article className="rounded-lg border border-line bg-surface p-4">
                    <span className="text-xs text-muted">
                        Probabilidad
                    </span>

                    <strong className="mt-2 block font-display text-xl font-semibold text-ink">
                        {resultado.probabilidad_calibrada !== null
                            ? `${(
                                resultado.probabilidad_calibrada *
                                100
                            ).toFixed(1)}%`
                            : "—"}
                    </strong>
                </article>
            </section>

            {/* Interpretación final */}
            <div className="mt-5 flex gap-3 border-t border-line pt-5">
                <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-brand"
                />

                <p className="text-xs leading-5 text-muted">
                    <strong className="font-semibold text-ink">
                        Interpretación:
                    </strong>{" "}
                    similitud y probabilidad no representan lo mismo.
                    La similitud mide la cercanía entre embeddings,
                    mientras que la probabilidad calibrada es una
                    estimación estadística producida por el modelo
                    de Machine Learning.
                </p>
            </div>
        </div>
    );
}

export default FaceResultCard;