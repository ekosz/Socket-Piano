$(function() {
  //FUNCTIONS
  play = function(id, color) {
    var sound = document.getElementById('note_' + id);
    try {
      sound.DoPlay();
    } catch (error) {
      try {
        sound.Play();
      } catch (error) {
        console.log(error);
        alert('No sound support!');
      }
    }
    setTimeout("$('#"+id+"').removeAttr('style')", 1000);
    $('#'+id).css('background-color', color);
  }

  // SOCKET.IO
  var socket = new io.Socket(null, {port: 9393}); 
  socket.connect();
  socket.on('connect', function(){ });
  socket.on('message', function(id){ 
    play(id, 'blue');
  });
  socket.on('disconnect', function(){});

  // MAIN LOOP
  $(".key").each(function() {
    var e = '';
    e += '<embed id="' + 'note_' + $(this).attr('id') + '"';
    e += ' src="' + $(this).attr('id') + '.au" width="0" height="0"';
    e += ' autostart="false" enablejavascript="true">';
    $('body').append(e);
    $(this).click(function() {
      play($(this).attr('id'), 'red');
      socket.send($(this).attr('id'));
    });
  });

});
