// Importación de hooks de React para manejar estado y efectos
import { useState, useEffect } from "react";

// Importación de componentes funcionales.
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { TodoFilter } from "../components/TodoFilter";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";

// Importación de estilos.
import "./index.css";
import "./App.css";

function App() {
  /**
   *
   * Carga tareas guardadas desde el localStorage
   * Si no hay datos guaraddos o hay un error, devuelve arrays vacios
   */
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
  // Tareas activas y completadas
  const [todos, setTodos] = useState(loadTodosFromLocalStorage);
  // Filtro de visualizacion
  const [filter, setFilter] = useState("pendientes");
  // Visibilidad del popup de confirmacion
  const [showPopup, setShowPopup] = useState(false);
  // ID de la tarea a eliminar
  const [todoToDelete, setTodoToDelete] = useState(null);

  /**
   * Efecto que guarda automaticamente los cambios en "todos" en localStorage
   */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /**
   * Verifica si una tarea con el mismo texto ya existe
   * @param {string} text - Texto de la nueva tarea
   * @returns {boolean}
   */
  const isTodoExists = (text) => {
    const normalized = text.toLowerCase();
    return (
      todos.active.some((todo) => todo.text.toLowerCase() === normalized) ||
      todos.completed.some((todo) => todo.text.toLowerCase() === normalized)
    );
  };

  /**
   * Crea un nuevo objeto de tarea con datos predefinidos
   * @param {string} text - Texto de la tarea
   */
  const createTodoObject = (text) => ({
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toLocaleString(),
  });

  /**
   * Agrega una nueva tarea si no existe una igual
   * @param {string} text - Texto de la tarea
   * @returns
   */
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

  /**
   * Alterna el estado de una tarea entre activa y completada
   * @param {number} id - ID de la tarea a modificar
   */
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

  /**
   * Muestra el popup de confirmacion para eliminar una tarea
   * @param {number} id - ID de la tarea a eliminar
   */
  const deleteTodo = (id) => {
    setShowPopup(true);
    setTodoToDelete(id);
  };

  /**
   * Confirma y ejecuta la eliminacion de una tarea
   */
  const confirmDelete = () => {
    setTodos((prev) => ({
      active: prev.active.filter((todo) => todo.id !== todoToDelete),
      completed: prev.completed.filter((todo) => todo.id !== todoToDelete),
    }));
    cancelDelete();
  };

  /**
   * Cancela la operacion de eliminacion
   */
  const cancelDelete = () => {
    setShowPopup(false);
    setTodoToDelete(null);
  };

  /**
   * Retorna las tareas filtradas segun el tipo de filtro seleccionado
   * @returns {Array} - Lista de tareas filtradas
   */
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

  /**
   * Edita el texto de una tarea activa o completada
   * @param {number} id - ID de la tarea a editar
   * @param {string} newText - Nuevo texto para la tarea
   */
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
      {/* Encabezado de la app */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
        <h1 className="text-3xl font-bold text-white text-center">Mis Tareas</h1>
      </header>

      {/* Filtro de tareas */}
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

      {/* LIsta de tareas segun el filtro */}
      <TodoList
        todos={getFilteredTodos()}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />

      {/* Popup de confirmacion para eliminar una tarea */}
      {showPopup && (
        <div className="popup-background">
          <ConfirmDeletePopup onConfirm={confirmDelete} onCancel={cancelDelete} />
        </div>
      )}
    </div>
  );
}

export default App;
