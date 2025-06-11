import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";

function App() {
  const [todos, setTodos] = useState(() => {
    const guardarTodos = localStorage.getItem("todos");
    return guardarTodos ? JSON.parse(guardarTodos) : [];
  });

  const [filter, setFilter] = useState("none");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completada") return todo.completed;
    if (filter === "pendiente") return !todo.completed;
    if (filter === "all") return true;
    return false;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
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
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md overflow-hidden">
        <h1 className="text-2x1 font-bold text-center mb-6">Lista de tareas</h1>
        <TodoForm addTodo={addTodo} />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList
          todos={filteredTodos}
          tareaCompleta={tareaCompletada}
          eliminarTarea={eliminarTarea}
          actualizarTarea={actualizarTarea}
        />
      </div>
    </div>
  );
}
export default App;
