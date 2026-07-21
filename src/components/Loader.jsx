import React from 'react';

/**
 * Loader
 * Indicador visual (spinner tipo "portal") mostrado mientras
 * la petición a la API está en curso.
 */
function Loader() {
  return (
    <div className="loader-wrapper" role="status" aria-live="polite">
      <div className="portal-spinner" />
      <p>Abriendo un portal a otra dimensión...</p>
    </div>
  );
}

export default Loader;
