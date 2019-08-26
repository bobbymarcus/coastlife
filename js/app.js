var pieces, radius, fft, analyzer, mapMouseX, mapMouseY, audio;
var colorPalette = ["#02073c", "#5b0ff5", "#f50fac", "#f50fac"];

/*=============================================
  SETUP
=============================================*/

function preload() {
	audio = loadSound("audio/sunshine.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// elements
	startScreen = createDiv();
	startScreen.addClass('startScreen');

	logo = createImg('img/coastlife-neon-1.svg');
	logo.addClass('logo');

	header = createDiv("Sunshine");
	header.addClass('header');

	playButton = createButton("Start Experience");
	playButton.addClass('toggle-btn');
	playButton.mousePressed(start);

	volume = createImg('img/volume.svg');
	volume.addClass('volume');

	analyzer = new p5.Amplitude();
	fft = new p5.FFT();
	audio.loop();
	audio.pause();
}



/*=============================================
  DRAW
=============================================*/
function draw() {

	background(colorPalette[0]);

	translate(windowWidth / 2, windowHeight / 2);

	level = analyzer.getLevel();
	fft.analyze();

	// map(value, start1, stop1, start2, stop2, [withinBounds])
	var bass = fft.getEnergy(50, 250);
	var treble = fft.getEnergy(50, 250);
	var mid = fft.getEnergy("mid");

	var mapMid = map(mid, 0, 255, -100, 200);
	var scaleMid = map(mid, 0, 255, 1, 1.5);

	var mapTreble = map(treble, 0, 255, 50, 350);
	var scaleTreble = map(treble, 0, 255, 0, 1);

	var mapbass = map(bass, 0, 255, 50, 200);
	var scalebass = map(bass, 0, 255, 0.05, 1.2);

	mapMouseX = map(mouseX, 0, width, 1, 50);
	mapMouseXbass = map(mouseX, 0, width, 1, 5);
	mapMouseY = map(mouseY, 0, height, 2, 6);

	pieces = 8;
	radius = 100;

	for (i = 0; i < pieces; i += 0.1) {

		rotate(TWO_PI / (pieces / 2));

		noFill();

		/*----------  BASS  ----------*/
		push();
		stroke(colorPalette[1]);
		rotate(frameCount * 0.005);
		strokeWeight(0.5);
		scale(.8);
		polygon(mapbass + i, mapbass - i, mapMouseXbass * i, 4);
		pop();


		/*----------  MID  ----------*/
		push();
		stroke(colorPalette[2]);
		strokeWeight(0.3);
		scale(1.3);
		polygon(mapMid + i / 2, mapMid - i * 2, mapMouseX * i, 7);
		pop();


		/*----------  TREBLE  ----------*/
		push();
		stroke(colorPalette[2]);
		rotate(frameCount * 0.002);
		strokeWeight(0.6);
		scale(mouseX * 0.0008);
		rotate((mouseX * 0.002));
		polygon(mapTreble + i / 2, mapTreble - i / 2, mapMouseY * i / 2, 4);
		pop();

	}
}

function start() {
		audio.play();
		startScreen.remove();
		header.remove();
		playButton.remove();
		volume.remove();
		logo.addClass('logo-move')
}

// if (audio.isPlaying()) {
// 		startScreen.remove();
// 		header.remove();
// 		playButton.remove();
// 		logo.addClass('logo-move')
// }

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function polygon(x, y, radius, npoints) {
	var angle = TWO_PI / npoints;
	beginShape();
	for (var a = 0; a < TWO_PI; a += angle) {
		var sx = x + cos(a) * radius;
		var sy = y + sin(a) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}
