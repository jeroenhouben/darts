/*
* Leg
*
*/
App.Leg = DS.Model.extend({
  match: DS.belongsTo('App.Match'),
  players: DS.hasMany('App.LegPlayer')
});
