import './FilterControls.css';
import DropdownMenu from './DropdownMenu';

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
    <DropdownMenu
      label="Gênero"
      value={genre}
      onSelect={onGenreChange}
      options={[
        { value: '', label: 'Todos os Gêneros' },
        ...genres.map((g) => ({ value: g.id, label: g.name }))
      ]}
    />
    <DropdownMenu
      label="Ordenar"
      value={sortBy}
      onSelect={onSortByChange}
      options={[
        { value: 'popularity.desc', label: 'Mais populares' },
        { value: 'release_date.desc', label: 'Lançamentos' },
        { value: 'vote_average.desc', label: 'Melhores avaliados' }
      ]}
    />
  </form>
);

export default FilterControls;
