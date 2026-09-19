import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    ScanFace,
    ShieldCheck,
    ShieldX,
    Users,
} from "lucide-react";

import ProbabilityChart from "../components/ProbabilityChart";

// Datos simulados de reconocimientos recientes
const reconocimientosRecientes = [
    {
        id: 1,
        nombre: "Carlos Pérez",
        similitud: 0.91,
        coincide: true,
        fecha: "18/09/2026",
    },
    {
        id: 2,
        nombre: "María López",
        similitud: 0.84,
        coincide: true,
        fecha: "18/09/2026",
    },
    {
        id: 3,
        nombre: "Desconocido",
        similitud: 0.42,
        coincide: false,
        fecha: "17/09/2026",
    },
    {
        id: 4,
        nombre: "Ana Torres",
        similitud: 0.79,
        coincide: true,
        fecha: "17/09/2026",
    },
];

function Dashboard() {
    // Permite navegar hacia otras rutas desde botones
    const navigate = useNavigate();

    // Datos simulados de las tarjetas principales
    const estadisticas = [
        {
            titulo: "Personas registradas",
            valor: "24",
            descripcion: "Directorio actual",
            icono: Users,
        },
        {
            titulo: "Reconocimientos",
            valor: "83",
            descripcion: "Intentos realizados",
            icono: ScanFace,
        },
        {
            titulo: "Accesos aceptados",
            valor: "71",
            descripcion: "Coincidencias detectadas",
            icono: ShieldCheck,
        },
        {
            titulo: "Accesos rechazados",
            valor: "12",
            descripcion: "Sin coincidencia",
            icono: ShieldX,
        },
    ];

    return (
        <div className="mx-auto w-full max-w-[1500px]">

            {/* Hero principal */}
            <section className="relative overflow-hidden rounded-2xl bg-brand-950 px-6 py-8 text-white sm:px-8 lg:flex lg:min-h-64 lg:items-center lg:justify-between">
                {/* Información principal */}
                <div className="relative z-10 max-w-xl">
                    <span className="text-xs font-semibold tracking-widest text-brand-200">
                        IDENTIDAD QUE CONECTA
                    </span>

                    <h2 className="mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                        Un acceso más inteligente.
                        <br />
                        Una gestión más simple.
                    </h2>

                    <p className="mt-4 max-w-md text-sm leading-6 text-brand-200">
                        Personas, verificaciones y actividad en un solo lugar.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/reconocimiento")}
                        className="mt-6 flex items-center gap-2 rounded-lg bg-brand-light px-4 py-2.5 text-sm font-semibold text-brand-950 transition-transform hover:-translate-y-0.5"
                    >
                        Iniciar reconocimiento

                        <ArrowUpRight size={17} />
                    </button>

                </div>

                {/* Decoración del hero */}
                <div
                    className="relative mt-10 hidden h-48 w-56 items-center justify-center lg:flex"
                    aria-hidden="true"
                >
                    {/* Círculos decorativos */}
                    <div className="absolute h-44 w-44 rounded-full border border-brand-700" />

                    <div className="absolute h-32 w-32 rounded-full border border-dashed border-brand-600" />

                    <div className="absolute h-24 w-24 rounded-full bg-brand-900" />

                    {/* Icono principal */}
                    <ScanFace
                        size={82}
                        strokeWidth={1}
                        className="relative text-brand-200"
                    />

                    {/* Etiqueta inferior */}
                    <div className="absolute bottom-0 flex items-center gap-2 rounded-full border border-brand-700 bg-brand-900 px-4 py-2 text-xs text-brand-200">
                        <ShieldCheck size={15} />

                        Control de acceso
                    </div>
                </div>
            </section>

            {/* Tarjetas de estadísticas */}
            <section className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {estadisticas.map((estadistica) => {
                    const Icono = estadistica.icono;

                    return (
                        <article
                            key={estadistica.titulo}
                            className="rounded-xl border border-line bg-white p-5"
                        >
                            {/* Nombre e icono */}
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-muted">
                                    {estadistica.titulo}
                                </span>

                                <Icono
                                    size={19}
                                    className="text-brand"
                                />
                            </div>

                            {/* Valor principal */}
                            <strong className="mt-4 block font-display text-3xl font-semibold text-ink">
                                {estadistica.valor}
                            </strong>

                            {/* Descripción */}
                            <span className="mt-2 block text-xs text-muted">
                                {estadistica.descripcion}
                            </span>
                        </article>
                    );
                })}
            </section>

            {/* Actividad reciente y siguiente paso */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2.4fr)_minmax(260px,1fr)]">
                {/* Tabla de actividad reciente */}
                <article className="min-w-0 overflow-hidden rounded-xl border border-line bg-white">
                    {/* Encabezado del panel */}
                    <div className="flex items-center justify-between gap-4 px-5 py-5">
                        <div>
                            <h2 className="font-display text-base font-semibold text-ink">
                                Actividad reciente
                            </h2>

                            <p className="mt-1 text-xs text-muted">
                                Últimos intentos de reconocimiento.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/historial")}
                            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-brand hover:text-brand-700"
                        >
                            Ver todo

                            <ArrowRight size={15} />
                        </button>
                    </div>

                    {/* Tabla */}
                    <div className="w-full max-w-full overflow-x-auto">
                        <table className="min-w-[650px] w-full text-left">
                            <thead className="border-y border-line bg-surface">
                                <tr>
                                    <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted">
                                        Persona
                                    </th>

                                    <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted">
                                        Similitud
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
                                {reconocimientosRecientes.map(
                                    (reconocimiento) => (
                                        <tr
                                            key={reconocimiento.id}
                                            className="border-b border-line last:border-b-0"
                                        >
                                            {/* Persona */}
                                            <td className="whitespace-nowrap px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand">
                                                        {reconocimiento.nombre ===
                                                            "Desconocido"
                                                            ? "?"
                                                            : reconocimiento.nombre
                                                                .split(" ")
                                                                .map(
                                                                    (
                                                                        palabra,
                                                                    ) =>
                                                                        palabra[0],
                                                                )
                                                                .slice(0, 2)
                                                                .join("")}
                                                    </div>

                                                    <span className="text-sm font-medium text-ink">
                                                        {
                                                            reconocimiento.nombre
                                                        }
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Similitud */}
                                            <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
                                                {reconocimiento.similitud.toFixed(
                                                    2,
                                                )}
                                            </td>

                                            {/* Resultado */}
                                            <td className="whitespace-nowrap px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${reconocimiento.coincide
                                                        ? "bg-brand-50 text-brand-700"
                                                        : "bg-red-50 text-red-700"
                                                        }`}
                                                >
                                                    {reconocimiento.coincide ? (
                                                        <CheckCircle2
                                                            size={13}
                                                        />
                                                    ) : (
                                                        <ShieldX size={13} />
                                                    )}

                                                    {reconocimiento.coincide
                                                        ? "Coincide"
                                                        : "No coincide"}
                                                </span>
                                            </td>

                                            {/* Fecha */}
                                            <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
                                                {reconocimiento.fecha}
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                </article>

                {/* Tarjeta de siguiente paso */}
                <article className="flex flex-col rounded-xl border border-brand-100 bg-brand-50 p-6">
                    <span className="text-xs font-semibold tracking-wider text-brand">
                        TU ESPACIO DE TRABAJO
                    </span>

                    <h2 className="mt-4 font-display text-xl font-semibold leading-relaxed text-ink">
                        El siguiente paso
                        <br />
                        empieza con una persona.
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-muted">
                        Registra una persona y prepara su información facial para futuros reconocimientos.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/registro")}
                        className="mt-6 flex items-center justify-between rounded-lg border border-brand-200 bg-white px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-100"
                    >
                        <span className="flex items-center gap-2">
                            <Users
                                size={17}
                                className="text-brand"
                            />

                            Registrar persona
                        </span>

                        <ArrowRight size={16} />
                    </button>

                    {/* Nota informativa */}
                    <div className="mt-auto flex gap-3 border-t border-brand-200 pt-5 xl:mt-8">
                        <ShieldCheck
                            size={20}
                            className="shrink-0 text-brand"
                        />

                        <p className="text-xs leading-5 text-muted">
                            <strong className="font-semibold text-ink">
                                Privacidad desde el inicio
                            </strong>
                            <br />
                            La cámara se utiliza únicamente durante la captura facial.
                        </p>
                    </div>
                </article>
            </section>

            {/* Explicación de una coincidencia */}
            <section className="mt-5 overflow-hidden rounded-xl border border-line bg-white">
                {/* Encabezado del panel */}
                <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-display text-base font-semibold text-ink">
                            Entender una coincidencia
                        </h2>

                        <p className="mt-1 text-xs text-muted">
                            Relación entre similitud, umbral y probabilidad calibrada.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/probabilidades")}
                        className="flex w-fit items-center gap-1 text-xs font-semibold text-brand hover:text-brand-700"
                    >
                        Explorar análisis

                        <ArrowRight size={15} />
                    </button>
                </div>

                {/* Gráfico demostrativo */}
                <div className="border-t border-line p-5">
                    <ProbabilityChart
                        similitud={0.87}
                        umbral={0.75}
                        probabilidad={0.93}
                    />
                </div>
            </section>
        </div>
    );
}

export default Dashboard;