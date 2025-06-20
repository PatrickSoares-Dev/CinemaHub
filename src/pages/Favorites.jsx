import { useEffect, useState } from 'react';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!movieName.trim()) {
      setError('Nome do filme é obrigatório.');
      return;
    }
    const newList = [...favorites, { id: Date.now(), name: movieName.trim() }];
    setFavorites(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));
    setMovieName('');
    setError('');
  };

  const handleDelete = (id) => {
    const newList = favorites.filter((fav) => fav.id !== id);
    setFavorites(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));
  };

  return (
    <div className="favorites">
      <h2>Filmes Favoritos</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Nome do filme"
        />
        <button type="submit">Adicionar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            {fav.name}
            <button onClick={() => handleDelete(fav.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
