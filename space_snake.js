(function(root) {
  SpaceSnake = root.SpaceSnake = (root.SpaceSnake || {})
  
  var START_POS = [250,200];
  var BOARD_SIZE = [500, 400];

  Game = SpaceSnake.Game = function() {
    this.snake = new SpaceSnake.Snake(START_POS);
    this.apple = SpaceSnake.generateApple(BOARD_SIZE);
    this.bullets = [];
    this.intervalID;
    this.paused = true;
  }

  Game.newGame = function() {
  	game = new Game();
  	Mousetrap.bind('up', game.snake.accel.bind(game.snake));
  	Mousetrap.bind('down', game.snake.decel.bind(game.snake));
  	Mousetrap.bind('left', game.snake.turnLeft.bind(game.snake));
  	Mousetrap.bind('right', game.snake.turnRight.bind(game.snake));
    Mousetrap.bind('g', game.snake.grow.bind(game.snake));
  	Mousetrap.bind('p', game.pause.bind(game));
    Mousetrap.bind('space', game.fire.bind(game));
    return game;
  }

  Game.prototype.pause = function() {
    if (this.paused == true){
      this.paused = false;
      this.intervalID = setInterval(this.run.bind(this), 42);
      console.log("game in play...")
    } else {
      this.paused = true;
      clearInterval(this.intervalID);
      console.log("game paused...")
    }
  }

  Game.prototype.run = function() {
    this.render();
    if (this.snake.eatApple(this.apple)) {
      this.snake.grow();
      this.apple = SpaceSnake.generateApple(BOARD_SIZE);
    } else {
      this.snake.move();
    }
    
    _.each(this.bullets, function(bullet) {
      bullet.move();
    })
    
  }
  
  Game.prototype.fire = function() {
    this.bullets.push(this.snake.fire());
  }

  Game.prototype.render = function() {
  
  	var canvas = $('#space-snake');
    canvas.attr("width", BOARD_SIZE[0])
    canvas.attr("height", BOARD_SIZE[1])
  	ctx = canvas[0].getContext('2d');
  
    ctx.fillStyle = "black";
  
    ctx.fillRect(0,0, BOARD_SIZE[0], BOARD_SIZE[1]);
  
    this.snake.render(ctx); 
    this.apple.render(ctx);
    _.each(this.bullets, function(bullet) {
      bullet.render(ctx);
    })
  }
})(this);
