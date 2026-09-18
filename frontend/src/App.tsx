import { useState } from "react";

// Importa íconos de la librería lucide-react
// Se utilza cada ícono como un componente React, por ejemplo <Camera size={20} /> muestra un ícono de una cámara del tamaño indicado
import {
  BarChart3,
  Camera,
  History,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";

// Importa las páginas
import Dashboard from "./pages/Dashboard";
import RegistroFacial from "./pages/RegistroFacial";
import Reconocimiento from "./pages/Reconocimiento";
import Probabilidades from "./pages/Probabilidades";
import Historial from "./pages/Historial";

// La variable Pagina solo puede tener uno de estos 5 valores que son las páginas disponibles dentro del sistema
type Pagina =
  | "dashboard"
  | "registro"
  | "reconocimiento"
  | "probabilidades"
  | "historial";

// En html se usa "class", pero como usamos React con archivos TSX/JSX se usa "className"
// Esto <Dashboard /> le dice a React que ejecute el componente Dashboard y coloca lo que devuelve su return (lo mismo aplica para las otras páginas)

function App() {

  // paginaActual guarda el valor actual y setPaginaActual sirve para cambiarlo, por ejemplo primero abrimos la página y estamos en Dashboard, al hacer clic en otra sección nos iremos a la página de dicha sección por ejemplo RegistroFacial
  const [paginaActual, setPaginaActual] = useState<Pagina>("dashboard");

  // Dependiendo del valor de paginaActual, muestra una página diferente
  // EJEMPLO: SI paginaActual = "registro" --> mostrar <RegistroFacial />
  function mostrarPagina() {
    switch (paginaActual) {
      case "registro":
        return <RegistroFacial />;

      case "reconocimiento":
        return <Reconocimiento />;

      case "probabilidades":
        return <Probabilidades />;

      case "historial":
        return <Historial />;

      // Si ningún caso coincide, muestra Dashboard
      default:
        return <Dashboard />;
    }
  }

  // Cuando el usuario presione una sección o botón del sidebar, se establecerá la página seleccionada (setPaginaActual) y entonces la página mostrará su contenido propio (paginaActual)
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">

      {/* Encabezado principal */}
      <header className="shrink-0 border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
        <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
          Sistema Inteligente de Reconocimiento Facial
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Inteligencia Artificial, Machine Learning y Deep Learning
        </p>
      </header>

      {/* Contenedor del sidebar y contenido principal */}
      <div className="flex min-h-[calc(100vh-81px)]">

        {/* Sidebar */}
        {/* En pantallas pequeñas se contrae y muestra solo los íconos */}
        <aside className="w-20 shrink-0 border-r border-gray-200 bg-white p-3 transition-all duration-300 lg:w-64 lg:p-4">
          <nav className="space-y-2">
            {/* Dashboard */}
            <button
              type="button"
              title="Dashboard"
              aria-label="Dashboard"
              onClick={() => setPaginaActual("dashboard")}
              className={`flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 transition-colors lg:justify-start lg:px-4 ${paginaActual === "dashboard"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <LayoutDashboard
                size={20}
                className="shrink-0"
              />

              <span className="hidden lg:inline">
                Dashboard
              </span>
            </button>

            {/* Registro facial */}
            <button
              type="button"
              title="Registro facial"
              aria-label="Registro facial"
              onClick={() => setPaginaActual("registro")}
              className={`flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 transition-colors lg:justify-start lg:px-4 ${paginaActual === "registro"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <UserPlus
                size={20}
                className="shrink-0"
              />

              <span className="hidden lg:inline">
                Registro facial
              </span>
            </button>

            {/* Reconocimiento */}
            <button
              type="button"
              title="Reconocimiento"
              aria-label="Reconocimiento"
              onClick={() =>
                setPaginaActual("reconocimiento")
              }
              className={`flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 transition-colors lg:justify-start lg:px-4 ${paginaActual === "reconocimiento"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Camera
                size={20}
                className="shrink-0"
              />

              <span className="hidden lg:inline">
                Reconocimiento
              </span>
            </button>

            {/* Probabilidades */}
            <button
              type="button"
              title="Probabilidades"
              aria-label="Probabilidades"
              onClick={() =>
                setPaginaActual("probabilidades")
              }
              className={`flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 transition-colors lg:justify-start lg:px-4 ${paginaActual === "probabilidades"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <BarChart3
                size={20}
                className="shrink-0"
              />

              <span className="hidden lg:inline">
                Probabilidades
              </span>
            </button>

            {/* Historial */}
            <button
              type="button"
              title="Historial"
              aria-label="Historial"
              onClick={() => setPaginaActual("historial")}
              className={`flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 transition-colors lg:justify-start lg:px-4 ${paginaActual === "historial"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <History
                size={20}
                className="shrink-0"
              />

              <span className="hidden lg:inline">
                Historial
              </span>
            </button>
          </nav>
        </aside>

        {/* Las llaves permiten ejecutar JavaScript dentro del JSX. */}
        {/* EJEMPLO: SI paginaActual = reconocimiento --> devuelve <Reconocimiento /> --> React lo coloca dentro del <main> */}
        {/* Contenido principal */}
        {/* min-w-0 también permite funcionar correctamente al scroll de tablas */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {mostrarPagina()}
        </main>
      </div>
    </div>
  );
}

export default App;