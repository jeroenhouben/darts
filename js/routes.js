// Routes
App.Router.map(function() {
  this.resource('match', function() {
    this.route('new');
    this.resource('leg', { path: '/legs/:leg_id' }, function() {
      this.resource('turn', { path: '/turns/:turn_id' });
    });
  });
});

/*
* ApplicationRoute
*/
App.ApplicationRoute = Ember.Route.extend({
});

App.LegRoute = Ember.Route.extend({

  
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
App.TurnRoute = Ember.Route.extend({

  renderTemplate: function() {
    this.render("turn", {
      into: "match",
      outlet: "main"
    });
  }
  
});


App.TurnsRoute = Ember.Route.extend({
});
