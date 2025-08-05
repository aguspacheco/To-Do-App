import { TodoItem } from "./TodoItem";
import "./TodoList.css";
export const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="no-tasks">No hay tareas para mostrar</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
};
