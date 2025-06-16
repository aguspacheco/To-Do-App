export const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center space-x-2 my-4">
      <button
        onClick={() => setFilter("pendientes")}
        className={`px-3 py-1 rounded-md ${
          filter === "pendientes" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Pendientes
      </button>
      <button
        onClick={() => setFilter("completadas")}
        className={`px-3 py-1 rounded-md ${
          filter === "completadas" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Completadas
      </button>
      <button
        onClick={() => setFilter("todas")}
        className={`px-3 py-1 rounded-md ${
          filter === "todas" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Todas
      </button>
    </div>
  );
};
