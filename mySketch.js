// ▼▼▼ STUFF TO PLAY WITH ▼▼▼ //
var triScale = 3; 			// triangle length || suggested range: [0.2, 1]
var flipFrames = 182;		// frames each flip takes || suggested range: 3+
var flipDelay = 3;		// frames it takes for ripple to spread || suggested range: 0.5 +
var rest = 0;					// frames between flips (while autopilot is active)
// ▲▲▲ STUFF TO PLAY WITH ▲▲▲ //

// COOL PRESETS:
// flipFrames = 30; flipDelay = 1;
// flipFrames = 3; flipDelay = 9;
// anything with triScale = 3;
// triScale = 3; flipFrames = 101; flipDelay = 1; rest = 0;

var apc = 23;						// angles per column
var apr = 23;						// angles per row

var angles = [];				// array for angle objects

var counter;

function setup() {
	createCanvas(windowWidth * .8, windowHeight * .8);
	background(42);
	
	counter = 0;
	
	const k = 2 * PI / 3
	for (let i = -Math.floor(apc/2); i < Math.ceil(apc/2); i++) {
		for (let j = -Math.floor(apr/2); j < Math.ceil(apr/2); j++) {
			if (Math.abs((i + j) * sqrt(3)) <= 9 && Math.abs(-i + j) <= 19 && !(i % 2 == 0 && j % 2 == 0)) {
				angles.push(new Angle(-i + j, sqrt(3) * (i + j), (Math.abs((j+(i%2))%2) * (Math.abs((i+1)%2) + 1)) * k, Math.max(Math.abs(i), Math.abs(j)) - 1));
			}
		}
	}
}

function draw() {
	background(42);
	translate(width / 2, height / 2);
	scale(30);
	
	for (let i = 0; i < angles.length; i++) {
		angles[i].display();
	}
	
	counter++;

	for (let i = 0; i < angles.length; i++) {
		if (counter > flipDelay * angles[i].delay && counter <= flipFrames + (flipDelay * angles[i].delay)) {
			angles[i].flip();
		}
	}

	if (counter >= flipFrames + flipDelay * Math.max(apc / 2, apr / 2)) {
		counter = -rest;
		running = false;
	}
}

class Angle {
	constructor(x, y, orientation, delay, stroke) {
		this.x = x;
		this.y = y;
		this.orientation = orientation + PI;
		this.delay = delay; // 0, 1, 2
		this.theta = 0;
	}
	
	flip() {
		if (this.theta == TWO_PI) {
			this.theta = 0;
		}
		this.theta += PI/flipFrames;
	}
	
	display() {
		push();
		translate(this.x, this.y);
		rotate(this.orientation);
		scale(1, cos(this.theta));
		scale(triScale);
		
		noFill();
		stroke('#f5f5f5');
		strokeCap(PROJECT);
		strokeWeight(0.3);
		beginShape();
		vertex(-sqrt(1 - pow(0.5, 2)), -0.5);
		vertex(0, 1);
		vertex(sqrt(1 - pow(0.5, 2)), -0.5);
		endShape();
		pop();
	}
}