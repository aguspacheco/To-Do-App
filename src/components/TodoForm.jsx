import { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue.trim()) addTodo(inputValue);
        setInputValue("");
      }}
      className="flex"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Nueva tarea..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white"
      />
      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-r-lg hover:from-blue-600 hover:to-purple-600 transition font-semibold shadow-md">
        ➕
      </button>
    </form>
  );
};
