import { useState } from "react";
import "./TodoFilter";

export const TodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribi una nueva tarea..."
        className="todo-input"
      />
      <button type="submit" className="todo-submit">
        ➕
      </button>
    </form>
  );
};
