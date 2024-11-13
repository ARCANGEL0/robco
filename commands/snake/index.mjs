function snake() {
  document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const scoreElement = document.getElementById("score");
    const restartButton = document.getElementById("restart-button");

    const boardSize = 400;
    const cellSize = 20;

    let score = 0;
    let snakeB = [
      { x: 160, y: 200 },
      { x: 140, y: 200 },
      { x: 120, y: 200 },
    ];
    let direction = { x: cellSize, y: 0 };
    let food = { x: 300, y: 200 };
    let gameInterval;

    function snakeT() {
      gameInterval = setInterval(moveSnake, 100);
      placeFood();
    }

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * (boardSize / cellSize)) * cellSize,
        y: Math.floor(Math.random() * (boardSize / cellSize)) * cellSize,
      };
      snakeB.forEach(function (segment) {
        if (segment.x === food.x && segment.y === food.y) {
          placeFood();
        }
      });
    }

    function moveSnake() {
      const newHead = { x: snakeB[0].x + direction.x, y: snakeB[0].y + direction.y };

      if (checkGameOver()) {
        endGame();
        return;
      }

      if (newHead.x < 0) {
        newHead.x = boardSize - cellSize;
      } else if (newHead.x >= boardSize) {
        newHead.x = 0;
      } else if (newHead.y < 0) {
        newHead.y = boardSize - cellSize;
      } else if (newHead.y >= boardSize) {
        newHead.y = 0;
      }

      snakeB.unshift(newHead);
      if (snakeB[0].x === food.x && snakeB[0].y === food.y) {
        score += 100;
        updateScore();
        placeFood();
      } else {
        snakeB.pop();
      }
      updateBoard();
    }

    function endGame() {
      clearInterval(gameInterval);
      alert(`Game Over! Your score is: ${score}`);
      restartButton.style.display = "block";
    }

    function checkGameOver() {
      for (let i = 4; i < snakeB.length; i++) {
        if (snakeB[i].x === snakeB[0].x && snakeB[i].y === snakeB[0].y) {
          return true;
        }
      }
      return false;
    }

    function updateScore() {
      scoreElement.textContent = score;
    }

    function updateBoard() {
      board.innerHTML = "";
      snakeB.forEach((segment, index) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        snakeElement.classList.add("snake");
        if (index === 0) {
          snakeElement.classList.add("snake-head");
        }
        board.appendChild(snakeElement);
      });

      const foodElement = document.createElement("div");
      foodElement.style.left = `${food.x}px`;
      foodElement.style.top = `${food.y}px`;
      foodElement.classList.add("food");
      board.appendChild(foodElement);
    }

    function changeDirection(event) {
      switch (event.keyCode) {
        case 37:
          direction = { x: -cellSize, y: 0 };
          break;
        case 38:
          direction = { x: 0, y: -cellSize };
          break;
        case 39:
          direction = { x: cellSize, y: 0 };
          break;
        case 40:
          direction = { x: 0, y: cellSize };
          break;
      }
    }

    document.addEventListener("keydown", changeDirection);
    snakeT();
  });
}

const stylesheets = ["snake"];
const templates = ["snake"];
export { templates, stylesheets };
export default snake;