import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";
import ConfirmDeletePopup from "./components/ConfirmDeletePopup";
import "./index.css";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      const data = saved ? JSON.parse(saved) : null;
      return {
        active: data?.active || [],
        completed: data?.completed || [],
      };
    } catch {
      return { active: [], completed: [] };
    }
  });

  const [filter, setFilter] = useState("pendientes");
  const [showPopup, setShowPopup] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const exists =
      todos.active.some((todo) => todo.text.toLowerCase() === text.toLowerCase()) ||
      todos.completed.some((todo) => todo.text.toLowerCase() === text.toLowerCase());

    if (exists) {
      alert("La tarea ya fue cargada");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos((prev) => ({
      ...prev,
      active: [...prev.active, newTodo],
    }));
  };

  const toggleComplete = (id) => {
    setTodos((prev) => {
      const activeIndex = prev.active.findIndex((todo) => todo.id === id);
      if (activeIndex >= 0) {
        const todo = prev.active[activeIndex];
        return {
          active: prev.active.filter((t) => t.id !== id),
          completed: [...prev.completed, { ...todo, completed: true }],
        };
      }

      const completedIndex = prev.completed.findIndex((todo) => todo.id === id);
      if (completedIndex >= 0) {
        const todo = prev.completed[completedIndex];
        return {
          active: [...prev.active, { ...todo, completed: false }],
          completed: prev.completed.filter((t) => t.id !== id),
        };
      }
      return prev;
    });
  };

  const deleteTodo = (id) => {
    setShowPopup(true);
    setTodoToDelete(id);
  };

  const confirmDelete = () => {
    setTodos((prev) => ({
      active: prev.active.filter((todo) => todo.id !== todoToDelete),
      completed: prev.completed.filter((todo) => todo.id !== todoToDelete),
    }));
    setShowPopup(false);
    setShowPopup(null);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setTodoToDelete(null);
  };

  const filteredTodos = () => {
    switch (filter) {
      case "completadas":
        return todos.completed;
      case "pendientes":
        return todos.active;
      case "todas":
        return [...todos.active, ...todos.completed];
      default:
        return todos.active;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-purple-200">
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Mis Tareas</h1>
        </header>

        <div className="p-6 border-b border-purple-100">
          <TodoForm addTodo={addTodo} />
        </div>

        <div className="px-6 py-4 border-b border-purple-100 bg-purple-50">
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
            activeCount={todos.active.length}
            completedCount={todos.completed.length}
          />
        </div>

        <TodoList todos={filteredTodos()} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />

        {showPopup && <ConfirmDeletePopup onConfirm={confirmDelete} onCancel={cancelDelete} />}
      </div>
    </div>
  );
}

export default App;
