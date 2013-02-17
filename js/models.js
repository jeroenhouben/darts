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
  players: DS.hasMany('App.LegPlayer')
});

App.LegPlayer = DS.Model.extend({
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
  }.property('requiredScore')

});


/*
* Player
*
*/
App.Player = DS.Model.extend({
  name: DS.attr('string')
});

/*
* Turn
*
*/
App.Turn = DS.Model.extend({
  player: DS.belongsTo('App.LegPlayer'),
  dart1: DS.attr('number'),
  dart2: DS.attr('number'),
  dart3: DS.attr('number'),
  completed: DS.attr('boolean'),
  
  leg: function() {
    return this.get('player.leg')
  }.property(),

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
    var leg = this.get('leg'),
        turns = this.get('player').turnsForLeg(leg),
        score = leg.get('match.startScore')

    idx = turns.indexOf(this);

    // take a slice of the turns array and sum the score
    var slice = turns.slice(0,idx+1)
    
    for (var i = slice.length - 1; i >= 0; i--){
      score -= slice[i].get('score');
    };
    
    return score;
  }.property('player.turns.@each.score', 'leg.match.startScore'),
  
  isCompleted: function() {
    return this.get('completed');
  }.property('completed')
  
});
