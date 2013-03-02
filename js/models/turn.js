/*
* Turn
*
*/
App.Turn = DS.Model.extend({
  player: DS.belongsTo('App.LegPlayer'), // !! is really a LegPlayer, the join model
  dart1: DS.attr('number'),
  dart2: DS.attr('number'),
  dart3: DS.attr('number'),
  completed: DS.attr('boolean'),
  simpleScore: DS.attr('number'), // if they chose to register the summed score at once, not using the individual dart scores.
  leg: Em.computed.alias('player.leg'),

  score: function() {
    var score;
    if (this.get('simpleScore') == null) {
      var d1 = this.get('dart1'), d2 = this.get('dart2'), d3 = this.get('dart3');
      score = (d1 ? d1 : 0) + (d2 ? d2 : 0) + (d3 ? d3 : 0);
    } else {
      score = this.get('simpleScore');
    }
    return score;
  }.property('dart1','dart2','dart3', 'simpleScore'),
  
  /*
  * returns player's score at this particular turn of the leg
  * TODO: only use completed Turns??
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
