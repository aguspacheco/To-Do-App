import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const TodoItem = ({ todo, toggleComplete, deleteTodo, updateTodo, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editarTexto, setEditarTexto] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editarTexto.trim() === "") {
      deleteTodo(todo.id);
    } else {
      updateTodo(todo.id, editarTexto);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: -20 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between p-3 border-b hover:bg-gray-50"
    >
      <div className="flex items-center space-x-3    flex-grow">
        <span className="text-gray-400 text-sm w-6">{index + 1}.</span>
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.input
              key="edit-input"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, backgroundColor: "#f0f9ff" }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              type="text"
              value={editarTexto}
              onChange={(e) => setEditarTexto(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
              className="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 flex-grow"
            />
          ) : (
            <motion.span
              key="text-display"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onDoubleClick={handleEdit}
              className={`${
                todo.completed ? "line-through text-gray-400" : "text-gray-800"
              } flex-grow cursor-pointer`}
            >
              {todo.text}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => toggleComplete(todo.id)}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
        >
          ✅ Completada
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
        >
          🗑️ Eliminar
        </button>
      </div>
    </motion.div>
  );
};
