import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";
import "./index.css";

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
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-2xl font-bold text-white tracking-wide">Lista de Tareas</h1>
        </header>

        <div className="p-6 border-b border-gray-100">
          <TodoForm addTodo={addTodo} />
        </div>

        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>Todas ({activeTodos.length + completedTodos.length})</span>
            <span>Completadas ({completedTodos.length})</span>
            <span>Pendientes ({activeTodos.length})</span>
          </div>
          <TodoFilter filter={filter} setFilter={setFilter} />
        </div>

        <div className="divide-y divide-gray-100">
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
