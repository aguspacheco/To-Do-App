import { TodoItem } from "./TodoItem";
import { AnimatePresence } from "framer-motion";
import "./TodoList.css";

export const TodoList = ({ todos, toggleComplete, deleteTodo, updateTodo }) => {
  return (
    <div className="todo-list-container">
      <AnimatePresence>
        {todos.length > 0 ? (
          <div className="todo-list-animation-container">
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
          </div>
        ) : (
          <p className="todo-list-empty-message">No hay tareas para mostrar</p>
        )}
      </AnimatePresence>
    </div>
  );
};
