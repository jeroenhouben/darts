/*
* Game 
*/
function Leg() {

  this.players = [];
  this.scores = [];
  this.started = false;
  this.game_type = 501;
  this.current_turn = null;
  
}

Leg.prototype = {
	
	addPlayer: function(player) {
		if (!this.started) {
		  this.players.push(player);
		} else {
		  console.log("ERROR: Leg has already started!"); // Fix with Exceptions (?)
		}
	},
	
	start: function() {
	  this.started = true;
	  
	  for (var i = 0; i < this.players.length; i++) {
	    this.scores.push({ player: this.players[i], current_score: this.game_type}); // Refactor 'current_score' to 'score'
	  }
	
	  this.current_turn = new Turn(this.players[0]);
	},
	
	nextTurn: function() {
	  if (this.current_turn != null) {
	    currentPlayer = this.current_turn.player;
	    var i = this.players.indexOf(currentPlayer);
	    var j = (i + 1) % this.players.length;
	    this.current_turn = new Turn(this.players[j]);
	  } else {
	    console.log("ERROR: Calling 'nextTurn' doesn't make sense; the game hasn't started yet!")
	  }
	},
	
	processTurn: function(turn) {
	  if (!this.started) {
	    console.log("ERROR: 'Process turn' makes no sense; the game leg hasn't started yet!"); // Fix with Exceptions (?)
	  } else if (turn.darts_left != 0) {
	    console.log("ERROR: Unable to process turn, for the turn has not yet been finished: still " + turn.darts_left + " dart(s) to throw")
	  } else {
	    // No doubt this can be done better:
	    for (var i = 0; i < this.scores.length; i++) {
	      
	      // Find the player in the list of scores
	      if (this.scores[i].player == turn.player) {
	        // Check if maybe player exceeded its score
	        if (this.scores[i].current_score > turn.score) {
	          this.scores[i].current_score -= turn.score;
	        } else {
	          console.log("Too bad, you busted, no score!");
	        }
	      }
	    }
	  }
	},
	
	toString: function() {
	  // Declare all vars up in front; dont know if it's necessary in JS, but it wont hurt
	  var intro = null;
	  var plrs = []
	  var output = null;
	  
	  if (this.started) {
	    intro = "\n***\nThis game is in progress, with the folling players:\n\n";
	    for (var i = 0; i < this.scores.length; i++) {
	      plrs.push("Name: " + this.scores[i].player.name + ", Current score: " + this.scores[i].current_score);
	    }
	    
	  } else {
	    intro = "The game's not yet started, but the following players have registered so far:\n\n"
	    for (var i = 0; i < this.players.length; i++) {
	      plrs.push(this.players[i].toString());
      }	
	  }
	  
	  output = intro + plrs.join("\n") + "\n***\n";
    return output;
	},

}

/*
* Turn 
*/
function Turn(player) {
  this.player = player;
  this.score = 0;
  this.darts_left = 3;
}

Turn.prototype = {
  
  finishTurn: function() {
    if (this.darts_left == 0) {
      // TODO
    } else {
      console.log("ERROR: Cannot finish turn; player has still darts left tot throw")
    }
  },
  
  registerThrow: function(score) {
    if (this.darts_left > 0) {
      this.score += score;
      this.darts_left--;
    } else {
      console.log("ERROR: No darts left in current throw!"); // Fix with Exceptions (?)
    }
  },
  
  undoThrow: function(score) {
    if (this.darts_left != 3) {
      this.score -= score;
      this.darts_left++;
    } else {
      console.log("ERROR: There hasn't been thrown yet!"); // Fix with Exceptions (?)
    }
  },
  
  toString: function() {
    return "With " + this.darts_left + " darts left, a score of " + this.score + " has been established by " + this.player.name;
  }
}

/*
* Player 
*/
function Player(name) {
	this.name = name;
}

Player.prototype = {

  toString: function() {
    return("Name: " + this.name);
  }

}

/*
* init new game
*/

var block_to_test = 3;

if (block_to_test == 0) {
  p1 = new Player("Jeroen");
  p2 = new Player("Jonas");
  p3 = new Player("Lars Vegas");
  
  l = new Leg();
  
  l.addPlayer(p1);
  l.addPlayer(p2);
  l.addPlayer(p3);
  
  l.start();
  
  console.log(l.toString());
  
} else if (block_to_test == 1) {
  p1 = new Player("Marvin");
  p2 = new Player("Lennart");
  
  l = new Leg();
  
  l.addPlayer(p1);
  l.addPlayer(p2);
  
  console.log(l.toString());
  
} else if (block_to_test == 2) {
  
  // Setup and start game
  p1 = new Player("Piest");
  p2 = new Player("Jeroen");
  
  l = new Leg();
  
  l.addPlayer(p1);
  l.addPlayer(p2);
  
  l.start();
  console.log(l.toString());
  
  // Time for some action,
  // Hook up a turn...
  t = new Turn(p1);
  
  // And start throwing! Game on!
  t.registerThrow(5);
  console.log(t.toString());
  
  t.registerThrow(3); // Triple one
  console.log(t.toString());
  
  t.registerThrow(20);
  console.log(t.toString());
  
  // Pretty shitty turn, we have to process it, though
  l.processTurn(t);
  
  // Lets see if we done good
  console.log(l.toString());

} else if (block_to_test == 3) {

  p1 = new Player("Jeroen");
  p2 = new Player("Jonas");
  p3 = new Player("Lars Vegas");
  
  l = new Leg();
  
  l.addPlayer(p1);
  l.addPlayer(p2);
  l.addPlayer(p3);
  
  l.start();

  for (var i = 0; i < 10; i++) {
    console.log(l.current_turn.player.name);
    l.nextTurn();
  }


} else {
  console.log("Nothing to see here; move along");
}
