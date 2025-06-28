export const TodoFilter = ({ filter, setFilter }) => {
  const filtros = ["todas", "pendientes", "completadas"];

  return (
    <div className="filter-container">
      {filtros.map((filtro) => (
        <button
          key={filtro}
          onClick={() => setFilter(filtro)}
          className={`filter-button ${filter === filtro ? "active" : ""} filter-button-${filtro}`}
        >
          {filtro}
        </button>
      ))}
    </div>
  );
};
