// Importa íconos de la librería lucide-react, se utilza cada ícono como un componente React
import {
    Activity,
    CheckCircle2,
    ScanFace,
    Users,
} from "lucide-react";

function Dashboard() {
    return (
        <section>
            {/* Encabezado de la página */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">
                    Dashboard
                </h2>

                <p className="mt-2 text-gray-500">
                    Resumen general del sistema de reconocimiento facial.
                </p>
            </div>

            {/* Tarjetas de resumen */}
            {/* grid grid-cols-1: Ajusta cards para pantallas pequeñas como teléfonos en una columna de 4 */}
            {/* gap-4 md:grid-cols-2: Ajusta cards para pantallas medianas como tablets en 2 columnas de 2 */}
            {/* xl:grid-cols-4: Ajusta card para pantallas grandes como monitores en 4 columnas de 1 */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                {/* Card 1 */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Personas registradas
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-800">
                                24
                            </p>
                        </div>

                        <Users size={32} className="text-blue-600" />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Reconocimientos
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-800">
                                83
                            </p>
                        </div>

                        <ScanFace size={32} className="text-violet-600" />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Coincidencias
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-800">
                                71
                            </p>
                        </div>

                        <CheckCircle2
                            size={32}
                            className="text-green-600"
                        />
                    </div>
                </div>

                {/* Card 4 */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Tasa de coincidencia
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-800">
                                85.5%
                            </p>
                        </div>

                        <Activity size={32} className="text-orange-500" />
                    </div>
                </div>

            </div>

            {/* Reconocimientos recientes */}
            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                    Reconocimientos recientes
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Datos simulados para construir la interfaz.
                </p>

                {/* Tabla */}
                {/* Mantiene un ancho mínimo y activa scroll horizontal en pantallas pequeñas */}
                <div className="mt-6 w-full max-w-full overflow-x-auto">
                    <table className="min-w-[650px] w-full text-left">

                        {/* Encabezado de cada columna */}
                        <thead>
                            <tr className="border-b border-gray-200 text-sm text-gray-500">
                                <th className="whitespace-nowrap pb-3 pr-6 font-medium">Persona</th>
                                <th className="whitespace-nowrap pb-3 pr-6 font-medium">Similitud</th>
                                <th className="whitespace-nowrap pb-3 pr-6 font-medium">Resultado</th>
                                <th className="whitespace-nowrap pb-3 pr-6 font-medium">Fecha</th>
                            </tr>
                        </thead>

                        {/* Registro 1 */}
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                    Carlos Pérez
                                </td>

                                <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                    0.91
                                </td>

                                <td className="whitespace-nowrap py-4 pr-6">
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                        Coincide
                                    </span>
                                </td>

                                <td className="whitespace-nowrap py-4 text-gray-500">
                                    17/09/2026
                                </td>
                            </tr>

                            {/* Registro 2 */}
                            <tr className="border-b border-gray-100">
                                <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                    María López
                                </td>

                                <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                    0.82
                                </td>

                                <td className="whitespace-nowrap py-4 pr-6">
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                        Coincide
                                    </span>
                                </td>

                                <td className="whitespace-nowrap py-4 text-gray-500">
                                    17/09/2026
                                </td>
                            </tr>

                            {/* Registro 3 */}
                            <tr>
                                <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                    Desconocido
                                </td>

                                <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                    0.43
                                </td>

                                <td className="whitespace-nowrap py-4 pr-6">
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                        No coincide
                                    </span>
                                </td>

                                <td className="whitespace-nowrap py-4 text-gray-500">
                                    16/09/2026
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;