/**
 * Componente que renderiza botones para filtrar las tareas
 * según su estado: todas, pendientes o completadas.
 *
 * @param {Function} setFilter - Función que establece el filtro activo.
 * @param {number} activeCount - Cantidad de tareas pendientes (por defecto 0).
 * @param {number} completedCount - Cantidad de tareas completadas (por defecto 0).
 *
 * @returns {JSX.Element} - Grupo de botones para seleccionar el filtro.
 */
export const TodoFilter = ({ setFilter, activeCount = 0, completedCount = 0 }) => {
  // Definición de las opciones de filtro y sus etiquetas dinámicas.
  const filterOptions = [
    {
      type: "todas",
      // Total de tareas.
      label: `Todas: ${activeCount + completedCount}`,
    },
    {
      type: "pendientes",
      // Solo pendientes.
      label: `Pendientes: ${activeCount}`,
    },
    {
      type: "completadas",
      // Solo completadas.
      label: `Completadas: ${completedCount}`,
    },
  ];

  return (
    <div className="flex justify-center flex-wrap gap-2">
      {filterOptions.map((option) => (
        <button
          // Identificador único para React.
          key={option.type}
          // Cambia el filtro activo.
          onClick={() => setFilter(option.type)}
          className="px-4 py-2 text-sm rounded-full font-medium transition-colors button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
