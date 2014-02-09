(function(root){
  
  SpaceSnake = root.SpaceSnake = (root.SpaceSnake || {})
  var MAX_SPEED = 10;
  var MIN_SPEED = 5;
  var TURN_ANGLE = 90;
  
  Snake = SpaceSnake.Snake = function(startPos) {
    this.head = new SnakeHead(startPos);
    this.segments = [this.head];
  }

  Snake.prototype.move = function(boardSize) {
    //move the segments
    for(var i = this.segments.length - 1; i > 0; i--) {
      this.segments[i].pos = this.segments[i-1].pos.slice();
    }
    
    //move the snakehead
    this.head.move(boardSize);
  }

  Snake.prototype.grow = function(boardSize){
    var last_segment = this.segments[this.segments.length-1];
    var new_seg_pos = [last_segment.pos[0], last_segment.pos[1]];
    this.move(boardSize);
    this.segments.push(new SnakeSegment(new_seg_pos));
  }

  Snake.prototype.render = function(ctx) {
    _.each(this.segments, function(segment) {
      segment.render(ctx);
    });
  }
  
  SnakeHead = SpaceSnake.SnakeHead = function(pos) {
    this.pos = pos;
    this.velocity = { angle: 0, mag: 5 }
    this.radius = 7;
    this.color = 'green';
  }

  SnakeHead.prototype.move = function(boardSize) {
    var dx = Math.cos(this.velocity.angle)*this.velocity.mag;
    var dy = Math.sin(this.velocity.angle)*this.velocity.mag;
    this.pos[0] += dx;
    this.pos[1] += dy;
    
    //wrapping
    for(var i=0; i < 2; i++) {
      if (this.pos[i] < 0) {
        this.pos[i] += boardSize[i];
      } else if (this.pos[i] > boardSize[i]) {
        this.pos[i] -= boardSize[i];
      }
    }    
  }
  
  SnakeHead.prototype.turnRight = function() {
    this.velocity.angle += TURN_ANGLE*Math.PI/180;
  }

  SnakeHead.prototype.turnLeft = function() {
    this.velocity.angle -= TURN_ANGLE*Math.PI/180;
  }
  
  SnakeHead.prototype.accel = function() {
    this.velocity.mag += 1;
  
    if (this.velocity.mag > MAX_SPEED) {
      this.velocity.mag = MAX_SPEED;
    }
  }

  SnakeHead.prototype.decel = function() {
    this.velocity.mag -= 1;
    if (this.velocity.mag < MIN_SPEED) {
      this.velocity.mag = MIN_SPEED;
    }
  }
  
  SnakeHead.prototype.fire = function() {
    var pos = this.pos.slice();
    var vel = {
      angle: this.velocity.angle,
      mag: this.velocity.mag + 10
    };
    
    return new SpaceSnake.Bullet(pos, vel);
  }
  
  SnakeHead.prototype.hits = function(obj) {
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = obj.pos[0];
    var y2 = obj.pos[1];
    
    var dist = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
    
    if (dist < this.radius + obj.radius) {
      return true;
    } else {
      return false;
    }
  }
  
  SnakeHead.prototype.render = function(ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
  
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2)
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  SnakeSegment = SpaceSnake.SnakeSegment = function(pos) {
    this.pos = pos;
    this.radius = 5;
    this.color = 'green';
  }

  SnakeSegment.prototype.render = function(ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
  
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2)
    ctx.fillStyle = this.color;
    ctx.fill();
  }
    
})(this);
