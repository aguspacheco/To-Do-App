import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <div className="mt-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500 py-400"> No tenes tareas pendientes.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </div>
  );
};
