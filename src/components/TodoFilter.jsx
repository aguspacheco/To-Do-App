export const TodoFilter = ({ filter, setFilter }) => {
  const filtros = ["todas", "pendientes", "completadas"];

  return (
    <div className="inline-flex items-center bg-gray-100 rounded-full p-1 shadow-inner">
      {filtros.map((filtro) => (
        <button
          key={filtro}
          onClick={() => setFilter(filtro)}
          className={`px-4 py-1.5 text-sm rounded-full transition-colors duration-200 capitalize
            ${
              filter === filtro
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-white hover:text-blue-600"
            }`}
        >
          {filtro}
        </button>
      ))}
    </div>
  );
};
