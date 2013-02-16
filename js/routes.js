// Routes
App.Router.map(function() {
  this.resource('match', function() {
    this.route('new');
    this.resource('leg', { path: '/legs/:leg_id' }, function() {
      this.resource('turns', { path: '/turns/:turn_id' });
    });
  });
});

/*
* ApplicationRoute
*/
App.ApplicationRoute = Ember.Route.extend({
});


/*
* MatchSetupRoute
*/
App.MatchNewRoute = Ember.Route.extend({

  setupController: function(controller) {
    controller.set("content", App.Match.createRecord());
  }

});    

/*
* MatchScoreboardRoute
*/
App.TurnsRoute = Ember.Route.extend({
});
