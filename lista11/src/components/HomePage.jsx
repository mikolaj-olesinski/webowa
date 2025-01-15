// src/components/HomePage.jsx
import { useState } from 'react';

function HomePage() {
  const [textColor, setTextColor] = useState("black");
  const [counter, setCounter] = useState(0);
  
  const changeColor = () => {
    const colors = ["blue", "red", "green", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTextColor(randomColor);
  };

  return (
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
  );
}

export default HomePage;