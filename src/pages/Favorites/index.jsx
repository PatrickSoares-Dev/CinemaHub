import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovieDetails, getGenres } from '../../services/tmdbApi';
import { getFavorites, removeFavorite } from '../../services/favoriteService';
import './index.css';
import { FaTrashAlt, FaInfoCircle, FaStar } from 'react-icons/fa';

const IMG_BASE = 'https://image.tmdb.org/t/p/w300';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('popularity.desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      const ids = getFavorites();
      const moviePromises = ids.map((id) => getMovieDetails(id).catch(() => null));
      const movies = await Promise.all(moviePromises);
      setFavorites(movies.filter(Boolean));  // Remove filmes com erro
      setLoading(false);
    };

    const loadGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
      }
    };

    loadFavorites();
    loadGenres();
  }, []);

  const handleRemove = (id) => {
    removeFavorite(id);
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  };

  const filtered = favorites.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre
      ? movie.genres.some((g) => g.id === parseInt(selectedGenre))
      : true;
    return matchesTitle && matchesGenre;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'vote_average.desc') return b.vote_average - a.vote_average;
    if (sortOrder === 'vote_average.asc') return a.vote_average - b.vote_average;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="favorites-page">
      <h2>🎬 Meus Filmes Favoritos</h2>

      {/* Filtros */}
      <div className="favorites-filters">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Todos os Gêneros</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="popularity.desc">Mais populares</option>
          <option value="vote_average.desc">Melhor avaliação</option>
          <option value="vote_average.asc">Pior avaliação</option>
        </select>
      </div>

      {/* Conteúdo */}
      {loading ? (
        <p className="loading">🔄 Carregando favoritos...</p>
      ) : paginated.length === 0 ? (
        <p className="empty-message">📭 Nenhum filme encontrado com os filtros aplicados.</p>
      ) : (
        <div className="favorite-grid">
          {paginated.map((movie) => (
            <div key={movie.id} className="favorite-card">
              {movie.poster_path && (
                <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} className="favorite-poster" />
              )}
              <h3>{movie.title}</h3>
              <p><FaStar color="#f7c600" /> {movie.vote_average.toFixed(1)}</p>
              <div className="favorite-actions">
                <Link to={`/movie/${movie.id}`} className="details-button">
                  <FaInfoCircle /> Detalhes
                </Link>
                <button className="delete-button" onClick={() => handleRemove(movie.id)}>
                  <FaTrashAlt /> Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
