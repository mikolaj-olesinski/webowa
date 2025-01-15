import React, { useState, useEffect } from 'react';

function DataList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/entries');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
    }
  };

  return (
    <div className="data-list">
      <h2>Zapisane dane</h2>
      {entries.map((entry, index) => (
        <div key={index} className="data-item">
          <p><strong>Imię:</strong> {entry.name}</p>
          <p><strong>Email:</strong> {entry.email}</p>
        </div>
      ))}
    </div>
  );
}

export default DataList;