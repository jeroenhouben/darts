// views
App.TurnOnScoreboardView = Ember.View.extend({
  tagName: 'li',
  templateName: 'turn-on-scoreboard',
  isEditing: false,
  
  click: function(event) {
    this.set('isEditing', (!this.isEditing));
    if (this.get('isEditing')) {
      this.get('controller').startCalculator(this.get('context'));
    }
  }

});

App.TurnCalculatorView = Ember.View.extend({
  templateName: 'calc'
});