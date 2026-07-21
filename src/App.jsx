import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import StatusFilter from './components/StatusFilter.jsx';
import CharacterList from './components/CharacterList.jsx';
import CharacterModal from './components/CharacterModal.jsx';
import Loader from './components/Loader.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import './App.css';

const API_URL = 'https://rickandmortyapi.com/api/character';

function App() {
  // ---- Estados (useState) ----
  const [characters, setCharacters] = useState([]);   // lista traída de la API
  const [loading, setLoading] = useState(true);        // indicador de carga
  const [error, setError] = useState(null);            // mensaje de error, si lo hay
  const [search, setSearch] = useState('');             // texto del buscador
  const [status, setStatus] = useState('');              // filtro de estado
  const [selectedCharacter, setSelectedCharacter] = useState(null); // modal

  // ---- Efecto: consulta la API cada vez que cambian los filtros ----
  // Se usa un pequeño debounce (300ms) para no disparar una petición
  // en cada tecla presionada en el buscador.
  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (search.trim()) params.append('name', search.trim());
      if (status) params.append('status', status);

      fetch(`${API_URL}?${params.toString()}`, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) {
            // La API devuelve 404 cuando no hay resultados
            if (res.status === 404) {
              throw new Error('No se encontraron personajes con esos criterios.');
            }
            throw new Error('Ocurrió un error al consultar la API.');
          }
          return res.json();
        })
        .then((data) => {
          setCharacters(data.results || []);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === 'AbortError') return; // petición cancelada, ignorar
          setCharacters([]);
          setError(err.message);
          setLoading(false);
        });
    }, 300);

    // Limpieza: cancela el timeout y la petición si el efecto se re-ejecuta
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search, status]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Rick &amp; Morty Explorer</h1>
        <p className="subtitle">Cruza el portal y explora los personajes del multiverso</p>
      </header>

      <section className="filters">
        <SearchBar value={search} onChange={setSearch} />
        <StatusFilter value={status} onChange={setStatus} />
      </section>

      <main>
        {loading && <Loader />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <CharacterList characters={characters} onSelect={setSelectedCharacter} />
        )}
      </main>

      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />

      <footer className="app-footer">
        Datos provistos por{' '}
        <a href="https://rickandmortyapi.com" target="_blank" rel="noreferrer">
          The Rick and Morty API
        </a>
      </footer>
    </div>
  );
}

export default App;
