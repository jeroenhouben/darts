// Routes
App.Router.map(function() {
  this.resource('match', function() {
    this.route('new');
    this.resource('leg', { path: '/leg/:leg_id' });
    this.resource('turn', { path: '/turn/:turn_id' });
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('match.new');
  }
});

App.MatchNewRoute = Ember.Route.extend({

  setupController: function(controller) {
    controller.set("content", App.Match.createRecord());
  }

});    
