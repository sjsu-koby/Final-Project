var GRAVITY = 0.3;
var JUMP = -9;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var stick, ground;
var water;
var gameOver;
var stickImg, waterImg, groundImg, bgImg, bgS;
var gameState = 'title';



function setup() {
  createCanvas(700, 900);

  stickImg = loadImage('assets/stick.png');
  waterImg = loadImage('assets/water.png');
  groundImg = loadImage('assets/flappy_ground.png');
  // bgImg = loadImage('assets/flappy_bg.png');
  bgS = loadImage('assets/bg_stick.JPG');

  stick = createSprite(width / 2, height / 2.5, 40, 40);

  stick.velocity.x = 15;
  stick.setCollider('circle', 0, 0, 20);
  stick.addAnimation('move', 'assets/stick.png');

  ground = createSprite(windowWidth, windowHeight + 100); //image 800x200
  ground.addImage(groundImg);

  waters = new Group();
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
  if (stick.collide(ground)) {
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
  text('The Water is Lava', width * .01, height * .25);
  textSize(30);
  fill(100);
  text('(Press "SPACE" To Play)', width * .01, height * .30);
}

function gameStage1() {

  if (gameOver && keyWentDown(' '))
    newGame();

  if (!gameOver) {

    if (keyWentDown(' '))
      stick.velocity.y = JUMP;

    stick.velocity.y += GRAVITY;

    if (stick.position.y < 0)
      stick.position.y = 0;

    if (stick.overlap(waters))
      die();

    //spawn waters
    if (frameCount % 100 == 0) {
      var waterH = (-1200);
      var water = createSprite(stick.position.y + height + random(height), GROUND_Y + 250, 80);
      water.addImage(waterImg);
      waters.add(water);

    }

    //get rid of passed waters
    for (var i = 0; i < waters.length; i++)
      if (waters[i].position.y < stick.position.y - width / 2)
        waters[i].remove();
  }

  camera.position.x = stick.position.x + width / 50;
  ground.position.x = stick.position.x + width / 4;
  //wrap ground
  // if(camera.position.x > ground.position.x)
  // ground.position.x+=ground.width;

  background(0, 204, 255);
  camera.off();
  background(220);
  camera.on();

  drawSprite(ground);
  drawSprites(waters);
  drawSprite(stick);
}


function newGame() {
  waters.removeSprites();
  gameOver = false;
  updateSprites(true);
  stick.position.x = width / 2;
  stick.position.y = height / 1.3;
  stick.velocity.y = 2;
  ground.position.x = windowWidth;
  ground.position.y = windowHeight - 110;
}

function die() {

  if (gameState === 'lvl1' || gameState === 'title') {
    if (key === ' ' || key === ' ') {
      gameState = 'gameover';
    }
  }
}

function youDied(){

    background(220);
    textSize(70);
    textAlign(CENTER);
    text('Game Over', width * .01, height * .25);
    textSize(30);
    fill(100);
    text('(Press "SPACE" To Try Again)', width * .01, height * .30);
}

function keyPressed() {
  if (keyCode === 32) {
    if (gameOver) newGame();
    stick.velocity.y = JUMP;
    //stick.changeAnimation("jump");
  } else if (keyCode === RIGHT_ARROW) { //right
    walk(stick, 5, 0);
  } else if (keyCode === LEFT_ARROW) { //left
    walk(stick, 5, 180);
  }

}

function walk(sprite, speed, dir) {
  sprite.setSpeed(speed, dir);

}

function gameStart() {

}
