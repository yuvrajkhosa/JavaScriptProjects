class tripleBall extends Ball {
	constructor(x, y) {
		super();
		// this.pos.x = x;
		// this.pos.y = y;
		this.pos = createVector(x, y)
		this.diam = ball.diam;
		this.xDir = random([-1, 1]);
		this.yDir = -1;
	}

	startMoving() {
		this.pos.x += (ball.xSpeed - 2) * this.xDir;
		this.pos.y += (ball.ySpeed - 1.8) * this.yDir;

		if (this.pos.x > width - this.diam / 2 || this.pos.x < this.diam / 2) {
			this.xDir *= -1;
		}
		if (this.pos.y > height - this.diam / 2 || this.pos.y < this.diam / 2) {
			this.yDir *= -1;
		}
	}

	show() {
		fill(0, 230, 102, 150);
		ellipse(this.pos.x, this.pos.y, this.diam);
	}
}
