import { useState } from "react";
import { TodoForm } from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2x1 font-bold text-center mb-6">Lista de tareas</h1>
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
