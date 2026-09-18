import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, RotateCcw } from "lucide-react";

// Datos que el componente padre puede enviar a CameraCapture
interface CameraCaptureProps {
    onCapture: (imagen: string | null) => void;
}

function CameraCapture({ onCapture }: CameraCaptureProps) {
    // Referencia directa al componente Webcam
    const webcamRef = useRef<Webcam>(null);

    // Guarda temporalmente la fotografía tomada
    const [imagenCapturada, setImagenCapturada] = useState<string | null>(null);

    // Captura una fotografía utilizando la cámara
    function capturarImagen() {
        const imagen = webcamRef.current?.getScreenshot();

        if (imagen) {
            setImagenCapturada(imagen);

            // Envía la fotografía al componente RegistroFacial
            onCapture(imagen);
        }
    }

    // Elimina la fotografía para permitir una nueva captura
    function repetirCaptura() {
        setImagenCapturada(null);
        onCapture(null);
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            {/* Encabezado */}
            <div className="flex items-center gap-3">
                <Camera className="text-blue-600" />

                <h3 className="text-xl font-semibold text-gray-800">
                    Captura facial
                </h3>
            </div>

            <p className="mt-2 text-sm text-gray-500">
                Coloca tu rostro frente a la cámara y captura una fotografía.
            </p>

            {/* Área de cámara o fotografía capturada */}
            {/* ¿NO existe imagenCapturada? */}
            {/* SI --> Mostrar cámara */}
            {/* NO --> Mostrar fotografía */}
            <div className="mt-6 overflow-hidden rounded-xl bg-gray-900">
                {!imagenCapturada ? (
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            facingMode: "user",
                        }}
                        className="w-full"
                    />
                ) : (
                    <img
                        src={imagenCapturada}
                        alt="Rostro capturado"
                        className="w-full"
                    />
                )}
            </div>

            {/* Botones de la cámara */}
            {/* ¿NO existe imagenCapturada? */}
            {/* SI --> Mostrar botón [ Capturar fotografía ] */}
            {/* NO --> Mostrar botón [ Repetir fotografía ] */}
            {!imagenCapturada ? (
                <button
                    type="button"
                    onClick={capturarImagen}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
                >
                    <Camera size={20} />
                    Capturar fotografía
                </button>
            ) : (
                <button
                    type="button"
                    onClick={repetirCaptura}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
                >
                    <RotateCcw size={20} />
                    Repetir fotografía
                </button>
            )}
        </div>
    );
}

export default CameraCapture;