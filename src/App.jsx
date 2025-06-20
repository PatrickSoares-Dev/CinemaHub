import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/global.css';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import Home from './pages/Home/index';
import MovieDetails from './pages/MovieDetails/index';
import Favorites from './pages/Favorites/index';
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

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const list = await getGenres();
        setGenres(list);
      } catch (err) {
        console.error(err);
      }
    };
    loadGenres();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
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
            onGenreChange={(val) => { setGenre(val); }}
            sortBy={sortBy}
            onSortByChange={(val) => { setSortBy(val); }}
          />
        )}
      </Header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home search={search} genre={genre} sortBy={sortBy} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
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
