/*
*/
App.MatchNewController = Ember.ObjectController.extend({
  
  hasPlayers: function() {
    return this.get('model.players.length') > 0;
  }.property('model.players.length'),

  setNumberOfPlayers: function(size) {
    var match = this.get('model'),
        players = match.get('players'),
        PREFILLEDS = ["Jeroen", "Marvin", "Piest", "Lenny"]
    
    if (players.get('length') === 0) {
      // no players ...
      match.set('players', []);

      for (var i=1; i <= size; i++) {
        match.get('players').createRecord({
          name: PREFILLEDS[i-1]
        });
      };

    } else if (players.get('length') < size) {
      // there are currenty less players than needed
      var needed = size-players.get('length');
      do  {
        match.get('players').createRecord({
          name: PREFILLEDS[3-needed]
        });
        needed--;
      } while(needed > 0)
      
    } else if (players.get('length') > size) {
      // there are currenty more players than needed
      players.set('content', players.slice(0,size));
    }
    
  },
  
  start: function() {
    // create a first Leg
    var match = this.get('model');
    var leg = match.get('legs').createRecord();
    
    // enroll players in leg
    match.get('players').forEach(function(player) {
      leg.get('players').createRecord({player: player})
    });
    
    this.transitionToRoute('leg', leg);
  },
  
  setStartScore: function(score) {
    this.get('model').set('startScore', score);
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
  }
  
});