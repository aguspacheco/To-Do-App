export const TodoFilter = ({ filter, setFilter }) => {
  const filtros = ["todas", "pendientes", "completadas"];

  return (
    <div className="inline-flex items-center bg-purple-100 rounded-full p-1 shadow-inner">
      {filtros.map((filtro) => (
        <button
          key={filtro}
          onClick={() => setFilter(filtro)}
          className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 capitalize font-medium
            ${
              filter === filtro
                ? "bg-purple-600 text-white shadow-md"
                : "text-purple-700 hover:bg-white hover:text-purple-600"
            }`}
        >
          {filtro}
        </button>
      ))}
    </div>
  );
};
