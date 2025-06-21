import { useState } from "react";
import { motion } from "framer-motion";

export const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="px-4 py-3 hover:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-grow">
          <button
            onClick={() => toggleComplete(todo.id)}
            className={`w-5 h-5 rounded border flex items-center justify-center ${
              todo.completed
                ? "bg-green-100 border-green-300 text-green-600"
                : `border-gray-300 hover:border-blue-400`
            }`}
          >
            {todo.completed && "✔"}
          </button>

          <span
            className={`flex-grow ${
              todo.completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {todo.text}
          </span>
        </div>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenood"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};
