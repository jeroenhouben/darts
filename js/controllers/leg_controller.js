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
  
  undowWinner: function() {
    alert('todo...');
  },
  
  gotoNextTurnForPlayer: function(player) {
    this.gotoTurn(this.nextTurnForPlayer(player));
  },
  
  gotoTurn: function(turn) {
    this.transitionToRoute('turn', turn);
  },

  /*
  * what do we do when a different (or new) is set?
  */
  legChanged: function(sender, key, value) {
    this.set('currentPlayerIndex', 0);
    this.set('winner', null);
  }.observes('content')

  
});