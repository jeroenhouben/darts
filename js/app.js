$(document).ready(function() {

  var numpad     = $('#numpad'),
      home       = $('#home'),
      scoreboard = $('#scoreboard')
  
  numpad.on('click', 'button', function() {
    $('#multipliers-modal').modal({})
  });

  scoreboard.on('click', 'td', function() {
    $('#score-entry-choice-modal').modal({})
  });


  
  home.find('.btn-group .btn301').button('toggle');
  
});