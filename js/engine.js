// jscs: disable

//
//  Properties and Variables
//

var scene, camera, renderer;

var props = {
	walls: {
		depth: 30,
		shift: 4,
	},
	width: 1000,
	height: 600,
	// center: Calculated upon ready
	ratio: 0, // Calculated upon ready
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
	},
	layers: {
		background: -0.1,
		foreground: 0,
		hud: 0.1,
	},
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

var fn = {};

var garbageDisposer = [];
var garbageRemover = [];

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
	props.ratio = props.width / props.height;
	props.center = new THREE.Vector2(props.width/2, props.height/2);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, props.ratio, 1, 1000);
	// WebGL Detector here. I'll use CanvasRenderer for now.
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(props.width, props.height);
	document.body.appendChild(renderer.domElement);

	init();
	animate();
}

function preRender() {
	vars.layer = 0;
	vars.frame = (vars.frame + 1) % props.fps;
	if (vars.frame == 1 || vars.frame == Math.ceil(props.fps/2)) {
		for (var key in vars.incrementor) {
			if (vars.incrementor[key] > 0) {
				vars.incrementor[key] -= 5;
			}
		}
	}

	vars.rotation = (vars.rotation + props.rotationRate) % 360;

	for (var i = 0; i < garbageRemover.length; i++) {
		scene.remove(garbageRemover[i]);
	}

	for (var i = 0; i < garbageDisposer.length; i++) {
		garbageDisposer[i].dispose();
	}

	garbageDisposer = [];
	garbageRemover = [];
}

function animate() {
	requestAnimationFrame(animate);
	preRender();
	// graphics.clear();
	run();
	renderer.clear();
	renderer.render(scene, camera);
}

//
//  Init and Run module functions
//

var cube;

function init() {
	fn.walls.init();
	camera.position.z = 800;
	camera.position.x = 700;
	camera.position.y = 100;
	camera.lookAt(new THREE.Vector3(props.center.x, props.center.y, 0));
}

function run() {
	fn.lanes.run();
	// fn.walls.run();
	fn.hexagon.run();
	// fn.player.run();
}