import './FilterControls.css';

const FilterControls = ({
  searchInput,
  onSearchInputChange,
  onSearch,
  genres,
  genre,
  onGenreChange,
  sortBy,
  onSortByChange
}) => (
  <form className="filter-form" onSubmit={onSearch}>
    <input
      type="text"
      value={searchInput}
      onChange={(e) => onSearchInputChange(e.target.value)}
      placeholder="Buscar filme"
    />
    <button type="submit">Buscar</button>
    <select value={genre} onChange={(e) => onGenreChange(e.target.value)}>
      <option value="">Todos os Gêneros</option>
      {genres.map((g) => (
        <option key={g.id} value={g.id}>{g.name}</option>
      ))}
    </select>
    <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
      <option value="popularity.desc">Mais populares</option>
      <option value="release_date.desc">Lançamentos</option>
      <option value="vote_average.desc">Melhores avaliados</option>
    </select>
  </form>
);

export default FilterControls;
