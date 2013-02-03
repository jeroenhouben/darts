/*Dart Fart Ember App */

window.App = Ember.Application.create();

// Router
App.Router.map(function() {
  this.resource('match', function() {
    this.resource('players')
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('match');
  }
});

App.MatchRoute = Ember.Route.extend({
  model: function(params) {
    return App.Match.createRecord({startScore: 501});
  }
});

// Controllers
App.MatchController = Ember.ObjectController.extend({
  // initial value
  isStarted: false,

  start: function(size) {
    var match = this.get('content'),
        players = match.get('players');

    for (var i=1; i <= size; i++) {
      players.createRecord({name: "assman #" + i});
    };
    this.set('isStarted', true);
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

App.Match = DS.Model.extend({
  startScore: DS.attr('number'),
  players: DS.hasMany('App.Player'),
  is301: function() {
    return (this.get('startScore') == 301)
  }.property('startScore'),
  is501: function() {
    return (this.get('startScore') == 501)
  }.property('startScore')
  
});

App.Player = DS.Model.extend({
  name: DS.attr('string'),
  match: DS.belongsTo('App.Match')
});

App.Set = DS.Model.extend({
  match: DS.belongsTo('App.Match'),
  legs: DS.hasMany('App.Leg')
});

App.Leg = DS.Model.extend({
  match: DS.belongsTo('App.Set')
});


