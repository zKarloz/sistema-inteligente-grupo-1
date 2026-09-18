import {
    BrainCircuit,
    Gauge,
    Percent,
    ScanFace,
} from "lucide-react";

import ProbabilityChart from "../components/ProbabilityChart";
import SimilarityBar from "../components/SimilarityBar";

function Probabilidades() {
    // Datos simulados hasta conectar el backend y el modelo de Machine Learning
    const similitud = 0.87;
    const distancia = 0.26;
    const umbral = 0.75;
    const probabilidadCalibrada = 0.93;

    // Determina si la similitud supera el umbral configurado
    const coincide = similitud >= umbral;

    return (
        <section>
            {/* Encabezado de la página */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">
                    Probabilidades
                </h2>

                <p className="mt-2 text-gray-500">
                    Análisis de similitud, umbral y probabilidad calibrada.
                </p>
            </div>

            {/* Aviso sobre los datos actuales */}
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
                Los valores mostrados actualmente son simulados. La probabilidad
                calibrada será calculada posteriormente por el modelo de Machine
                Learning.
            </div>

            {/* Tarjetas principales */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {/* Similitud */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Similitud
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-800">
                                {similitud.toFixed(2)}
                            </p>
                        </div>

                        <ScanFace
                            size={30}
                            className="text-blue-600"
                        />
                    </div>
                </div>

                {/* Distancia */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Distancia
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-800">
                                {distancia.toFixed(2)}
                            </p>
                        </div>

                        <Gauge
                            size={30}
                            className="text-violet-600"
                        />
                    </div>
                </div>

                {/* Umbral */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Umbral
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-800">
                                {umbral.toFixed(2)}
                            </p>
                        </div>

                        <BrainCircuit
                            size={30}
                            className="text-orange-500"
                        />
                    </div>
                </div>

                {/* Probabilidad calibrada */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Probabilidad calibrada
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-800">
                                {(probabilidadCalibrada * 100).toFixed(1)}%
                            </p>
                        </div>

                        <Percent
                            size={30}
                            className="text-green-600"
                        />
                    </div>
                </div>
            </div>

            {/* Contenido de análisis */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* Análisis de similitud */}
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Análisis de similitud
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Comparación entre la similitud obtenida y el umbral.
                    </p>

                    <SimilarityBar
                        similitud={similitud}
                        umbral={umbral}
                    />

                    {/* Resultado del umbral */}
                    <div
                        className={`mt-6 rounded-lg p-4 ${coincide
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                            }`}
                    >
                        {coincide
                            ? "La similitud supera el umbral establecido."
                            : "La similitud no supera el umbral establecido."}
                    </div>
                </div>

                {/* Explicación de conceptos */}
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Interpretación
                    </h3>

                    <div className="mt-5 space-y-5">
                        {/* Similitud */}
                        <div>
                            <p className="font-medium text-gray-800">
                                Similitud
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Indica qué tan parecidos son los embeddings faciales.
                            </p>
                        </div>

                        {/* Umbral */}
                        <div>
                            <p className="font-medium text-gray-800">
                                Umbral
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Valor utilizado para aceptar o rechazar una coincidencia.
                            </p>
                        </div>

                        {/* Probabilidad calibrada */}
                        <div>
                            <p className="font-medium text-gray-800">
                                Probabilidad calibrada
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Estimación estadística obtenida posteriormente mediante
                                un modelo calibrado.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráfico */}
            <div className="mt-6">
                <ProbabilityChart
                    similitud={similitud}
                    umbral={umbral}
                    probabilidad={probabilidadCalibrada}
                />
            </div>
        </section>
    );
}

export default Probabilidades;