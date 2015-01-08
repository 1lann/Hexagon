// jscs: disable

fn.player = {};

fn.player.draw = function(center, rotation, dist, positionAngle, twistAngle, color) {
	// fn.tools.getPoint = function(point, dist, sector, angle)
	var tip = fn.tools.getPoint(center, dist, 0, positionAngle + rotation);
	var angleToCenter = (positionAngle + rotation + 180) % 360;
	var leftAngle = (angleToCenter - props.player.sideAngle) + twistAngle;
	var rightAngle = (angleToCenter + props.player.sideAngle) + twistAngle;
	var left = fn.tools.getPoint(tip, props.player.sideLength, 0, leftAngle);
	var right = fn.tools.getPoint(tip, props.player.sideLength, 0, rightAngle);
	var path = [tip, left, right];

	graphics.beginFill(color);
	graphics.drawPolygon(path);
	graphics.endFill();
}

fn.player.twist = function(currentTwist, inputDirection) {
	if (inputDirection == props.dir.left) {
		currentTwist -= props.player.twistSpeed;

		if (currentTwist <= (-1 * props.player.maxTwist)) {
			currentTwist = -1 * props.player.maxTwist;
		}
	} else if (inputDirection == props.dir.right) {
		currentTwist += props.player.twistSpeed;

		if (currentTwist >= props.player.maxTwist) {
			currentTwist = props.player.maxTwist;
		}
	} else if (currentTwist != 0) {
		if (Math.abs(currentTwist) <= props.player.twistSpeed) {
			currentTwist = 0;
		} else {
			if (currentTwist > 0) {
				currentTwist -= props.player.twistSpeed;
			} else {
				currentTwist += props.player.twistSpeed;
			}
		}
	}
	return currentTwist;
}

fn.player.move = function(inputDirection, positionAngle) {
	var newAngle = positionAngle;
	if (inputDirection == props.dir.left) {
		newAngle = positionAngle - props.player.moveSpeed;
	} else if (inputDirection == props.dir.right) {
		newAngle = positionAngle + props.player.moveSpeed;
	}

	if (fn.player.hasCollidedWithWall(newAngle, vars.player.dist, vars.walls)) {
		return positionAngle;
	} else {
		return newAngle;
	}
}

fn.player.getSector = function(playerAngle) {
	return Math.floor(playerAngle/60);
}

fn.player.hasCollidedWithWall = function(playerAngle, playerDist, walls) {
	var sector = fn.player.getSector(playerAngle);

	for (var i = 0; i < walls.length; i++) {
		if (walls[i].sector == sector && (walls[i].dist <= playerDist)) {
			console.log("COLLISION");
			return true;
		}
	}

	return false;
}

fn.player.run = function() {
	vars.player.dist = fn.hexagon.getRadius() + props.player.hexagonSpacing;
	vars.player.twistAngle = fn.player.twist(vars.player.twistAngle, vars.input.direction);
	vars.player.positionAngle = fn.player.move(vars.input.direction, vars.player.positionAngle);
	fn.player.draw(props.center, vars.rotation, vars.player.dist, vars.player.positionAngle,
		vars.player.twistAngle, vars.colors.accent);
}