import { TodoItem } from "./TodoItem";
import { AnimatePresence } from "framer-motion";

export const TodoList = ({ todos, tareaCompleta, eliminarTarea, actualizarTarea }) => {
  return (
    <div className="mt-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500 py-400"> No tenes tareas pendientes.</p>
      ) : (
        <AnimatePresence>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              tareaCompleta={tareaCompleta}
              eliminarTarea={eliminarTarea}
              actualizarTarea={actualizarTarea}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};
