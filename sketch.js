var GRAVITY = 0.4;
var JUMP = -12;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var stick, ground, ground1, water, platforms, x;
var gameOver;
var stickImg, waterImg, groundImg, ground1Img, birdImg;
var platform1, platform2, platform3;
var gameState = 'title';
var birds = [];
var changeDirection;
var jumpSound;
var music;
var slider;
var platform = [];
function preload() {
  music = loadSound('assets/beach-time.mp3')
  jumpSound = loadSound('assets/Mario-jump-sound.mp3')
  stickLeft = loadAnimation('assets/stick.png');
  stickRight = loadAnimation('assets/stick.png');
  platformImg = loadImage('assets/platform.png');
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

  ground = createSprite(350, 680); //image 360x20
  ground.setCollider('rectangle', 0, 0, 120, 21);
  ground.addImage(groundImg);

  platform1 = createSprite(random(1,100), 540);
  platform1.setCollider('rectangle', 0, 0, 120, 21);
  platform1.addImage(groundImg);

  platform2 = createSprite(random(100,200), 400);
  platform2.setCollider('rectangle', 0, 0, 120, 21);
  platform2.addImage(groundImg);

  platform3 = createSprite(random(200,300), 250);
  platform3.setCollider('rectangle', 0, 0, 120, 21);
  platform3.addImage(groundImg);


  ground1 = createSprite(350, 80); //image 360x20
  ground1.setCollider('rectangle', 0, 0, 120, 21);
  ground1.addImage(groundImg);

  water = createSprite(0, 1200);
  water.addAnimation('wave', 'assets/water1.png', 'assets/water2.png');

  Bird = new Group
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
  //stick.collide(ground);
  //stick.collide(bird1);

  if (stick.collide(ground)) {
    stick.velocity.y = 0;
  }
  if (stick.collide(platform1)) {
   stick.velocity.y = 0;

  }
  if (stick.collide(platform2)) {
   stick.velocity.y = 0;

  }
  if (stick.collide(platform3)) {
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
  //console.log('Cursor at: '+mouseX+', '+mouseY);
  push();
  if(platform1.position.x > width){
		changeDirection=true}
	else if (platform1.position.x <= 0){
		changeDirection = false}
	if (platform1.position.x >= 0 && changeDirection == false){
		platform1.position.x = platform1.position.x + 1}
	else if(changeDirection == true){
		platform1.position.x = platform1.position.x - 1}
  pop();
  push();
  if(platform2.position.x > width){
    changeDirection=true}
  else if (platform2.position.x <= 0){
    changeDirection = false}
  if (platform2.position.x >= 0 && changeDirection == false){
    platform2.position.x = platform2.position.x + 1}
  else if(changeDirection == true){
    platform2.position.x = platform2.position.x - 1}
  pop();
  push();
  if(platform3.position.x > width){
    changeDirection=true}
  else if (platform3.position.x <= 0){
    changeDirection = false}
  if (platform3.position.x >= 0 && changeDirection == false){
    platform3.position.x = platform3.position.x + 1}
  else if(changeDirection == true){
    platform3.position.x = platform3.position.x - 1}
  pop();

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

    if (stick.overlap(ground1))
      win();
  }

  // camera.off();
  background(220);;
  for (i = 0; i < birds.length; i++) {
  birds[i].move();
  birds[i].display();

}

  //camera.on();

  drawSprites();
}


function newGame() {

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
    text('(Press "SPACE" To Play Again)', width * .5, height * .5);
  }

function keyPressed() {
    if (keyCode === 32) {
      jumpSound.play();
      jumpSound.setVolume(0.1);
      if (gameOver) newGame();
      stick.velocity.y += JUMP;
    }
  }

  function gameStart() {

  }
