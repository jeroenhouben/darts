// Routes
App.Router.map(function() {
  this.resource('match', function() {
    this.resource('players');
    this.resource('turn', { path: '/turns/:turn_id' });
    this.route('setup');
    this.route('scoreboard');
  });
});

/*
* IndexRoute. just redirects. can probably go away
*/
App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('match.setup');
  }
});

/*
* ApplicationRoute
*/
App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var leg = App.Leg.create({
      startScore: 501
    });
    controller.set('leg', leg);
    window.gleg = leg; //global shortcut fer debuggin
  },
  
  events: {
    startLeg: function() {
      var leg = this.controllerFor("application").get("leg")
          
      if (leg.get('players').length == 0) {
        this.transitionTo('match.setup');
      } else {
        this.transitionTo('match.scoreboard');
        leg.start();
      }
    }
  }

});


/*
* MatchSetupRoute
*/
App.MatchSetupRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('content', this.controllerFor('application').get('leg'));
  }
});    

/*
* PlayersRoute
*/
App.PlayersRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var leg = this.controllerFor('application').get('leg');
    controller.set('leg', leg);
    controller.set('content', leg.get('players'));
  }
  
});

/*
* MatchScoreboardRoute
*/
App.MatchScoreboardRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('content', this.controllerFor('application').get('leg'));
  }
});
