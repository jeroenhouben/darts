App.IndexController = Ember.Controller.extend({

  newMatch: function() {
    var match = App.Match.createRecord();
    this.transitionToRoute('match.setup', match)
  }

});