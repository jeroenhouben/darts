// Routes
App.Router.map(function() {
  this.resource('matches');
  this.resource('match', { path: '/match/:match_id' }, function() {  
    this.route('setup');
    this.resource('legs');
    this.resource('leg', { path: '/leg/:leg_id' }, function() {
      this.route('finish');
    });
    this.resource('turn', { path: '/turn/:turn_id' });
  });
});

App.LegFinishRoute = Ember.Route.extend({

  setupController: function(controller, model) {
    var legController = controller.get('controllers.leg');
    legController.set('currentPlayerIndex', null);
    
    controller.set("content", legController.get('content'));
    controller.set('completed', true);
  }

});    


App.MatchSetupRoute = Ember.Route.extend({

  setupController: function(controller) {
    controller.set("content", controller.get('controllers.match.content'));
    controller.set('availablePlayers', App.Player.find());
  }

});    
