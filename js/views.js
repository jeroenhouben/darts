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
