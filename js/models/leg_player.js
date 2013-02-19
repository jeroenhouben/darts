/*
* LegPlayer represents a player enrolled in a Leg
*/
App.LegPlayer = DS.Model.extend({
  leg: DS.belongsTo('App.Leg'),
  player: DS.belongsTo('App.Player'),
  turns: DS.hasMany('App.Turn'),

  name: function() {
    return this.get('player.name')
  }.property(),

  isCheckoutPossible: function() {
    var i = this.get('requiredScore');
    if (i<162) {
      return true;
    }
    if (i==170 || i==167 || i==164) {
      return true;
    }
    return false;
  }.property('requiredScore'),

  requiredScore: function() {
    var score = this.get('leg.match.startScore');
    this.get('turns').forEach(function(turn) {
      score-=turn.get('score');
    });
    return score;
  }.property('leg.match.startScore', 'turns.@each.score')

});
