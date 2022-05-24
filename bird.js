class Bird {
  constructor(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  move() {
  this.x += this.xSpeed;
  if (this.x < 0 || this.x > width) {
    this.xSpeed *= -1;
  }

  this.y += this.ySpeed;
  if (this.y < 0 || this.y > height) {
    this.ySpeed *= -1;
  }
}
//  move() {
//    if (this.x > width / 2.4) {
//      changeDirection = true
//    } else if (this.x <= 0) {
//      changeDirection = false
//    }
//    if (this.x >= 0 && changeDirection == false) {
//      this.x = this.x + 1
//    } else if (changeDirection == true) {
//      this.x = this.xPos - 1
//    }

//  }
  display() {
    fill(0);
    triangle(this.x, this.y, this.x + 2, this.y + 12, this.x + 5, this.y - 12)
    ellipse(this.x, this.y, 12, 3)
  }

}
