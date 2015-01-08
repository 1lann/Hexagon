// jscs: disable

fn.events = {};

fn.events.normalize = function() {
	if (vars.input.leftDown) {
		vars.input.direction = props.dir.left;
	} else if (vars.input.rightDown) {
		vars.input.direction = props.dir.right;
	} else {
		vars.input.direction = props.dir.none;
	}
}

window.addEventListener("keydown", function(evt) {
	if (evt.keyCode == 37) {
		// Left
		vars.input.leftDown = true;
		vars.input.direction = props.dir.left;
	} else if (evt.keyCode == 39) {
		// Right
		vars.input.rightDown = true;
		vars.input.direction = props.dir.right;
	}
});

window.addEventListener("keyup", function(evt) {
	if (evt.keyCode == 37) {
		// Left
		vars.input.leftDown = false;
		fn.events.normalize();
	} else if (evt.keyCode == 39) {
		// Right
		vars.input.rightDown = false;
		fn.events.normalize();
	}
});