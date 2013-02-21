/*
* A leg
*/
App.LegController = Ember.ObjectController.extend({
  needs: ["match"],
  currentPlayerIndex: 0,

  currentPlayer: function() {
    return this.get('players').objectAt(this.get('currentPlayerIndex'));
  }.property('currentPlayerIndex'),
  /*
  * get (or create!) the player's last turn
  */
  nextTurnForPlayer: function(player) {
    var turn = player.get('turns.lastObject');
    if (!turn || turn.get('completed')) {
      turn = player.get('turns').createRecord();
    }
    return turn;
  },

  newMatch: function() {
    this.get('match').deleteRecord(); // FIXME: should prolly persist somewhere, or at least prompt for saving..  
    this.transitionToRoute('match.new');
  },

  
  newLeg: function() {
    // FIXME: remove current leg??
    var leg = this.get('match').createNewLeg();
    this.transitionToRoute('leg', leg);
  },
  
  gotoNextTurnForPlayer: function(player) {
    this.gotoTurn(this.nextTurnForPlayer(player));
  },
  
  gotoTurn: function(turn) {
    this.transitionToRoute('turn', turn);
  },

  legChanged: function(sender, key, value) {
    alert('keyval' + key + '  ' + value);
    this.set('currentPlayerIndex', 0);
  }.observes('content')

  
});