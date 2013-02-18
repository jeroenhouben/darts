// views
App.LegScoresView = Ember.View.extend({
  templateName: "legScores",
  player: null,
  
  playerTurns: function() {
    return this.get('controller').get('turns').filterProperty('player', this.player);
  }.property()
  
});


App.TurnView = Ember.View.extend({
  tagName: "section",
  classNames: ['turn'],
  classNameBindings: ['currentPlayerClass'],

  currentPlayerClass: function() {
    return "player" + (this.get('controller.currentPlayerIndex')+1);
  }.property('controller.currentPlayerIndex')

});

