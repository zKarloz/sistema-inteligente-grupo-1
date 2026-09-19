import { useLocation } from "react-router-dom";

import { navegacion } from "../../config/navigation";

function Topbar() {
    // Obtiene la ruta actual del navegador
    const location = useLocation();

    // Busca la información correspondiente a la página actual
    const paginaActual =
        navegacion.find(
            (item) => item.ruta === location.pathname,
        ) ?? navegacion[0];

    return (
        <header className="sticky top-0 z-20 flex min-h-[72px] shrink-0 items-center justify-between border-b border-line bg-white px-4 sm:px-6 lg:px-8">
            {/* Información de la página actual */}
            <div className="min-w-0">
                <h1 className="truncate font-display text-base font-semibold text-ink sm:text-lg">
                    {paginaActual.nombre}
                </h1>

                <p className="mt-1 hidden text-xs text-muted sm:block">
                    {paginaActual.descripcion}
                </p>
            </div>

            {/* Estado del sistema */}
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs text-brand-700">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />

                <span className="hidden sm:inline">
                    Modo demostración
                </span>

                <span className="sm:hidden">
                    Demo
                </span>
            </div>
        </header>
    );
}

export default Topbar;