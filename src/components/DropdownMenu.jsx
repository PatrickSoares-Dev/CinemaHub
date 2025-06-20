import { useState } from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({ label, options, value, onSelect }) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);

  const handleSelect = (val) => {
    onSelect(val);
    setOpen(false);
  };

  return (
    <div className="dropdown" onBlur={() => setOpen(false)} tabIndex={0}>
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => setOpen((o) => !o)}
      >
        {label && <span className="dropdown-label">{label}: </span>}
        {selected ? selected.label : 'Selecionar'}
      </button>
      {open && (
        <ul className="dropdown-menu">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={value === opt.value ? 'active' : ''}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
