App.TurnView = Ember.View.extend({
  tagName: "section",
  classNames: ['turn'],
  classNameBindings: ['currentPlayerClass','numpadType'],

  currentPlayerClass: function() {
    return "player" + (this.get('controller.currentPlayerIndex')+1);
  }.property('controller.currentPlayerIndex'),

  numpadType: function() {
    return (this.get('controller.numpadType'));
  }.property('controller.numpadType'),
  
  didInsertElement: function() {
    $(document).on('keydown', $.proxy(function(e) {
      switch(e.keyCode) {
      case 13: // enter or return key
        e.preventDefault();
        this.controller.registerTurn();
        break;
      case 32: // spacebar
        e.preventDefault();
        this.controller.toggleNumpadType();
        break;
      case 83: // S
        e.preventDefault();
        this.controller.setMultiplier(1);
        break;
      case 68: // D
        e.preventDefault();
        this.controller.setMultiplier(2);
        break;
      case 84: // T
        e.preventDefault();
        this.controller.setMultiplier(3);
        break;
      }
    }, this));
  },
  
  willDestroyElement: function() {
    $(document).off('keydown');
  }
});

App.NumPadView = Ember.View.extend({
  
});
