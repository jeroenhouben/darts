// Routes
App.Router.map(function() {
  this.resource('match', function() {
    this.route('new');
    this.resource('leg', { path: '/leg/:leg_id' }, function() {
      this.route('finished');
    });
    this.resource('turn', { path: '/turn/:turn_id' });
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('match.new');
  }
});

App.LegFinishedRoute = Ember.Route.extend({
  // set the leg to the leg of the parent (LegController)
  setupController: function(controller) {
    controller.set("content", controller.get('controllers.leg.content'));
  }

});    


App.MatchNewRoute = Ember.Route.extend({

  setupController: function(controller) {
    controller.set("content", App.Match.createRecord());
    controller.set('availablePlayers', App.Player.find());
  }

});    
