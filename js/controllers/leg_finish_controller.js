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
    var leg     = this.get('match').createNewLeg(),
        players = leg.get('players'),
        count   = this.get('match.legs.length'),
        i = 1,
        p;

    // rotate player turns with each new leg
    for (i;i<count; i++) {
      p = players.popObject(); players.unshiftObject(p);
      console.log('i popped: ', i, " this mang", p.get('name'))
    };
    
    this.transitionToRoute('leg', leg);
  },

  newMatch: function() {
    this.get('controllers.leg').newMatch();
  }

});