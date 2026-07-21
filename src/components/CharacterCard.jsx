import React from 'react';

/**
 * CharacterCard
 * Presenta la información mínima de un personaje: imagen, nombre,
 * estado, especie y género. Al hacer click, avisa al padre (App)
 * mediante onSelect para que se abra el modal con más detalle.
 */
function CharacterCard({ character, onSelect }) {
  const statusClass =
    character.status === 'Alive'
      ? 'status-alive'
      : character.status === 'Dead'
      ? 'status-dead'
      : 'status-unknown';

  return (
    <button className="character-card" onClick={() => onSelect(character)}>
      <div className="avatar-ring">
        <img src={character.image} alt={character.name} loading="lazy" />
      </div>

      <h3 className="character-name">{character.name}</h3>

      <p className="character-status">
        <span className={`status-dot ${statusClass}`} />
        {character.status} — {character.species}
      </p>

      <p className="character-gender">{character.gender}</p>
    </button>
  );
}

export default CharacterCard;
