import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";
import ConfirmDeletePopup from "./components/ConfirmDeletePopup";
import "./index.css";
import "./App.css";

function App() {
  const loadTodosFromLocalStorage = () => {
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
  };

  const [todos, setTodos] = useState(() => loadTodosFromLocalStorage());
  const [filter, setFilter] = useState("pendientes");
  const [showPopup, setShowPopup] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (isTodoExists(text)) {
      alert("La tarea ya fue cargada");
      return;
    }

    const newTodo = createTodoObject(text);
    setTodos((prev) => ({
      ...prev,
      active: [...prev.active, newTodo],
    }));
  };

  const isTodoExists = (text) => {
    const normalizedText = text.toLowerCase();
    return (
      todos.active.some((todo) => todo.text.toLowerCase() === normalizedText) ||
      todos.completed.some((todo) => todo.text.toLowerCase() === normalizedText)
    );
  };

  const createTodoObject = (text) => ({
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toLocaleString(),
  });

  const toggleComplete = (id) => {
    setTodos((prev) => {
      const activeTodo = prev.active.find((todo) => todo.id === id);
      if (activeTodo) {
        return moveTodoToCompleted(prev, activeTodo, id);
      }

      const completedTodo = prev.completed.find((todo) => todo.id === id);
      if (completedTodo) {
        return moveTodoToActive(prev, completedTodo, id);
      }

      return prev;
    });
  };

  const moveTodoToCompleted = (prev, todo, id) => ({
    active: prev.active.filter((t) => t.id !== id),
    completed: [...prev.completed, { ...todo, completed: true }],
  });

  const moveTodoToActive = (prev, todo, id) => ({
    active: [...prev.active, { ...todo, completed: false }],
    completed: prev.completed.filter((t) => t.id !== id),
  });

  const deleteTodo = (id) => {
    setShowPopup(true);
    setTodoToDelete(id);
  };

  const confirmDelete = () => {
    setTodos((prev) => ({
      active: prev.active.filter((todo) => todo.id !== todoToDelete),
      completed: prev.completed.filter((todo) => todo.id !== todoToDelete),
    }));
    cancelDelete();
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

  const editTodo = (id, newText) => {
    setTodos((prev) => {
      const activeTodoIndex = prev.active.findIndex((todo) => todo.id === id);
      if (activeTodoIndex >= 0) {
        const updatedActiveTodos = [...prev.active];
        updatedActiveTodos[activeTodoIndex] = {
          ...updatedActiveTodos[activeTodoIndex],
          text: newText,
          createdAt: new Date().toLocaleString(),
        };
        return { ...prev, active: updatedActiveTodos };
      }

      const completedTodoIndex = prev.completed.findIndex((todo) => todo.id === id);
      if (completedTodoIndex >= 0) {
        const updatedCompletedTodos = [...prev.completed];
        updatedCompletedTodos[completedTodoIndex] = {
          ...updatedCompletedTodos[completedTodoIndex],
          text: newText,
          createdAt: new Date().toLocaleString(),
        };
        return { ...prev, completed: updatedCompletedTodos };
      }

      return prev;
    });
  };

  return (
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

      <TodoList
        todos={filteredTodos()}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />

      {showPopup && <ConfirmDeletePopup onConfirm={confirmDelete} onCancel={cancelDelete} />}
    </div>
  );
}

export default App;
