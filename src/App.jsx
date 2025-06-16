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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md overflow-hidden">
        <h1 className="text-2xl font-bold text-center mb-6">Lista de tareas</h1>
        <TodoForm addTodo={addTodo} />
        <TodoFilter filter={filter} setFilter={setFilter} />
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
