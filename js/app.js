/*Dart Fart Ember App */
window.App = Ember.Application.create({
  rootElement: '#main',
  LOG_TRANSITIONS: true
});

// App.Store = DS.Store.extend({
//   revision: 11,
//   adapter: DS.RESTAdapter.extend({
//     namespace: 'dartmeister/api/v1',
//     bulkCommit: true
//   })
// });

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});