(function(root) {
  SpaceSnake = root.SpaceSnake = (root.SpaceSnake || {})
  
  var Apple = SpaceSnake.Apple = function(pos){
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
  
  var Bullet = SpaceSnake.Bullet = function(pos, vel) {
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
  
  var Asteroid = SpaceSnake.Asteroid = function(pos, vel, rad) {
    this.pos = pos;
    this.velocity = vel;
    this.radius = rad;
    this.dead = false;
  }
  
  SpaceSnake.generateAsteroid = function(boardSize) {
    var pos = [Math.floor(Math.random()*boardSize[0]), 
              Math.floor(Math.random())*boardSize[1]];
    var velMag = Math.floor(Math.random()*5 + 2);
    var velAng = Math.floor(Math.random()*2*Math.PI )
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
  
  Asteroid.prototype.hits = function(obj) {
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = obj.pos[0];
    var y2 = obj.pos[1];
    var dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    
    if (dist < this.radius + obj.radius) {
      return true;
    } else {
      return false;
    }
  }

})(this);