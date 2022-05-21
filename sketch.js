var stick;
var platform;
var water;
var ground;
var platformImg, stickImg, waterImg, groundImg;
var gameOver;
var gameState = 'title';

var GRAVITY = 0.5;
var JUMP = 15
var GROUND_Y = 450;
var MIN_OPENING = 300;

function preload() {
  stickImg = loadImage('assets/stick.png');
  platformImg = loadImage('assets/platform.png');
  waterImg = loadImage('assets/water.png');
  groundImg = loadImage('assets/flappy_ground.png');

}

function setup() {

  createCanvas(700, 900);

  stick = createSprite(width / 2, height / 1.2, 10, 10);
  stick.setCollider('circle', 0, 0, 20);
  stick.addImage(stickImg);
  stick.collide(ground);

  ground = createSprite(windowWidth, windowHeight + 100);
  ground.addImage(groundImg);

  platform = new Group();
  water = new Group();
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
    case 'gameOver':
      gameOver();
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

      //spawn waters
      if (frameCount % 90 == 0) {
        var waterH = (-80);
        var water = createSprite(stick.position.x + width + random(width), GROUND_Y - waterH / 3 + 1 + 250, 80, waterH);
        water.addImage(waterImg);
        waters.add(water);

      }

      //get rid of passed waters
      for (var i = 0; i < waters.length; i++)
        if (waters[i].position.x < dog.position.x - width / 2)
          waters[i].remove();
  }

  camera.position.x = dog.position.x + width / 4;
  ground.position.x = dog.position.x + width / 4;
  background(220);
  camera.off();
  camera.on();
  drawSprite(stick);
  drawSprites(platform);
  drawSprites(ground);

  for (let i = 0; i < 7; i++) {
    let floor = createSprite(random(0, width), random(0, height));
    platform.add(floor);
  }

}

function newGame() {
  water.removeSprites();
  gameOver = false;
  updateSprites(true);
  stick.position.x = width / 2;
  stick.position.y = height / 1.3;
  stick.velocity.y = 2;
  ground.position.x = windowWidth;
  ground.position.y = windowHeight - 110;
}

function keyPressed() {
  if (keyCode === 32) {
    if (gameOver);
      newGame();
    stick.velocity.y = JUMP;
  } else if (keyCode === RIGHT_ARROW) { //right
    (stick, 5, 0);
  } else if (keyCode === LEFT_ARROW) { //right
    walk(stick, 5, 180);
  }


}

function walk(sprite, speed, dir) {
  sprite.setSpeed(speed, dir);

}

function gameStart() {

}
