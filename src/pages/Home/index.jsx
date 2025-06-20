import { useEffect, useState } from 'react';
import {
  searchMovies,
  discoverMovies,
  getGenres
} from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard';
import './index.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const list = await getGenres();
        setGenres(list);
      } catch (err) {
        console.error('Erro ao carregar gêneros:', err);
      }
    };
    loadGenres();
  }, []);

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

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="home">
      <h2>Filmes Populares</h2>

      <form className="controls" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar filme"
        />
        <button type="submit">Buscar</button>

        <select value={genre} onChange={(e) => { setGenre(e.target.value); setPage(1); }}>
          <option value="">Todos os Gêneros</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}>
          <option value="popularity.desc">Mais populares</option>
          <option value="release_date.desc">Lançamentos</option>
          <option value="vote_average.desc">Melhores avaliados</option>
        </select>
      </form>

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
