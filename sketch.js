var GRAVITY = 0.4;
var JUMP = -12;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var stick, ground, ground1, water, platform, x, victoryBall;
var gameOver;
var stickImg, waterImg, groundImg, ground1Img, platformImg, victoryImg;
var gameState = 'title';
var birds = [];
var changeDirection;
var jumpSound;
var music;
var slider;

function preload() {
  music = loadSound('assets/beach-time.mp3')
  jumpSound = loadSound('assets/Mario-jump-sound.mp3')
  stickLeft = loadAnimation('assets/stick.png');
  stickRight = loadAnimation('assets/stick.png');
  platformImg = loadImage('assets/platform.png');
  victoryImg = loadImage('assets/victoryball.png');
}

function setup() {
  createCanvas(700, 900);
  frameRate(60);
  music.loop();
  textFont('Macondo')
  changeDirection = false;
  for (let i = 0; i <= 5; i++) {
   birds[i] = new Bird(
   random(width),
   random(height),
   random(-3, 3),
   random(-3, 3)
 );
  }

  slider = createSlider(0, 1, 0.5, 0.01);
  slider.position(CENTER, height * 0.01);

  stickImg = loadImage('assets/stick.png');
  waterImg = loadImage('assets/water1.png');
  groundImg = loadImage('assets/platform.png');
  ground1Img = loadImage('assets/platform.png');

  stick = createSprite(350, 675);
  stick.velocity.x = 0;
  stick.setCollider('rectangle', 0, 0, 40, 80);
  stick.addImage(stickImg);

  ground = createSprite(350, 680);
  ground.setCollider('rectangle', 0, 0, 120, 21);
  ground.addImage(groundImg);

  ground1 = createSprite(350, 80);
  ground1.setCollider('rectangle', 0, 0, 120, 21);
  ground1.addImage(groundImg);

  victoryBall = createSprite(350, 40);
  victoryBall.setCollider('circle', 0, 0, 20);
  victoryBall.addImage(victoryImg);

  water = createSprite(0, 1200);
  water.addAnimation('wave', 'assets/water1.png', 'assets/water2.png');

  platforms = new Group();
  Bird = new Group();
  gameOver = true;
  updateSprites(false);

  //camera.position.y = height / 2;

}

function draw() {
  music.setVolume(slider.value());
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
    case 'win':
      victory();
      break;
  }
  if(stick.position.x < 0){
    stick.position.x = stick.position.x + 5
  }
  if(stick.position.x > 700){
    stick.position.x = stick.position.x - 5
  }

  if (stick.collide(ground)) {
    stick.velocity.y = 0;
  }
  if (stick.collide(ground1)) {
    stick.velocity.y = 0;
  }
  if(stick.collide(platforms)) {
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
  text('The Water is Lava', width * .5, height * .4);
  textSize(30);
  fill(100);
  text('(Press "SPACE" to start)', width * .5, height * .5);
  textSize(40);
  fill(0);
  text('How to Play', width * .5, height * .65);
  textSize(20);
  fill(100);
  text('Reach the top to win!', width * .5, height * .7)
  text('Controls: "SPACE" to jump. "LEFT/RIGHT ARROWKEYS" to move.', width * .5, height * .75)
  text('Jump once a time or you are cheating 😡', width * .5, height * .80)
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

    if (stick.position.x < -5)
      die();

    if (stick.position.x > 705)
      die();

    if (stick.overlap(water))
      die();

    if (stick.overlap(victoryBall))
      win();
      //spawn platform1
      if (frameCount % 90 == 60) {
        var platform = createSprite(- 100, 500);
        platform.setCollider('rectangle', 0, 0, 120, 21);
        platform.addImage(platformImg);
        platforms.add(platform);
        platform.velocity.x = 5;
        }
        //platform2
        if (frameCount % 90 == 30) {
          var platform = createSprite(0, 350);
          platform.setCollider('rectangle', 0, 0, 120, 21);
          platform.addImage(platformImg);
          platforms.add(platform);
          platform.velocity.x = 5;
        }
        //platform3
        if (frameCount % 90 == 0) {
          var platform = createSprite(-300, 200);
          platform.setCollider('rectangle', 0, 0, 120, 21);
          platform.addImage(platformImg);
          platforms.add(platform);
          platform.velocity.x = 5;
        }
      //get rid of passed platforms
      for (var i = 0; i < platforms.length; i++) {
        if (platforms[i].position.x < stick.position.x - width)
          platforms[i].remove();
      }
  }

  // camera.off();
  background(220);;
  for (i = 0; i < birds.length; i++) {
  birds[i].move();
  birds[i].display();

}

  //camera.on();
  drawSprite(ground1);
  drawSprite(ground);
  drawSprites(platforms);
  drawSprite(stick);
  drawSprite(water);
  drawSprite(victoryBall);
}


function newGame() {
  platforms.removeSprites();
  gameOver = false;
  updateSprites(true);
  stick.position.x = 350;
  stick.position.y = 675;
  stick.velocity.y = 0;
  ground.position.x = 350;
  ground.position.y = 680;
}

function die() {

  if (gameState === 'lvl1' || gameState === 'title') {
    gameState = 'gameover';
  }
}

function youDied() {
  gameOver = true;
  updateSprites(false);
  background(220);
  textSize(70);
  textAlign(CENTER);
  fill(0);
  text('Game Over', width * .5, height * .4);
  textSize(30);
  fill(100);
  text('(Press "SPACE" To Try Again)', width * .5, height * .5);
}

function win() {

  if (gameState === 'lvl1' || gameState === 'title') {
    gameState = 'win';

  }
}

function victory() {
    gameOver = true;
    updateSprites(false);
    background(220);
    textSize(70);
    textAlign(CENTER);
    fill(0);
    text('You Survived!', width * .5, height * .4);
    textSize(30);
    fill(100);
    text('(Press "Any Key" To Play Again)', width * .5, height * .5);
}
function keyPressed() {
    if (keyCode === 32) {
      jumpSound.play();
      jumpSound.setVolume(0.1);
      if (gameOver) newGame();
      stick.velocity.y += JUMP;
    }
    if (gameState === 'win' || gameState === 'win') {
      gameState = 'lvl1';
}
  }

  function gameStart() {

  }
