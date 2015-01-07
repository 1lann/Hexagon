// jscs: disable

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
}

var vars = {
	rotation: 0,
	walls: [],
	frame: 0, // Frames from 0 to fps - 1
	colors: {
		primary: 0xFF0000,
		secondary: 0x00FF00,
	},
	incrementor: {},
}

var fn = {}

logged = {}
function logOnce(data, key) {
	if (!logged[key]) {
		logged[key] = true;
		console.log(data);
	}
}

window.onload = ready

function init() {
	fn.walls.init();
}

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

function run() {
	fn.lanes.run();
	fn.walls.run();
}

function animate() {
	requestAnimationFrame(animate);
	preRender();
	graphics.clear();
	run();
	renderer.render(stage);
}