$(document).ready(function(){

	var ship_1 = []
	$('td').on('click', function(e){
		var cell = $(e)[0].target
		var board = cell.parentElement.parentElement.parentElement.className;
		var row = cell.parentElement.rowIndex;
		var col = cell.cellIndex;
		//console.log(board + ": (" + row + "," + col + ")");

		if (row > 0 && col > 0 && board == "player") {

			if (ship_1.length > 0) {
				var connected = false;
				for (i=0; i < ship_1.length; i++){
					console.log("comparing (" + ship_1[i][0] + "," + ship_1[0][1] + ") to (" + row + "," + col + ")");

					var abs_x = Math.abs(ship_1[i][0] - row);
					var abs_y = Math.abs(ship_1[i][1] - col);

					//check to see if 2nd point is connected
					if ((abs_x <= 1) && (abs_y <= 1) && ((abs_x + abs_y) != 2)){
						connected = true;
						console.log("connected...");
					}
				}
			}

			if ((ship_1.length === 0) || (connected == true)) {
				$(cell).css("background-color", "#000");
				console.log("added another point!");
				ship_1.push([row, col]);
			}

			var last = ship_1.length
			//console.log(ship_1[last - 1][0]);
			//$(".ships ul").append("<li>" + $(ship_1).last()[0] + "</li>");
		};
	});
});



