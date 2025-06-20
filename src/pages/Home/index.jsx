import { useEffect, useState } from 'react';
import {
  searchMovies,
  discoverMovies
} from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard';
import './index.css';

const Home = ({ search, genre, sortBy }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [search, genre, sortBy]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError('');
      try {
        let data;
        if (search) {
          data = await searchMovies(search, page);
        } else {
          data = await discoverMovies({ page, genre, sortBy });
        }
        setMovies(data.results);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [search, genre, sortBy, page]);

  return (
    <div className="home">
      <h2>Filmes Populares</h2>
      {error && <p className="error">{error}</p>}
      {loading && <p className="loader">🔄 Carregando filmes...</p>}
      {!loading && movies.length === 0 && (
        <p className="empty">😕 Nenhum filme encontrado com os filtros selecionados.</p>
      )}
      {!loading && total > 0 && (
        <p className="total">📋 Mostrando {movies.length} de {total} filmes</p>
      )}
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Anterior</button>
        <span>Página {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={page * 20 >= total}>Próxima</button>
      </div>
    </div>
  );
};

export default Home;
