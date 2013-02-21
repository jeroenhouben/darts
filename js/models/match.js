App.Match = DS.Model.extend({
  startScore: DS.attr('number', {defaultValue: 8}),
  players: DS.hasMany('App.Player'),
  legs: DS.hasMany('App.Leg'),

  // create a new Leg and enroll all players known in this match
  createNewLeg: function() {
    var leg = this.get('legs').createRecord();
    
    // enroll players in leg
    this.get('players').forEach(function(player) {
      leg.get('players').createRecord({player: player})
    });
    return leg;
  },

  is301: function() {
    return (this.get('startScore') == 301)
  }.property('startScore'),
 
  is501: function() {
    return (this.get('startScore') == 501)
  }.property('startScore')
  
});