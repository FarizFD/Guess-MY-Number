import React, { useState } from 'react';
import '../App.css';

const App = () => {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('Start guessing...');
  const [userGuess, setUserGuess] = useState('');

  function generateRandomNumber() {
    return Math.ceil(Math.random() * 20);
  }

  const checkGuess = () => {
    const guess = Number(userGuess);
    console.log(guess);

    if (!guess) {
      setMessage('No Number');
    } else if (guess === secretNumber) {
      setMessage('Correct Number');
      setSecretNumber(generateRandomNumber());
      setScore((prevScore) => {
        if (prevScore > highScore) {
          setHighScore(prevScore);
        }
        return 20;
      });
      document.body.style.backgroundColor = '#60b347';
    } else if (guess !== secretNumber) {
      if (score > 1) {
        setMessage(guess > secretNumber ? 'Number is High' : 'Number is Low');
        setScore((prevScore) => prevScore - 1);
      } else {
        setMessage('You Lost the Game');
        setScore(0);
      }
    }
  };

  const playAgain = () => {
    setScore(20);
    setSecretNumber(generateRandomNumber());
    setMessage('Start guessing...');
    setUserGuess('');
    document.body.style.backgroundColor = '#222';
  };

  return (
    <div>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn again" onClick={playAgain}>
          Again!
        </button>
        <div className="number">?</div>
      </header>
      <main>
        <section className="left">
          <input
            type="number"
            className="guess"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
          />
          <button className="btn check" onClick={checkGuess}>
            Check!
          </button>
        </section>
        <section className="right">
          <p className="message">{message}</p>
          <p className="label-score">💯 Score: <span className="score">{score}</span></p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">{highScore}</span>
          </p>
        </section>
      </main>
    </div>
  );
};

export default App;