import { motion } from "framer-motion";
import "./TodoItem.css";

export const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <motion.div
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

          <span className={`todo-text ${todo.completed ? "completed" : "incomplete"}`}>
            {todo.text}
          </span>
        </div>

        <button onClick={() => deleteTodo(todo.id)} className="todo-delete-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="todo-delete-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};
