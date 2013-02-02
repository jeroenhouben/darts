/*Dart Fart Ember App */

window.App = Ember.Application.create();

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
  players: DS.hasMany('App.Player')
});

App.Player = DS.Model.extend({
  match: DS.belongsTo('App.Match')
});

App.Set = DS.Model.extend({
  match: DS.belongsTo('App.Match'),
  legs: DS.hasMany('App.Leg')
});

App.Leg = DS.Model.extend({
  match: DS.belongsTo('App.Set')
});


