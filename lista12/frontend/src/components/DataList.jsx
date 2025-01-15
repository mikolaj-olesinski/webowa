import { useState, useEffect } from 'react';

function DataList() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  const fetchData = async (searchTerm = '', sortKey = null, sortDir = 'asc') => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (sortKey) {
        params.append('sortBy', sortKey);
        params.append('sortOrder', sortDir);
      }
      
      const response = await fetch(`http://localhost:3001/api/entries?${params}`);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
    }
  };

  useEffect(() => {
    fetchData(search, sortConfig.key, sortConfig.direction);
  }, [search, sortConfig]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/entries/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchData(search, sortConfig.key, sortConfig.direction);
      }
    } catch (error) {
      console.error('Błąd usuwania wpisu:', error);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="data-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Szukaj..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Imię {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('birth_date')}>
              Data urodzenia {sortConfig.key === 'birth_date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('city')}>
              Miasto {sortConfig.key === 'city' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{new Date(entry.birth_date).toLocaleDateString()}</td>
              <td>{entry.city}</td>
              <td>
                <button onClick={() => handleDelete(entry.id)} className="delete-btn">
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataList;