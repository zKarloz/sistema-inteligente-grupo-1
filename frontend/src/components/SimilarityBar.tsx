// Datos que el componente recibirá desde otro componente
interface SimilarityBarProps {
    similitud: number;
    umbral: number;
}

function SimilarityBar({ similitud, umbral }: SimilarityBarProps) {
    // Convertimos los valores decimales a porcentaje solo para mostrarlos visualmente
    const similitudPorcentaje = similitud * 100;
    const umbralPorcentaje = umbral * 100;

    return (
        <div className="mt-5">
            {/* Título y valor de similitud */}
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                    Similitud facial
                </p>

                <p className="text-sm font-semibold text-gray-800">
                    {similitud.toFixed(2)}
                </p>
            </div>

            {/* Barra visual de similitud */}
            <div className="relative mt-2 h-4 overflow-hidden rounded-full bg-gray-200">
                <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                        width: `${similitudPorcentaje}%`,
                    }}
                />

                {/* Indicador visual del umbral */}
                <div
                    className="absolute top-0 h-full w-0.5 bg-red-500"
                    style={{
                        left: `${umbralPorcentaje}%`,
                    }}
                />
            </div>

            {/* Información del umbral */}
            <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>0.00</span>
                <span>
                    Umbral: {umbral.toFixed(2)}
                </span>
                <span>1.00</span>
            </div>
        </div>
    );
}

export default SimilarityBar;