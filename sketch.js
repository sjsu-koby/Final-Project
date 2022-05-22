var GRAVITY = 0.4;
var JUMP = -11;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var stick, ground, water;
var gameOver;
var stickImg, waterImg, groundImg;
var gameState = 'title';
var floor1;
var floor2;
var changeDirection;

function preload() {
  stickLeft = loadAnimation('assets/stick.png');
  stickRight = loadAnimation('assets/stick.png');
}

function setup() {
  createCanvas(700, 900);

  // 0.1 is highest
  floor1 = new Floor(0, height * .24);
  floor2 = new Floor(150, height * .33);
  stickImg = loadImage('assets/stick.png');
  waterImg = loadImage('assets/water.png');
  groundImg = loadImage('assets/platform.png');
  // bgImg = loadImage('assets/flappy_bg.png');

  stick = createSprite(10, 20);

  stick.setCollider('circle', 0, 0, 50);
  stick.addAnimation('normal', 'assets/stick.png');

  ground = createSprite(360 / 2, 300); //image 360x20
  ground.addImage(groundImg);

  water = createSprite(0, 1200);
  water.addImage(waterImg);

  //floor1 = createSprite(floor1);
  Floor = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height / 2;
}

function draw() {
  switch (gameState) {
    case 'title':
      titleScreen();
      break;
    case 'lvl1':
      gameStage1();
      break;
    case 'gameover':
      youDied();
      break;
  }
  //stick.collide(ground);
  //stick.collide(floor1);
  if (stick.collide(ground, Floor)) {
    stick.velocity.y = 0;
  }
}

function keyReleased() {
  if (gameState === 'title' || gameState === 'gameover') {
    if (key === ' ' || key === ' ') {
      gameState = 'lvl1';
    }
  }
}

function titleScreen() {
  background(220);
  textSize(70);
  textAlign(CENTER);
  text('The Water is Lava', width * .01, height * .4);
  textSize(30);
  fill(100);
  text('(Press "SPACE" To Play)', width * .01, height * .5);
}

function gameStage1() {

  stick.velocity.x = 0;
  if (keyIsDown(LEFT_ARROW)) stick.velocity.x = -5;
  if (keyIsDown(RIGHT_ARROW)) stick.velocity.x = 5;
  if (gameOver && keyWentDown(' '))
    newGame();

  if (!gameOver) {

    if (keyWentDown(' '))
      stick.velocity.y = JUMP;
    stick.velocity.y += GRAVITY;

    if (stick.position.y < 0)
      stick.position.y = 0;

    if (stick.overlap(water))
      die();

    //spawn waters
    //if (frameCount % 45 == 0) {
    //  var waterH = (0);
      //var water = createSprite(ground.position.x + width, GROUND_Y + 800, 80, waterH);
      //water.addImage(waterImg);
      //waters.add(water);

    //}

    //get rid of passed waters
    //for (var i = 0; i < waters.length; i++)
      //if (waters[i].position.y < height / 2.5 - width / 2) {
      //  waters[i].remove();
      //}
  }
  //camera.position.x = stick.position.x + width / 25;
  //ground.position.x = width / 2;
  //wrap ground
  // if(camera.position.x > ground.position.x)
  // ground.position.x+=ground.width;

  camera.off();
  background(220);
  textSize(20);
  fill(0);
  textAlign(CENTER);
  text('Reach the Top to Win!', width * .5, height * .04);
  floor1.display();
  floor2.display();
  floor1.move();
  floor2.move();
  camera.on();

  drawSprites();
}


function newGame() {
  // waters.removeSprites();
  gameOver = false;
  updateSprites(true);
  stick.position.x = 20;
  stick.position.y = 590;
  stick.velocity.y = 2;
  ground.position.x = 10;
  ground.position.y = 600;
}

function die() {

  if (gameState === 'lvl1' || gameState === 'title') {
    if (key === ' ' || key === ' ') {
      gameState = 'gameover';
    }
  }
}

function youDied() {

  background(220);
  textSize(70);
  textAlign(CENTER);
  text('Game Over', width * .01, height * .4);
  textSize(30);
  fill(100);
  text('(Press "SPACE" To Try Again)', width * .01, height * .5);
}

function keyPressed() {
  if (keyCode === 32) {
    if (gameOver) newGame();
    stick.velocity.y = JUMP;
  }
}

function gameStart() {

}
