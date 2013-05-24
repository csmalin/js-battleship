$(document).ready(function(){
	ship_placement();
});

// var ship(max_size) = {
//  "positions": [],
//  "max_size": max_size
// }

var ship_types = { aircraft_carrier: {size: 5, quantity: 1},
									 battleship: {size: 4, quantity: 1},
									 submarine: {size: 3, quantity: 1},
									 destroyer: {size: 3, quantity: 2},
									 patrol_boat: {size: 2, quantity: 2}};


function ship_placement(){
	// NOTE: this variable has suspect scope
	var ship_in_construction = [];

	$('table.player td').on('mousedown', function(e){
		var cell = $(e)[0].target;
		var row = cell.parentElement.rowIndex;
		var col = cell.cellIndex;
  	if (is_board_cell(row, col) && ((ship_in_construction.length === 0) || (has_unplaced_piece(ship_in_construction) && is_connected(ship_in_construction, row, col) && is_same_axis(ship_in_construction, row, col)))) {
			$(cell).css("background-color", "#000");
			console.log("added another point!");
			ship_in_construction.push([row, col]);
		}
	});
}

// returns true if the cell isn't part of the headers
function is_board_cell(row, col){
	return row > 0 && col > 0;
}

//only place positions based on the size of the ship
// TODO: currently, we only support ship of size 5
function has_unplaced_piece(ship){
	return ship.length > 0 && ship.length < 5;
}

// returns true if at least one cell is adjacent to row/col
function is_connected(ship, row, col){
	for (i=0; i < ship.length; i++){
		console.log("comparing (" + ship[i][0] + "," + ship[0][1] + ") to (" + row + "," + col + ")");

		var abs_x = Math.abs(ship[i][0] - row);
		var abs_y = Math.abs(ship[i][1] - col);			
		
		if ((abs_x + abs_y) == 1){
			return true;
		}			
  }
  return false;
}

// returns true if cell is along the same axis as ship
function is_same_axis(ship, row, col){
	if (ship.length < 2){
		// for a ship of length 0 or 1, this is trivially true
		return true;
	}
	
	var same_axis = false;
	for (i=0; i < ship.length; i++){
		console.log("comparing (" + ship[i][0] + "," + ship[0][1] + ") to (" + row + "," + col + ")");
		var row_same = true;
		var col_same = true;
		var prev_row = null;
		var prev_col = null;

		for(i=0; i < ship.length; i++){
			if (i > 0) {
				if ((ship[i][0] != prev_row) || (ship[i][0] != row)){
					row_same = false;
				}
				if ((ship[i][1] != prev_col) || (ship[i][1] != col)){
					col_same = false;
				}
			}

			prev_row = ship[i][0];
			prev_col = ship[i][1];
		}
		if (row_same || col_same) {
			same_axis = true;
		}

		console.log("row_same:" + row_same);
		console.log("col_same:" + col_same);	
	}
	return same_axis;

}