import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState(() => {
    const guardarTodos = localStorage.getItem("todos");
    return guardarTodos ? JSON.parse(guardarTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const tareaCompletada = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const eliminarTarea = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  const actualizarTarea = (id, nuevoTexto) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: nuevoTexto } : todo)));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2x1 font-bold text-center mb-6">Lista de tareas</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          tareaCompleta={tareaCompletada}
          eliminarTarea={eliminarTarea}
          actualizarTarea={actualizarTarea}
        />
      </div>
    </div>
  );
}
export default App;
