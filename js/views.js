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
App.TurnView = Ember.View.extend({
  templateName: 'turn',
  childView: ['multiplierView', 'numpadView'],

  numpadView: Ember.View.extend({
    click: function(e) {
      var btn = $(e.target).closest('button');
      if (!btn.length) {
        return;
      }
      this.get('controller').registerThrow(parseInt(btn.val(), 10));
    }
  }),

  dartScoresView: Ember.View.extend({
    tagName: 'li',
    click: function(e) {
      var btn = $(e.target).closest('button');
      if (!btn.length) {
        return;
      }
      this.get('controller').selectDart(parseInt(btn.val(), 10));
    }
  })
  
});

/*
*
*/
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