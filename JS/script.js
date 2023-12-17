$(function() {
    const boardSize = 15; // Scrabble board size
    const tileImageBasePath = 'images/Scrabble_Tile_'; // Base path for tile images

    // Function to initialize the full Scrabble board
    function initializeBoard() {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                // Create a div for each board square and set it as droppable
                const boardSquare = $('<div class="boardSquare"></div>').attr('id', 'square_' + row + '_' + col);
                $('#scrabbleBoard').append(boardSquare);
                boardSquare.droppable({
                    accept: '.tile',
                    drop: function(event, ui) {
                        // When a tile is dropped, append it to the board square
                        const droppedTile = $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(this);
                    }
                });
            }
        }
    }

    // Function to initialize the rack with draggable tiles
    function initializeRack() {
        // Example tile distribution, you can replace this with your actual tile distribution
        const letters = ['A', 'B', 'C', 'D']; // Add all necessary letters

        // Clear the rack first
        $('#tileRack').empty();

        // Create draggable tiles for each letter
        letters.forEach((letter) => {
            const tile = $('<div class="tile"></div>')
                .attr('id', 'tile_' + letter)
                .css('background-image', `url('${tileImageBasePath + letter}.jpg')`); // Ensure the path is correct
            
            // Append the tile to the rack
            $('#tileRack').append(tile);
            
            // Make the tile draggable
            tile.draggable({
                revert: 'invalid', // Tile will return to its place if not dropped on a valid square
                containment: 'document',
                snap: '.boardSquare',
                snapMode: 'inner',
                stack: '.tile'
            });
        });
    }

    // Call the initialization functions
    initializeBoard();
    initializeRack();
});