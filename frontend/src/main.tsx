// Herramiente de React que ayuda a detectar algunos problemas durante el desarrollo
import { StrictMode } from 'react'

// Permite insertar nuestra aplicación React dentro del HTML
import { createRoot } from 'react-dom/client'

// Carga estilos generales
import './index.css'

// Importa nuestro componente principal
import App from './App.tsx'

// Busca el div de id="root" del index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Muestra el componente App */}
    <App />
  </StrictMode>,
)
