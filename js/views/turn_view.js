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
      var kc = e.keyCode, nr;
      
      // check if a number was pressed
      if ((kc > 47 && kc < 58) || (kc > 95 && kc < 106)) { // 0-9
        e.preventDefault();
        
        // 
        nr = (kc > 58) ? kc-96 : kc-48;
        
        this.controller.set('numpadType', 'simple');
        this.controller.addSimpleScore(nr);
        return;
      }

      // other special keys
      switch(kc) {
      case 8: // backspace
        e.preventDefault();
        this.controller.reset();
        return;
      case 13: // enter or return key
        e.preventDefault();
        this.controller.registerTurn();
        return;
      case 32: // spacebar
        e.preventDefault();
        this.controller.toggleNumpadType();
        return;
      case 83: // S
        e.preventDefault();
        this.controller.setMultiplier(1);
        return;
      case 68: // D
        e.preventDefault();
        this.controller.setMultiplier(2);
        return;
      case 84: // T
        e.preventDefault();
        this.controller.setMultiplier(3);
        return;
      case 88: // X
        e.preventDefault();
        this.controller.registerBust();
        return;
      }
    }, 
    this));
  },
  
  willDestroyElement: function() {
    $(document).off('keydown');
  }
});

App.NumPadView = Ember.View.extend({
  
});