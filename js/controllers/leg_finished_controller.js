/*
* A finished leg
*/
App.LegFinishedController = Ember.ObjectController.extend({
  needs: ["leg", "turn"],
  
  undoWinner: function() {
    this.set('winner', null);
    this.set('controllers.turn.model.finished', false);
    this.set('controllers.turn.model', null);
    this.transitionToRoute('leg', this.get('model'))
  },
  
  newLeg: function() {
    // FIXME: remove current leg??
    var leg = this.get('match').createNewLeg();
    this.transitionToRoute('leg', leg);
  },

  newMatch: function() {
    this.get('controllers.leg').newMatch();
  }

});