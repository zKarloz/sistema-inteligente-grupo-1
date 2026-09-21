import { useEffect, useState, type SubmitEvent } from "react";
import { obtenerPersonas, registrarPersona, registrarRostro } from "../services/api";
import { CheckCircle2, LoaderCircle, Mail, ShieldCheck, User, UserPlus } from "lucide-react";

import type { Persona } from "../types/facial";
import CameraCapture from "../components/CameraCapture";

function RegistroFacial() {
    // Datos ingresados por el usuario
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    // Guarda la imagen capturada o seleccionada
    const [imagenFacial, setImagenFacial] = useState<string | null>(null);

    // Define si se registra una persona nueva o se agrega otro rostro a una existente
    const [modoRegistro, setModoRegistro] = useState<"nueva" | "existente">("nueva");

    // Lista de personas registradas.
    const [personas, setPersonas] = useState<Persona[]>([]);

    const [personaSeleccionada, setPersonaSeleccionada] = useState("");

    useEffect(() => {
        async function cargarPersonas() {
            try {
                const datos =
                    await obtenerPersonas();

                setPersonas(datos);
            } catch (error) {
                console.error(
                    "Error al cargar personas:",
                    error,
                );
            }
        }

        void cargarPersonas();
    }, []);

    // Mensaje informativo del formulario
    const [mensaje, setMensaje] = useState("");

    const [registrando, setRegistrando] = useState(false);

    // Valida y prepara los datos del registro
    async function manejarRegistro(
        evento: SubmitEvent<HTMLFormElement>,
    ) {
        evento.preventDefault();

        if (!imagenFacial) {
            setMensaje(
                "Captura o selecciona una imagen antes de continuar.",
            );
            return;
        }

        if (
            modoRegistro === "nueva" &&
            (!nombre.trim() || !email.trim())
        ) {
            setMensaje(
                "Completa el nombre y el correo electrónico.",
            );
            return;
        }

        if (
            modoRegistro === "existente" &&
            !personaSeleccionada
        ) {
            setMensaje(
                "Selecciona una persona registrada.",
            );
            return;
        }

        try {
            setRegistrando(true);

            /*
                CASO 1:
                Crear una persona nueva y después
                registrar su primer rostro.
            */
            if (modoRegistro === "nueva") {
                setMensaje(
                    "Registrando datos personales...",
                );

                const persona =
                    await registrarPersona({
                        nombre: nombre.trim(),
                        email: email.trim(),
                    });

                // Agregamos la nueva persona al selector
                // sin necesidad de recargar la página.
                setPersonas((actuales) => [
                    ...actuales,
                    persona,
                ]);

                setMensaje(
                    "Persona registrada. Procesando rostro...",
                );

                await registrarRostro(
                    persona.id,
                    imagenFacial,
                );

                setMensaje(
                    `Registro completado correctamente para ${persona.nombre}.`,
                );

                setNombre("");
                setEmail("");
            }

            /*
                CASO 2:
                La persona ya existe.
                Solamente agregamos otro rostro.
            */
            if (modoRegistro === "existente") {
                setMensaje(
                    "Procesando nuevo rostro...",
                );

                await registrarRostro(
                    Number(personaSeleccionada),
                    imagenFacial,
                );

                const persona =
                    personas.find(
                        (item) =>
                            item.id ===
                            Number(
                                personaSeleccionada,
                            ),
                    );

                setMensaje(
                    `Nuevo rostro registrado correctamente para ${persona?.nombre ?? "la persona seleccionada"}.`,
                );
            }

            setImagenFacial(null);
        } catch (error) {
            console.error(
                "Error durante el registro:",
                error,
            );

            setMensaje(
                "No se pudo completar el registro.",
            );
        } finally {
            setRegistrando(false);
        }
    }

    return (
        <div className="mx-auto w-full max-w-[1500px]">

            {/* Contenido principal */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                {/* Formulario */}
                <article className="rounded-xl border border-line bg-white p-5 sm:p-6">

                    {/* Tipo de registro */}
                    <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-surface p-1">
                        <button
                            type="button"
                            onClick={() => {
                                setModoRegistro("nueva");
                                setMensaje("");
                            }}
                            className={`rounded-md px-3 py-2.5 text-sm font-semibold transition ${modoRegistro === "nueva"
                                ? "bg-white text-brand shadow-sm"
                                : "text-muted hover:text-ink"
                                }`}
                        >
                            Nueva persona
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setModoRegistro("existente");
                                setMensaje("");
                            }}
                            className={`rounded-md px-3 py-2.5 text-sm font-semibold transition ${modoRegistro === "existente"
                                ? "bg-white text-brand shadow-sm"
                                : "text-muted hover:text-ink"
                                }`}
                        >
                            Agregar rostro
                        </button>
                    </div>

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
                    <form onSubmit={manejarRegistro}>
                        {modoRegistro === "nueva" ? (
                            <>
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

                                {/* Correo */}
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
                            </>
                        ) : (
                            <label className="block">
                                <span className="text-sm font-medium text-ink">
                                    Persona registrada
                                </span>

                                <select
                                    value={personaSeleccionada}
                                    onChange={(evento) =>
                                        setPersonaSeleccionada(
                                            evento.target.value,
                                        )
                                    }
                                    className="mt-2 w-full rounded-lg border border-line bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-100"
                                >
                                    <option value="">
                                        Selecciona una persona
                                    </option>

                                    {personas.map((persona) => (
                                        <option
                                            key={persona.id}
                                            value={persona.id}
                                        >
                                            {persona.nombre} — {persona.email}
                                        </option>
                                    ))}
                                </select>

                                <p className="mt-2 text-xs text-muted">
                                    El nuevo rostro se agregará a esta persona
                                    sin crear un registro nuevo.
                                </p>
                            </label>
                        )}

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

                                La fotografía se procesa en el backend para
                                generar una representación facial. La imagen
                                original no se almacena en esta etapa.
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

                        {/* Mensaje de validación animado */}
                        {mensaje && (
                            <div
                                className={`mt-5 flex items-center gap-3 rounded-lg border px-4 py-3 ${registrando
                                    ? "border-brand-100 bg-brand-50"
                                    : "border-line bg-surface"
                                    }`}
                            >
                                {registrando && (
                                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                                        <div className="absolute h-9 w-9 animate-ping rounded-full bg-brand-100 opacity-40" />

                                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand">
                                            <LoaderCircle
                                                size={17}
                                                className="animate-spin"
                                            />
                                        </div>
                                    </div>
                                )}

                                <p className="text-xs leading-5 text-muted">
                                    {mensaje}
                                </p>
                            </div>
                        )}

                        {/* Botón principal */}
                        <button
                            type="submit"
                            disabled={registrando}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {registrando ? (
                                <LoaderCircle
                                    size={18}
                                    className="animate-spin"
                                />
                            ) : (
                                <UserPlus size={18} />
                            )}

                            {registrando
                                ? "Procesando..."
                                : modoRegistro === "nueva"
                                    ? "Registrar persona"
                                    : "Agregar rostro"}
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