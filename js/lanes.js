// jscs: disable

fn.lanes = {}

fn.lanes.draw = function(rotation, primaryColor, secondaryColor){
	for (sector = 0; sector <= 6; sector += 2) {
		fn.tools.drawTrapezium(props.center, 0, props.width, sector, rotation, primaryColor);
		fn.tools.drawTrapezium(props.center, 0, props.width, sector + 1, rotation, secondaryColor);
	}
}

fn.lanes.run = function() {
	fn.lanes.draw();
}