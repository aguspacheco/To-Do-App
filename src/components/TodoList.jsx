import { TodoItem } from "./TodoItem";
import { AnimatePresence } from "framer-motion";

export const TodoList = ({ todos, toggleComplete, deleteTodo, updateTodo }) => {
  return (
    <div className="mt-4">
      <AnimatePresence>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
