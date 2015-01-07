// jscs: disable

fn.lanes = {}

fn.lanes.draw = function(center, rotation, primaryColor, secondaryColor){
	for (sector = 0; sector <= 6; sector += 2) {
		fn.tools.drawTrapezium(center, 0, props.width, sector, rotation, primaryColor);
		fn.tools.drawTrapezium(center, 0, props.width, sector + 1, rotation, secondaryColor);
	}
}

fn.lanes.run = function() {
	fn.lanes.draw(props.center, vars.rotation, vars.colors.primary, vars.colors.secondary);
}