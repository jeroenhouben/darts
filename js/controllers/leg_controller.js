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
  
  gotoNextTurnForPlayer: function(player) {
    this.gotoTurn(this.nextTurnForPlayer(player));
  },
  
  gotoTurn: function(turn) {
    this.transitionToRoute('turn', turn);
  }
  
});