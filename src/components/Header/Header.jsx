import { Link, useLocation } from 'react-router-dom';
import { FaHeart, FaHome } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">
          Cinema<span>Hub</span>
        </Link>

        <nav>
          <Link to="/">
            <FaHome size={14} /> <span className={location.pathname === '/' ? 'active' : ''}>Início</span>
          </Link>

          <Link to="/favorites">
            <FaHeart size={14} /> <span className={location.pathname === '/favorites' ? 'active' : ''}>Meus Favoritos</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
