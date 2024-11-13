import alert from "../../util/alert.js";
import { getScreen, clear, div } from "../../util/screens.js";

function snake() {
    clear();

    return new Promise(resolve => {
        // Create game screen and container
        let gameScreen = getScreen("snake");
        let container = div(gameScreen, 'snake-container');
        const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';

        // Set the game over message based on language
        let gameOverMessage;
        switch (storedLanguage) {
            case 'pt':
                gameOverMessage = 'VOCÊ MORREU! ☠️ \n Pontuação: ';
                break;
            case 'en':
                gameOverMessage = 'YOU DIED! ☠️ \n Score: ';
                break;
            case 'fr':
                gameOverMessage = 'VOUS ÊTES MORT! ☠️ \n Score: ';
                break;
            case 'es':
                gameOverMessage = '¡HAS MUERTO! ☠️ \n Puntuación: ';
                break;
            default:
                gameOverMessage = 'YOU DIED! ☠️ \n Score: ';
        }

        const onGameOver = async (score) => {
            await alert(`${gameOverMessage} ${score}`);
            resolve(); // Resolve the Promise when the game is over
        };

        // Initialize and start the snake game
        let game = new SnakeGame({
            container,
            onGameOver
        });
        game.start();
    });
}

class SnakeGame {
    constructor({ container, onGameOver }) {
        this.container = container;
        this.onGameOver = onGameOver;
        
        this.boardSize = 400;
        this.cellSize = 20;
        this.score = 0;

        this.snake = [
            { x: 160, y: 200 },
            { x: 140, y: 200 },
            { x: 120, y: 200 },
        ];
        this.direction = { x: this.cellSize, y: 0 };
        this.food = { x: 300, y: 200 };
        this.gameInterval = null;

        // Setup board
        this.board = document.createElement("div");
        this.board.id = "game-board";
        this.board.style.width = `${this.boardSize}px`;
        this.board.style.height = `${this.boardSize}px`;
        this.board.classList.add("board");
        this.container.appendChild(this.board);

        // Setup score display
        this.scoreElement = document.createElement("div");
        this.scoreElement.id = "score";
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.container.appendChild(this.scoreElement);

        // Restart button
        this.restartButton = document.createElement("button");
        this.restartButton.id = "restart-button";
        this.restartButton.textContent = "Restart Game";
        this.restartButton.style.display = "none";
        this.restartButton.addEventListener("click", () => this.restartGame());
        this.container.appendChild(this.restartButton);

        // Listen for keyboard input
        document.addEventListener("keydown", (event) => this.changeDirection(event));
    }

    start() {
        this.gameInterval = setInterval(() => this.moveSnake(), 100);
        this.placeFood();
    }

    placeFood() {
        this.food = {
            x: Math.floor(Math.random() * (this.boardSize / this.cellSize)) * this.cellSize,
            y: Math.floor(Math.random() * (this.boardSize / this.cellSize)) * this.cellSize,
        };
        
        // Ensure food doesn't appear on the snake
        this.snake.forEach(segment => {
            if (segment.x === this.food.x && segment.y === this.food.y) {
                this.placeFood();
            }
        });
    }

    moveSnake() {
        const newHead = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };

        if (this.checkGameOver(newHead)) {
            this.endGame();
            return;
        }

        // Wrap around board edges
        if (newHead.x < 0) newHead.x = this.boardSize - this.cellSize;
        else if (newHead.x >= this.boardSize) newHead.x = 0;
        if (newHead.y < 0) newHead.y = this.boardSize - this.cellSize;
        else if (newHead.y >= this.boardSize) newHead.y = 0;

        this.snake.unshift(newHead);

        if (newHead.x === this.food.x && newHead.y === this.food.y) {
            this.score += 100;
            this.updateScore();
            this.placeFood();
        } else {
            this.snake.pop();
        }

        this.updateBoard();
    }

    checkGameOver(newHead) {
        // Check if snake collides with itself
        return this.snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y);
    }

    endGame() {
        clearInterval(this.gameInterval);
        this.restartButton.style.display = "block"; // Show restart button
        this.onGameOver(this.score); // Call game over handler
    }

    updateScore() {
        this.scoreElement.textContent = `Score: ${this.score}`;
    }

    updateBoard() {
        this.board.innerHTML = ""; // Clear previous board state

        // Draw snake
        this.snake.forEach((segment, index) => {
            const segmentElement = document.createElement("div");
            segmentElement.style.left = `${segment.x}px`;
            segmentElement.style.top = `${segment.y}px`;
            segmentElement.classList.add("snake");
            if (index === 0) segmentElement.classList.add("snake-head");
            this.board.appendChild(segmentElement);
        });

        // Draw food
        const foodElement = document.createElement("div");
        foodElement.style.left = `${this.food.x}px`;
        foodElement.style.top = `${this.food.y}px`;
        foodElement.classList.add("food");
        this.board.appendChild(foodElement);
    }

    changeDirection(event) {
        switch (event.keyCode) {
            case 37: // Left
                if (this.direction.x === 0) this.direction = { x: -this.cellSize, y: 0 };
                break;
            case 38: // Up
                if (this.direction.y === 0) this.direction = { x: 0, y: -this.cellSize };
                break;
            case 39: // Right
                if (this.direction.x === 0) this.direction = { x: this.cellSize, y: 0 };
                break;
            case 40: // Down
                if (this.direction.y === 0) this.direction = { x: 0, y: this.cellSize };
                break;
        }
    }

    restartGame() {
        this.score = 0;
        this.updateScore();
        this.snake = [
            { x: 160, y: 200 },
            { x: 140, y: 200 },
            { x: 120, y: 200 },
        ];
        this.direction = { x: this.cellSize, y: 0 };
        this.restartButton.style.display = "none";
        this.start();
    }
}

const stylesheets = ['snake'];
export { stylesheets };
export default snake;