import React from 'react';

/**
 * ErrorMessage
 * Muestra un mensaje claro cuando la consulta a la API falla
 * o cuando no hay resultados para los filtros aplicados.
 */
function ErrorMessage({ message }) {
  return (
    <div className="error-box" role="alert">
      <span className="error-icon" aria-hidden="true">⚠️</span>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
