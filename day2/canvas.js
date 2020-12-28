// reference:https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice

// canvas
const canvas = document.getElementById('bb');
const ctx = canvas.getContext('2d'); // drawing area tp draw 2d balls
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// return random number between min and max
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// constructor to define ball object

function Ball(x, y, vX, vY, color, size) {
  this.x = x; // x coordinate to start
  this.y = y;
  this.vX = vX; // velocity
  this.vY = vY;
  this.color = color;
  this.size = size;
}

// define draw method for Ball: to make the ball move, update the position of it
Ball.prototype.draw = function() {
  ctx.beginPath(); // state to start draw
  ctx.fillStyle = this.color; // fill shape and color
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // 0 - 360 that form a circle
  ctx.fill(); // stop drawing
};

// define update method for Ball: boundary x + radius/ - radius
Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.vX = -(this.vX);
  }

  if((this.x - this.size) <= 0) {
    this.vX = -(this.vX);
  }

  if((this.y + this.size) >= height) {
    this.vY = -(this.vY);
  }

  if((this.y - this.size) <= 0) {
    this.vY = -(this.vY);
  }

  this.x += this.vX;
  this.y += this.vY;
};

// define ball collision detection
Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};

// define array to store balls and populate it
let balls = [];

while(balls.length < 7) {
  const size = 50;
  // new object
  let ball = new Ball(
    random(0 + size,width - size), // (x, y)
    random(0 + size,height - size), 
    random(-20,20),
    random(-20,20), // vel
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  balls.push(ball);
}

// define loop that keeps drawing 
function loop() {
  ctx.fillStyle = 'rgba(137, 196, 244, 0.5)'; // http://www.flatuicolorpicker.com/blue-rgba-color-model/
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
