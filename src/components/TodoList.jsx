import { TodoItem } from "./TodoItem";
import { AnimatePresence } from "framer-motion";

export const TodoList = ({ todos }) => {
  return (
    <div className="mt-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500 py-4"> No tenes tareas pendientes.</p>
      ) : (
        <AnimatePresence>
          {todos.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo} index={todos.length - 1 - index} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};
