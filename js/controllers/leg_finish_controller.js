/*
* A finished leg
*/
App.LegFinishController = Ember.ObjectController.extend({
  needs: ["leg"],
  
  undoWinner: function() {
    this.set('winner', null);
    this.transitionToRoute('leg', this.get('model'))
  },
  
  gameOn: function() {
    var leg = this.get('match').createNewLeg();
    this.transitionToRoute('leg', leg);
  },

  newMatch: function() {
    this.get('controllers.leg').newMatch();
  }

});