var stick, platform, ground;

var GRAVITY = 1;
var JUMP = 15

function setup() {
  // put setup code here
  createCanvas(1080,1350);

  stick = createSprite(200,200);
  stick = addAnimation('assets/stick.png');

  platform = createSprite(200,300);
  platform.addImage('assets/platform.png');
}

function draw() {
  // put drawing code here
  background(220);

  textAlign(CENTER);
  text('Reach the top to win', width / 2, 20);
}
