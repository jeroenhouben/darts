$(document).ready(function() {

  var numpad = $('#numpad'),
      home   = $('#home')
  
  numpad.on('click', 'button', function() {
    $('#multipliers-modal').modal({})
  });
  
  home.find('.btn-group .btn301').button('toggle');
  
});