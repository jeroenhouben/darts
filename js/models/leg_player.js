/*
* LegPlayer represents a player enrolled in a Leg
* basically a Join models netween a unique Player profile and a leg
* a Leg always belongs to a Match 
*/
App.LegPlayer = DS.Model.extend({
  leg: DS.belongsTo('App.Leg'),
  player: DS.belongsTo('App.Player'),
  turns: DS.hasMany('App.Turn'),

  name: function() {
    return this.get('player.name')
  }.property(),

  isCheckoutPossible: function() {
    var rs = this.get('requiredScore');
    if (rs<162) {
      return true;
    }
    if (rs===170 || rs===167 || rs===164) {
      return true;
    }
    return false;
  }.property('requiredScore'),

  requiredScore: function() {
    var rs = this.get('leg.match.startScore');
    this.get('turns').forEach(function(turn) {
      rs-=turn.get('score');
    });
    return rs;
  }.property('leg.match.startScore', 'turns.@each.score')

});
