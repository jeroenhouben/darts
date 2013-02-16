// Controllers

/*
* MatchSetupController
*
*
*/
App.MatchSetupController = Ember.ObjectController.extend({

  initNumberOfPlayers: function(size) {
    var DUMMIES = ["Marvin", "Jeroen", "Lennard", "Lars Vegas"];
    var leg = this.get('model');

    leg.set('players', []);
    for (var i=1; i <= size; i++) {
      leg.get('players').createRecord({
        name: DUMMIES[i-1]
      });
    };
    this.transitionToRouteRoute('players');
  },
  
  setStartScore: function(score) {
    this.get('model').set('startScore', score);
  }
  
});

/*
* MatchScoreboardController
* Proxies the players in the leg
*/
App.MatchScoreboardController = Ember.ArrayController.extend({
  
  leg: function() {
    return App.Leg.find(1);
  }.property(),
  
  /*
  * this method needs refactoring
  */
  nextPlayer: function() {
    var players  = this.get('model'),
        count    = this.get('length'),
        minTurns = 999,
        i, turnCount, nextPlayer, _player;
    
    for (i = count-1; i >= 0; i--){
      _player = players.objectAt(i);
      turnCount = _player.get('completedTurns.length');
      if (turnCount <= minTurns) {
        minTurns = turnCount; 
        nextPlayer = _player;
      }
    };
    
    return nextPlayer;
  }.property('@each.completedTurns'),

  /*
  * edit an existing turn in the TurnCalculator
  */
  editTurn: function(turn) {
    this.transitionToRoute('turn', turn)
  },
  
  /*
  * get (or create!) the player's last turn and go to the TurnCalculator
  */
  newTurnForPlayer: function(player) {
    var turn = player.get('turns.getLastObject');
    if (!turn || turn.get('completed')) {
      turn = player.get('turns').createRecord();
    }
    this.transitionToRoute('turn', turn);
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
  
  hasScore: function() {
    if (this.get('dart1') != null) return true;
    if (this.get('dart2') != null) return true;
    return (this.get('dart3') != null);
  }.property('dart1','dart2','dart3'),
  
  requiredScore: function() {
    return this.get('player.requiredScore');
  }.property('player.requiredScore'),
  
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
  
  registerHomo: function() {
    this.set('dart1', 1);
    this.set('dart2', 20);
    this.set('dart3', 5);
    this.set('selectedMultiplier', 1);
  },
  
  bust: function() {
    
  },
  
  registerTurn: function() {
    this.set('completed', true);
    this.transitionToRoute('match.scoreboard');
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
    this.set('selectedMultiplier', 1);
  }.observes('content')

});

App.LatestScoresController = Ember.ObjectController.extend({
  needs: ["turn"]
  
});

/*
* PlayersController
*
*/
App.PlayersController = Ember.ArrayController.extend({


});