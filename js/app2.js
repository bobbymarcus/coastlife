var pieces, radius, fft, analyzer, mapMouseX, mapMouseY, audio;
var colorPalette = ["#000", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];
/*=============================================
  SETUP
=============================================*/

function preload() {
	audio = loadSound("audio/introvert.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// elements
	startScreen = createDiv();
	startScreen.addClass('startScreen');

	logo = createImg('img/coastlife-neon-1.svg');
	logo.addClass('logo');

	header = createDiv("Introvert");
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

	pieces = 100;
	radius = windowHeight / 4;
}



/*=============================================
  DRAW
=============================================*/
function draw() {

	background(colorPalette[0]);

	fft.analyze();
	var bass = fft.getEnergy("bass");
	var treble = fft.getEnergy(100, 150);
	var mid = fft.getEnergy("mid");

	var mapbass = map(bass, 0, 255, -100, 800);
	var scalebass = map(bass, 0, 255, 0.5, 1.2);

	var mapMid = map(mid, 0, 255, -radius / 4, radius * 4);
	var scaleMid = map(mid, 0, 255, 1, 1.5);

	var mapTreble = map(treble, 0, 255, -radius / 4, radius * 4);
	var scaleTreble = map(treble, 0, 255, 1, 1.5);

	mapMouseX = map(mouseX, 0, width, 2, 0.1);
	mapMouseY = map(mouseY, 0, height, windowHeight / 8, windowHeight / 6);

	pieces = mapMouseX;
	radius = mapMouseY;

	var mapScaleX = map(mouseX, 0, width, 1, 0);
	var mapScaleY = map(mouseY, 0, height, 0, 1);


	translate(width / 2, height / 2);

	for (i = 0; i < pieces; i += 0.01) {

			rotate(TWO_PI / pieces);

			/*----------  BASS  ----------*/
			push();
			strokeWeight(1);
			stroke(colorPalette[1]);
			scale(scalebass);
			rotate(frameCount * -0.5);
			line(mapbass, radius / 2, radius, radius);
			line(-mapbass, -radius / 2, radius, radius);
			pop();


			/*----------  MID  ----------*/
			push();
			strokeWeight(1);
			stroke(colorPalette[2]);
			line(mapMid, radius, radius * 2, radius * 2);
			pop();


			/*----------  TREMBLE  ----------*/
			push();
			stroke(colorPalette[3]);
			scale(scaleTreble);
			line(mapTreble, radius / 2, radius, radius);
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

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
