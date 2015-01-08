// jscs: disable

fn.hexagon = {}

fn.hexagon.draw = function(center, radius, rotation, accentColor, secondaryColor) {
	var path = [];
	graphics.lineStyle(props.hexagon.depth, accentColor, 1.0);
	graphics.beginFill(secondaryColor);
	for (sector = 1; sector <= 6; sector ++) {
		path.push(fn.tools.getPoint(center, radius, sector, rotation));
	}

	graphics.drawPolygon(path);
	graphics.endFill();
	graphics.lineStyle(0, 0, 0); 
}

fn.hexagon.getRadius = function() {
	return props.hexagon.baseRadius + vars.hexagonTwitch + vars.hexagonPulse;
}

fn.hexagon.run = function() {
	fn.hexagon.draw(props.center, fn.hexagon.getRadius(), vars.rotation, vars.colors.accent, vars.colors.secondary);
}