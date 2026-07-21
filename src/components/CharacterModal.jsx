import React from 'react';

/**
 * CharacterModal
 * Muestra información adicional del personaje seleccionado:
 * origen, última ubicación conocida, cantidad de episodios, etc.
 * Se cierra al hacer click fuera del panel o en el botón "×".
 */
function CharacterModal({ character, onClose }) {
  if (!character) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        <img className="modal-image" src={character.image} alt={character.name} />

        <h2>{character.name}</h2>

        <ul className="modal-details">
          <li><strong>Estado:</strong> {character.status}</li>
          <li><strong>Especie:</strong> {character.species}</li>
          {character.type && <li><strong>Tipo:</strong> {character.type}</li>}
          <li><strong>Género:</strong> {character.gender}</li>
          <li><strong>Origen:</strong> {character.origin?.name || 'Desconocido'}</li>
          <li><strong>Última ubicación:</strong> {character.location?.name || 'Desconocido'}</li>
          <li><strong>Episodios:</strong> {character.episode?.length || 0}</li>
        </ul>
      </div>
    </div>
  );
}

export default CharacterModal;
