import { useState, type SubmitEvent } from "react";
import {
    CheckCircle2,
    Mail,
    ShieldCheck,
    User,
    UserPlus,
} from "lucide-react";

import CameraCapture from "../components/CameraCapture";

function RegistroFacial() {
    // Datos ingresados por el usuario
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    // Guarda la imagen capturada o seleccionada
    const [imagenFacial, setImagenFacial] =
        useState<string | null>(null);

    // Mensaje informativo del formulario
    const [mensaje, setMensaje] = useState("");

    // Valida y prepara los datos del registro
    function registrarPersona(
        evento: SubmitEvent<HTMLFormElement>,
    ) {
        evento.preventDefault();

        // Validación de nombre y correo
        if (!nombre.trim() || !email.trim()) {
            setMensaje(
                "Completa el nombre y el correo electrónico.",
            );
            return;
        }

        // Validación de la fotografía facial
        if (!imagenFacial) {
            setMensaje(
                "Captura o selecciona una imagen antes de continuar.",
            );
            return;
        }

        // Datos que posteriormente se enviarán al backend
        const datosRegistro = {
            nombre: nombre.trim(),
            email: email.trim(),
            imagen: imagenFacial,
        };

        console.log(
            "Datos preparados:",
            datosRegistro,
        );

        setMensaje(
            "Datos preparados correctamente. El backend todavía no está conectado.",
        );
    }

    return (
        <div className="mx-auto w-full max-w-[1500px]">

            {/* Contenido principal */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {/* Formulario */}
                <article className="rounded-xl border border-line bg-white p-5 sm:p-6">
                    {/* Paso actual */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand">
                            01
                        </div>

                        <div>
                            <h2 className="font-display text-lg font-semibold text-ink">
                                Información personal
                            </h2>

                            <p className="mt-1 text-xs text-muted">
                                Datos necesarios para identificar el registro.
                            </p>
                        </div>
                    </div>

                    {/* Formulario de registro */}
                    <form onSubmit={registrarPersona}>
                        {/* Nombre */}
                        <label className="block">
                            <span className="text-sm font-medium text-ink">
                                Nombre completo
                            </span>

                            <div className="relative mt-2">
                                <User
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                                />

                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(evento) =>
                                        setNombre(evento.target.value)
                                    }
                                    placeholder="Ejemplo: Carlos Pérez"
                                    className="w-full rounded-lg border border-line bg-white py-3 pl-10 pr-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-100"
                                />
                            </div>
                        </label>

                        {/* Correo electrónico */}
                        <label className="mt-5 block">
                            <span className="text-sm font-medium text-ink">
                                Correo electrónico
                            </span>

                            <div className="relative mt-2">
                                <Mail
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(evento) =>
                                        setEmail(evento.target.value)
                                    }
                                    placeholder="persona@correo.com"
                                    className="w-full rounded-lg border border-line bg-white py-3 pl-10 pr-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-100"
                                />
                            </div>
                        </label>

                        {/* Nota informativa */}
                        <div className="mt-6 flex gap-3 rounded-lg border border-brand-100 bg-brand-50 p-4">
                            <ShieldCheck
                                size={20}
                                className="mt-0.5 shrink-0 text-brand"
                            />

                            <p className="text-xs leading-5 text-muted">
                                <strong className="font-semibold text-ink">
                                    Información biométrica
                                </strong>
                                <br />
                                En esta etapa la imagen se mantiene únicamente
                                en el frontend. Todavía no se almacena en una
                                base de datos.
                            </p>
                        </div>

                        {/* Estado del formulario */}
                        <div className="mt-6 rounded-lg border border-line bg-surface p-4">
                            <div className="flex items-start gap-3">
                                {imagenFacial ? (
                                    <CheckCircle2
                                        size={19}
                                        className="mt-0.5 shrink-0 text-brand"
                                    />
                                ) : (
                                    <UserPlus
                                        size={19}
                                        className="mt-0.5 shrink-0 text-muted"
                                    />
                                )}

                                <div>
                                    <p className="text-sm font-medium text-ink">
                                        {imagenFacial
                                            ? "Imagen facial preparada"
                                            : "Imagen facial pendiente"}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted">
                                        {imagenFacial
                                            ? "La fotografía está lista para formar parte del registro."
                                            : "Utiliza la cámara o selecciona una imagen en el siguiente panel."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mensaje de validación */}
                        {mensaje && (
                            <p className="mt-5 rounded-lg border border-line bg-surface px-4 py-3 text-xs leading-5 text-muted">
                                {mensaje}
                            </p>
                        )}

                        {/* Botón principal */}
                        <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                        >
                            <UserPlus size={18} />

                            Preparar registro
                        </button>
                    </form>
                </article>

                {/* Captura facial */}
                <article className="rounded-xl border border-line bg-white p-5 sm:p-6">
                    {/* Paso actual */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand">
                            02
                        </div>

                        <div>
                            <h2 className="font-display text-lg font-semibold text-ink">
                                Imagen facial
                            </h2>

                            <p className="mt-1 text-xs text-muted">
                                Captura o selecciona una fotografía clara.
                            </p>
                        </div>
                    </div>

                    {/* Componente reutilizable de cámara */}
                    <CameraCapture
                        onCapture={setImagenFacial}
                    />

                    {/* Recomendaciones */}
                    <div className="mt-6 border-t border-line pt-5">
                        <p className="text-sm font-semibold text-ink">
                            Recomendaciones
                        </p>

                        <div className="mt-3 grid gap-2 text-xs leading-5 text-muted sm:grid-cols-2">
                            <span>• Mantén el rostro centrado.</span>
                            <span>• Utiliza buena iluminación.</span>
                            <span>• Evita cubrir el rostro.</span>
                            <span>• Mira directamente a la cámara.</span>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}

export default RegistroFacial;