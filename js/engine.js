// jscs: disable

//
//  Properties and Variables
//

var stage, renderer, graphics, props;

var props = {
	walls: {
		depth: 30,
		shift: 4,
	},
	width: 1000,
	height: 600,
	fps: 60,
	rotationRate: 1,
	hexagon: {
		depth: 5,
		baseRadius: 50,
	},
	player: {
		sideLength: 12,
		sideAngle: 28,
		hexagonSpacing: 25,
		moveSpeed: 4,
		twistSpeed: 4,
		maxTwist: 30,
	},
	dir: {
		none: 0,
		left: 1,
		right: 2,
	}
}

var vars = {
	rotation: 0,
	walls: [],
	frame: 0, // Frames from 0 to fps - 1
	colors: {
		accent: 0xFFFFFF,
		primary: 0xFF0000,
		secondary: 0x00FF00,
	},
	incrementor: {},
	// May unify
	hexagonTwitch: 0,
	hexagonPulse: 0,
	player: {
		positionAngle: 0,
		dist: 0,
		twistAngle: 0,
	},
	input: {
		leftDown: false,
		rightDown: false,
		direction: props.dir.none,
	}
}

var fn = {}

//
//  Setup
//

logged = {}
function logOnce(data, key) {
	if (!logged[key]) {
		logged[key] = true;
		console.log(data);
	}
}

window.onload = ready

function ready() {
	stage = new PIXI.Stage(0xCCCCCC);
	graphics = new PIXI.Graphics();
	renderer = PIXI.autoDetectRenderer(props.width, props.height, {resolution: window.devicePixelRatio})
	props.center = new PIXI.Point(props.width/2, props.height/2)
	document.body.appendChild(renderer.view);

	stage.addChild(graphics)

	init();
	animate();
}

function preRender() {
	vars.frame = (vars.frame + 1) % props.fps;
	if (vars.frame == 1 || vars.frame == Math.ceil(props.fps/2)) {
		for (var key in vars.incrementor) {
			if (vars.incrementor[key] > 0) {
				vars.incrementor[key] -= 5;
			}
		}
	}

	vars.rotation += props.rotationRate;
}

function animate() {
	requestAnimationFrame(animate);
	preRender();
	graphics.clear();
	run();
	renderer.render(stage);
}

//
//  Init and Run module functions
//

function init() {
	fn.walls.init();
}

function run() {
	fn.lanes.run();
	fn.walls.run();
	fn.hexagon.run();
	fn.player.run();
}