import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";

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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200"></div>
        <h1 className="text-xl font-semibold text-gray-800">Lista de tareas</h1>
      </div>

      <div className="p-4 border-b border-gray-200">
        <TodoForm addTodo={addTodo} />
      </div>

      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex space-x-4 text-sm">
          <span className="text-gray-600">
            Todas ({activeTodos.length + completedTodos.length})
          </span>
          <span className="text-gray-600">Completadas ({completedTodos.length})</span>
          <span className="text-gray-600">Pendientes ({activeTodos.length})</span>
        </div>
        <TodoFilter filter={filter} setFilter={setFilter} />
      </div>

      <div className="divide-y divide-gray-200">
        <TodoList
          todos={filteredTodos()}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
}

export default App;
