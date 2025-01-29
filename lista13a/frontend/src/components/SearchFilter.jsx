import React from 'react';

const SearchFilter = ({ onSearch, onFilter }) => {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Wyszukaj przedmiot..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <select 
        onChange={(e) => onFilter(e.target.value)}
        className="filter-select"
        defaultValue=""
      >
        <option value="">Wszystkie godziny</option>
        <option value="morning">Poranne (6:00 - 12:00)</option>
        <option value="afternoon">Popołudniowe (12:00 - 17:00)</option>x
        <option value="evening">Wieczorne (17:00 - 22:00)</option>
      </select>
    </div>
  );
};

export default SearchFilter;