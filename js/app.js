/*Dart Fart Ember App */
window.App = Ember.Application.create({
  rootElement: '#main'
});

App.Store = DS.Store.extend({
  revision: 11,
  adapter: DS.RESTAdapter.extend({
    namespace: 'dartmeister/api/v1'
  })
});