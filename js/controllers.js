// Controllers

/*
* MatchSetupController
*
*
*/
App.MatchSetupController = Ember.ObjectController.extend({
  initNumberOfPlayers: function(size) {
    var leg = this.controllerFor('application').get('leg'),
        dummies = ["Marvin", "Jeroen", "Lennard", "Lars Vegas"],
        p;

    leg.set('players', []);
    for (var i=1; i <= size; i++) {
      p = leg.registerPlayer(dummies[i-1]);
    };
    this.transitionToRoute('players');
  },
  
  setStartScore: function(score) {
    this.get('content').set('startScore', score);
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
  },
  
  registerThrow: function(number) {
    var score = number*this.selectedMultiplier; 
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

    var leg = this.controllerFor('application').get('leg');
    leg.advanceTurn();
  },

  setMultiplier: function(i) {
    this.set('selectedMultiplier', i);
  },
  
  isDart1Selected: function() {return this.get('selectedDart') === 1}.property('selectedDart'),
  isDart2Selected: function() {return this.get('selectedDart') === 2}.property('selectedDart'),
  isDart3Selected: function() {return this.get('selectedDart') === 3}.property('selectedDart'),

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
  startCalculator: function(turn) {
    this.transitionTo('turn', turn)
  }
});


/*
* PlayersController
*
*/
App.PlayersController = Ember.ArrayController.extend({
  leg: null
});