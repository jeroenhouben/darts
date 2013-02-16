// App.Leg.FIXTURES = [{
//   id: 1,
//   startScore: 501
// }];

App.Leg.FIXTURES = [{
  id: 1,
  startScore: 501,
  players: [100,200]
}];

App.Player.FIXTURES = [{
  leg: 1,
  id: 100,
  name: "Jeroen",
  turns: [1000]
},{
  leg: 1,
  id: 200,
  name: "Starvin",
  turns: [1001]
}
];

App.Turn.FIXTURES = [{
  player: 100,
  id: 1000,
  dart1: 1,
  dart2: 1,
  dart3: 1,
  completed: true
},{
  player: 200,
  id: 1001,
  dart1: 2,
  dart2: 2,
  dart3: 2,
  completed: true
}

];
