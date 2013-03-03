// Routes
App.Router.map(function() {
  this.resource('matches');
  this.resource('match', { path: '/match/:match_id' }, function() {  
    this.route('setup');
    this.resource('legs');
    this.resource('leg', { path: '/leg/:leg_id' }, function() {
      this.route('finished');
    });
    this.resource('turn', { path: '/turn/:turn_id' });
  });
});

App.LegFinishedRoute = Ember.Route.extend({
  // set the leg to the leg of the parent (LegController)
  setupController: function(controller) {
    controller.set("content", controller.get('controllers.leg.content'));
  }

});    


App.MatchSetupRoute = Ember.Route.extend({

  setupController: function(controller) {
    controller.set("content", controller.get('controllers.match.content'));
    controller.set('availablePlayers', App.Player.find());
  }

});    
