import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/global.css';
import Header from './components/Header/Header';
import FilterControls from './components/FilterControls/FilterControls';
import Home from './pages/Home/index';
import MovieDetails from './pages/MovieDetails/index';
import Favorites from './pages/Favorites/index';
import NotFound from './pages/NotFound/index';
import { getGenres } from './services/tmdbApi';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const showFilters = location.pathname === '/';

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1); 

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

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleGenreChange = (val) => {
    setGenre(val);
    setSearch('');    // Limpa busca quando troca gênero
    setPage(1);
  };

  const handleSortByChange = (val) => {
    setSortBy(val);
    setSearch('');    // Limpa busca quando troca ordenação
    setPage(1);
  };

  return (
    <>
      <Header>
        {showFilters && (
          <FilterControls
            searchInput={searchInput}
            onSearchInputChange={setSearchInput}
            onSearch={handleSearch}
            genres={genres}
            genre={genre}
            onGenreChange={handleGenreChange}
            sortBy={sortBy}
            onSortByChange={handleSortByChange}
          />
        )}
      </Header>
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                genre={genre}
                sortBy={sortBy}
                page={page}
                onPageChange={setPage}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;