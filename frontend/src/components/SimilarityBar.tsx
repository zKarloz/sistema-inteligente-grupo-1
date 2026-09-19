// Datos necesarios para representar la similitud
interface SimilarityBarProps {
    similitud: number;
    umbral: number;
}

function SimilarityBar({
    similitud,
    umbral,
}: SimilarityBarProps) {
    // Convierte valores decimales a porcentajes visuales
    const similitudPorcentaje =
        Math.min(Math.max(similitud * 100, 0), 100);

    const umbralPorcentaje =
        Math.min(Math.max(umbral * 100, 0), 100);

    return (
        <div>
            {/* Valores principales */}
            <div className="mb-3 flex items-center justify-between gap-4 text-sm">
                <div>
                    <span className="text-muted">
                        Similitud
                    </span>

                    <strong className="ml-2 font-semibold text-ink">
                        {similitud.toFixed(2)}
                    </strong>
                </div>

                <div>
                    <span className="text-muted">
                        Umbral
                    </span>

                    <strong className="ml-2 font-semibold text-ink">
                        {umbral.toFixed(2)}
                    </strong>
                </div>
            </div>

            {/* Barra principal */}
            <div className="relative h-4 overflow-visible rounded-full bg-brand-50">
                {/* Nivel de similitud */}
                <div
                    className="h-full rounded-full bg-brand transition-all"
                    style={{
                        width: `${similitudPorcentaje}%`,
                    }}
                />

                {/* Marca del umbral */}
                <div
                    className="absolute top-1/2 h-7 w-0.5 -translate-y-1/2 bg-amber-500"
                    style={{
                        left: `${umbralPorcentaje}%`,
                    }}
                    title={`Umbral: ${umbral.toFixed(2)}`}
                />
            </div>

            {/* Escala */}
            <div className="mt-3 flex justify-between text-xs text-muted">
                <span>0.00</span>

                <span>
                    Mayor similitud
                </span>

                <span>1.00</span>
            </div>

            {/* Leyenda */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand" />

                    Similitud obtenida
                </span>

                <span className="flex items-center gap-2">
                    <span className="h-3 w-0.5 bg-amber-500" />

                    Umbral de aceptación
                </span>
            </div>
        </div>
    );
}

export default SimilarityBar;