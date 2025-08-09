// Importa el hook useState para manejar el estado local del input.
import { useState } from "react";

// Importa los estilos específicos del formulario de tareas.
import "./TodoForm.css";

/**
 * Componente que renderiza un formulario para agregar nuevas tareas.
 *
 * @param {Function} addTodo - Función que recibe el texto ingresado y agrega una nueva tarea.
 *
 * @returns {JSX.Element} - Formulario con input y botón de envío.
 */
export const TodoForm = ({ addTodo }) => {
  // Estado para controlar el valor actual del campo de texto.
  const [inputValue, setInputValue] = useState("");

  /**
   * Maneja el evento de envío del formulario.
   * Evita el comportamiento por defecto, valida el contenido
   * y llama a `addTodo` con el texto ingresado.
   *
   * @param {Event} e - Evento de formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Si el input no está vacío, agrega la tarea y limpia el campo.
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {/* Campo de texto para escribir la nueva tarea */}
      <input
        type="text"
        value={inputValue} // Estado controlado
        onChange={(e) => setInputValue(e.target.value)} // Actualiza el estado al escribir
        placeholder="Escribi una nueva tarea..."
        className="todo-input"
      />

      {/* Botón para enviar la nueva tarea */}
      <button type="submit" className="todo-submit">
        ➕
      </button>
    </form>
  );
};
