// Este componenete fue creado para reutilizar una animación de carga a las 5 páginas

import { LoaderCircle } from "lucide-react";

interface LoadingStateProps {
    mensaje: string;
}

function LoadingState({
    mensaje,
}: LoadingStateProps) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-brand-100 bg-brand-50 p-5">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                <div className="absolute h-10 w-10 animate-ping rounded-full bg-brand-100 opacity-50" />

                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand">
                    <LoaderCircle
                        size={19}
                        className="animate-spin"
                    />
                </div>
            </div>

            <div>
                <p className="text-sm font-semibold text-ink">
                    Procesando
                </p>

                <p className="mt-1 text-xs text-muted">
                    {mensaje}
                </p>
            </div>
        </div>
    );
}

export default LoadingState;