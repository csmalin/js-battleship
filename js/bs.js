$(document).ready(function(){
	$('td').on('click', function(e){
		var cell = $(e)[0].target
		var board = cell.parentElement.parentElement.parentElement.className;
		var row = cell.parentElement.rowIndex;
		var col = cell.cellIndex;
		console.log(board + ": (" + row + "," + col + ")");

		if (row > 0 && col > 0) {
			console.log(cell);
			$(cell).css("background-color", "#000")
		};
	});
});