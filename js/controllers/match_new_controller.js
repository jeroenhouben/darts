/*
*/
App.MatchNewController = Ember.ObjectController.extend({

  initWithNumberOfPlayers: function(size) {
    var DUMMIES = ["Marvin", "Jeroen", "Lennard", "Lars Vegas"];
    var match = this.get('model');
    match.set('players', []);
    for (var i=1; i <= size; i++) {
      match.get('players').createRecord({
        name: DUMMIES[i-1]
      });
    };
    // create a first Leg
    var leg = match.get('legs').createRecord();
    
    match.get('players').forEach(function(player) {
      leg.get('players').createRecord({player: player})
    });
    
    // this.dummyData(leg);
    
    this.transitionToRoute('leg', leg);
  },
  
  dummyData: function(leg) {
    // create a dummy Turn
    var p = leg.get('players.firstObject');
    p.get('turns').createRecord({
      dart1: 23,
      dart2: 1,
      dart3: 34,
      completed: true
    });
  },
  
  setStartScore: function(score) {
    this.get('model').set('startScore', score);
  }
  
});