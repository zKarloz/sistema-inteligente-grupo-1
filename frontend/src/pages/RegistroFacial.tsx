import { useState, type SubmitEvent } from "react";
import { UserPlus } from "lucide-react";

import CameraCapture from "../components/CameraCapture";

function RegistroFacial() {
    // Estados para guardar los datos ingresados en el formulario
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    // Guarda temporalmente la fotografía capturada
    const [imagenFacial, setImagenFacial] = useState<string | null>(null);

    // Mensaje utilizado para mostrar validaciones al usuario
    const [mensaje, setMensaje] = useState("");

    // Se ejecuta cuando el usuario envía el formulario
    function registrarPersona(evento: SubmitEvent<HTMLFormElement>) {
        // Evita que el navegador recargue la página
        evento.preventDefault();

        // Validación básica de los campos
        if (!nombre.trim() || !email.trim()) {
            setMensaje("Completa el nombre y el correo.");
            return;
        }

        // Validamos que exista una fotografía facial
        if (!imagenFacial) {
            setMensaje("Debes capturar una fotografía facial.");
            return;
        }

        // Datos que posteriormente serán enviados al backend
        const datosRegistro = {
            nombre: nombre.trim(),
            email: email.trim(),
            imagen: imagenFacial,
        };

        // Por ahora solo mostramos los datos en la consola
        console.log("Datos preparados:", datosRegistro);

        setMensaje(
            "Datos preparados correctamente. Todavía no se envían al backend.",
        );
    }

    return (
        <section>
            {/* Encabezado de la página */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">
                    Registro facial
                </h2>

                <p className="mt-2 text-gray-500">
                    Registra los datos de una persona y captura su rostro.
                </p>
            </div>

            {/* Contenedor principal */}
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* Formulario de datos personales */}
                <form
                    onSubmit={registrarPersona}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-3">
                        <UserPlus className="text-blue-600" />

                        <h3 className="text-xl font-semibold text-gray-800">
                            Datos personales
                        </h3>
                    </div>

                    {/* Campo Nombre */}
                    <div className="mt-6">
                        <label
                            htmlFor="nombre"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Nombre completo
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(evento) => setNombre(evento.target.value)}
                            placeholder="Ejemplo: Carlos Pérez"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Campo Correo */}
                    <div className="mt-5">
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Correo electrónico
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(evento) => setEmail(evento.target.value)}
                            placeholder="correo@ejemplo.com"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Mensaje de validación */}
                    {mensaje && (
                        <p className="mt-5 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                            {mensaje}
                        </p>
                    )}

                    {/* Botón para preparar el registro */}
                    <button
                        type="submit"
                        className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        Preparar registro
                    </button>
                </form>

                {/* Componente encargado de la cámara */}
                <CameraCapture onCapture={setImagenFacial} />
            </div>
        </section>
    );
}

export default RegistroFacial;