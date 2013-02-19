App.TurnView = Ember.View.extend({
  tagName: "section",
  classNames: ['turn'],
  classNameBindings: ['currentPlayerClass'],

  currentPlayerClass: function() {
    return "player" + (this.get('controller.currentPlayerIndex')+1);
  }.property('controller.currentPlayerIndex')

});

