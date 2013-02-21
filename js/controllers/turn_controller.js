App.TurnController = Ember.ObjectController.extend({
  needs: ["leg"],
  selectedDart: 1,
  selectedMultiplier: 1,
  numpadType: 'extended',

  leg: function() {
    return this.get('controllers.leg.content');
  }.property('content'),

  selectDart: function(dartNumber) {
    this.set('selectedDart', dartNumber)
    this.set('dart'+this.selectedDart, null);
  },

  setMultiplier: function(i) {
    this.set('selectedMultiplier', i);
  },
  
  hasScore: function() {
    if (this.get('simpleScore') != null) return true;
    if (this.get('dart1') != null) return true;
    if (this.get('dart2') != null) return true;
    return (this.get('dart3') != null);
  }.property('dart1','dart2','dart3', 'simpleScore'),
  
  requiredScore: function() {
    return this.get('player.requiredScore');
  }.property('player.requiredScore'),
  
  registerThrow: function(number) {
    if (this.get('isNumpadSimple')) {
      this.addSimpleScore(number);
    } else {
      this.registerExtendedScore(number);
    }
  },
  
  registerExtendedScore: function(number) {
    var m = (number<25) ? this.selectedMultiplier : 1; //bulls cannot have multipliers
    var score = number*m;

    this.set('dart'+this.selectedDart, score);
    this.set('selectedMultiplier', 1); // chances are the next throw will be a single

    if (this.selectedDart == 3) {
      this.set('selectedDart', null);
    } else {
      this.set('selectedDart', this.selectedDart+1);
    }
  },
  
  addSimpleScore: function(number) {
    var s = this.get('simpleScore') || "";
    s = s.toString() + number.toString();
    if (parseInt(s, 10) > 180) {
      return false;
    }
    this.set('simpleScore',  s);
  },
  
  registerHomo: function() {
    this.set('dart1', 1);
    this.set('dart2', 20);
    this.set('dart3', 5);
    this.registerTurn();
  },
  
  registerBust: function() {
    this.set('dart1', null);
    this.set('dart2', null);
    this.set('dart3', null);
    this.registerTurn();
  },
  
  registerTurn: function() {
    this.set('completed', true);
    this.advanceTurn();
  },
  
  advanceTurn: function() {
    var nextPlayer,
        players = this.get('leg.players'),
        currentPlayerIndex = this.get('currentPlayerIndex');
        
    // get next player
    if (currentPlayerIndex == players.get('length')-1) {
      nextPlayer = players.get('firstObject');
    } else {
      nextPlayer = players.objectAt(currentPlayerIndex+1);
    }
    this.transitionToRoute('turn', this.get('controllers.leg').nextTurnForPlayer(nextPlayer));
  },
  
  reset: function() {
    this.set('dart1', null);
    this.set('dart2', null);
    this.set('dart3', null);
    this.set('simpleScore', null);
    this.set('completed', false);
  },

  currentPlayerIndex: function() {
    var players = this.get('leg.players'), 
        currentPlayer = this.get('player'),
        idx;
        
    players.forEach(function(player,i) {
      if (player==currentPlayer) idx = i; return;
    });
    return idx;
  }.property('content'),
  
  toggleNumpadType: function() {
    var t = this.get('numpadType'),
        newType = (t==='simple') ? 'extended' : 'simple';
    
    if (newType === 'extended') this.set('simpleScore', null);
    this.set('numpadType', newType);
  },
  
  isDart1Selected: function() {return this.get('selectedDart') === 1}.property('selectedDart'),
  isDart2Selected: function() {return this.get('selectedDart') === 2}.property('selectedDart'),
  isDart3Selected: function() {return this.get('selectedDart') === 3}.property('selectedDart'),

  isDart1Processed: function() {return this.get('dart1') != null}.property('dart1'),
  isDart2Processed: function() {return this.get('dart2') != null}.property('dart2'),
  isDart3Processed: function() {return this.get('dart3') != null}.property('dart3'),

  isSingle: function() {return this.get('selectedMultiplier') === 1}.property('selectedMultiplier'),
  isDouble: function() {return this.get('selectedMultiplier') === 2}.property('selectedMultiplier'),
  isTriple: function() {return this.get('selectedMultiplier') === 3}.property('selectedMultiplier'),

  isNumpadSimple: function() {return this.get('numpadType') === 'simple'}.property('numpadType'),
  isNumpadExtended: function() {return this.get('numpadType') === 'extended'}.property('numpadType'),
  
  isCheckoutPossible: function() {return this.get('player.isCheckoutPossible')}.property('player.isCheckoutPossible'),
  
  turnChanged: function(sender, key, value) {
    this.set('selectedDart', 1)
    this.set('selectedMultiplier', 1);
    this.set('controllers.leg.currentPlayerIndex', this.get('currentPlayerIndex'));
  }.observes('content')

});
