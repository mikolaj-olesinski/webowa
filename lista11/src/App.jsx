import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import GuessNumber from './components/GuessNumber.jsx';
import TaskList from './components/TaskList.jsx';

function App() {
  const [textColor, setTextColor] = useState("black");
  const [counter, setCounter] = useState(0);
  
  const changeColor = () => {
    const colors = ["blue", "red", "green", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTextColor(randomColor);
  };

  return (
    <>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <>
                  <div className="home-page">
                    <div className="counter-section">
                      <p style={{ color: textColor }}>Kliknij przyciski, aby zobaczyć zmiany!</p>
                      <button onClick={changeColor}>Zmień kolor tekstu</button>
                      <p>Licznik: {counter}</p>
                      <div className="counter-buttons">
                        <button onClick={() => setCounter(counter - 1)}>-</button>
                        <button onClick={() => setCounter(counter + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </>
              } />
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