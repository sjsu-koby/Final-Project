var stick, platform, ground;
var platformImg;
var gameOver;
var gameState = 'title';

var GRAVITY = 1;
var JUMP = 15

function setup() {

  createCanvas(700,900);
  platformImg = loadImage('assets/platform.png');
  stick = createSprite(200,200);
  stick = loadImage('assets/stick.png');

  platform = createSprite(200,300);
  platform.addImage(platformImg);
}

function draw() {

  switch (gameState) {
    case 'title':
      titleScreen();
      break;
    case 'lvl1':
      gameStage1();
      break;
    case 'gameOver':
      gameOver();
      break;
  }
  if (stick.collide(platform)) {
    dog.velocity.y = 0;
  }
}

function keyReleased() {
  if (gameState === 'title' || gameState === 'gameover') {
  if (key === ' ' || key === ' ') {
    gameState = 'lvl1';
    background(220);
    }
  }
}

function titleScreen() {
  background(220);
  textSize(70);
  textAlign(CENTER);
  text('The Water is Lava', width / 2, height * .25);
  textSize(30);
  fill(100);
  text('(Press "SPACE" To Play)', width / 2, height * .30);
}

function gameStage1() {

}

function keyPressed() {
  if (keyCode === 32) {
    if (gameOver)
      newGame();
    stick.velocity.y = JUMP;
  }

}
