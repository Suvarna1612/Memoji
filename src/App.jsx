import React, { useState, useEffect } from 'react';
import CategoryScreen from './components/CategoryScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import GameOverScreen from './components/GameOverScreen.jsx';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('category'); // 'category', 'game', 'gameover'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentScreen('game');
  };

  const handleGameOver = (finalScore) => {
    setCurrentScore(finalScore);
    setCurrentScreen('gameover');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('game');
  };

  const handleBackToCategories = () => {
    setCurrentScreen('category');
    setSelectedCategory(null);
    setCurrentScore(0);
  };

  return (
    <div className="App">
      {currentScreen === 'category' && (
        <CategoryScreen onCategorySelect={handleCategorySelect} />
      )}
      
      {currentScreen === 'game' && (
        <GameScreen 
          category={selectedCategory}
          onGameOver={handleGameOver}
          onBackToCategories={handleBackToCategories}
        />
      )}
      
      {currentScreen === 'gameover' && (
        <GameOverScreen 
          finalScore={currentScore}
          onPlayAgain={handlePlayAgain}
          onBackToCategories={handleBackToCategories}
        />
      )}
    </div>
  );
}

export default App;
