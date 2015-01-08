// jscs: disable

fn.tools = {}

fn.tools.toRadians = function(angle) {
	return (angle % 360) * Math.PI / 180;
}

fn.tools.getPoint = function(point, dist, sector, angle) {
	var newX = point.x + dist * Math.cos(fn.tools.toRadians(sector * 60 + angle));
	var newY = point.y + dist * Math.sin(fn.tools.toRadians(sector * 60 + angle));
	var newPoint = new THREE.Vector2(newX, newY)
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

fn.tools.makePolygon = function(polygonShape, path) {
	var lastX = path[0].x;
	var lastY = path[0].y;

	polygonShape.moveTo(path[0].x, path[0].y);

	for (var i = 1; i < path.length; i++) {
		if (path[i].x != lastX || path[i].y != lastY) {
			polygonShape.lineTo(path[i].x, path[i].y);
			lastX = path[i].x;
			lastY = path[i].y;
		}
	}

	return polygonShape;
}

fn.tools.fillPolygon = function(polygonShape, color, layer) {
	var polygonGeometry = new THREE.ShapeGeometry(polygonShape);

	for (var i = 0; i < polygonGeometry.vertices.length; i++) {
		polygonGeometry.vertices[i].z = layer;
	}

	var polygonMaterial = new THREE.MeshBasicMaterial({color: color});
	var polygonMesh = new THREE.Mesh(polygonGeometry, polygonMaterial);
	garbageDisposer.push(polygonGeometry);
	garbageDisposer.push(polygonMaterial);
	garbageRemover.push(polygonMesh);
	scene.add(polygonMesh);
}

fn.tools.drawTrapezium = function(point, dist, depth, sector, rotation, color) {
	var trapezium = new THREE.Shape();

	var path = [
		fn.tools.getPoint(point, dist + depth, sector, rotation),
		fn.tools.getPoint(point, dist, sector, rotation),
		fn.tools.getPoint(point, dist, sector + 1, rotation),
		fn.tools.getPoint(point, dist + depth, sector + 1, rotation),
	];

	trapezium = fn.tools.makePolygon(trapezium, path);
	fn.tools.fillPolygon(trapezium, color, props.layers.background);
}
