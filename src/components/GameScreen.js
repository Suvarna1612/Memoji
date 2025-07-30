import React, { useState, useEffect } from 'react';

function GameScreen({ category, onGameOver, onBackToCategories }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [gameBoard, setGameBoard] = useState([]);
  const [clickedTiles, setClickedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameStatus, setGameStatus] = useState('Click "Start Game" to begin!');
  const totalPairs = 8;

  const emojiCategories = {
    expressions: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
      '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
      '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
      '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏'
    ],
    food: [
      '🍎', '🍌', '🍊', '🍋', '🍉', '🍇', '🍓', '🫐',
      '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅',
      '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽',
      '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🍞'
    ],
    nature: [
      '🌱', '🌿', '🍀', '🍃', '🍂', '🍁', '🌾', '🌵',
      '🌲', '🌳', '🌴', '🌸', '🌺', '🌻', '🌹', '🥀',
      '🌷', '🌼', '🌙', '⭐', '🌟', '💫', '⚡', '🔥',
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'
    ],
    sports: [
      '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉',
      '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍',
      '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿',
      '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌'
    ],
    travel: [
      '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑',
      '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵',
      '🚲', '🛴', '🛹', '🚁', '✈️', '🛩️', '🛫', '🛬',
      '🚀', '🛸', '🚢', '⛵', '🚤', '🛥️', '🛳️', '⛴️'
    ]
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  // Initialize game board
  useEffect(() => {
    createGameBoard();
  }, [category]);

  const getRandomEmojis = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const createGameBoard = () => {
    const categoryEmojis = emojiCategories[category];
    const selectedEmojis = getRandomEmojis(categoryEmojis, totalPairs);
    const gameEmojis = [...selectedEmojis, ...selectedEmojis];
    const shuffledEmojis = shuffleArray(gameEmojis);
    
    const board = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji: emoji,
      isRevealed: false,
      isMatched: false,
      isWrong: false
    }));
    
    setGameBoard(board);
  };

  const startGame = () => {
    setGameActive(true);
    setCurrentScore(0);
    setMatchedPairs(0);
    setTimeLeft(60);
    setClickedTiles([]);
    setGameStatus('Game started! Find matching emoji pairs!');
    createGameBoard();
  };

  const resetGame = () => {
    setGameActive(false);
    setCurrentScore(0);
    setMatchedPairs(0);
    setTimeLeft(60);
    setClickedTiles([]);
    setGameStatus('Click "Start Game" to begin!');
    createGameBoard();
  };

  const endGame = () => {
    setGameActive(false);
    setGameStatus("Time's up!");
    setTimeout(() => {
      onGameOver(currentScore);
    }, 1500);
  };

  const winGame = () => {
    setGameActive(false);
    const timeBonus = timeLeft * 2;
    const finalScore = currentScore + timeBonus;
    setCurrentScore(finalScore);
    setGameStatus(`Congratulations! You won! Time bonus: +${timeBonus} points`);
    
    setTimeout(() => {
      onGameOver(finalScore);
    }, 2000);
  };

  const handleTileClick = (tileId) => {
    if (!gameActive || clickedTiles.length >= 2) return;
    
    const tile = gameBoard.find(t => t.id === tileId);
    if (tile.isMatched || tile.isRevealed) return;

    const newBoard = gameBoard.map(t => 
      t.id === tileId ? { ...t, isRevealed: true } : t
    );
    setGameBoard(newBoard);

    const newClickedTiles = [...clickedTiles, tileId];
    setClickedTiles(newClickedTiles);

    if (newClickedTiles.length === 2) {
      checkForMatch(newClickedTiles, newBoard);
    }
  };

  const checkForMatch = (clickedIds, board) => {
    const [tile1Id, tile2Id] = clickedIds;
    const tile1 = board.find(t => t.id === tile1Id);
    const tile2 = board.find(t => t.id === tile2Id);

    if (tile1.emoji === tile2.emoji) {
      // Match found!
      setTimeout(() => {
        const newBoard = board.map(t => {
          if (t.id === tile1Id || t.id === tile2Id) {
            return { ...t, isMatched: true, isRevealed: false };
          }
          return t;
        });
        setGameBoard(newBoard);
        setMatchedPairs(prev => prev + 1);
        setCurrentScore(prev => prev + 10);
        setGameStatus('Great match! +10 points');
        
        if (matchedPairs + 1 === totalPairs) {
          winGame();
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        const newBoard = board.map(t => {
          if (t.id === tile1Id || t.id === tile2Id) {
            return { ...t, isRevealed: false, isWrong: true };
          }
          return t;
        });
        setGameBoard(newBoard);
        setGameStatus('Try again!');
        
        setTimeout(() => {
          setGameBoard(prev => prev.map(t => ({ ...t, isWrong: false })));
        }, 500);
      }, 1000);
    }

    setTimeout(() => {
      setClickedTiles([]);
    }, 1500);
  };

  const getTileClass = (tile) => {
    let className = 'tile';
    if (tile.isRevealed) className += ' clicked';
    if (tile.isMatched) className += ' matched';
    if (tile.isWrong) className += ' wrong';
    return className;
  };

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1) + ' Matcher';

  return (
    <div className="screen game-screen">
      <div className="game-header">
        <div className="game-info">
          <h2>{categoryTitle}</h2>
          <button className="btn-secondary" onClick={onBackToCategories}>
            ← Back to Categories
          </button>
        </div>
        
        <div className="score-board">
          <div className="score-item">
            <span className="score-label">Score:</span>
            <span className="score-value">{currentScore}</span>
          </div>
          <div className="score-item">
            <span className="score-label">Time:</span>
            <span 
              className="score-value" 
              style={{ color: timeLeft <= 10 ? '#dc3545' : '#2596be' }}
            >
              {timeLeft}
            </span>s
          </div>
        </div>
      </div>

      <div className="game-controls">
        {!gameActive && (
          <button className="btn-primary" onClick={startGame}>
            Start Game
          </button>
        )}
        <button className="btn-secondary" onClick={resetGame}>
          Reset
        </button>
      </div>

      <div className="game-board">
        {gameBoard.map((tile) => (
          <div
            key={tile.id}
            className={getTileClass(tile)}
            onClick={() => handleTileClick(tile.id)}
          >
            {tile.isRevealed || tile.isMatched ? tile.emoji : '?'}
          </div>
        ))}
      </div>

      <div className="game-status">{gameStatus}</div>
    </div>
  );
}

export default GameScreen;
