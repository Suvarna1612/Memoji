# 🎮 Emoji Matcher - React Version

A fun and engaging emoji matching arcade game built with React! This is a beginner-friendly React implementation featuring multiple emoji categories, responsive design, and a clean white and blue theme.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```

3. **Open Your Browser**
   The game will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── CategoryScreen.js    # Category selection screen
│   ├── GameScreen.js        # Main game logic and board
│   └── GameOverScreen.js    # Game over and results screen
├── App.js                   # Main app component with state management
├── App.css                  # All styling and animations
└── index.js                 # React entry point
```

## 🎯 Features

### Game Categories
- **Expressions**: Faces and emotions 😀
- **Food**: Delicious treats 🍕
- **Nature**: Plants and animals 🌿
- **Flags**: Country flags 🏁
- **Sports**: Sports and activities ⚽
- **Travel**: Vehicles and transport ✈️

### Gameplay
- 4x4 grid memory matching game
- 60-second timer challenge
- Score tracking with local storage
- Responsive design for all devices
- Smooth animations and visual feedback

### React Features Used
- **useState**: Managing game state, scores, and UI states
- **useEffect**: Handling timers and side effects
- **Component Props**: Passing data between components
- **Event Handling**: Click events and user interactions
- **Conditional Rendering**: Showing different screens based on game state

## 🎮 How to Play

1. Choose your preferred emoji category
2. Click "Start Game" to begin the 60-second challenge
3. Click tiles to reveal emojis and find matching pairs
4. Earn 10 points per match + time bonus for completion
5. Try to beat your high score!

## 🛠 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📱 Responsive Design

The game works perfectly on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎨 Theme

- **Primary Color**: #2596be (blue)
- **Background**: White with subtle gradients
- **Font**: Poppins from Google Fonts
- **Design**: Clean, modern, and accessible

## 🧩 Learning Points

This project demonstrates:
- React functional components with hooks
- State management across multiple components
- Event handling and user interactions
- CSS styling and responsive design
- Local storage for data persistence
- Component composition and props
- Timer implementation with useEffect
- Array manipulation and game logic

Perfect for React beginners who want to learn through building a complete, interactive game!

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## 🎉 Enjoy Playing!

Have fun matching emojis and learning React at the same time!
