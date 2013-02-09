/*Dart Fart Ember App */

window.App = Ember.Application.create();

// Router
App.Router.map(function() {
  this.resource('match', function() {
    this.resource('players');
    this.route('setup');
    this.route('scoreboard');
  });
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var match = App.Match.createRecord({startScore: 501});
    var sett = match.set('sett', App.Sett.createRecord({
      match: match
    }));
    var leg = sett.set('leg', App.Leg.createRecord({
      set: sett
    }));
    controller.set('match', match);
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('match.setup');
  }
});

App.MatchSetupRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var c = this.controllerFor('application');
    var match = c.get('match');
    controller.set('content', match);
  }
});    

App.PlayersRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var c = this.controllerFor('application');
    var match = c.get('match');
    controller.set('content', match.get('players'));
  }
});

App.MatchScoreboardRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var c = this.controllerFor('application');
    var leg = c.get('match').get('sett').get('leg');
    controller.set('content', leg);
    debugger
  }
});


App.MatchScoreboardController = Ember.ObjectController.extend({
  whoopin: "on"  
});

// Controllers
App.MatchSetupController = Ember.ObjectController.extend({

  initNumberOfPlayers: function(size) {
    var c = this.controllerFor('application'),
        match = c.get('match'),
        players = match.get('players');

    players.set('content', []);
    for (var i=1; i <= size; i++) {
      players.createRecord({
        name: "assman #" + i,
        match: match
      });
    };
    
    // create some test turns
    var leg = match.get('leg');
    
    for (var i=1; i < 4; i++) {
      console.log('round ', i)
      players.forEach(function(player, index) {
        App.Turn.createRecord({
          nr: i,
          leg: leg,
          player: player,
          dart1: 100,
          dart2: 3,
          dart3: 5
        })
      });
    };
    
    
    this.transitionToRoute('players');
  }

});

App.PlayersController = Ember.ArrayController.extend({
  
});





// Models

/*
* for now we will assume a Match has:
* one set, with one leg, but we'll configure them as HasMany to we can later add support for multiple legs/sets
* multiple players (up to 4)
*/

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});


App.Player = DS.Model.extend({
  match: DS.belongsTo('App.Match'),
  name: DS.attr('string')
});


App.Match = DS.Model.extend({
  startScore: DS.attr('number'),
  players: DS.hasMany('App.Player'),
  sett: DS.belongsTo('App.Sett'),
  is301: function() {
    return (this.get('startScore') == 301)
  }.property('startScore'),
  is501: function() {
    return (this.get('startScore') == 501)
  }.property('startScore')
  
});

App.Sett = DS.Model.extend({
  match: DS.belongsTo('App.Match'),
  leg: DS.belongsTo('App.Leg')
});

App.Leg = DS.Model.extend({
  sett: DS.belongsTo('App.Sett')
});

App.Turn = DS.Model.extend({
  leg: DS.belongsTo('App.Leg'),
  player: DS.belongsTo('App.Player'),
  nr: DS.attr('integer'),
  dart1: DS.attr('integer'),
  dart2: DS.attr('integer'),
  dart3: DS.attr('integer')
});



