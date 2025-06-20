import './Pagination.css';

const Pagination = ({ currentPage, totalResults, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / pageSize);

  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 7;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start < maxPagesToShow - 1) {
      if (start === 1) {
        end = Math.min(start + maxPagesToShow - 1, totalPages);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxPagesToShow + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination-section">
      <div className="pagination-info">
        Página {currentPage} de {totalPages} | Total: {totalResults.toLocaleString()} filmes
      </div>

      <div className="pagination-buttons">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>« Primeiro</button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>‹ Anterior</button>

        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Próxima ›</button>
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>Última »</button>
      </div>
    </div>
  );
};

export default Pagination;
