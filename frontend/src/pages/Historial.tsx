import { useState } from "react";
import {
    CheckCircle2,
    History as HistoryIcon,
    Search,
    UserRound,
    XCircle,
} from "lucide-react";

import type { HistorialReconocimiento } from "../types/facial";

// Filtros disponibles para la tabla
type FiltroResultado =
    | "todos"
    | "coinciden"
    | "no-coinciden";

// Datos simulados hasta conectar el backend
const historialSimulado: HistorialReconocimiento[] = [
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

function Historial() {
    // Guarda el filtro seleccionado
    const [filtroResultado, setFiltroResultado] =
        useState<FiltroResultado>("todos");

    // Guarda el texto escrito en el buscador
    const [busqueda, setBusqueda] = useState("");

    // Filtra primero por resultado y luego por nombre
    const historialFiltrado = historialSimulado.filter(
        (registro) => {
            // Filtro por coincidencia
            const cumpleResultado =
                filtroResultado === "todos" ||
                (filtroResultado === "coinciden" &&
                    registro.coincide) ||
                (filtroResultado === "no-coinciden" &&
                    !registro.coincide);

            // Nombre utilizado para realizar la búsqueda
            const nombre =
                registro.nombre ?? "Desconocido";

            // Filtro por texto
            const cumpleBusqueda = nombre
                .toLowerCase()
                .includes(busqueda.toLowerCase());

            return cumpleResultado && cumpleBusqueda;
        },
    );

    return (
        <div className="mx-auto w-full max-w-[1500px]">

            {/* Aviso informativo */}
            <section className="mb-5 flex gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4">
                <HistoryIcon
                    size={20}
                    className="mt-0.5 shrink-0 text-brand"
                />

                <div>
                    <p className="text-sm font-semibold text-ink">
                        Historial demostrativo
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted">
                        Estos registros todavía son simulados.
                        Posteriormente se obtendrán desde FastAPI
                        y la base de datos.
                    </p>
                </div>
            </section>

            {/* Panel principal */}
            <section className="overflow-hidden rounded-xl border border-line bg-white">
                {/* Buscador y filtros */}
                <div className="flex flex-col gap-4 border-b border-line p-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* Buscador */}
                    <div className="relative w-full lg:max-w-sm">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                        />

                        <input
                            type="text"
                            value={busqueda}
                            onChange={(evento) =>
                                setBusqueda(evento.target.value)
                            }
                            placeholder="Buscar por persona..."
                            className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-100"
                        />
                    </div>

                    {/* Filtros de resultado */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                setFiltroResultado("todos")
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${filtroResultado === "todos"
                                ? "bg-brand text-white"
                                : "border border-line bg-white text-muted hover:bg-surface"
                                }`}
                        >
                            Todos
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setFiltroResultado("coinciden")
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${filtroResultado === "coinciden"
                                ? "bg-brand text-white"
                                : "border border-line bg-white text-muted hover:bg-surface"
                                }`}
                        >
                            Coinciden
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setFiltroResultado(
                                    "no-coinciden",
                                )
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${filtroResultado ===
                                "no-coinciden"
                                ? "bg-brand text-white"
                                : "border border-line bg-white text-muted hover:bg-surface"
                                }`}
                        >
                            No coinciden
                        </button>
                    </div>
                </div>

                {/* Información de resultados */}
                <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
                    <div>
                        <h2 className="font-display text-base font-semibold text-ink">
                            Intentos de reconocimiento
                        </h2>

                        <p className="mt-1 text-xs text-muted">
                            {historialFiltrado.length} registro
                            {historialFiltrado.length !== 1
                                ? "s"
                                : ""}{" "}
                            encontrado
                            {historialFiltrado.length !== 1
                                ? "s"
                                : ""}
                        </p>
                    </div>
                </div>

                {/* Tabla */}
                <div className="w-full max-w-full overflow-x-auto">
                    <table className="table-fixed min-w-[1000px] w-full text-left">
                        {/* Mantiene fijos los anchos de las columnas al aplicar filtros */}
                        <colgroup>
                            <col className="w-[24%]" />
                            <col className="w-[11%]" />
                            <col className="w-[11%]" />
                            <col className="w-[11%]" />
                            <col className="w-[13%]" />
                            <col className="w-[15%]" />
                            <col className="w-[15%]" />
                        </colgroup>

                        <thead className="bg-surface">
                            <tr>
                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted">
                                    Persona
                                </th>

                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted">
                                    Similitud
                                </th>

                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted">
                                    Distancia
                                </th>

                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted">
                                    Umbral
                                </th>

                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted">
                                    Probabilidad
                                </th>

                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted">
                                    Resultado
                                </th>

                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted">
                                    Fecha
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {historialFiltrado.map(
                                (registro) => (
                                    <tr
                                        key={registro.id}
                                        className="border-t border-line transition-colors hover:bg-surface"
                                    >
                                        {/* Persona */}
                                        <td className="whitespace-nowrap px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar */}
                                                <div
                                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${registro.nombre
                                                        ? "bg-brand-50 text-brand"
                                                        : "bg-gray-100 text-muted"
                                                        }`}
                                                >
                                                    {registro.nombre ? (
                                                        registro.nombre
                                                            .split(" ")
                                                            .map(
                                                                (
                                                                    palabra,
                                                                ) =>
                                                                    palabra[0],
                                                            )
                                                            .slice(
                                                                0,
                                                                2,
                                                            )
                                                            .join("")
                                                    ) : (
                                                        <UserRound
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-ink">
                                                        {registro.nombre ??
                                                            "Desconocido"}
                                                    </p>

                                                    <p className="mt-1 text-xs text-muted">
                                                        {registro.persona_id
                                                            ? `ID ${registro.persona_id}`
                                                            : "Sin registro"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Similitud */}
                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-ink">
                                            {registro.similitud.toFixed(
                                                2,
                                            )}
                                        </td>

                                        {/* Distancia */}
                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
                                            {registro.distancia.toFixed(
                                                2,
                                            )}
                                        </td>

                                        {/* Umbral */}
                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
                                            {registro.umbral.toFixed(
                                                2,
                                            )}
                                        </td>

                                        {/* Probabilidad */}
                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
                                            {registro.probabilidad_calibrada !==
                                                null
                                                ? `${(
                                                    registro.probabilidad_calibrada *
                                                    100
                                                ).toFixed(
                                                    1,
                                                )}%`
                                                : "—"}
                                        </td>

                                        {/* Resultado */}
                                        <td className="whitespace-nowrap px-5 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${registro.coincide
                                                    ? "bg-brand-50 text-brand-700"
                                                    : "bg-red-50 text-red-700"
                                                    }`}
                                            >
                                                {registro.coincide ? (
                                                    <CheckCircle2
                                                        size={13}
                                                    />
                                                ) : (
                                                    <XCircle
                                                        size={13}
                                                    />
                                                )}

                                                {registro.coincide
                                                    ? "Coincide"
                                                    : "No coincide"}
                                            </span>
                                        </td>

                                        {/* Fecha */}
                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
                                            {registro.created_at}
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Estado cuando no existen resultados */}
                {historialFiltrado.length === 0 && (
                    <div className="flex flex-col items-center justify-center border-t border-line px-6 py-14 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand">
                            <Search size={24} />
                        </div>

                        <h3 className="mt-4 font-display text-base font-semibold text-ink">
                            No se encontraron registros
                        </h3>

                        <p className="mt-2 text-sm text-muted">
                            Prueba con otro nombre o cambia el filtro seleccionado.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Historial;