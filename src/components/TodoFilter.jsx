export const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex-justify-center space-x-2 my-4">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded-md ${
          filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Mostrar todas
      </button>
      <button
        onClick={() => setFilter("Completed")}
        className={`px-3 py-1 rounded-md ${
          filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Pendientes
      </button>
    </div>
  );
};
