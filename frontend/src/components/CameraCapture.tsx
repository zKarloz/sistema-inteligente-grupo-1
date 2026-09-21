import { useRef, useState, type ChangeEvent } from "react";
import Webcam from "react-webcam";
import { Camera, CheckCircle2, ImagePlus, RotateCcw, ScanFace } from "lucide-react";

// Datos que el componente envía hacia la página padre
interface CameraCaptureProps {
    onCapture: (imagen: string | null) => void;
}

function CameraCapture({
    onCapture,
}: CameraCaptureProps) {
    // Referencia directa al componente Webcam
    const webcamRef = useRef<Webcam>(null);

    // Imagen capturada o seleccionada
    const [imagenCapturada, setImagenCapturada] =
        useState<string | null>(null);

    // Captura una fotografía utilizando la cámara
    function capturarImagen() {
        const imagen =
            webcamRef.current?.getScreenshot();

        if (imagen) {
            setImagenCapturada(imagen);
            onCapture(imagen);
        }
    }

    // Permite eliminar la captura y volver a usar la cámara
    function repetirCaptura() {
        setImagenCapturada(null);
        onCapture(null);
    }

    // Convierte una imagen seleccionada en una Data URL
    function seleccionarImagen(
        evento: ChangeEvent<HTMLInputElement>,
    ) {
        const archivo = evento.target.files?.[0];

        if (!archivo) {
            return;
        }

        const lector = new FileReader();

        lector.onload = () => {
            const imagen = lector.result;

            if (typeof imagen === "string") {
                setImagenCapturada(imagen);
                onCapture(imagen);
            }
        };

        lector.readAsDataURL(archivo);
    }

    return (
        <div>
            {/* Área principal de cámara o fotografía */}
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl bg-brand-950">
                {!imagenCapturada ? (
                    <>
                        {/* Cámara */}
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                facingMode: "user",
                            }}
                            className="h-full min-h-[320px] w-full object-cover"
                        />

                        {/* Guía visual para centrar el rostro */}
                        <div
                            className="pointer-events-none absolute inset-0 flex items-center justify-center"
                            aria-hidden="true"
                        >
                            <div className="flex h-48 w-40 items-center justify-center rounded-[40%] border border-brand-300/60">
                                <ScanFace
                                    size={58}
                                    strokeWidth={1}
                                    className="text-brand-200/40"
                                />
                            </div>
                        </div>

                        {/* Estado de la cámara */}
                        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-brand-950/80 px-3 py-2 text-xs text-brand-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />

                            Cámara activa
                        </div>
                    </>
                ) : (
                    <>
                        {/* Fotografía capturada */}
                        <img
                            src={imagenCapturada}
                            alt="Rostro preparado para el registro"
                            className="h-full min-h-[320px] w-full object-contain"
                        />

                        {/* Confirmación */}
                        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-brand-950/80 px-3 py-2 text-xs text-brand-100">
                            <CheckCircle2 size={14} />

                            Imagen preparada
                        </div>
                    </>
                )}
            </div>

            {/* Acciones disponibles */}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
                {!imagenCapturada ? (
                    <>
                        {/* Capturar desde webcam */}
                        <button
                            type="button"
                            onClick={capturarImagen}
                            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                        >
                            <Camera size={17} />

                            Capturar rostro
                        </button>

                        {/* Seleccionar una imagen del dispositivo */}
                        <label className="relative flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface">
                            <ImagePlus
                                size={17}
                                className="text-brand"
                            />

                            Subir imagen

                            <input
                                type="file"
                                accept="image/jpeg,image/png"
                                onChange={seleccionarImagen}
                                className="absolute inset-0 cursor-pointer opacity-0"
                            />
                        </label>
                    </>
                ) : (
                    /* Volver a realizar la captura */
                    <button
                        type="button"
                        onClick={repetirCaptura}
                        className="flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface"
                    >
                        <RotateCcw size={17} />

                        Repetir captura
                    </button>
                )}
            </div>
        </div>
    );
}

export default CameraCapture;