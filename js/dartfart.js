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
    window.gleg = leg; //global shortcut fer debuggin
  },
  
  events: {
    startLeg: function() {
      var leg = this.controllerFor("application").get("leg")
          
      if (leg.get('players').length == 0) {
        this.transitionTo('match.setup');
      } else {
        this.transitionTo('match.scoreboard');
        leg.start();
      }
    }
  }

});

App.TurnRoute = Ember.Route.extend({
})

App.ApplicationController = Ember.Controller.extend({
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
        dummies = ["Marvin", "Jeroen", "Lennard", "Lars Vegas"],
        p;

    players.set('content', []);
    for (var i=1; i <= size; i++) {
      p = leg.registerPlayer(dummies[i-1]);
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

    var leg = this.controllerFor('application').get('leg');
    leg.advanceTurn();
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
  leg: null
});

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

// Models

/*
* for now we will assume a Match has:
* one set, with one leg, but we'll configure them as HasMany to we can later add support for multiple legs/sets
* multiple players (up to 4)
*/

App.Leg = Ember.Object.extend({
  startScore: 501,
  players: [],
  currentPlayer: null,
  
  registerPlayer: function(name) {
    var p = App.Player.create({
      name: name,
      turns: []
    });
    this.players.addObject(p);
    p.set('leg', this);
    return p;
  },
  
  start: function() {
    this.resetPlayerTurns();
    // create a new turn for the first player
    var p1 = this.get('players.firstObject');
    p1.get('turns').addObject(App.Turn.create({player: p1}));
    this.set('currentPlayer', p1);
  },
  
  resetPlayerTurns: function() {
    this.get('players').forEach(function(p) {
      p.set('turns', [])
    });
  },
  
  advanceTurn: function() {
    var currentPlayer = this.get('currentPlayer'),
        idx = this.players.indexOf(currentPlayer);

    if (idx == this.players.length-1) {
      this.set('currentPlayer', this.players[0]);
    } else {
      this.set('currentPlayer', this.players[idx+1]);
    }

    newTurn = App.Turn.create({player: this.get('currentPlayer')});
    this.get('currentPlayer').get('turns').addObject(newTurn);
  },
  

  is301: function() {
    return (this.get('startScore') == 301)
  }.property('startScore'),

  is501: function() {
    return (this.get('startScore') == 501)
  }.property('startScore'),
  

});

App.Player = Ember.Object.extend({
  name: null,
  leg: null,
  turns: null,
  
  completedTurns: function() {
    return this.get('turns').filterProperty('completed', true);
  }.property("turns.@each.completed")
  
});

App.Turn = Ember.Object.extend({
  player: null,
  dart1: null,
  dart2: null,
  dart3: null,
  completed: false,
  
  score: function() {
    var d1 = this.get('dart1'), d2 = this.get('this.dart2'), d3 = this.get('this.dart3');
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
  }.property('player.turns.@each.score', 'player.leg.startScore'),
  
  isCompleted: function() {
    return this.completed;
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
