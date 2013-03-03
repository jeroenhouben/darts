/*
* A finished leg
*/
App.LegFinishedController = Ember.ObjectController.extend({
  needs: ["leg"],
  
  undoWinner: function() {
    this.set('winner', null);
    this.transitionToRoute('leg', this.get('model'))
  },
  
  newLeg: function() {
    var leg = this.get('match').createNewLeg();
    this.transitionToRoute('leg', leg);
  },

  newMatch: function() {
    this.get('controllers.leg').newMatch();
  }

});