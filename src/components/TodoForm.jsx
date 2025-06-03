import { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="¿Que necesitas hacer?"
        className="px-4 py-2 border rounded-lg focus:outline:none focus:ring-2 focus:ring-blue-500 flex-grow"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Agregar
      </button>
    </form>
  );
};
