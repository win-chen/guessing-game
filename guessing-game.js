$(document).ready(function(){
	var gender = 0;
	var this_game;
	var player_guess;
	var winning_num;
	var guesses = [];
	this_game = new Game();
	console.log(this_game);
	
// GENERAL FUNCTIONS

	// Create random number between a and b inclusive
	function randInt(a, b) {
		if (b > a) {return Math.floor((Math.random() * (b + 1 - a) + a));}
		else {return Math.floor((Math.random() * (a + 1 - b) + b));}
	}
	
	function arrayHas(num, arr) {
		var i = 0;
		while (i < arr.length) {
			if (arr[i] === num) {
				return true;
			}
			i++;
		}
		return false;
	}	
	
	function generatewinning_num(){
		this.winning_num = randInt(1, 100);
	}	
	
	function guessMessage(direction, bounds) {
		var str = "" + player_guess + "? Your number is " + direction + " and within " + bounds + " from me. Keep trying."
		$('#hey-girl p').text(str);
	}
	
	function gameWon() {
		$('#hey-girl p').text(winning_num + ", you guessed it. We are so in sync!");
		$('#hey-girl').removeClass();
		$('#hey-girl').addClass('bg-win');
		$('label').text("You win! Ryan Guessling is happy.");
	}

	function gameLost() {
		$('#hey-girl p').text("I was thinking of the number " + winning_num + "... and of how I can make your day better.");
		$('#hey-girl').removeClass();
		$('#hey-girl').addClass('bg-lose');
		$('label').text("You lose, but don't feel bad. Look into Ryan Guesslings eyes.");
	}
	
	function resetGame() {
		this_game = new Game();		
		$('.guess-info p').text(this_game.guessesLeft.toString());
		$('.hint-info p').text(this_game.hintsLeft.toString());
		$('#hey-girl').removeClass();
		$('#hey-girl').addClass('bg');
		$('#hey-girl p').text("I'm ready to play whenever you are.");
		$('label').text("What number is Ryan thinking of?");
	}

	function shuffle(array) {	
		var i = array.length - 1;
		var rand;

		while (i >= 0) {
			// Swap random element to current index
			rand = randInt(0, i);
			temp = array[i];
			array[i] = array[rand];
			array[rand] = temp;
			i--;
		}

		return array;
	}
	
// GAME FUNCTIONS
	function Game() {
		guesses = [];
		player_guess = 0;
		this.guessesLeft = 5;
		this.hintsLeft = 5;
		this.hintLimit = 0;
		winning_num = randInt(1, 100);
	}	
	
	function checkWin() {
		if(player_guess === winning_num) {
			gameWon();
		}
		else {
			if(this_game.guessesLeft === 0) {
				gameLost();
			}
			else {
				var direction;
				if(player_guess > winning_num) {
					direction = "higher";
					this_game.hintLimit = randInt(player_guess, 100) - winning_num;	
				}
				else {
					direction = "lower";
					this_game.hintLimit = winning_num - randInt(1, player_guess);
				}
				guessMessage(direction, this_game.hintLimit);
			}
		}
	}

	function playersGuessSubmission(){
		player_guess = parseInt($('#guess').val());
		$('#guess').val("");	
		if (validGuess()) {
			guesses.push(player_guess);
			this_game.guessesLeft--;
			$('.guess-info p').text(this_game.guessesLeft.toString());
			printGuesses();
			checkWin();
		}

	}
	
	function printGuesses() {
		var str = "";
		for (var i = 0; i < guesses.length; i++) {
			str += " " + guesses[i];
		}
		$('.p-guesses').text("previous guesses:" + str);
	}
	
	function provideHint(){
		if(this_game.hintsLeft > 0) {
			this_game.hintsLeft--;
			$('.hint-info p').text(this_game.hintsLeft.toString());
			var arr = [];
			arr.push(winning_num);
			var rand;
			while(arr.length <= this_game.guessesLeft) {
				rand = randInt(1, 100);
				if(!arrayHas(rand, arr) || !arrayHas(rand, guesses)) {
					arr.push(rand);
				}
			}
			shuffle(arr);
			$('label').text("One of these is the winning number: " + hintMessage(arr) + ".");
		}
	}
	
	function hintMessage(hints) {
		var str = "";
		for (var i = 0; i < hints.length; i++) {
			if (i === hints.length - 1) {str += hints[i];}
			else {str += hints[i] + ", ";}
		}
		return str;
	}

	function validGuess() {
		if (!isNaN()) {return false;}
		if (player_guess < 1 || player_guess > 100) {
			$('#hey-girl p').text("I'm thinking of a number between 1 to 100.");	
			return false;
		}
		if (arrayHas(player_guess, guesses)) {
			$('#hey-girl p').text("This is an old guess. Try a different number.");
			return false;
		}
		return !arrayHas(player_guess, guesses);
	}	

	function changeGender() {
		gender = (gender + 1) % 3;
		if (gender === 0) {
			$('#hey-girl h3').text('Hey Girl');			
			$('.gender-button input[type=submit]').removeClass();
			$('.gender-button input[type=submit]').addClass("gender-girl");
		}
		if (gender === 1) {
			$('#hey-girl h3').text('Hey Boy');
			debugger
			$('.gender-button input[type=submit]').removeClass();
			$('.gender-button input[type=submit]').addClass("gender-boy");
		}
		if (gender === 2) {
			$('#hey-girl h3').text('Hey');
			$('.gender-button input[type=submit]').removeClass();
			$('.gender-button input[type=submit]').addClass("gender-na");
		}
	}

	
// EVENT LISTENERS
	$('.gender-button').on('click', changeGender);
	$('.guess-button').on('click', playersGuessSubmission);
	$('#guess').keypress(function(e) {
		if(e.which == 13) {
		   playersGuessSubmission();
		}
	});
	$('.hint-button').on('click', provideHint);
	$('.reset-button').on('click', resetGame);
});	