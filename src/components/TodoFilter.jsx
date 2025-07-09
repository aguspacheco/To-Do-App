export const TodoFilter = ({ filter, setFilter, activeCount = 0, completedCount = 0 }) => {
  const filterOptions = [
    {
      type: "todas",
      label: `Todas: ${activeCount + completedCount}`,
    },
    {
      type: "pendientes",
      label: `Pendientes: ${activeCount}`,
    },
    {
      type: "compeltadas",
      label: `Completadas: ${completedCount}`,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => setFilter(option.type)}
          className={`px-4 py-2 text-sm rounded-full font.medium transition-colors
            ${
              filter === option.type
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 hover:bg-purple-50"
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
