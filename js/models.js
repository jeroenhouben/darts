// Models
App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

/*
* Leg
*
*/
App.Leg = DS.Model.extend({
  startScore: 501,
  players: DS.hasMany('App.Player'),
  
  resetTurns: function() {
    this.get('players').forEach(function(p) {
      p.set('turns', [])
    });
  },
  
  is301: function() {
    return (this.get('startScore') == 301)
  }.property('startScore'),

  is501: function() {
    return (this.get('startScore') == 501)
  }.property('startScore')
  

});

/*
* Player
*
*/
App.Player = DS.Model.extend({
  name: null,
  leg: DS.belongsTo('App.Leg'),
  turns: DS.hasMany('App.Turn'),
  
  completedTurns: function() {
    return this.get('turns').filterProperty('completed', true);
  }.property("turns.@each.completed"),
  
  requiredScore: function() {
    var i = this.get('leg.startScore');
    this.get('turns').forEach(function(turn) {
      i-=turn.get('score');
    });
    return i;
  }.property('leg.startScore', 'turns.@each.score')
  
});

/*
* Turn
*
*/
App.Turn = DS.Model.extend({
  player: DS.belongsTo('App.Player'),
  dart1: null,
  dart2: null,
  dart3: null,
  completed: false,
  
  score: function() {
    var d1 = this.get('dart1'), d2 = this.get('this.dart2'), d3 = this.get('this.dart3');
    if (d1 == null && d2 == null && d3 == null) {
      return null;
    }
    return d1 + d2 + d3;
  }.property('dart1','dart2','dart3'),

  /*
  * returns the score at this given turn of the leg
  */
  legScore: function() {
    var leg = this.get('player.leg'),
        turns = this.get('player.turns'), // maybe only use completed scores?
        score = leg.startScore // dont use a getter we're not modifying this (??)

    idx = turns.indexOf(this);

    // take a slice of the turns array and sum the score
    var slice = turns.slice(0,idx+1)
    
    for (var i = slice.length - 1; i >= 0; i--){
      score -= slice[i].get('score');
    };
    
    return score;
  }.property('player.turns.@each.score', 'player.leg.startScore'),
  
  isCompleted: function() {
    return this.completed;
  }.property('completed')
  
});
