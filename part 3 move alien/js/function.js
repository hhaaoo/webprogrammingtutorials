var canvas;			// initialize the canvas
var context;		// initialize the canvas
var cannonx = 500;
var cannony = 650;
var WIDTH = 1024;
var HEIGHT = 699;
var intervalId;
var fire = false;	// for the laser, to decide whether laser is firing.
var canfire = true; // if the laser is firing currently, it will be set to false.
var movecood = 50;
var la;		// laser object
var score = 0;

var direction = 0; // 0 is right, 1 is left.
var alienList = new Array();

var imageObj = new Image();
imageObj.src = 'images/cannon.png';

var laserImg = new Image();
laserImg.src = 'images/laser.png';

var alienImg = new Image();
alienImg.src = 'images/alien.png';
var alienImg1 = new Image();
alienImg1.src = 'images/alien1.png';
var alienImg2 = new Image();
alienImg2.src = 'images/alien2.png';
var alienImg3 = new Image();
alienImg3.src = 'images/alien3.png';
var alienImg4 = new Image();
alienImg4.src = 'images/alien4.png';

var level = 1;

//-------------------- function body -------------------------

window.addEventListener('keydown', keyAction, true);

window.onload = function(){
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");

	//draw a white line
	context.strokeStyle = "white";
	context.moveTo(50, 700);
	context.lineTo(974, 700);
	context.stroke();


	createAlien(alienList);
	// draw moveable cannon
	intervalId = setInterval(draw, 5);
	//bgm.play();
}

function keyAction(event){
	if (event.keyCode == 37) { // left arrow key
		if (cannonx - 4 > 0){
			cannonx -= 4;
		}
	} else if (event.keyCode == 39) { // right arrow key
		if (cannonx + 4 < WIDTH - 60){
			cannonx += 4;
		}
	} else if (event.keyCode == 32) { // press space, shoot!
		if (canfire == true){
			fire = true;
			la = new laser(cannonx, cannony);
			canfire = false;
		}
	}
}

/* helper function to create alian array. */
function createAlien(al){

	var x = 50;
	var y = 50;
	var index = 0;
	var row = 0;

	for (row = 0; row < 5; row++){
		for (var i = 0 ; i < 11; i++){
			var rec = new alien(x, y);
			rec.row = row;
			al[index] = rec;
			index += 1;
			x += 80;
		}
		x = 50;
		y += 50;
	}

}

/* This is the alien object */
function alien(w, h){
	this.x = w;
	this.y = h;
	this.row = 0;
}

function clear() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
}


//function cannonDraw() {
//	clear();
//	context.drawImage(imageObj, x, y);
//}

function draw() {
	clear();

	// show score
	context.font='20px Helvetica';
	context.fillStyle = 'white';
	context.fillText("SCORE: " + score, 50, 30);
	context.fillText("LEVEL: " + level, 900, 30);

	// draw alien
	for (var i=0; i < alienList.length; i++){
		if (alienList[i].row == 0){
			context.drawImage(alienImg, alienList[i].x, alienList[i].y);
		} else if (alienList[i].row == 1){
			context.drawImage(alienImg1, alienList[i].x, alienList[i].y);
		} else if (alienList[i].row == 2){
			context.drawImage(alienImg2, alienList[i].x, alienList[i].y);
		} else if (alienList[i].row == 3){
			context.drawImage(alienImg3, alienList[i].x, alienList[i].y);
		} else if (alienList[i].row == 4){
			context.drawImage(alienImg4, alienList[i].x, alienList[i].y);
		} 
	}

	// =================================
	// TODO: add draw function call here.

	// ==========End of TODO============


	// draw laser
	if (fire == true){
		context.drawImage(laserImg, la.x, la.y);
		la.y -= 2
		if (la.y < 0){
			fire = false;
			canfire = true;
		}
	}

	// when alien is lower than cannon.
	for (var i=0; i < alienList.length; i++){
		if (alienList[i].y >= 680) {  
			clearInterval(intervalId);
			window.location.assign("gameover.html")
			break;
		}
	}

	// draw cannon
	context.drawImage(imageObj, cannonx, cannony);


	checkHit();
	checkEmpty();
}

// =================================
// TODO: add draw function body here.

// ==========End of TODO============

function laser(w, h){
	this.x = w + 28;
	this.y = h;
}

function checkHit(){
	for (var i=0; i < alienList.length; i++){
		if (alienList[i].x <= la.x && alienList[i].x + 55 >= la.x && la.y >= alienList[i].y && la.y <= alienList[i].y + 20){
			score += (5 - alienList[i].row);
			alienList[i] = 0;
			la = 0;
			canfire = true;
			fire = false;
		}
	}	
}

function checkEmpty(){
	var isEmpty = true;
	for (var i=0; i < alienList.length; i++){
		if (alienList[i] != 0){
			isEmpty = false;
		}
	}
	if (isEmpty == true) {
		level += 1;
		movecood = 50;
		createAlien(alienList);

	}
}

