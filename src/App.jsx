// Importación de hooks de React.
import { useState, useEffect } from "react";

// Importación de componentes.
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { TodoFilter } from "../components/TodoFilter";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";

// Importación de estilos.
import "./index.css";
import "./App.css";

function App() {
  // Carga tareas desde localStorage.
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

  // Estado principal de la aplicación.
  const [todos, setTodos] = useState(loadTodosFromLocalStorage);
  const [filter, setFilter] = useState("pendientes");
  const [showPopup, setShowPopup] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // Guarda tareas en localStorage cada vez que cambian.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Verifica si una tarea ya existe.
  const isTodoExists = (text) => {
    const normalized = text.toLowerCase();
    return (
      todos.active.some((todo) => todo.text.toLowerCase() === normalized) ||
      todos.completed.some((todo) => todo.text.toLowerCase() === normalized)
    );
  };

  // Crea un objeto de tarea nuevo.
  const createTodoObject = (text) => ({
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toLocaleString(),
  });

  // Agrega una nueva tarea.
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

  // Alterna entre tarea completada y pendiente.
  const toggleComplete = (id) => {
    setTodos((prev) => {
      const isActive = prev.active.find((todo) => todo.id === id);
      const isCompleted = prev.completed.find((todo) => todo.id === id);

      if (isActive) {
        return {
          active: prev.active.filter((t) => t.id !== id),
          completed: [...prev.completed, { ...isActive, completed: true }],
        };
      }

      if (isCompleted) {
        return {
          active: [...prev.active, { ...isCompleted, completed: false }],
          completed: prev.completed.filter((t) => t.id !== id),
        };
      }

      return prev;
    });
  };

  // Muestra el popup de confirmación para eliminar una tarea.
  const deleteTodo = (id) => {
    setShowPopup(true);
    setTodoToDelete(id);
  };

  // Confirma la eliminación de una tarea.
  const confirmDelete = () => {
    setTodos((prev) => ({
      active: prev.active.filter((todo) => todo.id !== todoToDelete),
      completed: prev.completed.filter((todo) => todo.id !== todoToDelete),
    }));
    cancelDelete();
  };

  // Cancela la eliminación.
  const cancelDelete = () => {
    setShowPopup(false);
    setTodoToDelete(null);
  };

  // Devuelve las tareas según el filtro activo.
  const getFilteredTodos = () => {
    switch (filter) {
      case "completadas":
        return todos.completed;
      case "todas":
        return [...todos.active, ...todos.completed];
      case "pendientes":
      default:
        return todos.active;
    }
  };

  // Edita una tarea.
  const editTodo = (id, newText) => {
    const updateList = (list) =>
      list.map((todo) =>
        todo.id === id ? { ...todo, text: newText, createdAt: new Date().toLocaleString() } : todo
      );

    setTodos((prev) => ({
      active: updateList(prev.active),
      completed: updateList(prev.completed),
    }));
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
        todos={getFilteredTodos()}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />

      {showPopup && (
        <div className="popup-background">
          <ConfirmDeletePopup onConfirm={confirmDelete} onCancel={cancelDelete} />
        </div>
      )}
    </div>
  );
}

export default App;
