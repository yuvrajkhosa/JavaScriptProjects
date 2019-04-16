class Ball {
	//CHANGE SPEED
	constructor() {
		this.xDir = random([-1, 1]);
		this.yDir = 1;
		this.xSpeed = 3.8;
		this.ySpeed = 3.31629;
		// this.pos.x = random(20, width - 20);
		// this.pos.y = 220;
		this.pos = createVector(random(20, width - 20), 220);


		this.diam = 20;
	}
	startMoving() {
		this.pos.x += this.xSpeed * this.xDir;
		this.pos.y += this.ySpeed * this.yDir;
		if (this.pos.x > width - this.diam / 2 || this.pos.x < this.diam / 2) {
			this.xDir *= -1;
		}
		if (this.pos.y > height - this.diam / 2 || this.pos.y < this.diam / 2) {
			this.yDir *= -1;
		}
	}

	show() {
		ellipse(this.pos.x, this.pos.y, this.diam);
	}
	touchesPaddle() {
		return (
			this.pos.y + this.diam / 2 > paddle.pos.y &&
			this.pos.x > paddle.pos.x - this.diam / 2 &&
			this.pos.x < paddle.pos.x + paddle.width + this.diam / 2 &&
			this.pos.y + this.diam &&
			this.pos.y < paddle.pos.y + paddle.height
		); //PERFECTION
	}

	touchesGround() {
		return this.pos.y > height - this.diam;
	}
}
