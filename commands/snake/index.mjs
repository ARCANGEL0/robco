// friend.mjs

import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import { type, waitForKey,input, cleanInput,isPrintable } from "../../util/io.js";
import eXit from './game.mjs';
import pause from "../../util/pause.js";
import { typeSound } from "../../sound/index.js"
import say from "../../util/speak.js";

async function snake() {
    clear();
    await type('Loading Snake Game...');

    return new Promise(async (resolve) => {
        // Create game screen
        const gameScreen = getScreen("snake");
        gameScreen.style.position = "relative";
        gameScreen.style.width = "600px";
        gameScreen.style.height = "400px";
        gameScreen.style.border = "1px solid black";
        gameScreen.style.overflow = "hidden";

        const scoreElement = document.createElement("div");
        scoreElement.id = "score";
        scoreElement.innerText = "Score: 0";
        gameScreen.appendChild(scoreElement);

        const board = document.createElement("div");
        board.id = "game-board";
        board.style.position = "absolute";
        board.style.width = "100%";
        board.style.height = "100%";
        gameScreen.appendChild(board);

        let score = 0;
        let snake = [{ x: 12, y: 5 }, { x: 12, y: 6 }];
        let direction = { x: 0, y: -1 };
        let foodPos = { x: 5, y: 3 };
        let interval;

        document.addEventListener("keydown", changeDirection);

        await newGame();
        resolve();

        async function newGame() {
            score = 0;
            snake = [{ x: 12, y: 5 }, { x: 12, y: 6 }];
            direction = { x: 0, y: -1 };
            placeFood();
            updateScore();
            clearInterval(interval);
            interval = setInterval(loop, 200);
            drawBoard();
        }

        function placeFood() {
            foodPos.x = Math.floor(Math.random() * (600 / 20));
            foodPos.y = Math.floor(Math.random() * (400 / 20));
        }

        function changeDirection(event) {
            switch (event.key) {
                case "ArrowUp":
                    if (direction.y === 0) direction = { x: 0, y: -1 };
                    break;
                case "ArrowDown":
                    if (direction.y === 0) direction = { x: 0, y: 1 };
                    break;
                case "ArrowLeft":
                    if (direction.x === 0) direction = { x: -1, y: 0 };
                    break;
                case "ArrowRight":
                    if (direction.x === 0) direction = { x: 1, y: 0 };
                    break;
            }
        }

        function loop() {
            const newHead = {
                x: snake[0].x + direction.x,
                y: snake[0].y + direction.y
            };

            if (newHead.x < 0 || newHead.x >= 30 || newHead.y < 0 || newHead.y >= 20 || isEatingSelf(newHead)) {
                gameOver();
                return;
            }

            snake.unshift(newHead);

            if (isEatingFood(newHead)) {
                score++;
                updateScore();
                placeFood();
            } else {
                snake.pop();
            }

            drawBoard();
        }

        function isEatingFood(head) {
            return head.x === foodPos.x && head.y === foodPos.y;
        }

        function isEatingSelf(head) {
            return snake.some(segment => segment.x === head.x && segment.y === head.y);
        }

        function drawBoard() {
            board.innerHTML = "";
            snake.forEach(segment => {
                const snakeElement = document.createElement("div");
                snakeElement.style.left = `${segment.x * 20}px`;
                snakeElement.style.top = `${segment.y * 20}px`;
                snakeElement.classList.add("snake");
                board.appendChild(snakeElement);
            });

            const foodElement = document.createElement("div");
            foodElement.style.left = `${foodPos.x * 20}px`;
            foodElement.style.top = `${foodPos.y * 20}px`;
            foodElement.classList.add("food");
            board.appendChild(foodElement);
        }

        function updateScore() {
            scoreElement.innerText = `Score: ${score}`;
        }

        function gameOver() {
            clearInterval(interval);
            alert(`Game Over! Your score is: ${score}`);
            newGame();
        }
    });
}

const stylesheets = ["snake"];
const templates = ["snake"];
export { templates, stylesheets };
export default snake;
