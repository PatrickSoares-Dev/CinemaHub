import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ children }) => (
  <header className="header">
    <div className="header-top">
      <h1>CinemaHub</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favoritos</Link>
      </nav>
    </div>
    {children && <div className="filter-bar">{children}</div>}
  </header>
);

export default Header;
