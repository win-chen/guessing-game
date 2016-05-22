$(document).ready(function() { 	 	
	var playersGuess,
	var winningNumber; 	
	var guesses = []
	var direction;
	var withinBounds = 0;
	var hintsLeft;
	var guessesLeft;

	playAgain();	 
 	 
	/* **** Guessing Game Functions **** */	
	
	// Generate the Winning Number

	function randInt(a, b) {
		if (b > a) {return Math.floor((Math.random() * (b + 1 - a) + a);}
		else {return Math.floor((Math.random() * (a + 1 - b) + b);}
	}
		 
	function generateWinningNumber(){
		winningNumber = randInt(1, 100);
	}
		 
	// Fetch the Players Guess
		
	function playersGuessSubmission(){
		playersGuess = $('#guess').val().parseInt();
		$('#guess').val("");	
	}
		 
	// Determine if the next guess should be a lower or higher number
		 
	function lowerOrHigher(){
		
		if(playersGuess > winningNumber) {
			direction = "higher";
			withinBounds = randInt(playerGuess, 100); 
		}
	   if(playersGuess < winningNumber) {
			direction = "lower";
			withinBounds =  randInt(1, playerGuess);
	   }
	}
	function guessMessage() {
		var str = "Your number is " + direction + " and within " + withinBounds + " from me. Keep trying."
	}
		 
	// Check if the Player's Guess is the winning number
		 	
	function checkGuess(){
		if(!isInArray(playersGuess, guesses)) {
			guesses.push(playersGuess);
			guessesLeft--;
		}
		else {
			$('.hey-girl p').text("This is an old guess. Try a different number.");
		}
		
		if (playersGuess === winningNumber) {
			$('.hey-girl p').text("That's correct! We are so in sync.");
		}
		else {
			$('.gh-count guesses-left').text(guessesLeft.toString());
			if(guessesLeft === 0) {
				$('.hey-girl p').text("I win this time. I was thinking of " + winnningNumber + ". Are you my reward?");
			}
			else {
				lowerOrHigher();
				$('.hey-girl p').text(guessMessage());
			}
		}		
	}

	function isInArray(num, arr) {
		var i = 0;
		while (i < arr.length) {
			if (arr[i] === num) {
				return true;
			}
			i++;
		}
		return false;
	}
		 
	// Create a provide hint button that provides additional clues to the "Player"	 
		
	function provideHint(){
		hintsLeft--;
		$('.gh-count hints-left').text(hintsLeft.toString());
		var arr = [];
		arr.push(winningNumber);
		var rand;
		while(arr.length <= guessesLeft + 1) {			
			rand = randInt(withinBounds, winningNumber);
			if(!isInArray(rand, arr)) {
				arr.push(rand);
			}
		}
		shuffle(arr);
		$('.hey-girl p').text("One of these is the winning number: " + arr.toString());							
	}
		 
	// Allow the "Player" to Play Again		 
		
	function playAgain(){
		generateWinningNumber();
		guessesLeft = 5,
		hintsLeft = 5;
		$('.gh-count guesses-left').text(guessesLeft.toString());
		$('.gh-count hints-left').text(hintsLeft.toString());
		$('.hey-girl p').text("I'm ready to play when you are.");
	}
		 
		 
		
	/* **** Event Listeners/Handlers **** */

	$('.guess-button').on('click', function() {alert('works');});
	$('.hint-button').on('click', provideHint);
	$('.reset').on('click', playAgain);


}
