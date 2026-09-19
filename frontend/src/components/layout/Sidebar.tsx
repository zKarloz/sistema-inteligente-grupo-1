import { NavLink } from "react-router-dom";
import {
    ScanFace,
    ShieldCheck,
} from "lucide-react";

import { navegacion } from "../../config/navigation";

function Sidebar() {
    return (
        <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col border-r border-line bg-white px-3 py-5 transition-all duration-300 lg:w-64 lg:px-5">
            {/* Marca del sistema */}
            <div className="flex items-center justify-center lg:justify-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <ScanFace size={24} />
                </div>

                <div className="ml-3 hidden lg:block">
                    <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
                        nexo
                        <span className="text-brand">.</span>
                    </p>

                    <p className="mt-1 text-xs font-semibold tracking-wider text-muted">
                        RECONOCIMIENTO INTELIGENTE
                    </p>
                </div>
            </div>

            {/* Información del proyecto */}
            <div className="mt-8 hidden rounded-xl border border-line bg-surface p-3 lg:block">
                <p className="text-xs font-semibold text-ink">
                    Sistema académico
                </p>

                <p className="mt-1 text-xs text-muted">
                    IA · ML · Deep Learning
                </p>
            </div>

            {/* Título de navegación */}
            <p className="mt-8 hidden px-3 text-xs font-semibold tracking-wider text-muted lg:block">
                PRINCIPAL
            </p>

            {/* Navegación principal */}
            <nav
                aria-label="Navegación principal"
                className="mt-3 space-y-2"
            >
                {navegacion.map((item) => {
                    const Icono = item.icono;

                    return (
                        <NavLink
                            key={item.id}
                            to={item.ruta}
                            title={item.nombre}
                            aria-label={item.nombre}
                            className={({ isActive }) =>
                                `flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors lg:justify-start ${isActive
                                    ? "bg-brand-50 font-semibold text-brand"
                                    : "text-muted hover:bg-surface hover:text-ink"
                                }`
                            }
                        >
                            <Icono
                                size={20}
                                className="shrink-0"
                            />

                            <span className="hidden lg:inline">
                                {item.nombre}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Información inferior */}
            <div className="mt-auto">
                <div className="hidden rounded-xl border border-line bg-brand-50 p-4 lg:block">
                    <ShieldCheck
                        size={21}
                        className="text-brand"
                    />

                    <p className="mt-3 text-xs font-semibold text-ink">
                        Diseñado para confiar
                    </p>

                    <p className="mt-2 text-xs leading-5 text-muted">
                        Registro, reconocimiento y análisis en un solo sistema.
                    </p>
                </div>

                {/* Perfil demostrativo */}
                <div className="mt-5 flex items-center justify-center border-t border-line pt-5 lg:justify-start">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand">
                        AD
                    </div>

                    <div className="ml-3 hidden lg:block">
                        <p className="text-xs font-semibold text-ink">
                            Administrador demo
                        </p>

                        <p className="mt-1 text-xs text-muted">
                            Proyecto académico
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;