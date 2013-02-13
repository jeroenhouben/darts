// Controllers

/*
* MatchSetupController
*
*
*/
App.MatchSetupController = Ember.ObjectController.extend({

  initNumberOfPlayers: function(size) {
    var leg = this.get('model'),
        dummies = ["Marvin", "Jeroen", "Lennard", "Lars Vegas"],
        p;

    leg.set('players', []);
    for (var i=1; i <= size; i++) {
      p = leg.registerPlayer(dummies[i-1]);
    };
    this.transitionToRoute('players');
  },
  
  setStartScore: function(score) {
    this.get('model').set('startScore', score);
  }
  
});


/*
* MatchSetupController
*
* represents a single Turn 
*/
App.TurnController = Ember.ObjectController.extend({
  selectedDart: 1,
  selectedMultiplier: 1,

  selectDart: function(dartNumber) {
    this.set('selectedDart', dartNumber)
    this.set('dart'+this.selectedDart, null);
  },
  
  requiredScore: function() {
    return this.get('player.requiredScore');
  }.property('player.requiredScore'),
  
  isCheckoutPossible: function() {
    var i = this.get('requiredScore');
    if (i<162) {
      return true;
    }
    if (i==170 || i==167 || i==164) {
      return true;
    }
    return false;
  }.property('requiredScore'),
  
  registerThrow: function(number) {
    var m = (number<25) ? this.selectedMultiplier : 1; //bulls cannot have multipliers
    var score = number*m;

    this.set('dart'+this.selectedDart, score);
    this.set('selectedMultiplier', 1); // chances are the next throw will be a single

    if (this.selectedDart == 3) {
      this.set('selectedDart', null);
    } else {
      this.set('selectedDart', this.selectedDart+1);
    }
  },
  
  registerTurn: function() {
    this.set('completed', true);
    this.transitionTo('match.scoreboard');
  },

  setMultiplier: function(i) {
    this.set('selectedMultiplier', i);
  },
  
  isDart1Selected: function() {return this.get('selectedDart') === 1}.property('selectedDart'),
  isDart2Selected: function() {return this.get('selectedDart') === 2}.property('selectedDart'),
  isDart3Selected: function() {return this.get('selectedDart') === 3}.property('selectedDart'),

  isDart1Processed: function() {return this.get('dart1') != null}.property('dart1'),
  isDart2Processed: function() {return this.get('dart2') != null}.property('dart2'),
  isDart3Processed: function() {return this.get('dart3') != null}.property('dart3'),


  isSingle: function() {return this.get('selectedMultiplier') === 1}.property('selectedMultiplier'),
  isDouble: function() {return this.get('selectedMultiplier') === 2}.property('selectedMultiplier'),
  isTriple: function() {return this.get('selectedMultiplier') === 3}.property('selectedMultiplier'),

  
  turnChanged: function(sender, key, value) {
    this.set('selectedDart', 1)
  }.observes('content')

});

/*
* MatchScoreboardController
*
*/
App.MatchScoreboardController = Ember.ObjectController.extend({

  /*
  * this method needs refactoring
  */
  nextPlayer: function() {
    var players = this.get('players'), players, i, minTurns=999, l, nextPlayer, _player;

    for (i = players.length - 1; i >= 0; i--){
      _player = players[i];
      l = _player.get('turns.length');
      if (l <= minTurns) {
        minTurns = l; 
        nextPlayer = _player;
      }
    };
    
    return nextPlayer;
  }.property('content.players.@each.turns.length'),

  /*
  * edit an existing turn in the TurnCalculator
  */
  editTurn: function(turn) {
    this.transitionTo('turn', turn)
  },
  
  /*
  * get (or create!) the player's last turn and go to the TurnCalculator
  */
  newTurnForPlayer: function(player) {
    var turn = player.get('turns.getLastObject');
    if (!turn) {
      turn = App.Turn.createRecord({player: player});
      player.set('turns', [turn]);
    } else {
      if (turn.get('completed')) {
        turn = App.Turn.createRecord({player: player});
        player.get('turns').addObject(turn);
      }
    }
    this.transitionTo('turn', turn);
  }
  
});


/*
* PlayersController
*
*/
App.PlayersController = Ember.ArrayController.extend({
});