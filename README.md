# Rick & Morty Explorer

Aplicación web desarrollada en **React** que consume la API pública [Rick and Morty API](https://rickandmortyapi.com/api/character) para listar, buscar y filtrar personajes de la serie, mostrando información adicional de cada uno al seleccionarlo.

## Descripción de la aplicación

La aplicación muestra un listado de personajes obtenidos en tiempo real desde la API REST. Permite:

- Buscar personajes por nombre.
- Filtrar por estado (Vivo / Muerto / Desconocido).
- Ver imagen, nombre, estado, especie y género de cada personaje en una tarjeta.
- Hacer click sobre una tarjeta para abrir un modal con información adicional (origen, última ubicación, cantidad de episodios, etc.).
- Ver un indicador de carga mientras se consulta la API.
- Ver un mensaje de error claro si la consulta falla o no arroja resultados.

Todos los datos son dinámicos: no se utiliza ningún dato estático, toda la información proviene directamente de la API.

## Tecnologías utilizadas

- **React 18** (componentes funcionales)
- **Vite** como bundler / entorno de desarrollo
- **JavaScript (ES6+)**
- **CSS3** (diseño propio, responsive, sin frameworks)
- **Fetch API** para el consumo del servicio REST

## Estructura del proyecto

```
rick-and-morty-app/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        ├── SearchBar.jsx
        ├── StatusFilter.jsx
        ├── CharacterList.jsx
        ├── CharacterCard.jsx
        ├── CharacterModal.jsx
        ├── Loader.jsx
        └── ErrorMessage.jsx
```

Cada componente tiene una única responsabilidad:

| Componente | Responsabilidad |
|---|---|
| `App.jsx` | Maneja el estado global y la llamada a la API |
| `SearchBar` | Captura el texto de búsqueda |
| `StatusFilter` | Captura el filtro de estado |
| `CharacterList` | Renderiza la grilla de tarjetas |
| `CharacterCard` | Muestra la info resumida de un personaje |
| `CharacterModal` | Muestra la info detallada al seleccionar un personaje |
| `Loader` | Indicador visual de carga |
| `ErrorMessage` | Muestra errores de forma clara |

## Evidencia del uso de `useState`

En `App.jsx` se utilizan varios estados para manejar toda la lógica de la aplicación:

```jsx
const [characters, setCharacters] = useState([]);   // lista traída de la API
const [loading, setLoading] = useState(true);        // indicador de carga
const [error, setError] = useState(null);            // mensaje de error, si lo hay
const [search, setSearch] = useState('');             // texto del buscador
const [status, setStatus] = useState('');              // filtro de estado
const [selectedCharacter, setSelectedCharacter] = useState(null); // modal
```

Estos estados controlan: los datos mostrados, el spinner de carga, los mensajes de error, los valores de los filtros (buscador y estado) y qué personaje está seleccionado para mostrar en el modal.

## Evidencia del uso de `useEffect`

También en `App.jsx`, se usa `useEffect` para ejecutar la consulta a la API cada vez que cambian los filtros de búsqueda o estado, con un pequeño *debounce* y cancelación de peticiones obsoletas:

```jsx
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
        if (err.name === 'AbortError') return;
        setCharacters([]);
        setError(err.message);
        setLoading(false);
      });
  }, 300);

  return () => {
    clearTimeout(timeoutId);
    controller.abort();
  };
}, [search, status]);
```

El array de dependencias `[search, status]` asegura que la petición se vuelva a ejecutar únicamente cuando el usuario cambia el texto de búsqueda o el filtro de estado, y la función de limpieza cancela peticiones anteriores para evitar condiciones de carrera.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Luego abrir la URL que indica la terminal (por defecto `http://localhost:5173`).

## Capturas de pantalla

*(Agregar aquí las capturas de: listado de personajes, buscador en uso, filtro por estado, modal de detalle y estado de carga/error).*

## Conclusiones personales

Este taller permitió poner en práctica de forma integral el manejo de estado y ciclo de vida en React mediante `useState` y `useEffect`, dos de los hooks fundamentales del framework. Consumir una API REST real —en este caso la de Rick and Morty— ayudó a entender cómo sincronizar la interfaz con datos externos: mostrar estados de carga, manejar errores de red o de "sin resultados", y reaccionar a cambios del usuario (búsqueda y filtros) sin recargar la página.

Dividir la aplicación en componentes pequeños y de responsabilidad única (buscador, filtro, tarjeta, lista, modal, loader, error) hizo el código más fácil de leer, mantener y reutilizar, y reforzó la importancia de pensar la interfaz como una composición de piezas independientes en lugar de un solo bloque monolítico.
