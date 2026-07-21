import React from 'react';
import CharacterCard from './CharacterCard.jsx';

/**
 * CharacterList
 * Recibe el arreglo de personajes ya filtrados y los renderiza
 * en una grilla usando CharacterCard. No tiene lógica de datos propia.
 */
function CharacterList({ characters, onSelect }) {
  if (characters.length === 0) {
    return <p className="empty-message">No se encontraron personajes con esos filtros.</p>;
  }

  return (
    <div className="character-grid">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default CharacterList;
