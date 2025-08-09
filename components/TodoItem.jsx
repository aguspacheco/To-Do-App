// Importa el hook useState para manejar el estado local del componente
import { useState } from "react";
// Importa la libreria framer-motion para animaciones
import { motion } from "framer-motion";
// Importa los estilos especificos del componente
import "./TodoItem.css";

/**
 * Componente que representa una tarea individual
 *
 * @param {Object} todo - Objeto que tiene los datos de la tarea.
 * @param {number} todo.id - ID unico de la tarea
 * @param {string} todo.text - Texto descriptivo de la tarea
 * @param {boolean} todo.completed - Estado de finalizacion de la tarea
 * @param {string} todo.createdAt - Fecha y hora en que se creo
 * @param {Function} toogleComplete - Funcion para alternar el estado de completado
 * @param {Function} deleteTodo - Funcion para eliminar la tarea
 * @param {Function} editTodo - Funcion para editar el texto de la tarea
 *
 * @returns {JSX.Element} - Elemento JSX que muestra la tarea
 */
export const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  // Estado para controlar si el item esta en modo edicion
  const [isEditing, setIsEditing] = useState(false);
  // Estado local para almacenar el texto mientras se edita
  const [editText, setEditText] = useState(todo.text);

  /**
   * Guarda los cambios en el texto y sale del modo edicion
   */
  const handleEdit = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <motion.div
      // Animacion de entrada, actualizacion y salida
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="todo-item"
    >
      <div className="todo-content">
        <div className="todo-text-container">
          <button
            onClick={() => toggleComplete(todo.id)}
            className={`todo-checkbox ${todo.completed ? "completed" : "incomplete"}`}
          >
            {todo.completed && "✔"}
          </button>

          {/* Si está en modo edición, muestra un input, si no, muestra el texto */}
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEdit}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleEdit();
              }}
              className="todo-edit-input"
            />
          ) : (
            <span className={`todo-text ${todo.completed ? "completed" : "incomplete"}`}>
              {todo.text}
            </span>
          )}
        </div>

        {/* Botones de acciones: editar y eliminar */}
        <div className="todo-actions">
          <button onClick={() => setIsEditing(!isEditing)} className="todo-edit-btn">
            ✏️
          </button>
          <button onClick={() => deleteTodo(todo.id)} className="todo-delete-btn">
            🗑️
          </button>
        </div>
      </div>

      {/* Fecha de creación de la tarea */}
      <div className="todo-itemstamp">
        <small>Creado el: {todo.createdAt}</small>
      </div>
    </motion.div>
  );
};
