import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";
import "./index.css";
import "./App.css";

function App() {
  const [activeTodos, setActiveTodos] = useState(() => {
    const saved = localStorage.getItem("activeTodos");
    return saved ? JSON.parse(saved) : [];
  });

  const [completedTodos, setCompletedTodos] = useState(() => {
    const saved = localStorage.getItem("completedTodos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("pendientes");

  useEffect(() => {
    localStorage.setItem("activeTodos", JSON.stringify(activeTodos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [activeTodos, completedTodos]);

  const toggleComplete = (id) => {
    const todoIndex = activeTodos.findIndex((todo) => todo.id === id);

    if (todoIndex >= 0) {
      const todo = activeTodos[todoIndex];
      setCompletedTodos([
        ...completedTodos,
        { ...todo, completed: true, completedAt: new Date().toISOString() },
      ]);
      setActiveTodos(activeTodos.filter((todo) => todo.id !== id));
    } else {
      const todo = completedTodos.find((t) => t.id === id);
      if (todo) {
        setActiveTodos([...activeTodos, { ...todo, completed: false }]);
        setCompletedTodos(completedTodos.filter((t) => t.id !== id));
      }
    }
  };

  const filteredTodos = () => {
    switch (filter) {
      case "completadas":
        return completedTodos;
      case "pendientes":
        return activeTodos;
      case "todas":
        return [...activeTodos, ...completedTodos];
      default:
        return activeTodos;
    }
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setActiveTodos([...activeTodos, newTodo]);
  };

  const deleteTodo = (id) => {
    setActiveTodos(activeTodos.filter((todo) => todo.id !== id));
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, nuevoTexto) => {
    setActiveTodos(
      activeTodos.map((todo) => (todo.id === id ? { ...todo, text: nuevoTexto } : todo))
    );
    setCompletedTodos(
      completedTodos.map((todo) => (todo.id === id ? { ...todo, text: nuevoTexto } : todo))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-purple-200">
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center tracking-tight">Mis Tareas</h1>
          <p className="text-purple-100 text-center mt-1">Organiza tu día con eficiencia</p>
        </header>

        <div className="p-6 border-b border-purple-100">
          <TodoForm addTodo={addTodo} />
        </div>

        <div className="px-6 py-4 border-b border-purple-100 bg-purple-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4 text-sm">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              Todas: {activeTodos.length + completedTodos.length}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              Completadas: {completedTodos.length}
            </span>
            <span className="bg-amber-100 text-amber-800 px-1 py-3 rounded-full">
              Pendientes: {activeTodos.length}
            </span>
          </div>
          <TodoFilter filter={filter} setFilter={setFilter} />
        </div>

        <div className="divide-y divide-purple-100">
          <TodoList
            todos={filteredTodos()}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
