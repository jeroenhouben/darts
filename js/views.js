// views
App.LegScoresView = Ember.View.extend({
  templateName: "legScores",
  player: null,
  
  playerTurns: function() {
    return this.get('controller').get('turns').filterProperty('player', this.player);
  }.property()
  
});