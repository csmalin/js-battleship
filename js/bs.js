$(document).ready(function(){
	ship_placement();
});

var ship(max_size) = {
 "positions": [],
 "max_size": max_size
}

var ship_types = { aircraft_carrier: {size: 5, quantity: 1},
									 battleship: {size: 4, quantity: 1},
									 submarine: {size: 3, quantity: 1},
									 destroyer: {size: 3, quantity: 2},
									 patrol_boat: {size: 2, quantity: 2}};


function ship_placement(){
	var ship_1 = []

	$('td').on('mousedown', function(e){
		var cell = $(e)[0].target
		var board = cell.parentElement.parentElement.parentElement.className;
		var row = cell.parentElement.rowIndex;
		var col = cell.cellIndex;

		if (row > 0 && col > 0 && board == "player") {

			if (ship_1.length > 0 && ship_1.length < 5) {
				var connected = false;
				for (i=0; i < ship_1.length; i++){
					console.log("comparing (" + ship_1[i][0] + "," + ship_1[0][1] + ") to (" + row + "," + col + ")");

					var abs_x = Math.abs(ship_1[i][0] - row);
					var abs_y = Math.abs(ship_1[i][1] - col);

					if ((abs_x + abs_y) == 1){
						var same_axis = false;
						var x_same = true;
						var y_same = true;
						var prev_x = null;
						var prev_y = null;

						for(i=0; i < ship_1.length; i++){
							if (i > 0) {
								if ((ship_1[i][0] != prev_x) || (ship_1[i][0] != row)){
									x_same = false;
								}
								if ((ship_1[i][1] != prev_y) || (ship_1[i][1] != col)){
									y_same = false;
								}
							}

							prev_x = ship_1[i][0];
							prev_y = ship_1[i][1];
						}
						if (x_same || y_same) {
							same_axis = true;
						}

						console.log("x_same:" + x_same);
						console.log("y_same:" + y_same);

						if (ship_1.length < 2 || same_axis == true) {
							connected = true;
							console.log("connected...");
						}

					}
				}
			}

			if ((ship_1.length === 0) || (connected == true)) {
				$(cell).css("background-color", "#000");
				console.log("added another point!");
				ship_1.push([row, col]);
			}
		};
	});
}

