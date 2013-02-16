// Models
App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.Match = DS.Model.extend({
  startScore: DS.attr('number', {defaultValue: 301}),
  players: DS.hasMany('App.Player'),
  legs: DS.hasMany('App.Leg'),

  is301: function() {
    return (this.get('startScore') == 301)
  }.property('startScore'),
 
  is501: function() {
    return (this.get('startScore') == 501)
  }.property('startScore')
  
});


/*
* Leg
*
*/
App.Leg = DS.Model.extend({
  match: DS.belongsTo('App.Match'),
  turns: DS.hasMany('App.Turn'),
  
  players: function() {
    return this.get('match.players');
  }.property('match.players')

});

/*
* Player
*
*/
App.Player = DS.Model.extend({
  name: DS.attr('string'),
  leg: DS.belongsTo('App.Leg'),
  
  completedTurns: function() {
    return this.get('turns').filterProperty('completed', true);
  }.property("turns.@each.completed"),

  lastTurns: function() {
    var LIMIT = 13;
    var turns = this.get('turns').filterProperty('completed', true);
    return turns.slice(-LIMIT);
  }.property("turns.@each.completed"),

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
  leg: DS.belongsTo('App.Leg'),
  player: DS.belongsTo('App.Player'),
  dart1: DS.attr('number'),
  dart2: DS.attr('number'),
  dart3: DS.attr('number'),
  completed: DS.attr('boolean'),
  
  score: function() {
    var d1 = this.get('dart1'), d2 = this.get('dart2'), d3 = this.get('dart3');
    if (d1 == null && d2 == null && d3 == null) {
      return null;
    }
    return (d1 ? d1 : 0) + (d2 ? d2 : 0) + (d3 ? d3 : 0);
  }.property('dart1','dart2','dart3'),
  
  /*
  * returns the score at this given turn of the leg
  */
  legScore: function() {
    var leg = this.get('player.leg'),
        turns = this.get('player.turns'), // maybe only use completed scores?
        score = leg.get('startScore')

    idx = turns.indexOf(this);

    // take a slice of the turns array and sum the score
    var slice = turns.slice(0,idx+1)
    
    for (var i = slice.length - 1; i >= 0; i--){
      score -= slice[i].get('score');
    };
    
    return score;
  }.property('player.turns.@each.score', 'player.leg.startScore'),
  
  isCompleted: function() {
    return this.get('completed');
  }.property('completed')
  
});
