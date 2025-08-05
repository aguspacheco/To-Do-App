// Ayuda a detectar problemas en la aplicación.
import { StrictMode } from "react";
// Renderiza la aplicación en el DOM.
import { createRoot } from "react-dom/client";
// Importa estilos globales.
import "./index.css";
// Importa el componente principal de la aplicación.
import App from "./App.jsx";

// Renderiza el componente App dentro de StrictMode en el elemento con id "root".
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
