(function(root) {
  SpaceSnake = root.SpaceSnake = (root.SpaceSnake || {})
  
  var START_POS = [250,200];
  var BOARD_SIZE = [500, 400];

  Game = SpaceSnake.Game = function() {
    this.snake = new SpaceSnake.Snake(START_POS);
    this.apple = SpaceSnake.generateApple(BOARD_SIZE);
    this.bullets = [];
    this.asteroids = [];
    this.intervalIDs = [];
    this.paused = true;
    this.score = 0;
    
    setInterval(this.generateAsteroids.bind(this), 15000);
    
  }

  Game.newGame = function() {
  	game = new Game();
    
  	var canvas = $('#game-canvas');
    canvas.attr("width", BOARD_SIZE[0])
    canvas.attr("height", BOARD_SIZE[1])
  	game.ctx = canvas[0].getContext('2d');
    
  	Mousetrap.bind('up', game.snake.head.accel.bind(game.snake.head));
  	Mousetrap.bind('down', game.snake.head.decel.bind(game.snake.head));
  	Mousetrap.bind('left', game.snake.head.turnLeft.bind(game.snake.head));
  	Mousetrap.bind('right', game.snake.head.turnRight.bind(game.snake.head));
    // Mousetrap.bind('g', game.snake.grow.bind(game.snake));
  	Mousetrap.bind('p', game.pause.bind(game));
    Mousetrap.bind('space', game.fire.bind(game));
    
    game.renderStartScreen();
    $("#status").html("Press P to begin");
    return game;
  }

  Game.prototype.pause = function() {
    if (this.paused == true){
      this.paused = false;
      this.intervalIDs[0] = setInterval(this.run.bind(this), 42);
      console.log("game in play...");
    } else {
      this.paused = true;
      clearInterval(this.intervalIDs[0]);
      $('#status').html("game paused...");
      console.log("game paused...");
    }
  }

  Game.prototype.run = function() {
    var that = this;
    $('#status').html("Eat apples, avoid asteroids!");
    this.render();
    
    //check for asteroid hits
    _.each(that.asteroids, function(asteroid) {
      _.each(that.snake.segments, function(segment) {
        if (asteroid.hits(segment)) {
          return that.gameOver();
        }
      })
      
      _.each(that.bullets, function(bullet) {
        if (asteroid.hits(bullet)) {
          asteroid.dead = true;
        }
      })
    })
    
    //garbage collect dead asteroids
    this.asteroids = _.reject(this.asteroids, function(asteroid) {
      return asteroid.dead;
    })
      
    
    //snake eats and grow or moves
    if (this.snake.head.hits(this.apple)) {
      console.log("snake eats and grows!!!")
      this.snake.grow(BOARD_SIZE);
      this.score += 1;
      this.apple = SpaceSnake.generateApple(BOARD_SIZE);
    } else {
      this.snake.move(BOARD_SIZE);
    }
    
    // asteroids move
    _.each(this.asteroids, function(asteroid){
      asteroid.move(BOARD_SIZE);
    })
    
    //bullets move
    _.each(this.bullets, function(bullet) {
      bullet.move(BOARD_SIZE);
    })
    
    //garbage collect oob bullets
    this.bullets = _.reject(this.bullets, function(bullet) {
      return bullet.oob;
    })
  }
  
  Game.prototype.gameOver = function() {
    clearInterval(this.intervalIDs[0]);
    $("#status").html("Game over!");
    
  }
  
  Game.prototype.fire = function() {
    this.bullets.push(this.snake.head.fire());
  }
  
  Game.prototype.generateAsteroids = function () {
    console.log("generating asteroids");
    if (this.asteroids.length < 5) {
      this.asteroids.push(SpaceSnake.generateAsteroid(BOARD_SIZE));
    }
    
  }

  Game.prototype.render = function() {
    $('#score').html("Score: " + this.score);
    var ctx = this.ctx;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, BOARD_SIZE[0], BOARD_SIZE[1]);
  
    this.snake.render(ctx); 
    this.apple.render(ctx);
    
    _.each(this.asteroids, function(asteroid) {
      asteroid.render(ctx);
    })
    
    _.each(this.bullets, function(bullet) {
      bullet.render(ctx);
    })
    
    
  }
  
  Game.prototype.renderStartScreen = function() {
    this.render()
  }
  
})(this);
