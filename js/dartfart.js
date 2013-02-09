/*Dart Fart Ember App */

window.App = Ember.Application.create();

// Router
App.Router.map(function() {
  this.resource('match', function() {
    this.resource('players');
    this.route('setup');
    this.route('scoreboard');
    this.route('turn_calculator');
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

App.MatchTurnCalculatorRoute = Ember.Route.extend({
  
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
    controller.set('content', leg.get('players'));
  }
});

App.MatchScoreboardRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var leg = this.controllerFor('application').get('leg');
    controller.set('content', leg);
  }
});


App.MatchScoreboardController = Ember.ObjectController.extend({
  whoopin: "on"  
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
  }
});

App.MatchScoreboardController = Ember.ObjectController.extend({
  startCalculator: function(turn) {
    this.transitionToRoute('match.turn_calculator');
  },
});

App.PlayersController = Ember.ArrayController.extend({});

// views
App.TurnView = Ember.View.extend({
  tagName: 'li',
  templateName: 'turn',
  isEditing: false,
  turnNumber: 0,
  
  click: function(e, view) {
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

  registerPlayer: function(name) {
    var p = App.Player.create({
      name: name
    });
    this.players.push(p);
    p.set('leg', this);
    return p;
  },
  
  start: function() {
    this.turns = []; // start will always reset
    
    // create a new turn for everybody (basically one empty horizontal line on the scoreboard)
    this.players.forEach(function(p) {
      this.turns.push(App.Turn.create({player: p}))
    })
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
  }
  
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

sampleData()

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
