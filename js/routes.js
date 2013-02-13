// Routes
App.Router.map(function() {
  this.resource('match', function() {
    this.route('setup');
    this.resource('players');
    this.route('scoreboard');
    this.resource('turn', { path: '/turns/:turn_id' });
  });
});

/*
* ApplicationRoute
*/
App.ApplicationRoute = Ember.Route.extend({

  events: {
    startLeg: function() {
      var leg = App.Leg.find(1);
          
      if (leg.get('players.length') > 0) {
        leg.resetTurns();
        this.transitionTo('match.scoreboard');
      } else {
        // no players ... 
        this.transitionTo('match.setup');
      }
    }
  }

});


/*
* MatchSetupRoute
*/
App.MatchSetupRoute = Ember.Route.extend({
  model: function() {
    return App.Leg.find(1); // always get the same Leg for now.. (its defined in sampledata (FIXTURES))
  }
});    

/*
* PlayersRoute
*/
App.PlayersRoute = Ember.Route.extend({

  model: function() {
    return App.Leg.find(1).get('players'); // always get the same Leg for now.. (its defined in sampledata (FIXTURES))
  }


});

/*
* MatchScoreboardRoute
*/
App.MatchScoreboardRoute = Ember.Route.extend({

  model: function() {
    return App.Leg.find(1).get('players');
  }

});
