class block {
	constructor(x, y, col, id) {
		this.height = 20;
		this.width = width / 10;
		// this.pos.x = pos.x;
		// this.pos.y = pos.y;
		this.pos = createVector(x, y)
		this.color = col;
		this.id = id;
	}

	show() {
		fill(this.color);
		rect(this.pos.x, this.pos.y, this.width, this.height, 6);
	}

	touchesBlock(input) {
		return (
			input.pos.y <= this.pos.y + input.diam * 1.5 &&
			input.pos.x > this.pos.x &&
			input.pos.x < this.pos.x + this.width
		);

		//1.5 because height is 20. diameter to get to top to bottom. Radius to get from bottom to Ball middle.
	}

	ballsTouch() {
		for (i = 0; i < ballsArr.length; i++) {
			return (
				ballsArr[i].pos.y <= this.pos.y + ballsArr[i].diam * 1.5 &&
				ballsArr[i].pos.x > this.pos.x &&
				ballsArr[i].pos.x < this.pos.x + this.width
			);
		}
	}

	changeColor() {
		fill(this.color);
		rect(this.pos.x, this.pos.y, this.width, this.height, 2);
	}

	numbers() {
		fill(200);
		stroke(200);
		textSize(14);
		text(this.id, this.pos.x + 50, this.pos.y + 15);
	}
}
