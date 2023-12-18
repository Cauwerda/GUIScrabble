

Features:
	Board Initialization:
		Fully working: Dynamically creates a 15x15 Scrabble board with special score squares indicated.
		
	Tile Rack:
		Fully working: Tiles can be dragged from a rack and placed onto the board.
		Fully working: Tiles can be dragged back to the rack in the reverse order that they were dropped
		
	Tile Management:
		Fully working: Tracks placed tiles and tiles currently being placed.
		Fully working: Updates the display based on tile placement and removal.
		Fully working: Each tile has a unique identifier, allowing for individual tracking.
		
	Scrabble Pieces:
		Fully working: Defines the letter, value, and initial amount for each Scrabble piece.
		Fully working: Functionality to select random letters from the available set for the player's rack.
		
	Special Score Positions:
		Fully working: Identifies double and triple word and letter positions on the board.
		
	Tile Placement and Scoring:
		Fully working: Logic to handle tile drop on the board with validation for correct placement.
		Fully working: Calculates scores for placed words, including special score multipliers.
		
	Gameplay Mechanics:
		Fully working: Ensures that the first tile is placed in the center.
		Partially working: Establishes the direction of the word being placed after the first tile:
			When placing the first tile of your second word it may decide you're going in a different direction than you wanted
		Fully working: Prevents placement of tiles in invalid positions.
		
	Continuous Tile Addition:
		Fully working: Adds tile score values continuously in the direction of word placement. So if you add on to a previous word the previous words score is added
		
	Draggable Tiles:
		Fully working: Tiles can be dragged and have snapping functionality to the board.
		
	Game State Reset:
		Fully working: Reset function to clear the board and reset game variables.
		
	Score Calculation:
		Fully working: Calculates and updates individual word score and total score.
		
	UI Responsiveness:
		Partially working: Adjusts tile positions on window resize for consistent layout. Theres an error in the console when resizing the page but that has seemingly no impact on preformance
		
	Game Restart:
		Fully working: Functionality to restart the game is included