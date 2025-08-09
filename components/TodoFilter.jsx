// Importa los estilos específicos para el popup de confirmación.
import "./confirmDeletePopup.css";

// Importa framer-motion para animaciones.
import { motion } from "framer-motion";

/**
 * Componente que muestra un popup de confirmación para eliminar una tarea.
 *
 * @param {Function} onConfirm - Función que se ejecuta si el usuario confirma la eliminación.
 * @param {Function} onCancel - Función que se ejecuta si el usuario cancela la eliminación.
 *
 * @returns {JSX.Element} - Popup animado con botones de confirmación y cancelar.
 */
const ConfirmDeletePopup = ({ onConfirm, onCancel }) => {
  return (
    <motion.div
      // Animaciones de entrada, render y salida del popup.
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className="pop-container"
    >
      <div className="pop-content">
        {/* Mensaje de confirmación */}
        <p>¿Estás seguro que quieres eliminar esta tarea?</p>

        {/* Botones de acción */}
        <div className="popup-buttons">
          <button
            onClick={onConfirm} // Llama a la función de confirmación.
            className="pop-button yes-button"
          >
            Si
          </button>
          <button
            onClick={onCancel} // Llama a la función de cancelación.
            className="pop-button no-button"
          >
            No
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmDeletePopup;
