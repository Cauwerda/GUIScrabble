/*
File: script.js
GUI Assignment: HW5
Charlie Auwerda
charles_auwerda@student.uml.edu
Copyright (c) 2023 by Charlie Auwerda. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by CA on December 17 2023
*/
$(function() {
    const boardSize = 15; // Size of the Scrabble board
    const tileImageBasePath = './Images/Scrabble_Tile_'; // Path to tile images
    let placedTiles = []; // Tiles already placed on the board
    let currentPlacedTiles = []; // Tiles currently being placed
    let wordDirection = null; // Direction of current word ('horizontal', 'vertical', or null)
    let totalscore = 0; // Total game score
    let i = 0; // Counter for tile IDs
	let scoretiles = [];
	
	// Define Scrabble pieces with letter, value, and initial amount
	let scrabblePieces = [
	{"letter":"A", "value":1, "amount":9},
	{"letter":"B", "value":3, "amount":2},
	{"letter":"C", "value":3, "amount":2},
	{"letter":"D", "value":2, "amount":4},
	{"letter":"E", "value":1, "amount":12},
	{"letter":"F", "value":4, "amount":2},
	{"letter":"G", "value":2, "amount":3},
	{"letter":"H", "value":4, "amount":2},
	{"letter":"I", "value":1, "amount":9},
	{"letter":"J", "value":8, "amount":1},
	{"letter":"K", "value":5, "amount":1},
	{"letter":"L", "value":1, "amount":4},
	{"letter":"M", "value":3, "amount":2},
	{"letter":"N", "value":1, "amount":5},
	{"letter":"O", "value":1, "amount":8},
	{"letter":"P", "value":3, "amount":2},
	{"letter":"Q", "value":10, "amount":1},
	{"letter":"R", "value":1, "amount":6},
	{"letter":"S", "value":1, "amount":4},
	{"letter":"T", "value":1, "amount":6},
	{"letter":"U", "value":1, "amount":4},
	{"letter":"V", "value":4, "amount":2},
	{"letter":"W", "value":4, "amount":2},
	{"letter":"X", "value":8, "amount":1},
	{"letter":"Y", "value":4, "amount":2},
	{"letter":"Z", "value":10, "amount":1}
	];
	
	let allLetters = []; // All available letters for gameplay

	// Populate allLetters with letters from scrabblePieces
	scrabblePieces.forEach(piece => {
		for (let i = 0; i < piece.amount; i++) {
        allLetters.push(piece.letter);
    }
	});
	
    // Function to initialize the full Scrabble board
    function initializeBoard() {
		for (let row = 0; row < boardSize; row++) {
			for (let col = 0; col < boardSize; col++) {
				const boardSquare = $('<div class="boardSquare"></div>').attr('id', 'square_' + row + '_' + col);
				const scoreText = $('<span class="specialScoreText"></span>');
				
				// Add special score text based on the type of square
				if (isDoubleWord(row, col)) {
					boardSquare.addClass('doubleWord');
					scoreText.text('Double Word Score');
				} else if (isTripleWord(row, col)) {
					boardSquare.addClass('tripleWord');
					scoreText.text('Triple Word Score');
				} else if (isDoubleLetter(row, col)) {
					boardSquare.addClass('doubleLetter');
					scoreText.text('Double Letter Score');
				} else if (isTripleLetter(row, col)) {
					boardSquare.addClass('tripleLetter');
					scoreText.text('Triple Letter Score');
				}
				if (scoreText.text()) {
					boardSquare.append(scoreText);
				}
				$('#scrabbleBoard').append(boardSquare);
				makeDroppable(boardSquare);
			}
		}
	}
	
	// Make tile rack droppable for returning tile
	$('#tileRack').droppable({
		accept: '.tile.onBoard',
		drop: function(event, ui) {
			moveTileToRack(ui.draggable);
		}
	});
	
	 // Function to move a tile back to the rack
	function moveTileToRack($tile) {
		const letter = $tile.attr('id').replace('tile_', '');
		const index = currentPlacedTiles.findIndex(tile => tile.letter === letter);
		if (index !== -1) {
			currentPlacedTiles.splice(index, 1);
			$tile.detach().appendTo('#tileRack').css({top: 0, left: 0});
			$tile.removeClass('onBoard');
			$tile.draggable('enable').draggable({
				revert: 'invalid',
				containment: 'document',
				snap: '.boardSquare',
				snapMode: 'inner',
				stack: '.tile'
			});
			
		}
		
		const indexx = scoretiles.findIndex(tile => tile.letter === letter);
		if (indexx !== -1) {
			scoretiles.splice(indexx, 1);
			$tile.detach().appendTo('#tileRack').css({top: 0, left: 0});
			$tile.draggable('enable').draggable({
				revert: 'invalid',
				containment: 'document',
				snap: '.boardSquare',
				snapMode: 'inner',
				stack: '.tile'
			});
		}		
		
		
		if (currentPlacedTiles.length > 0) {
			const nextLastTile = currentPlacedTiles[currentPlacedTiles.length - 1];
			$('#tile_' + nextLastTile.letter).draggable('enable');
		}
		if(currentPlacedTiles.length === 0){
			currentPlacedTiles = [];
			wordDirection = null;
		}
	}
	
	// Functions to check special score positions on the board
	function isDoubleWord(row, col) {
		const doubleWordPositions = [
			[1, 1], [2, 2], [3, 3], [4, 4],
			[13, 1], [12, 2], [11, 3], [10, 4],
			[1, 13], [2, 12], [3, 11], [4, 10],
			[13, 13], [12, 12], [11, 11], [10, 10],
			[7, 14], [14, 7], [0, 7], [7, 0]
		];
		return doubleWordPositions.some(position => position[0] === row && position[1] === col);
	}
	function isTripleWord(row, col) {
		const tripleWordPositions = [
			[0, 0], [0, 14], [14, 0], [14, 14]
		];
		return tripleWordPositions.some(position => position[0] === row && position[1] === col);
	}
	function isDoubleLetter(row, col) {
		const doubleLetterPositions = [
			[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14],
			[6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11],
			[8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7],
			[11, 14], [12, 6], [12, 8], [14, 3], [14, 11]
		];
		return doubleLetterPositions.some(position => position[0] === row && position[1] === col);
	}
	function isTripleLetter(row, col) {
		const tripleLetterPositions = [
			[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13],
			[9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9]
		];
		return tripleLetterPositions.some(position => position[0] === row && position[1] === col);
	}
	
    // Select random letters for the player's rack
	function selectRandomLetters(amount) {
		let selectedLetters = [];
		for (let i = 0; i < amount; i++) {
			if (allLetters.length === 0) break; // Break if no more letters are available

			let randomIndex = Math.floor(Math.random() * allLetters.length);
			let selectedLetter = allLetters.splice(randomIndex, 1)[0];
			selectedLetters.push(selectedLetter);

			// Decrement the count of the selected letter in scrabblePieces
			scrabblePieces.forEach(piece => {
				if (piece.letter === selectedLetter) {
					piece.amount--;
				}
			});
		}
		return selectedLetters;
	}

	// Replenish the player's rack with new tiles
	function ReplenishRack() {
		const currentTileCount = $('#tileRack').children().length;
		const tilesNeeded = 7 - currentTileCount;
		const letters = selectRandomLetters(tilesNeeded);
		letters.forEach((letter) => {
			const tile = $('<div class="tile"></div>')
				.attr('id', 'tile_' + letter + i)
				.css('background-image', `url('${tileImageBasePath + letter}.jpg')`)
				.draggable({
					revert: 'invalid',
					containment: 'document',
					snap: '.boardSquare',
					snapMode: 'inner',
					stack: '.tile'
				});
			$('#tileRack').append(tile);
			i++;
		});
	}
	
	// Handle tile drop on the board
	function handleDrop(event, ui) {
		const $this = $(this);
		const tilePosition = $this.attr('id').split('_');
		const row = parseInt(tilePosition[1], 10);
		const col = parseInt(tilePosition[2], 10);
		let isValidPlacement = false;
		if (placedTiles.length === 0 && currentPlacedTiles.length === 0) {
			if (row === 7 && col === 7) {
				isValidPlacement = true;
				
			}
		}  else if (currentPlacedTiles.length === 1) {
				const firstTile = currentPlacedTiles[0];
				if (firstTile.row === row) {
					wordDirection = 'horizontal';
				} else if (firstTile.col === col) {
					wordDirection = 'vertical';
				}
				isValidPlacement = isAdjacentToPlacedTile(row, col) && !isNeighboringOtherTiles(row, col, currentPlacedTiles);
				
		} else if (currentPlacedTiles.length === 0) {
				isValidPlacement = isAdjacentToPlacedTile(row, col);
		} else {
			isValidPlacement = isAdjacentToPlacedTile(row, col) && followsDirection(row, col, wordDirection) && !isNeighboringOtherTiles(row, col, currentPlacedTiles.concat(scoretiles));
		}

		if (isValidPlacement && !isTilePlaced(row,col)) {
			const droppedTile = $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo($this);
			currentPlacedTiles.push({ letter: droppedTile.attr('id').replace('tile_', ''), row: row, col: col });
			currentPlacedTiles.forEach(tile => {
				$('#tile_' + tile.letter).draggable('disable');
			});
			
			 $(ui.draggable).draggable('enable');
			if (wordDirection) {
				addContinuousTiles(row, col, wordDirection);
			}
			if(!isTileInscoreTiles(row,col)){
				scoretiles.push({ letter: droppedTile.attr('id').replace('tile_', ''), row: row, col: col });
			}
			$(ui.draggable).addClass('onBoard');
			makeRackLettersDraggable();
		} else {
			$(ui.draggable).draggable('option', 'revert', true);
		}
	}
	
	// Add continuous tiles based on word direction
	function addContinuousTiles(row, col, direction) {
		let deltaRow = 0, deltaCol = 0;
		if (direction === 'horizontal') {
			deltaCol = 1; // Move horizontally
		} else if (direction === 'vertical') {
			deltaRow = 1; // Move vertically
		}

		// Function to scan and add tiles in a direction
		const scanAndAddTiles = (startRow, startCol, rowIncrement, colIncrement) => {
			let currentRow = startRow, currentCol = startCol;
			while (currentRow >= 0 && currentRow < boardSize && currentCol >= 0 && currentCol < boardSize && isTilePlaced(currentRow, currentCol)) {
				let tile = getTileAt(currentRow, currentCol);
				if (tile && !isTileInscoreTiles(currentRow,currentCol)) {
					scoretiles.push(tile);
				}
				currentRow += rowIncrement;
				currentCol += colIncrement;
			}
			
		};

		// Scan and add tiles in both directions from the starting point
		scanAndAddTiles(row + deltaRow, col + deltaCol, deltaRow, deltaCol); // Forward direction
		scanAndAddTiles(row - deltaRow, col - deltaCol, -deltaRow, -deltaCol); // Reverse direction
	}
	
	function isTileInscoreTiles(row,col) {
		return scoretiles.some(placedTile => placedTile.row === row && placedTile.col === col);
	}
	function isTilePlaced(row, col) {
		const allPlacedTiles = placedTiles.concat(currentPlacedTiles);
		return allPlacedTiles.some(tile => tile.row === row && tile.col === col);
	}
	function getTileAt(row, col) {
		const allPlacedTiles = placedTiles.concat(currentPlacedTiles);
		return allPlacedTiles.find(tile => tile.row === row && tile.col === col);
	}
	function removeDuplicates(tiles) {
		const unique = [];
		const lookup = new Set();

		tiles.forEach(tile => {
			const serialisedTile = `${tile.row}-${tile.col}`;
			if (!lookup.has(serialisedTile)) {
				lookup.add(serialisedTile);
				unique.push(tile);
			}
		});

		return unique;
	}
	function isNeighboringOtherTiles(row, col, exceptions) {
		return placedTiles.some(tile => {
			// Check if this tile is in the exceptions list
			const isException = exceptions.some(exceptionTile => 
				exceptionTile.row === tile.row && exceptionTile.col === tile.col
			);
			
			if (isException) {
				return false; // Do not consider exceptions as neighboring
			}

			// Check only for direct neighbors (no diagonals)
			const isDirectNeighbor = 
				(tile.row === row && Math.abs(tile.col - col) === 1) || // Same row, adjacent column
				(tile.col === col && Math.abs(tile.row - row) === 1);   // Same column, adjacent row

			return isDirectNeighbor;
		});
	}
	
	// Function to check if the position is adjacent to an already placed tile
	function isAdjacentToPlacedTile(row, col) {
		const allPlacedTiles = placedTiles.concat(currentPlacedTiles);
		return allPlacedTiles.some(tile => {
			return (tile.row === row && Math.abs(tile.col - col) === 1) ||
				   (tile.col === col && Math.abs(tile.row - row) === 1);
		});
	}
	
	function followsDirection(row, col, direction) {
		if (direction === 'horizontal') {
			return currentPlacedTiles.some(tile => tile.row === row);
		} else if (direction === 'vertical') {
			return currentPlacedTiles.some(tile => tile.col === col);
		}
		else if (direction === null) {
			return true;
		}
		return false;
	}

	function makeRackLettersDraggable() {
		$('#tileRack .tile').draggable({
			revert: 'invalid',
			containment: 'document',
			snap: '.boardSquare',
			snapMode: 'inner',
			stack: '.tile'
		});
	}
	// Function to make a square droppable
	function makeDroppable(square) {
    square.droppable({
        accept: '.tile:not(.onBoard)',
        drop: handleDrop
    });
}

	// Call the initialization functions
	initializeBoard();
	ReplenishRack()
$(window).resize(function() {
    $('.tile').each(function() {
        const $this = $(this);
        // Retrieve data attributes, if they exist
        const row = $this.data('row');
        const col = $this.data('col');

        // Only attempt to reposition if the tile has a defined row and column
        if (row !== undefined && col !== undefined) {
            const boardSquare = $('#square_' + row + '_' + col);

            // If the corresponding board square exists, reposition the tile
            if (boardSquare.length) {
                $this.position({
                    my: 'left top',
                    at: 'left top',
                    of: boardSquare
                });
            }
        }
    });
});

	
	function computeBoardScore() {
		let score = 0;
		let wordMultiplier = 1;

		scoretiles.forEach(tile => {
			let $tile = $(tile);
			let tileId = tile.letter;
			let letter = tileId.replace(/([A-Za-z]+).*/, '$1');

			let letterScore = scrabblePieces.find(p => p.letter === letter).value;

			if (isDoubleLetter(tile.row, tile.col)) {
				letterScore *= 2;
			} else if (isTripleLetter(tile.row, tile.col)) {
				letterScore *= 3;
			} else if (isDoubleWord(tile.row, tile.col)) {
				wordMultiplier *= 2;
			} else if (isTripleWord(tile.row, tile.col)) {
				wordMultiplier *= 3;
			}

			score += letterScore;
		});

		score *= wordMultiplier;
		totalscore += score;

		$('#scoreDisplay').val(score);
		$('#TotalscoreDisplay').val(totalscore);
	}

	// Event listener for the Calculate Score button
	$('#submitword').click(function() {
		if(scoretiles.length === 0) {
			return;
		}
		currentPlacedTiles.forEach(tile => {
			placedTiles.push(tile);
		});
		currentPlacedTiles.forEach(tile => {
			$('#tile_' + tile.letter).draggable('disable');
		});
		computeBoardScore();
		currentPlacedTiles = [];
		scoretiles = [];
		ReplenishRack();
		wordDirection = null;
	});
	
	// Event listener for the restart button
	$('#restartGame').click(function() {
		// Clear the board
		$('#scrabbleBoard').empty();

		// Reset game state variables
		placedTiles = [];
		currentPlacedTiles = [];
		scoretiles = [];
		wordDirection = null;
		totalscore = 0;
		$('#scoreDisplay').val(totalscore);
		$('#TotalscoreDisplay').val(totalscore);
		scrabblePieces.forEach(piece => {
			for (let i = 0; i < piece.amount; i++) {
			allLetters.push(piece.letter);
			}
		});
		// Reset the rack and repopulate it
		$('#tileRack').empty();
		initializeBoard();
		ReplenishRack(); // Assuming this function repopulates the rack
	});
});