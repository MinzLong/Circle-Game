import React, { useState, useEffect } from 'react';

function Game() {
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [circles, setCircles] = useState([]);
  const [nextCircle, setNextCircle] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let interval;
    if (circles.length > 0 && !gameOver) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [circles, gameOver]);

  const startGame = () => {
    setTime(0); // Reset đồng hồ khi bấm Start
    setNextCircle(1);
    setGameOver(false);
    const newCircles = [];
    for (let i = 1; i <= points; i++) {
      newCircles.push({ id: i, position: getRandomPosition() });
    }
    setCircles(newCircles);
  };

  const getRandomPosition = () => {
    const containerSize = 300;
    const circleSize = 40;
    const maxPosition = containerSize - circleSize;
    const top = Math.floor(Math.random() * maxPosition);
    const left = Math.floor(Math.random() * maxPosition);
    return { top, left };
  };

  const handleCircleClick = (id) => {
    if (id === nextCircle) {
      setCircles(circles.filter((circle) => circle.id !== id));
      setNextCircle(nextCircle + 1);
    } else {
      setGameOver(true); // Khi bấm sai thứ tự, trò chơi kết thúc
    }
  };

  return (
    <div className="game-container">
      <div className="header">
        <h1>LET'S PLAY</h1>
        <div>
          Points: <input type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} disabled={circles.length > 0} />
        </div>
        <div>Time: {time.toFixed(1)}s</div>
        <button onClick={startGame} disabled={circles.length > 0 && !gameOver}>Start</button>
      </div>
      <div className="circle-container">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="circle"
            style={{ top: `${circle.position.top}px`, left: `${circle.position.left}px` }}
            onClick={() => handleCircleClick(circle.id)}
          >
            {circle.id}
          </div>
        ))}
      </div>
      {gameOver && <div className="game-over">GAME OVER</div>}
      {circles.length === 0 && !gameOver && points > 0 && <div className="all-cleared">ALL CLEARED</div>}
    </div>
  );
}

export default Game;
