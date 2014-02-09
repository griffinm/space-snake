(function(root) {
  SpaceSnake = root.SpaceSnake = (root.SpaceSnake || {})
  
  Apple = SpaceSnake.Apple = function(pos){
    this.pos = pos;
    this.radius = 5;
  }
  
  SpaceSnake.generateApple = function(boardSize) {
    var x = Math.floor(Math.random()*(boardSize[0] - 10) + 5);
    var y = Math.floor(Math.random()*(boardSize[1] - 10) + 5);
    
    return new Apple([x, y]);
  }
  
  Apple.prototype.render = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
  
  Bullet = SpaceSnake.Bullet = function(pos, vel) {
    this.pos = pos;
    this.velocity = vel;
    this.radius = 2;
    this.oob = false; //out of bounds flag
  }
  
  Bullet.prototype.move = function(boardSize) {
    var dx = Math.cos(this.velocity.angle)*this.velocity.mag;
    var dy = Math.sin(this.velocity.angle)*this.velocity.mag;
    
    this.pos[0] += dx;
    this.pos[1] += dy;
    
    for (var i = 0; i < 2; i++) {
      if (this.pos[i] < 0 || this.pos[i] > boardSize[i]) {
        this.oob = true; 
      }
    }
  }
  
  Bullet.prototype.render = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
  
  Asteroid = SpaceSnake.Asteroid = function(pos, vel, rad) {
    this.pos = pos;
    this.velocity = vel;
    this.radius = rad;
  }
  
  SpaceSnake.generateAsteroid = function(boardSize) {
    var pos = [Math.floor(Math.random()*boardSize[0]), 0];
    var velMag = Math.floor(Math.random()*7 + 1);
    var velAng = Math.floor(Math.random()*Math.PI )
    var rad = Math.floor(Math.random()*5 + 5);
    
    return new Asteroid(pos, {angle: velAng, mag: velMag}, rad);
  }
  
  Asteroid.prototype.move = function(boardSize) {
    var dx = Math.cos(this.velocity.angle)*this.velocity.mag;
    var dy = Math.sin(this.velocity.angle)*this.velocity.mag;
    
    this.pos[0] += dx;
    this.pos[1] += dy;
    
    for(var i=0; i < 2; i++) {
      if (this.pos[i] < 0) {
        this.pos[i] += boardSize[i];
      } else if (this.pos[i] > boardSize[i]) {
        this.pos[i] -= boardSize[i];
      }
    }
  }
  
  Asteroid.prototype.render = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
  
  
  
})(this);