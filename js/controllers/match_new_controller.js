/*
*/
App.MatchNewController = Ember.ObjectController.extend({

  hasPlayers: function() {
    return this.get('model.players.length') > 0;
  }.property('model.players.length'),

  setNumberOfPlayers: function(size) {
    var match = this.get('model'),
        players = match.get('players');
    
    if (players.get('length') === 0) {
      // no players ...
      match.set('players', []);

      for (var i=1; i <= size; i++) {
        match.get('players').createRecord({
          name: this.get('availablePlayers').objectAt(i-1).get('name')
        });
      };

    } else if (players.get('length') < size) {
      // there are currenty less players than needed
      var needed = size-players.get('length');
      do  {
        match.get('players').createRecord({
          name: this.get('availablePlayers').objectAt(3-needed).get('name')
        });
        needed--;
      } while(needed > 0)
      
    } else if (players.get('length') > size) {
      // there are currenty more players than needed
      players.set('content', this.get('availablePlayers').slice(0,size));
    }
    
  },
  
  start: function() {
    // create a first Leg
    var match = this.get('model');
    this.transitionToRoute('leg', match.createNewLeg());
  },
  
  setStartScore: function(score) {
    this.get('model').set('startScore', score);
  },

});