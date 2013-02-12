// views

/*
*
*/
App.MatchSetupView = Ember.View.extend({
  templateName: 'match/setup',

  click: function(e) {
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

  click: function(e) {
    this.set('isEditing', (!this.isEditing));
    if (this.get('isEditing')) {
      this.get('controller').startCalculator(this.get('context'));
    }
  }

});

/*
*
*/
App.TurnView = Ember.View.extend({
  templateName: 'turn',
  childView: ['multiplierView', 'numpadView'],

  multiplierView: Ember.View.extend({
    click: function(e) {
      var i = parseInt(e.target.value, 10);
      if (i>0) {
        this.get('controller').set('selectedMultiplier', i);
      }
    }
  }),

  numpadView: Ember.View.extend({
    click: function(e) {
      var btn = $(e.target).closest('button');
      if (!btn.length) {
        return;
      }
      this.get('controller').registerThrow(parseInt(btn.val(), 10));
    }
  })
  
});

/*
*
*/
// <button value="1" type="button" {{bindAttr class=":multiplier :btn :btn-success controller.isSingle:active"}}>Single</button>
// <button value="2" type="button" {{bindAttr class=":multiplier :btn :btn-success isDouble:active"}}>Double</button>
// <button value="3" type="button" {{bindAttr class=":multiplier :btn :btn-success isTriple:active"}}>Triple</button>
// 

App.MultiplierButtonView = Ember.View.extend({
  label: null,
  tagName: 'button',
  classNames: ["btn", "btn-success"],
  template: function() {return this.get('label')},

  click: function(e) {
    console.log(parseInt(e.target.value, 10))
    this.controller.set('selectedMultiplier', parseInt(e.target.value, 10));
  }

});