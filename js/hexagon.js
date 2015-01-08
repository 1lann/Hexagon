// jscs: disable

fn.hexagon = {}

fn.hexagon.draw = function(center, radius, rotation, accentColor, secondaryColor) {
	var path = [];
	var hexagon = new THREE.Shape();

	for (sector = 1; sector <= 6; sector ++) {
		path.push(fn.tools.getPoint(center, radius, sector, rotation));
	}

	hexagon = fn.tools.makePolygon(hexagon, path);
	fn.tools.fillPolygon(hexagon, accentColor, props.layers.foreground);
}

fn.hexagon.getRadius = function() {
	return props.hexagon.baseRadius + vars.hexagonTwitch + vars.hexagonPulse;
}

fn.hexagon.run = function() {
	fn.hexagon.draw(props.center, fn.hexagon.getRadius(), vars.rotation, vars.colors.accent, vars.colors.secondary);
}