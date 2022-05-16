var stick;
var platform;
var water;
var platformImg, stickImg, waterImg;
var gameOver;
var gameState = 'title';

var GRAVITY = 1;
var JUMP = 15
var GROUND_Y = 450;
var MIN_OPENING = 300;

function preload() {

  stickImg = loadImage('assets/stick.png');
  platformImg = loadImage('assets/platform.png');
  waterImg = loadImage('assets/water.png');

}

function setup() {

  createCanvas(700, 900);
  stick = createSprite(width / 2, height / 1.2, 10, 10);
  stick.setCollider('circle', 0, 0, 20);
  stick.addImage(stickImg);

  platform = new Group();
  water = new Group();

  for (let i = 0; i < 7; i++) {
		let floor = createSprite(random(0, width), random(0, height));
		platform.add(floor);
  }
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
    stick.velocity.y = 0;
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
  if (!gameOver) {

    if (keyWentDown('x'))
      stick.velocity.y = JUMP;

    stick.velocity.y += GRAVITY;

    if (stick.position.y < 0)
      stick.position.y = 0;

    if (stick.overlap(water))
      die();

    drawSprite(stick);
    drawSprites(platform);
    drawSprite(water);
  }

  function keyPressed() {
    if (keyCode === 32) {
      if (gameOver)
        newGame();
      stick.velocity.y = JUMP;
    }

  }
}

function gameStart() {

}
