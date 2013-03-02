App.ChoosePlayersView = Ember.View.extend({
  classNames: "choose-players",
  
  
  didInsertElement: function() {
    var $container       = $(this.get('element')),
        availablePlayers = $container.find('.available-players ol').sortable(),
        gamePlayers      = $container.find('.match-players ol').sortable(),
        controller       = this.get('controller')
    

    // connect them to eachother
    availablePlayers.sortable( "option", "connectWith", gamePlayers );
    gamePlayers.sortable( "option", "connectWith", availablePlayers );

    // after update, tell the controller which players should be selected
    gamePlayers
      .on("sortreceive", function(e, ui) {
        if (gamePlayers.children().length > 4) {
          availablePlayers.sortable("cancel");
        }
      })
      .on("sortupdate", function(e, ui) {
        var ids = gamePlayers.sortable( "toArray", {attribute: "data-player-id"});
        controller.set('isReady', ids.length>1);
        controller.setPlayersById(ids);
      })
  },
  
  didDestroyElement: function() {
    availablePlayers.sortable("destroy");
    gamePlayers.sortable("destroy");
  }
  
});  