import React from 'react';

function CategoryScreen({ onCategorySelect }) {
  const categories = [
    {
      id: 'expressions',
      icon: '😀',
      title: 'Expressions',
      description: 'Faces & emotions'
    },
    {
      id: 'food',
      icon: '🍕',
      title: 'Food',
      description: 'Delicious treats'
    },
    {
      id: 'nature',
      icon: '🌿',
      title: 'Nature',
      description: 'Plants & animals'
    },
    {
      id: 'sports',
      icon: '⚽',
      title: 'Sports',
      description: 'Sports & activities'
    },
    {
      id: 'travel',
      icon: '✈️',
      title: 'Travel',
      description: 'Places & transport'
    }
  ];

  return (
    <div className="screen category-screen">
      <div className="header">
        <h1 className="game-title">🎮 Emoji Matcher</h1>
        <p className="subtitle">Choose your emoji category to start playing!</p>
      </div>
      
      <div className="categories-grid">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="category-card" 
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryScreen;
