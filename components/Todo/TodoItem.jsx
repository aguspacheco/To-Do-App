import { useState } from "react";
import { motion } from "framer-motion";
import "./TodoItem.css";

export const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

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

        <div className="todo-actions">
          <button onClick={() => setIsEditing(!isEditing)} className="todo-edit-btn">
            ✏️
          </button>
          <button onClick={() => deleteTodo(todo.id)} className="todo-delete-btn">
            🗑️
          </button>
        </div>
      </div>

      <div className="todo-itemstamp">
        <small>Creado el: {todo.createdAt}</small>
      </div>
    </motion.div>
  );
};
