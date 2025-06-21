export const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex space-x-1 bg-gray-100 rounded-md p-1">
      {["todas", "pendientes", "completadas"].map((filtro) => (
        <button
          key={filtro}
          onClick={() => setFilter("filtro")}
          className={`px-3 py-1 text-xs rounded-md ${
            filter === filtro
              ? "bg-white shadow-sm text-blue-600 font-medium"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          {filtro.charAt(0).toUpperCase() + filtro.slice(1)}
        </button>
      ))}
    </div>
  );
};
