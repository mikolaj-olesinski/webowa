import { useState } from 'react';

function GuessNumber() {
  const [number] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const checkGuess = () => {
    const numGuess = Number(guess);
    setAttempts(prev => prev + 1);
    
    if (numGuess === number) {
      setMessage(`Gratulacje! Zgadłeś liczbę w ${attempts + 1} próbach!`);
    } else if (numGuess > number) {
      setMessage("Za wysoko! Spróbuj ponownie.");
    } else {
      setMessage("Za nisko! Spróbuj ponownie.");
    }
  };

  return (
    <>
      <div className="guess-game">
        <h2>Zgadnij liczbę</h2>
        <p>Zgadnij liczbę od 1 do 100</p>
        <div>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            min="1"
            max="100"
          />
          <button onClick={checkGuess}>Sprawdź</button>
        </div>
        <p>{message}</p>
        <p>Liczba prób: {attempts}</p>
      </div>
    </>
  );
}

export default GuessNumber;