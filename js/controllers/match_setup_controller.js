/*
*/
App.MatchSetupController = Ember.ObjectController.extend({
  needs: "match",
  bestOf: 1,

  isBestOf1: function() { return this.get('bestOf') === 1 }.property('bestOf'),
  isBestOf3: function() { return this.get('bestOf') === 3 }.property('bestOf'),
  isBestOf5: function() { return this.get('bestOf') === 5 }.property('bestOf'),
  isBestOf7: function() { return this.get('bestOf') === 7 }.property('bestOf'),

  isReady: function() {
    return this.get('players.length') > 1;
  }.property('players.length'),
  
  isNotReady: function() {
    return !this.get('isReady')
  }.property('isReady'),

  setBestOf: function(nr) {
    this.set('bestOf', nr)
  },

  /*
  * set selectedPlayers using player IDs
  */
  setPlayersById: function(ids) {
    this.get('model.players').set('content', ids.map(function(id) { return App.Player.find(id) }));
  },

  start: function() {
    // create a first Leg
    var match = this.get('model'),
        leg  = match.createNewLeg(),
        turn = leg.get('players.firstObject.turns').createRecord();
        this.transitionToRoute('turn', match, turn);
  },
  
  setStartScore: function(score) {
    this.get('model').set('startScore', score);
  },

});