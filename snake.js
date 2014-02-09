(function(root){
  
  SpaceSnake = root.SpaceSnake = (root.SpaceSnake || {})
  var MAX_SPEED = 10;
  
  Snake = SpaceSnake.Snake = function(startPos) {
    this.segments = [new SnakeHead(startPos)];
    this.velocity = { angle: 0, mag: 5 }
    this.turnAngle = 90;
  }

  Snake.prototype.move = function() {
    var dx = Math.cos(this.velocity.angle)*this.velocity.mag;
    var dy = Math.sin(this.velocity.angle)*this.velocity.mag;
    for(var i = this.segments.length - 1; i > 0; i--) {
      this.segments[i].pos = this.segments[i-1].pos.slice();
    }
    this.segments[0].pos[0] += dx;
    this.segments[0].pos[1] += dy;
  }

  Snake.prototype.grow = function(){
    var last_segment = this.segments[this.segments.length-1];
    var new_seg_pos = [last_segment.pos[0], last_segment.pos[1]];
    this.move();
    this.segments.push(new SnakeSegment(new_seg_pos));
  }

  Snake.prototype.turnRight = function() {
    this.velocity.angle += this.turnAngle*Math.PI/180;
  }

  Snake.prototype.turnLeft = function() {
    this.velocity.angle -= this.turnAngle*Math.PI/180;
  }
  
  Snake.prototype.fire = function() {
    var pos = this.segments[0].pos.slice();
    var vel = {};
    vel.mag = this.velocity.mag + 10;
    vel.angle = this.velocity.angle;
    
    return new SpaceSnake.Bullet(pos, vel);
    
  }

  Snake.prototype.accel = function() {
    this.velocity.mag += 1;
  
    if (this.velocity.mag > MAX_SPEED) {
      this.velocity.mag = MAX_SPEED;
    }
  }

  Snake.prototype.decel = function() {
    this.velocity.mag -= 1;
    if (this.velocity.mag < 1) {
      this.velocity.mag = 1;
    }
  }

  Snake.prototype.render = function(ctx) {
    _.each(this.segments, function(segment) {
      segment.render(ctx);
    });
  }
  
  Snake.prototype.eatApple = function(apple) {
    var x1 = this.segments[0].pos[0];
    var y1 = this.segments[0].pos[1];
    var x2 = apple.pos[0];
    var y2 = apple.pos[1];
    
    var dist = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
    
    if (dist < this.segments[0].radius + apple.radius) {
      return true;
    } else {
      return false;
    }
  }

  SnakeHead = SpaceSnake.SnakeHead = function(pos) {
    this.pos = pos;
    this.radius = 7;
  }

  SnakeHead.prototype.render = function(ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
  
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2)
    ctx.fillStyle = "green";
    ctx.fill();
  }

  SnakeSegment = SpaceSnake.SnakeSegment = function(pos) {
    this.pos = pos;
    this.radius = 5;
  }

  SnakeSegment.prototype.render = function(ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
  
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2)
    ctx.fillStyle = "green";
    ctx.fill();
  }
    
})(this);
