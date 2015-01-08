// jscs: disable

fn.walls = {}

fn.walls.generatorKey = "walls-generator"

fn.walls.draw = function(center, walls, rotation, color) {
	for (var i = 0; i < walls.length; i++) {
		fn.tools.drawTrapezium(center, walls[i].dist, props.walls.depth,
			walls[i].sector, rotation, color);
	}
}

fn.walls.shift = function(walls) {
	var newWalls = [];
	var currentIndex = 0;
	for (var i = 0; i < walls.length; i++) {
		newWalls[currentIndex] = {}
		if (walls[i].dist >= props.walls.shift) {
			newWalls[currentIndex].dist = walls[i].dist - props.walls.shift; 
			newWalls[currentIndex].sector = walls[i].sector;
			currentIndex++;
		}
	}
	return newWalls;
}

fn.walls.generate = function(walls, frame) {
	if (vars.incrementor[fn.walls.generatorKey] <= 0) {
		// Generate wall
		var newWall = {
			dist: props.width/1.5,
			sector: 1,
		}
		walls.push(newWall);
		vars.incrementor[fn.walls.generatorKey] = 10;
	}

	return walls;
}

fn.walls.run = function() {
	var walls = vars.walls;
	if (typeof(walls) == "undefined") {
		walls = [];
	}

	fn.walls.draw(props.center, walls, vars.rotation, vars.colors.accent);
	walls = fn.walls.shift(walls);
	walls = fn.walls.generate(walls, vars.frame);

	vars.walls = walls;
}

fn.walls.init = function() {
	vars.incrementor[fn.walls.generatorKey] = 10;
}