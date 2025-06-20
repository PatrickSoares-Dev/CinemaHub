import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdbApi';
import './index.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/w300';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="details">
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
      )}
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetails;
