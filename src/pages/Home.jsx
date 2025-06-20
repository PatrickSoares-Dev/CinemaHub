import { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, []);

  return (
    <div className="home">
      <h2>Filmes Populares</h2>
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
