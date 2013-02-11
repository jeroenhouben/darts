// views


/*
*
*/
App.MatchSetupView = Ember.View.extend({
  templateName: 'match/setup',

  touchStart: function(e) {
    this.handleClick(e);
  },
  
  click: function(e) {
    this.handleClick(e);
  },
  
  handleClick: function(e) {
    var btn = $(e.target).closest('button');
    if (!btn.length) {
      return true;
    }
    e.preventDefault();

    // startscore selected
    if (btn.closest('.start-score-select').length) {
      this.controller.set('startScore',  parseInt(btn.text(), 10));

    // players selected
    } else if (btn.closest('.player-select').length) {
      this.controller.initNumberOfPlayers(parseInt(btn.data('players'), 10));
    }

  }
  


});

/*
*
*/
App.TurnOnScoreboardView = Ember.View.extend({
  tagName: 'li',
  templateName: 'turn-on-scoreboard',
  isEditing: false,

  touchStart: function(e) {
    this.handleClick(e);
  },
  
  click: function(e) {
    this.handleClick(e);
  },
  
  handleClick: function(e) {
    this.set('isEditing', (!this.isEditing));
    if (this.get('isEditing')) {
      this.get('controller').startCalculator(this.get('context'));
    }
  }

});

/*
*
*/
App.TurnCalculatorView = Ember.View.extend({
  templateName: 'calc'
});