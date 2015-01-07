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

fn.tools.drawTrapezium = function(point, dist, depth, sector, rotation, color) {
	graphics.beginFill(color);

	var path = [
		fn.tools.getPoints(point, dist + depth, sector, rotation),
		fn.tools.getPoints(point, dist, sector, rotation),
		fn.tools.getPoints(point, dist + depth, sector + 1, rotation),
	];

	graphics.drawPolygon(path);
	graphics.endFill();
}