import { Link } from 'react-router-dom';
import './MovieCard.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/w200';

const MovieCard = ({ movie }) => (
  <div className="movie-card">
    {movie.poster_path && (
      <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
    )}
    <h3>{movie.title}</h3>
    <Link to={`/movie/${movie.id}`}>Detalhes</Link>
  </div>
);

export default MovieCard;
