import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaHeart, FaInfoCircle, FaStar } from 'react-icons/fa';
import { isFavorite, toggleFavorite } from '../../services/favoriteService';
import './MovieCard.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/w300';

const MovieCard = ({ movie, genres }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(movie.id));
  }, [movie.id]);

  const handleToggleFavorite = () => {
    toggleFavorite(movie.id);
    setFavorite(!favorite);
  };

  const genreNames = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2);

  return (
    <div className="movie-card">
      {movie.poster_path && (
        <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
      )}

      <div className="card-title">{movie.title}</div>

      <div className="card-rating">
        <FaStar color="#f7c600" /> {movie.vote_average.toFixed(1)}
      </div>

      <div className="card-genres">
        {genreNames.length > 0 ? genreNames.join(' | ') : 'Gênero não informado'}
      </div>

      <div className="card-actions">
        <button
          className={`favorite-button ${favorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
        >
          <FaHeart /> {favorite ? 'Remover' : 'Salvar'}
        </button>
        <Link to={`/movie/${movie.id}`}>
          <FaInfoCircle /> Detalhes
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
