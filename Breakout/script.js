var blockArr = [];
var lost = false;
var score = 0;
var x = 0;
var counter = 0;
var ballsArr = [];
var ballsBefore = false;
var makeBalls = false;
var won = false;
var makeBig = false;
var bigCounter = 0;

while (true) {
	var check = confirm('Ready?');
	if (check) {
		break;
	}
}

function setup() {
	createCanvas(1002, 800);

	ball = new Ball();

	paddle = new paddle();

	//Make the blocks
	for (i = 0; i < 80 ; i++) {
		let col = map(i,  0 , 80 , 130, 0)


		blockArr[i] = new block(
			i % 10 * 100,
			(i + 10 - i % 10) * 2 - 20,
			[100,col,200],
			i
		);
	}

	//make the 3 balls
	for (i = 0; i < 3; i++) {
		ballsArr[i] = new tripleBall(i * 400 + 100, 605 - (i * 100));
	}
}

function draw() {
	//setup
	background(0);

	ball.startMoving();

	//check if ball touches paddle
	if (keyIsDown(LEFT_ARROW)) {

		if (paddle.pos.x > 0) {

			paddle.pos.x -= 7;

		}
	}
	if (keyIsDown(RIGHT_ARROW)) {
		if (paddle.pos.x < width - paddle.width) paddle.pos.x += 7;
	}

	if (ball.touchesPaddle()) {
		ball.pos.y -= ball.diam / 2
		ball.yDir *= -1;

		if (!ballsBefore) {
			if (round(random(1, 40)) == 5) {
				makeBalls = true;
				ballsBefore = true;
			}
		}

		if (!makeBig){
			if (round(random(1, 40)) == 2){


				makeBig = true;

			}
}

			if (makeBig){
				paddle.width = 130;
				bigCounter++;

				if (bigCounter % 5 == 0) {

					paddle.width = 60;

			}
		}


}
	//CHANGE BACK
	if (ball.touchesGround()) {
		lost = true;
	}
	for (i in ballsArr) {
		if (ballsArr[i].touchesPaddle()) {
			ballsArr[i].yDir *= -1;
		}
	}
	for (i = 0; i < ballsArr.length; i++) {
		if (ballsArr[i].touchesGround()) {
			ballsArr.splice(i, 1);
			break;
		}
	}

	for (i = blockArr.length - 1; i >= 0; i--) {
		if (blockArr[i].touchesBlock(ball)) {
			scoreId(Math.floor(blockArr[i].id / 10));

			ball.yDir *= -1;

			blockArr.splice(i, 1);
			counter++;

			if (counter == 10) {
				ball.xSpeed++;
				ball.ySpeed++;
				counter = 0;
			}

			if (blockArr.length == 0) won = true;
		}
	}

	if (lost) {
		textSize(70);
		text("YOU LOST!!! You got : " + score, 100, 300);
		ball.xDir = 0;
		ball.yDir = 0;
    for (i of ballsArr){
      i.yDir *= 0;
      i.xDir *= 0;
    }
	} else if (won) {
		textSize(80);
		text('YOU WON!!!', height / 2 - 100, width / 2 - 200);
		ball.xDir = 7;
		ball.yDir = 7;
	}

	//Render the things, and color them
	for (i of blockArr) {
		i.show();
		i.numbers();
	}
	fill(255);
	paddle.show();
	fill(200);
	ball.show();

	//textColour
	fill(255);

	//Check for balls

	if (makeBalls) {
		for (i of ballsArr) {
			i.show();
			i.startMoving();
		}
	}

	for (i = 0; i < blockArr.length; i++) {
		for (j = 0; j < ballsArr.length; j++) {
			if (blockArr[i].touchesBlock(ballsArr[j])) {
				ballsArr[j].yDir *= -1;
				blockArr.splice(i, 1);
				break;
			}
		}
	}



	document.getElementById('score').innerHTML = "Your Score: " + score;
}

function scoreId(input) {
	switch (input) {
		case 7:
			score++;
			break;
		case 6:
			score += 2;
			break;
		case 5:
			score += 3;
			break;
		case 4:
			score += 4;
			break;
		case 3:
			score += 5;
			break;
		case 2:
			score += 6;
			break;
		case 1:
			score += 7;
			break;
		default:
			score += 7;
			break;
	}
}
