import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Importa Sidebar (panel lateral izquierdo de opciones que llevan a las 5 páginas principales)
// Importa Topbar (Cabezera del contenido de la página seleccionada del Sidebar)
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

// Importa las 5 páginas principales
import Dashboard from "./pages/Dashboard";
import RegistroFacial from "./pages/RegistroFacial";
import Reconocimiento from "./pages/Reconocimiento";
import Probabilidades from "./pages/Probabilidades";
import Historial from "./pages/Historial";

function App() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <div className="flex min-h-screen">
        {/* Navegación lateral */}
        <Sidebar />

        {/* Área principal */}
        <div className="min-w-0 flex flex-1 flex-col">
          {/* Barra superior */}
          <Topbar />

          {/* Rutas del sistema */}
          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/registro"
                element={<RegistroFacial />}
              />

              <Route
                path="/reconocimiento"
                element={<Reconocimiento />}
              />

              <Route
                path="/probabilidades"
                element={<Probabilidades />}
              />

              <Route
                path="/historial"
                element={<Historial />}
              />

              {/* Si la URL no existe, vuelve al Dashboard */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </main>

          {/* Pie de página */}
          <footer className="flex flex-col gap-1 px-4 pb-6 text-xs text-muted sm:px-6 lg:flex-row lg:justify-between lg:px-8">
            <span>
              Sistema inteligente de reconocimiento facial
            </span>

            <span>
              Frontend · React + TypeScript
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;