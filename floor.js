class Floor {
  constructor(_xPos, _yPos) {
    this.xPos = _xPos;
    this.yPos = _yPos;
  }
  display() {
    fill(0);
    stroke(0);
    push();
    translate(this.xPos, this.yPos);
    rect(this.xPos, this.yPos, 120, 20);
    pop();
  }
  move() {
	if(this.xPos>width/2.4){
		changeDirection=true}
	else if (this.xPos<=0){
		changeDirection=false}
	if (this.xPos>=0 && changeDirection == false){
		this.xPos=this.xPos+1}
	else if(changeDirection == true){
		this.xPos=this.xPos-1}
  }
}
