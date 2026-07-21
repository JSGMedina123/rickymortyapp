import React from 'react';

/**
 * StatusFilter
 * Permite elegir el estado del personaje: Alive, Dead o Unknown.
 * El estado seleccionado se guarda en el componente padre (App),
 * este componente solo se encarga de mostrar las opciones.
 */
const OPTIONS = [
  { value: '', label: 'Todos los estados' },
  { value: 'alive', label: 'Vivo' },
  { value: 'dead', label: 'Muerto' },
  { value: 'unknown', label: 'Desconocido' },
];

function StatusFilter({ value, onChange }) {
  return (
    <select
      className="status-filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filtrar por estado"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default StatusFilter;
