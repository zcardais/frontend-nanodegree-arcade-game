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

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (Math.random()*60*dt);
    this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  if (this.x >= 500) {
    this.x = -101;
    this.speed = getRandomArbitrary(250, 450);
  }
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
};

// Update the Player's position
// TODO: reset Player position when it hits a bug
Player.prototype.update = function() {
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  if (direction === 'left') {
    this.x -= 100;
  }
  if (direction === 'up') {
    this.y -= 90;
  }
  if (direction === 'right') {
    this.x += 100;
  }
  if (direction === 'down') {
    this.y += 90;
  }
};

Player.prototype.reset = function() {
  this.x = playerStartX;
  this.y = playerStartY;
}

// Now instantiate your objects.
var allEnemies = [];
// Instantiate all enemies
for (var i = 0; i < 3; i++) {
  var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
  allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));
};
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var player = new Player(playerStartX,playerStartY);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
