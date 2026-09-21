import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Datos necesarios para construir el gráfico
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
    // Convierte los valores decimales a porcentajes
    const datos = [
        {
            nombre: "Similitud",
            valor: similitud * 100,
            color: "var(--color-brand)",
        },
        {
            nombre: "Umbral",
            valor: umbral * 100,
            color: "var(--color-brand-300)",
        },
        {
            nombre: "Probabilidad",
            valor: probabilidad * 100,
            color: "var(--color-brand-700)",
        },
    ];

    return (
        <div className="w-full">
            {/* Contenedor responsive */}
            {/* En móvil conserva un ancho mínimo y permite desplazamiento horizontal */}
            <div className="w-full max-w-full overflow-x-auto">
                <div className="h-80 min-w-[600px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={datos}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            {/* Líneas de referencia del gráfico */}
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--color-line)"
                            />

                            {/* Nombres de cada valor */}
                            <XAxis
                                dataKey="nombre"
                                tick={{
                                    fill: "var(--color-muted)",
                                    fontSize: 12,
                                }}
                                axisLine={{
                                    stroke: "var(--color-line)",
                                }}
                                tickLine={false}
                            />

                            {/* Escala de 0 a 100 */}
                            <YAxis
                                domain={[0, 100]}
                                tick={{
                                    fill: "var(--color-muted)",
                                    fontSize: 12,
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(valor) =>
                                    `${valor}%`
                                }
                            />

                            {/* Información al pasar el cursor */}
                            <Tooltip
                                cursor={{
                                    fill: "var(--color-surface)",
                                }}
                                formatter={(valor) => [
                                    `${Number(valor).toFixed(1)}%`,
                                    "Valor",
                                ]}
                            />

                            {/* Barras del gráfico */}
                            <Bar
                                dataKey="valor"
                                radius={[7, 7, 0, 0]}
                                maxBarSize={70}
                            >
                                {datos.map((dato) => (
                                    <Cell
                                        key={dato.nombre}
                                        fill={dato.color}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default ProbabilityChart;