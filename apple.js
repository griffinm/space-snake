(function(root) {
  SpaceSnake = root.SpaceSnake = (root.SpaceSnake || {})
  
  Apple = SpaceSnake.Apple = function(pos){
    this.pos = pos;
    this.radius = 5;
  }
  
  SpaceSnake.generateApple = function(boardSize) {
    var x = Math.floor(Math.random()*boardSize[0]);
    var y = Math.floor(Math.random()*boardSize[1]);
    
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
  }
  
  Bullet.prototype.move = function() {
    var dx = Math.cos(this.velocity.angle)*this.velocity.mag;
    var dy = Math.sin(this.velocity.angle)*this.velocity.mag;
    
    this.pos[0] += dx;
    this.pos[1] += dy;
  }
  
  Bullet.prototype.render = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
  
})(this);