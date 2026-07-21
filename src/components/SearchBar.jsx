import React from 'react';

/**
 * SearchBar
 * Componente de una sola responsabilidad: capturar el texto de búsqueda
 * y notificar al padre (App) cada vez que cambia, vía props.
 *
 * Recibe:
 *  - value: string actual del input (estado vive en el padre)
 *  - onChange: función callback(nuevoValor)
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        type="text"
        placeholder="Buscar personaje por nombre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar personaje por nombre"
      />
    </div>
  );
}

export default SearchBar;
