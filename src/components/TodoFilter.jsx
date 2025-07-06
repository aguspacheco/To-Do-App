export const TodoFilter = ({
  filter,
  setFilter,
  counts = {
    all: 0,
    pending: 0,
    completed: 0,
  },
}) => {
  const filters = [
    { type: "todas", label: `Todas: ${counts.all}` },
    { type: "pendientes", label: `Pendientes: ${counts.pending}` },
    { type: "completadas", label: `Completadas: ${counts.completed}` },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center bg-purple-50 p-2 rounded-lg">
      {filters.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${
              filter === type
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white text-purple-600 border border-purple-200 hover:bg-purple-100"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
