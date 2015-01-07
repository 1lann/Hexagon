// jscs: disable

fn.tools = {}

fn.tools.toRadians = function(angle) {
	return (angle % 360) * Math.PI / 180;
}

fn.tools.getPoints = function(point, dist, sector, angle) {
	var newX = point.x + dist * Math.cos(fn.tools.toRadians(sector * 60 + angle));
	var newY = point.y + dist * Math.sin(fn.tools.toRadians(sector * 60 + angle));
	var newPoint = new PIXI.Point(newX, newY)
	return newPoint;
}

fn.tools.incrementorRound = function(num) {
	num = math.floor(num + 0.5)
	if (num % 10 == 4) {
		num = num + 1;
	} else if (num % 10 == 3) {
		num = num + 2;
	} else if (num % 10 == 2) {
		num = num - 2;
	} else if (num % 10 == 1) {
		num = num - 1;
	} else if (num % 10 == 6) {
		num = num - 1;
	} else if (num % 10 == 7) {
		num = num - 2;
	} else if (num % 10 == 8) {
		num = num + 2;
	} else if (num % 10 == 9) {
		num = num + 1;
	}

	return num;
}

fn.tools.drawTrapezium = function(point, dist, depth, sector, rotation, color) {
	graphics.beginFill(color);

	var path = [
		fn.tools.getPoints(point, dist + depth, sector, rotation),
		fn.tools.getPoints(point, dist, sector, rotation),
		fn.tools.getPoints(point, dist, sector + 1, rotation),
		fn.tools.getPoints(point, dist + depth, sector + 1, rotation),
	];

	graphics.drawPolygon(path);
	graphics.endFill();
}