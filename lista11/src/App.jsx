// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './components/HomePage.jsx';
import GuessNumber from './components/GuessNumber.jsx';
import TaskList from './components/TaskList.jsx';

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/guess" element={<GuessNumber />} />
              <Route path="/tasks" element={<TaskList />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;