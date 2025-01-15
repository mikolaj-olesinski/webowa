import { useState } from 'react';
import Form from './components/Form';
import DataList from './components/DataList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSubmit = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <h1>Formularz React</h1>
      <Form onSubmit={handleFormSubmit} />
      <DataList key={refreshKey} />
    </div>
  );
}

export default App;