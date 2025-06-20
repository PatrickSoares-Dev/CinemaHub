import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <h1>CinemaHub</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favoritos</Link>
    </nav>
  </header>
);

export default Header;
