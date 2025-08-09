// Importa el componente TodoItem, que representa una tarea individual en la lista
import { TodoItem } from "./TodoItem";

// Importa los estilos especificos para la lista de tareas
import "./TodoList.css";

/**
 * Componente que muestra la lista de tareas
 *
 * @param {Array} todos - Lista de tareas a mostrar
 * @param {Function} toggleComplete - Funcion para marcar o desmarcar una tarea como completada
 * @param {Function} deleteTodo - Funcion para eliminar una tarea
 * @param {Function} editTodo - Funcion para editar el texto de una tarea
 * @returns {JSX.Element} - Lista de tareas renderizada
 */
export const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="todo-list">
      {/* Si no hay tareas, se muestra un mensaje */}
      {todos.length === 0 ? (
        <p className="no-tasks">No hay tareas para mostrar</p>
      ) : (
        // Si hay tareas, se recorren y renderiza un TodoItem por cada una
        todos.map((todo) => (
          <TodoItem
            // Clave unica para que React optimice el renderizado
            key={todo.id}
            // Objeto con los datos de la tarea
            todo={todo}
            // Accion que alterna el completado
            toggleComplete={toggleComplete}
            // Accion que elimina una tarea
            deleteTodo={deleteTodo}
            // Accion que edita el texto
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
};
