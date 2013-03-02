/*
*/
App.MatchNewController = Ember.ObjectController.extend({
  isReady: false,
  
  isNotReady: function() {
    return !this.get('isReady')
  }.property('isReady'),

  hasPlayers: function() {
    return this.get('model.players.length') > 0;
  }.property('model.players.length'),

  /*
  * set selectedPlayers using player IDs
  */
  setPlayersById: function(ids) {
    this.get('model.players').set('content', ids.map(function(id) { return App.Player.find(id) }));
  },

  start: function() {
    // create a first Leg
    var match = this.get('model'),
        leg = match.createNewLeg();
    
    console.log('legy', leg.get('id'))
    
    this.transitionToRoute('leg', leg);
  },
  
  setStartScore: function(score) {
    this.get('model').set('startScore', score);
  },

});