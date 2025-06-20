import { useEffect, useState } from 'react';
import { FaStar, FaHeart, FaInfoCircle } from 'react-icons/fa';
import { isFavorite, toggleFavorite } from '../../services/favoriteService';
import './HeroBanner.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/original';

const HeroBanner = ({ movies, genres, onViewDetails }) => {
  const [index, setIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const movie = movies[index];

  useEffect(() => {
    setFavorite(isFavorite(movie.id));
  }, [index, movie.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [movies]);

  const handleToggleFavorite = () => {
    toggleFavorite(movie.id);
    setFavorite(!favorite);
  };

  const genreNames = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .join(' | ');

  return (
    <div
      className="hero-banner fade-in"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(18,18,18,0.9), rgba(18,18,18,0.3)), url(${IMG_BASE}${movie.backdrop_path})`
      }}
    >
      <div className="hero-content">
        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span className="rating">
            <FaStar color="#f7c600" /> {movie.vote_average.toFixed(1)}
          </span>
          {genreNames && <span className="genres"> | {genreNames}</span>}
        </div>

        <p className="hero-overview">{movie.overview?.slice(0, 200)}...</p>

        <div className="hero-buttons">
          <button
            className={`favorite-button ${favorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            <FaHeart /> {favorite ? 'Remover' : 'Salvar'}
          </button>
          <button onClick={() => onViewDetails(movie)}>
            <FaInfoCircle /> Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
