import { useState } from "react";
import { motion } from "framer-motion";

export const TodoItem = ({ todo, tareaCompleta, eliminarTarea, actualizarTarea }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editarTexto, setEditarTexto] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editarTexto.trim() === "") {
      eliminarTarea(todo.id);
    } else {
      actualizarTarea(todo.id, editarTexto);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-3 border-b hover:bg-gray-50"
    >
      <div className="flex items-center space-x-2 flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => tareaCompleta(todo.id)}
          className="h-5 w-5 rounded text-blue-500 focus:ring-blue-400"
        />

        {isEditing ? (
          <input
            type="text"
            value={editarTexto}
            onChange={(e) => setEditarTexto(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue500 flex-grow"
          />
        ) : (
          <span
            onDoubleClick={handleEdit}
            className={`${
              todo.completed ? "line-through text-gray-400" : "text-gray-800"
            } flex-grow cursor.pointer`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <button
        onClick={() => eliminarTarea(todo.id)}
        className="text-red-500 hover:text.red-700 ml-2"
      >
        🗑️
      </button>
    </motion.div>
  );
};
