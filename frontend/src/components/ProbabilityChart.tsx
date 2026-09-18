// BarChart engloba:
// CartesianGrid: líneas de fondo
// XAxis: eje horizontal
// YAxis: eje vertical
// Tooltip: información al pasar el cursor
// Bar: barras del gráfico
// ResponsiveContainer: hace que el gráfico se adapte automáticamente al tamaño disponible
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

// Datos que necesita el componente para construir el gráfico
interface ProbabilityChartProps {
    similitud: number;
    umbral: number;
    probabilidad: number;
}

function ProbabilityChart({
    similitud,
    umbral,
    probabilidad,
}: ProbabilityChartProps) {
    // Convertimos los valores decimales a porcentajes para el gráfico
    const datos = [
        {
            nombre: "Similitud",
            valor: similitud * 100,
        },
        {
            nombre: "Umbral",
            valor: umbral * 100,
        },
        {
            nombre: "Probabilidad",
            valor: probabilidad * 100,
        },
    ];

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            {/* Encabezado del gráfico */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800">
                    Comparación de resultados
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Comparación visual entre similitud, umbral y probabilidad calibrada.
                </p>
            </div>

            {/* Contenedor del gráfico */}
            {/* En pantallas pequeñas mantiene un ancho mínimo y permite scroll horizontal */}
            <div className="mt-6 w-full max-w-full overflow-x-auto">
                <div className="h-80 min-w-[600px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={datos}>
                            {/* Líneas de fondo */}
                            <CartesianGrid strokeDasharray="3 3" />

                            {/* Nombres de las métricas */}
                            <XAxis dataKey="nombre" />

                            {/* Escala vertical de 0 a 100 */}
                            <YAxis domain={[0, 100]} />

                            {/* Información mostrada al pasar el cursor */}
                            <Tooltip
                                formatter={(valor) => [
                                    `${Number(valor).toFixed(1)}%`,
                                    "Valor",
                                ]}
                            />

                            {/* Barras del gráfico */}
                            <Bar
                                dataKey="valor"
                                fill="currentColor"
                                className="text-blue-600"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default ProbabilityChart;