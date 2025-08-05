// Importo hooks de React para manejar el estado y efectos secundarios.
import { useState, useEffect } from "react";
// Importo componentes para el formulario, lista y filtro de tareas.
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { TodoFilter } from "../components/TodoFilter";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";
// Importo estilos globales de la aplicación.
import "./index.css";
import "./App.css";

function App() {
  // Carga las tareas desde el almacenamiento local.
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

  // Estado para las tareas, filtro, popup y tareas a eliminar.
  const [todos, setTodos] = useState(() => loadTodosFromLocalStorage());
  const [filter, setFilter] = useState("pendientes");
  const [showPopup, setShowPopup] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // Efecto para guardar las tareas en el almacenamiento local cuando cambian.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Función que agrega una nueva tarea.
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

  // Función que verifica si una tarea ya existe.
  const isTodoExists = (text) => {
    const normalizedText = text.toLowerCase();
    return (
      todos.active.some((todo) => todo.text.toLowerCase() === normalizedText) ||
      todos.completed.some((todo) => todo.text.toLowerCase() === normalizedText)
    );
  };

  // Función que crea un objeto de tarea.
  const createTodoObject = (text) => ({
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toLocaleString(),
  });

  // Función que alterna el estado de completado de una tarea.
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

  // Función que mueve una tarea a completadas.
  const moveTodoToCompleted = (prev, todo, id) => ({
    active: prev.active.filter((t) => t.id !== id),
    completed: [...prev.completed, { ...todo, completed: true }],
  });

  // Función que mueve una tarea a activas
  const moveTodoToActive = (prev, todo, id) => ({
    active: [...prev.active, { ...todo, completed: false }],
    completed: prev.completed.filter((t) => t.id !== id),
  });

  // Funcion que elimina una tarea
  const deleteTodo = (id) => {
    setShowPopup(true);
    setTodoToDelete(id);
  };

  // Funcion para confirmar la eliminacion de una tarea
  const confirmDelete = () => {
    setTodos((prev) => ({
      active: prev.active.filter((todo) => todo.id !== todoToDelete),
      completed: prev.completed.filter((todo) => todo.id !== todoToDelete),
    }));
    cancelDelete();
  };

  // Funcion para cancelar la eliminacion de una tarea
  const cancelDelete = () => {
    setShowPopup(false);
    setTodoToDelete(null);
  };

  // Funcion para filter las tareas segun el estado
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

  // Funcion para editar el texto de una tarea
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

      {showPopup && (
        <div className="popup-background">
          <ConfirmDeletePopup onConfirm={confirmDelete} onCancel={cancelDelete} />
        </div>
      )}
    </div>
  );
}

export default App;
