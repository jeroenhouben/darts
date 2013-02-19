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