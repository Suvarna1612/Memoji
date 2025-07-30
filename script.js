class EmojiMatcher {
    constructor() {
        this.currentCategory = null;
        this.currentScore = 0;
        this.timeLeft = 60;
        this.gameActive = false;
        this.timer = null;
        this.clickedTiles = [];
        this.matchedPairs = 0;
        this.totalPairs = 8; // 4x4 grid = 16 tiles = 8 pairs
        
        this.emojiCategories = {
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

        this.initializeGame();
    }

    initializeGame() {
        this.setupEventListeners();
        this.updateScoreDisplay();
    }

    setupEventListeners() {
        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.selectCategory(category);
            });
        });

        // Game controls
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('back-btn').addEventListener('click', () => this.goBackToCategories());
        
        document.getElementById('play-again-btn').addEventListener('click', () => this.playAgain());
        document.getElementById('change-category-btn').addEventListener('click', () => this.goBackToCategories());
    }

    selectCategory(category) {
        this.currentCategory = category;
        this.showScreen('game-screen');
        
        const categoryTitle = document.getElementById('category-title');
        categoryTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Matcher`;
        
        this.createGameBoard();
    }

    createGameBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        // Get random emojis for this category
        const categoryEmojis = this.emojiCategories[this.currentCategory];
        const selectedEmojis = this.getRandomEmojis(categoryEmojis, this.totalPairs);
        
        // Create pairs and shuffle
        const gameEmojis = [...selectedEmojis, ...selectedEmojis];
        this.shuffleArray(gameEmojis);
        
        // Create tiles
        gameEmojis.forEach((emoji, index) => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.emoji = emoji;
            tile.dataset.index = index;
            tile.textContent = '?';
            tile.addEventListener('click', () => this.handleTileClick(tile));
            gameBoard.appendChild(tile);
        });
    }

    getRandomEmojis(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startGame() {
        this.gameActive = true;
        this.currentScore = 0;
        this.matchedPairs = 0;
        this.timeLeft = 60;
        this.clickedTiles = [];
        
        this.updateScoreDisplay();
        this.startTimer();
        
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('reset-btn').style.display = 'inline-block';
        
        this.setGameStatus('Game started! Find matching emoji pairs!');
    }

    resetGame() {
        this.gameActive = false;
        this.clearTimer();
        this.currentScore = 0;
        this.matchedPairs = 0;
        this.timeLeft = 60;
        this.clickedTiles = [];
        
        this.updateScoreDisplay();
        this.createGameBoard();
        
        document.getElementById('start-btn').style.display = 'inline-block';
        document.getElementById('reset-btn').style.display = 'none';
        
        this.setGameStatus('Click "Start Game" to begin!');
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    handleTileClick(tile) {
        if (!this.gameActive || tile.classList.contains('matched') || this.clickedTiles.includes(tile)) {
            return;
        }

        // Reveal the emoji
        tile.textContent = tile.dataset.emoji;
        tile.classList.add('clicked');
        this.clickedTiles.push(tile);

        if (this.clickedTiles.length === 2) {
            this.checkForMatch();
        }
    }

    checkForMatch() {
        const [tile1, tile2] = this.clickedTiles;
        const emoji1 = tile1.dataset.emoji;
        const emoji2 = tile2.dataset.emoji;

        if (emoji1 === emoji2) {
            // Match found!
            // Update score immediately
            this.matchedPairs++;
            this.currentScore += 10;
            this.updateScoreDisplay();
            
            setTimeout(() => {
                tile1.classList.remove('clicked');
                tile2.classList.remove('clicked');
                tile1.classList.add('matched');
                tile2.classList.add('matched');
                
                this.setGameStatus('Great match! +10 points');
                
                if (this.matchedPairs === this.totalPairs) {
                    this.winGame();
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                tile1.textContent = '?';
                tile2.textContent = '?';
                tile1.classList.remove('clicked');
                tile2.classList.remove('clicked');
                tile1.classList.add('wrong');
                tile2.classList.add('wrong');
                
                setTimeout(() => {
                    tile1.classList.remove('wrong');
                    tile2.classList.remove('wrong');
                }, 500);
                
                this.setGameStatus('Try again!');
            }, 1000);
        }

        this.clickedTiles = [];
    }

    winGame() {
        this.gameActive = false;
        this.clearTimer();
        
        this.setGameStatus(`Congratulations! You won!`);
        
        setTimeout(() => {
            this.showGameOverScreen();
        }, 2000);
    }

    endGame() {
        this.gameActive = false;
        this.clearTimer();
        this.setGameStatus('Time\'s up!');
        
        setTimeout(() => {
            this.showGameOverScreen();
        }, 1500);
    }

    updateScoreDisplay() {
        document.getElementById('current-score').textContent = this.currentScore;
    }

    updateTimerDisplay() {
        document.getElementById('timer').textContent = this.timeLeft;
        
        // Change color when time is running out
        const timerElement = document.getElementById('timer');
        if (this.timeLeft <= 10) {
            timerElement.style.color = '#dc3545';
        } else {
            timerElement.style.color = '#2596be';
        }
    }

    setGameStatus(message) {
        document.getElementById('game-status').textContent = message;
    }

    showGameOverScreen() {
        document.getElementById('final-score').textContent = this.currentScore;
        
        const highScoreMessage = document.getElementById('high-score-message');
        highScoreMessage.textContent = '';
        
        this.showScreen('gameover-screen');
    }

    playAgain() {
        this.showScreen('game-screen');
        this.resetGame();
    }

    goBackToCategories() {
        this.showScreen('category-screen');
        this.resetGame();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EmojiMatcher();
});
