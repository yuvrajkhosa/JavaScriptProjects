class paddle {
	constructor() {
		// this.pos.y = width / 2;
		// this.pos.y = height - height / 6;
		this.pos = createVector(width / 2, height - height / 6 )
		this.height = 10;
		this.width = 60;
	}
	show() {
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}
}
