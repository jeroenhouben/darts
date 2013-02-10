/*Dart Fart Ember App */

window.App = Ember.Application.create();

// Router
App.Router.map(function() {
  this.resource('match', function() {
    this.resource('players');
    this.resource('turn', { path: '/turns/:turn_id' });
    this.route('setup');
    this.route('scoreboard');
  });
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var leg = App.Leg.create({
      startScore: 501
    });
    controller.set('leg', leg);
    window.gleg = leg;
  }

});

App.TurnRoute = Ember.Route.extend({
})

App.ApplicationController = Ember.Controller.extend({
  startLeg: function(leg) {
    leg.start();
  }
})

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('match.setup');
  }
});

App.MatchSetupRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var leg = this.controllerFor('application').get('leg');
    controller.set('content', leg);
  }
});    

App.PlayersRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var leg = this.controllerFor('application').get('leg');
    controller.set('leg', leg);
    controller.set('content', leg.get('players'));
  }
  
});

App.MatchScoreboardRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var leg = this.controllerFor('application').get('leg');
    controller.set('content', leg);
  }
});


// Controllers
App.MatchSetupController = Ember.ObjectController.extend({
  initNumberOfPlayers: function(size) {
    var leg = this.controllerFor('application').get('leg'),
        players = leg.get('players'),
        p;

    players.set('content', []);
    for (var i=1; i <= size; i++) {
      p = leg.registerPlayer("assman #" + i);
    };
    this.transitionToRoute('players');
  },
  
  setStartScore: function(score) {
    this.get('content').set('startScore', score);
  }
  
});


/*
* represents a single Turn 
*/
App.TurnController = Ember.ObjectController.extend({
  selectedDart: 1,
  selectedMultiplier: 1,

  selectDart: function(dartNumber) {
    this.set('selectedDart', dartNumber)
  },
  
  registerThrow: function(number) {
    var score = number*this.selectedMultiplier; 
    this.set('dart'+this.selectedDart, score);

    this.set('selectedMultiplier', 1); // chances are the next throw will be a single

    if (this.selectedDart == 3) {
      this.set('selectedDart', null);
    } else {
      this.set('selectedDart', this.selectedDart+1);
    }
  },
  
  registerTurn: function() {
    this.set('completed', true);
    this.transitionTo('match.scoreboard');
  },

  setMultiplier: function(i) {
    this.set('selectedMultiplier', i);
  },
  
  isDart1Selected: function() {return this.get('selectedDart') === 1}.property('selectedDart'),
  isDart2Selected: function() {return this.get('selectedDart') === 2}.property('selectedDart'),
  isDart3Selected: function() {return this.get('selectedDart') === 3}.property('selectedDart'),

  isSingle: function() {return this.get('selectedMultiplier') === 1}.property('selectedMultiplier'),
  isDouble: function() {return this.get('selectedMultiplier') === 2}.property('selectedMultiplier'),
  isTriple: function() {return this.get('selectedMultiplier') === 3}.property('selectedMultiplier'),

  
  turnChanged: function(sender, key, value) {
    this.set('selectedDart', 1)
  }.observes('content')

});

App.MatchScoreboardController = Ember.ObjectController.extend({
  startCalculator: function(turn) {
    this.transitionTo('turn', turn)
  }
});


App.PlayersController = Ember.ArrayController.extend({
  leg: null,
  
  startGame: function() {
    this.get('leg').start();
    this.transitionTo('match.scoreboard');
  }
});

// views
App.TurnOnScoreboardView = Ember.View.extend({
  tagName: 'li',
  templateName: 'turn-on-scoreboard',
  isEditing: false,
  turnNumber: 0,
  
  click: function() {
    this.toggleEditing();
  },
  touchEnd: function() {
    this.toggleEditing();
  },
  
  toggleEditing: function() {
    this.set('isEditing', (!this.isEditing));
    if (this.get('isEditing')) {
      this.get('controller').startCalculator(this.get('context'));
    }
  }

});

App.TurnCalculatorView = Ember.View.extend({
  templateName: 'calc'
});

// Models

/*
* for now we will assume a Match has:
* one set, with one leg, but we'll configure them as HasMany to we can later add support for multiple legs/sets
* multiple players (up to 4)
*/

App.Leg = Ember.Object.extend({
  startScore: 501,
  players: [],
  turns: [],
  currentPlayer: null,

  registerPlayer: function(name) {
    var p = App.Player.create({
      name: name
    });
    this.players.addObject(p);
    p.set('leg', this);
    return p;
  },
  
  start: function() {
    this.set('turns', []); // start will always reset
    
    var p1 = this.players[0];
    // create a new turn for the first player
    this.turns.addObject(App.Turn.create({player: p1}));
    this.set('currentPlayer', p1);
  },

  is301: function() {
    return (this.get('startScore') == 301)
  }.property('startScore'),

  is501: function() {
    return (this.get('startScore') == 501)
  }.property('startScore'),
  
  numberOfRounds: function() {
    return Math.floor(this.turns.length / this.players.length);
  },
  
  turnsForPlayer: function(player) {
    return this.turns.filter(function(turn) {
      return (turn.player == player);
    });
  },
  
  completedTurns: function() {
    return this.turns.filterProperty('completed', true);
  }.property("turns.@each.completed"),
  
  completedTurnsChanged: function(sender, key, value) {
    console.log('sender', sender, 'key', key, 'value', value)
  }.observes('completedTurns.length')
  

});

App.Player = Ember.Object.extend({
  name: null,
  leg: null,
  
  turns: function() {
    return this.get('leg').turnsForPlayer(this)
  }.property(),
  

});

App.Turn = Ember.Object.extend({
  player: null,
  dart1: null,
  dart2: null,
  dart3: null,
  completed: false,
  
  score: function() {
    var d1 = this.dart1, d2 = this.dart2, d3 = this.dart3;
    if (d1 == null && d2 == null && d3 == null) {
      return null;
    }
    return d1 + d2 + d3;
  }.property('dart1','dart2','dart3'),

  /*
  * returns the score at this given turn of the leg
  */
  legScore: function() {
    var leg = this.get('player.leg'),
        turns = this.get('player.turns'),
        score = leg.startScore // dont use a getter we're not modifying this (??)

    idx = turns.indexOf(this);

    // take a slice of the turns array and sum the score
    var slice = turns.slice(0,idx+1)
    
    for (var i = slice.length - 1; i >= 0; i--){
      score -= slice[i].get('score');
    };
    
    return score;
  }.property(),
  
  isCompleted: function() {
    return this.completed
  }.property('completed')
  
});

 // sampleData()

function sampleData() {
  var leg = App.Leg.create({
   startScore: 501
  });

  var p1 = leg.registerPlayer('Jeroen');
  var p2 = leg.registerPlayer('Asstrid')

  var t1a = App.Turn.create({
    completed: true,
    player: p1,
    dart1: 10,
    dart2: 20,
    dart3: 30
  })
  leg.turns.push(t1a)

  var t1b = App.Turn.create({
    completed: true,
    player: p2,
    dart1: 60,
    dart2: 25,
    dart3: 10
  })
  leg.turns.push(t1b)

  var t2a = App.Turn.create({
    completed: true,
    player: p1,
    dart1: 2,
    dart2: 3,
    dart3: 5
  })
  leg.turns.push(t2a)


  var t2b = App.Turn.create({
    completed: false,
    player: p2
  })
  leg.turns.push(t2b)


  window.leg = leg;  
}
