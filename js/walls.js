// jscs: disable

fn.walls = {}

fn.walls.draw = function(walls, rotation, color) {
	for (var i = 0; i < walls.length; i++) {
		fn.tools.drawTrapezium(props.center, walls[i].dist, props.walls.depth,
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
			currentIndex++;
		}
	}
	return newWalls;
}

fn.walls.generate = function(walls) {
	
}

fn.walls.run = function() {
	fn.walls.draw();
	fn.walls.shift();
	fn.walls.generate();
}