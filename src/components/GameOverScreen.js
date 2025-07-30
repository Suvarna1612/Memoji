import React from 'react';

function GameOverScreen({ finalScore, onPlayAgain, onBackToCategories }) {
  return (
    <div className="screen gameover-screen">
      <div className="gameover-content">
        <h2>🎉 Game Over!</h2>
        <div className="final-score">
          <p>Your Score: <span>{finalScore}</span></p>
        </div>
        <div className="gameover-actions">
          <button className="btn-primary" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="btn-secondary" onClick={onBackToCategories}>
            Change Category
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverScreen;
