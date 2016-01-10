// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function(startX,startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.randomSpeed = function() {
  var speedMultiply = Math.floor(Math.random() * 5 + 1);
  this.speed = 75 * speedMultiply;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * 1 * dt;
    this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  if (this.x > 500) {
    this.x = -60;
    // Create a new random speed for the enemy bug to use after it resets. Without this, the speed of each enemy bug is the same for each "lap." By adding this line of code, each bug begins a new lap at different speeds.
    this.speed = getRandomArbitrary(200, 800);
  }
};

Enemy.prototype.randomSpeed = function() {
  var speedMultiply = Math.floor(Math.random() * 5 + 1);
  this.speed = 75 * speedMultiply;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Set Player starting position
var playerStartX = 200,
    playerStartY = 400;

// Write the Player class
var Player = function(x,y) {
  this.x = playerStartX;
  this.y = playerStartY;
  this.sprite = 'images/char-boy.png';
}

// Update the Player's position
Player.prototype.update = function() {
  //collision detection
  this.checkCollisions();

  // Alert user they won if they reach the water and reset to starting position
  if (this.y < 40 && this.y <= 400 && this.x >= 0 && this.x <= 400) {
    alert("You win! Click 'OK' to play again.");
    player.reset();
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
  if (direction === 'left') {
    this.x -= 100;
  }
  if (direction === 'up') {
    this.y -= 85;
  }
  if (direction === 'right') {
    this.x += 100;
  }
  if (direction === 'down') {
    this.y += 85;
  }
  console.log(this.x, this.y);
};

Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    var enemy = allEnemies[i];
    /*add calculation to determine row*/
    if (this.x >= enemy.x + 0 &&
        this.x < enemy.x + 100 &&
        this.y >= enemy.y + 0 &&
        this.y < enemy.y + 85) {
          console.log('Splat!');
          player.reset();
        }
    }
};

Player.prototype.reset = function() {
  this.x = playerStartX;
  this.y = playerStartY;
};

/*********** NOW INSTANTIATE ALL YOUR OBJECTS **********/
// Place all enemy objects in an array called allEnemies
// Instantiate all enemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
  var tempSpeed = Math.floor(Math.random() * 5 + 1) * 99;
  enemy = new Enemy();
  allEnemies.push(new Enemy(-100, (50 + (90 * i)), tempSpeed));
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode]);
})
