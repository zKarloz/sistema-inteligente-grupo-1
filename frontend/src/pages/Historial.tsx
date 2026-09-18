import { useState } from "react";
import {
    CheckCircle2,
    History,
    XCircle,
} from "lucide-react";

import type { HistorialReconocimiento } from "../types/facial";

// Opciones disponibles para filtrar el historial
type FiltroResultado = "todos" | "coinciden" | "no-coinciden";

function Historial() {
    // Guarda el filtro seleccionado por el usuario, por predeterminado empieza con "todos"
    const [filtro, setFiltro] = useState<FiltroResultado>("todos");

    // Datos simulados hasta conectar el historial con FastAPI
    const reconocimientos: HistorialReconocimiento[] = [
        {
            id: 1,
            persona_id: 12,
            nombre: "Carlos Pérez",
            similitud: 0.91,
            distancia: 0.18,
            umbral: 0.75,
            coincide: true,
            probabilidad_calibrada: 0.95,
            created_at: "2026-09-18 10:35",
        },
        {
            id: 2,
            persona_id: 8,
            nombre: "María López",
            similitud: 0.84,
            distancia: 0.24,
            umbral: 0.75,
            coincide: true,
            probabilidad_calibrada: 0.89,
            created_at: "2026-09-18 09:20",
        },
        {
            id: 3,
            persona_id: null,
            nombre: null,
            similitud: 0.42,
            distancia: 0.63,
            umbral: 0.75,
            coincide: false,
            probabilidad_calibrada: 0.16,
            created_at: "2026-09-17 16:48",
        },
        {
            id: 4,
            persona_id: 5,
            nombre: "Ana Torres",
            similitud: 0.79,
            distancia: 0.29,
            umbral: 0.75,
            coincide: true,
            probabilidad_calibrada: 0.82,
            created_at: "2026-09-17 14:10",
        },
        {
            id: 5,
            persona_id: null,
            nombre: null,
            similitud: 0.51,
            distancia: 0.55,
            umbral: 0.75,
            coincide: false,
            probabilidad_calibrada: 0.25,
            created_at: "2026-09-16 18:32",
        },
    ];

    // Filtra los registros según la opción seleccionada
    // .filter() también recorre el arreglo, y decide qué elementos se quedan
    const historialFiltrado = reconocimientos.filter((registro) => {
        if (filtro === "coinciden") {
            return registro.coincide;
        }

        if (filtro === "no-coinciden") {
            return !registro.coincide;
        }

        return true;
    });

    return (
        <section className="min-w-0">
            {/* Encabezado de la página */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">
                    Historial
                </h2>

                <p className="mt-2 text-gray-500">
                    Consulta los intentos y resultados de reconocimiento facial.
                </p>
            </div>

            {/* Aviso de datos simulados */}
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
                Los registros mostrados actualmente son datos simulados.
                Posteriormente serán obtenidos desde el backend.
            </div>

            {/* Contenedor principal del historial */}
            {/* lenght: nos dice cuántos elementos contiene un arreglo */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
                {/* Encabezado y filtro */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <History className="text-blue-600" />

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Reconocimientos registrados
                            </h3>

                            <p className="text-sm text-gray-500">
                                {historialFiltrado.length} registros encontrados
                            </p>
                        </div>
                    </div>

                    {/* Selector para filtrar resultados */}
                    <select
                        value={filtro}
                        onChange={(evento) =>
                            setFiltro(evento.target.value as FiltroResultado)
                        }
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
                    >
                        <option value="todos">
                            Todos
                        </option>

                        <option value="coinciden">
                            Coinciden
                        </option>

                        <option value="no-coinciden">
                            No coinciden
                        </option>
                    </select>
                </div>

                {/* Tabla del historial */}
                {/* Si la tabla no entra, este contenedor permite desplazamiento horizontal */}
                <div className="mt-6 w-full max-w-full overflow-x-auto">
                    <table className="min-w-[900px] w-full text-left">
                        {/* Encabezados de la tabla */}
                        <thead>
                            <tr className="border-b border-gray-200 text-sm text-gray-500">
                                <th className="whitespace-nowrap pb-3 font-medium">
                                    Persona
                                </th>

                                <th className="whitespace-nowrap pb-3 font-medium">
                                    Similitud
                                </th>

                                <th className="whitespace-nowrap pb-3 font-medium">
                                    Distancia
                                </th>

                                <th className="whitespace-nowrap pb-3 font-medium">
                                    Umbral
                                </th>

                                <th className="whitespace-nowrap pb-3 font-medium">
                                    Probabilidad
                                </th>

                                <th className="whitespace-nowrap pb-3 font-medium">
                                    Resultado
                                </th>

                                <th className="whitespace-nowrap pb-3 font-medium">
                                    Fecha
                                </th>
                            </tr>
                        </thead>

                        {/* Registros generados automáticamente */}
                        {/* Recorre todos los elementos del arreglo y crea algo con cada uno */}
                        {/* ¿Para que sirve key? Cuando React genera varios componentes mediante .map(), necesita identificar cada elemento */}
                        <tbody>
                            {historialFiltrado.map((registro) => (
                                <tr
                                    key={registro.id}
                                    className="border-b border-gray-100 last:border-b-0"
                                >
                                    {/* Persona */}
                                    {/* Si existe un nombre, úsalo. Si es null, muestra "Desconocido" */}
                                    <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                        {registro.nombre ?? "Desconocido"}
                                    </td>

                                    {/* Similitud */}
                                    <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                        {registro.similitud.toFixed(2)}
                                    </td>

                                    {/* Distancia */}
                                    <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                        {registro.distancia.toFixed(2)}
                                    </td>

                                    {/* Umbral */}
                                    <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                        {registro.umbral.toFixed(2)}
                                    </td>

                                    {/* Probabilidad calibrada */}
                                    <td className="whitespace-nowrap py-4 pr-6 text-gray-700">
                                        {registro.probabilidad_calibrada !== null
                                            ? `${(
                                                registro.probabilidad_calibrada *
                                                100
                                            ).toFixed(1)}%`
                                            : "No disponible"}
                                    </td>

                                    {/* Resultado */}
                                    <td className="whitespace-nowrap py-4 pr-6">
                                        {registro.coincide ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                                <CheckCircle2 size={16} />
                                                Coincide
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                                                <XCircle size={16} />
                                                No coincide
                                            </span>
                                        )}
                                    </td>

                                    {/* Fecha */}
                                    <td className="whitespace-nowrap py-4 text-gray-500">
                                        {registro.created_at}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Historial;