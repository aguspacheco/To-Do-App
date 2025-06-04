export const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b hover:bg-gray-50">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="h-5 w-5 rounded text-blue-500 focus:ring-blue-400"
        />
        <span className={`${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
          {todo.text}
        </span>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">
        🗑️
      </button>
    </div>
  );
};
