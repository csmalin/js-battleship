$(document).ready(function(){
	window.app = {
		mode: "setup",
		player_ships: [],
		current_ship_type: null,
		current_ship: [] //don't let anything modify this, if it needs to be changed, it should be done in a method so that method can contain updates to other ui elements
	};
	// setup mode
	//   - # of ships to place
	//   - select ship to place
	//     - on click, make ship the active ship, do UI indicators
	$(".ships").on("click", "li", function(e){
		if (!app.current_ship_type && e.target.className == "selectable"){
			var quantity_span = $(e.target).find("span")
			var quantity_remaining = parseInt(quantity_span.html());
			quantity_span.html(quantity_remaining-1);
			var type = $(e.target).data("ship-type");
			app.current_ship_type = type;
			$('#current_ship_type').html(app.current_ship_type);
			$('#pieces_remaining').html(ship_types[app.current_ship_type].size - app.current_ship.length)
		}
	});
	ship_placement();
	// loop until no more ships to place

	// randomize placement of enemy ships
	// difficulty
	// game play mode
});

// var ship(max_size) = {
//  "positions": [],
//  "max_size": max_size
// }

// TODO: move to app namespace.
var ship_types = { aircraft_carrier: {size: 5, quantity: 1, on_board: 0},
									 battleship: {size: 4, quantity: 1, on_board: 0},
									 submarine: {size: 3, quantity: 1, on_board: 0},
									 destroyer: {size: 3, quantity: 2, on_board: 0},
									 patrol_boat: {size: 2, quantity: 2, on_board: 0}};


// creates an mouse listener that adds cell to a ship until complete.
function ship_placement(){
	$('table.player td').on('mousedown', function(e){
		var cell = $(e)[0].target;
		var row = cell.parentElement.rowIndex;
		var col = cell.cellIndex;

		// we aren't in ship placement mode
		if (!app.current_ship_type){
			console.log('no ship type');
			return;
		}

		// this cell isn't valid
		if (!is_board_cell(row, col)){
			console.log('not a board cell');
			return;
		}

  	if (app.current_ship.length === 0 || is_legal_move(row, col)) {
			$(cell).css("background-color", "#000");
			console.log("added another point!");
			app.current_ship.push([row, col]);

			if (!has_unplaced_piece(app.current_ship, app.current_ship_type)){
				app.player_ships.push(app.current_ship);
				app.current_ship_type = null;
			}
		}
	});
}

// returns true if the cell isn't part of the headers
function is_board_cell(row, col){
	return row > 0 && col > 0;
}

function is_legal_move(row, col){
  return has_unplaced_piece(app.current_ship, app.current_ship_type) && is_connected(app.current_ship, row, col) && is_same_axis(app.current_ship, row, col);
}

//only place positions based on the size of the ship
function has_unplaced_piece(ship, type){
	return ship.length > 0 && ship.length < ship_types[type].size;
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