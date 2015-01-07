// jscs: disable

var stage, renderer, graphics, props;
width = 1000
height = 600

var props = {
	walls: {
		depth: 10,
		shift: 1,
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

function ready() {
	stage = new PIXI.Stage(0xCCCCCC);
	graphics = new PIXI.Graphics();
	renderer = PIXI.autoDetectRenderer(props.width, props.height, {resolution: window.devicePixelRatio})
	props.center = new PIXI.Point(props.width/2, props.height/2)
	document.body.appendChild(renderer.view);

	stage.addChild(graphics)

	animate();
}

function animate() {
	requestAnimationFrame(animate);

	vars.frame = (vars.frame + 1) % props.fps;

	graphics.clear();

	fn.lanes.draw(vars.rotation, 0xFF0000, 0x00FF00);
	vars.rotation += props.rotationRate;

	renderer.render(stage);
}