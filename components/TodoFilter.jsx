export const TodoFilter = ({ setFilter, activeCount = 0, completedCount = 0 }) => {
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
      type: "completadas",
      label: `Completadas: ${completedCount}`,
    },
  ];

  return (
    <div className="flex justify-center flex-wrap gap-2">
      {filterOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => setFilter(option.type)}
          className="px-4 py-2 text-sm rounded-full font-medium transition-colors button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
