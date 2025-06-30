import { useState } from "react";
import "./TodoForm.css";

export const TodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue.trim()) addTodo(inputValue);
        setInputValue("");
      }}
      className="todo-form"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Nueva tarea..."
        className="todo-input"
      />
      <button type="submit" className="todo-submit-btn">
        ➕
      </button>
    </form>
  );
};
