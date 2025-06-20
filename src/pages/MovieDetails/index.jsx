import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdbApi';
import { addFavorite, removeFavorite, isFavorite } from '../../services/favoriteService';
import './index.css';
import { FaStar, FaClock, FaCalendarAlt, FaArrowLeft, FaGlobe, FaFire, FaHeart } from 'react-icons/fa';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
        setFavorite(isFavorite(Number(id)));
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [id]);

  const handleToggleFavorite = () => {
    const movieId = Number(id);
    if (favorite) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
    setFavorite(!favorite);
  };

  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p className="loading">🔄 Carregando detalhes...</p>;

  const genresList = movie.genres?.map((g) => g.name).join(' | ');
  const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('pt-BR') : 'N/A';
  const budget = movie.budget ? movie.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' }) : 'N/A';
  const revenue = movie.revenue ? movie.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' }) : 'N/A';

  return (
    <div className="movie-details">
      {movie.backdrop_path && (
        <div
          className="details-banner"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(18,18,18,0.95), rgba(18,18,18,0.4)), url(${BACKDROP_BASE}${movie.backdrop_path})`
          }}
        >
          <div className="details-banner-content">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
            <p>
              <FaCalendarAlt /> {releaseDate} &nbsp;|&nbsp;
              <FaClock /> {movie.runtime} min &nbsp;|&nbsp;
              <FaStar color="#f7c600" /> {movie.vote_average.toFixed(1)}
            </p>
            <p><strong>Gêneros:</strong> {genresList}</p>

            <div className="top-button-group">
              <Link to="/" className="button small-button back-button">
                <FaArrowLeft /> Home
              </Link>
              <button
                className="button small-button favorite-button"
                onClick={handleToggleFavorite}
              >
                <FaHeart /> {favorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="details-content">
        {movie.poster_path && (
          <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} className="details-poster" />
        )}

        <div className="details-info">
          <div className="details-info-section info-block">
            <p><strong>Título Original:</strong> {movie.original_title}</p>
            <p><strong>Status:</strong> {movie.status}</p>
            <p><strong>Popularidade:</strong> <FaFire /> {movie.popularity.toFixed(1)}</p>
            <p><strong>Orçamento:</strong> {budget}</p>
            <p><strong>Receita:</strong> {revenue}</p>
          </div>

          <div className="details-info-section description-block">
            <p><strong>Descrição:</strong></p>
            <p>{movie.overview || 'Descrição não disponível.'}</p>
          </div>

          {movie.homepage && (
            <div className="details-info-section site-block">
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="button small-button site-button"
              >
                🌐 Site Oficial
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
