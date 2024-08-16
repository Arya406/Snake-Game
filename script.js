document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const score = document.getElementById('score');
    const instructionText = document.getElementById('instruction-text');
    const logo = document.getElementById('logo');
    const highScoreText = document.getElementById('highScore');
    const hideText = document.getElementById('hide');
    const Yourinfo = document.getElementById('YourScore');
    const Yours = document.getElementById('Arya');
    const start = document.getElementById('Playbtn');
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let highScore = 0;
    let food = generateFood();
    let direction = 'right';
    let gameSpeedDelay = 200;
    let gameStarted = false;
    let count = localStorage.getItem("count");
  
    
    
      
    
    
      function startGame() {
      localStorage.setItem("count",0)
      gameStarted = true; 
      instructionText.style.display = 'none'; 
      logo.style.display = 'none'; 
      hideText.style.display = 'none';
      Yourinfo.style.display = 'none';
      
      gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
      }, gameSpeedDelay);
    }
  
    function stopGame() {
      clearInterval(gameInterval);
      gameStarted = false;
      instructionText.style.display = 'block';
      logo.style.display = 'block';
      hideText.style.display = 'block';
      
    }
  
    function draw() {
      board.innerHTML = ''; 
      drawSnake();
      drawFood();
      updateScore();
      

      
    }
  
    function drawSnake() {
      snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
      });
    }
  
    function drawFood() {
      const foodElement = createGameElement('div', 'food');
      setPosition(foodElement, food);
      board.appendChild(foodElement);
    }
  
    function createGameElement(tag, className) {
      const element = document.createElement(tag);
      element.className = className;
      return element;
    }
  
    function setPosition(element, position) {
      element.style.gridColumn = position.x;
      element.style.gridRow = position.y;
    }
  
   
  
    function generateFood() {
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * gridSize) + 1,
          y: Math.floor(Math.random() * gridSize) + 1,
        };
      } while (isFoodOnSnake(newFood) );
    
  
      return newFood;
    }


  
    function isFoodOnSnake(food) {
      return snake.some(
        (segment) => segment.x === food.x && segment.y === food.y
      );
    }
  
    function move() {
      const head = { ...snake[0] };
  
      switch (direction) {
        case 'up':
          head.y--;
          break;
        case 'down':
          head.y++;
          break;
        case 'left':
          head.x--;
          break;
        case 'right':
          head.x++;
          break;
      }
  
      snake.unshift(head);
  
      
  
      if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
          move();
          checkCollision();
          draw();
        }, gameSpeedDelay);
      } else {
        snake.pop();
      }
    }
  
    function increaseSpeed() {
      if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
      } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
      } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
      } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
      }
    }

    start.addEventListener('click' , () => {
      startGame()
    })
      
  
    function handleKeyPress(event) {
    
      if (
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')
      ) {
        startGame(); 
      } else {
        switch (event.key) {
          case 'ArrowUp':
            direction = 'up';
            break;
          case 'ArrowDown':
            direction = 'down';
            break;
          case 'ArrowLeft':
            direction = 'left';
            break;
          case 'ArrowRight':
            direction = 'right';
            break;
        }
      }
    }
  
    document.addEventListener('keydown', handleKeyPress);
  
    function checkCollision() {
      const head = snake[0];
  
      if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        Yours.innerHTML=localStorage.getItem("count"); 
        resetGame();

      }
  
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          Yours.innerHTML=localStorage.getItem("count"); 
          resetGame();
        }
      }
    }
  
    function updateScore() {
      const currentScore = snake.length - 1;
      score.textContent = currentScore.toString().padStart(3, '0');
     if(currentScore>0){
        localStorage.setItem("count",currentScore);
        count = localStorage.getItem("count");

      }
      
      return currentScore;
      
      
      
      
    }
  
    function updateHighScore() {
      Yourinfo.style.display = 'block'
      const currentScore = snake.length - 1;
      if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
      }
      highScoreText.style.display = 'block';
    }
  
    function resetGame() {
      updateHighScore();
      stopGame();
      snake = [{ x: 10, y: 10 }];
      food = generateFood();
      direction = 'right';
      gameSpeedDelay = 200;
      updateScore(); 
      
    }
    

});