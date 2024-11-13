function snake() {
  const board = document.getElementById("game-board");
  const scoreElement = document.getElementById("score");
  const restartButton = document.getElementById("restart-button");

  const boardWidth = 600;
  const boardHeight = 400;
  const cellSize = 20;

  let score = 0;
  let snake = [
      { x: 12, y: 5 },
      { x: 12, y: 6 }
  ];
  let direction = { x: 0, y: -1 };
  let foodPos = { x: 5, y: 3 };
  let interval;

  document.addEventListener("keydown", changeDirection);
  restartButton.addEventListener("click", newGame);

  function newGame() {
      score = 0;
      snake = [
          { x: 12, y: 5 },
          { x: 12, y: 6 }
      ];
      direction = { x: 0, y: -1 };
      placeFood();
      updateScore();
      clearInterval(interval);
      interval = setInterval(loop, 200);
      drawBoard();
      restartButton.style.display = "none";
  }

  function placeFood() {
      foodPos.x = Math.floor(Math.random() * (boardWidth / cellSize));
      foodPos.y = Math.floor(Math.random() * (boardHeight / cellSize));
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

      if (newHead.x < 0 || newHead.x >= boardWidth / cellSize || newHead.y < 0 || newHead.y >= boardHeight / cellSize || isEatingSelf(newHead)) {
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
          snakeElement.style.left = `${segment.x * cellSize}px`;
          snakeElement.style.top = `${segment.y * cellSize}px`;
          snakeElement.classList.add("snake");
          board.appendChild(snakeElement);
      });

      const foodElement = document.createElement("div");
      foodElement.style.left = `${foodPos.x * cellSize}px`;
      foodElement.style.top = `${foodPos.y * cellSize}px`;
      foodElement.classList.add("food");
      board.appendChild(foodElement);
  }

  function updateScore() {
      scoreElement.textContent = score;
  }

  function gameOver() {
      clearInterval(interval);
      alert(`Game Over! Your score is: ${score}`);
      restartButton.style.display = "block";
  }
}

const stylesheets = ["snake"];
const templates = ["snake"];
export { templates, stylesheets };
export default snake;