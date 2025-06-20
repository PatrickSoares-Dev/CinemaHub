import { Link } from 'react-router-dom';
import './index.css';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Página Não Encontrada</h1>
      <p>Oops! O endereço que você tentou acessar não existe ou foi removido.</p>
      <Link to="/" className="back-home-button">
        <FaHome /> Voltar para Home
      </Link>
    </div>
  );
};

export default NotFound;
