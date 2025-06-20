import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  searchMovies,
  discoverMovies,
  getGenres
} from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import './index.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const navigate = useNavigate();

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
        if (search.trim()) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="home">
      {!loading && movies.length > 0 && (
        <HeroBanner
          movies={movies.slice(0, 5)}
          genres={genres}
          onAddFavorite={(m) => console.log('Favorito:', m)}
          onViewDetails={(m) => navigate(`/movie/${m.id}`)}  // ✅ Aqui a correção
        />
      )}

      {/* Filtros simples */}
      <form onSubmit={handleSubmit} className="filter-bar">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar filme"
        />
        <button type="submit">Buscar</button>

        <select value={genre} onChange={(e) => { setGenre(e.target.value); setPage(1); setSearch(''); }}>
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

      {/* Paginação Superior */}
      <Pagination
        currentPage={page}
        totalResults={total}
        pageSize={20}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* Grid de Filmes */}
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genres={genres}
            onAddFavorite={() => console.log('Salvar favorito:', movie)}
          />
        ))}
      </div>

      {/* Paginação Inferior */}
      <Pagination
        currentPage={page}
        totalResults={total}
        pageSize={20}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default Home;
