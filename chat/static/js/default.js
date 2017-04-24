var client = io(); // Criamos uma conexão com o socket do servidor

// Adicionado alguns valores ao objeto client (deixar as coisas organizadas)

client.isLogged = false;
client.user = {name: 'Unnamed'};
client.EVENT_ERROR = 'chat error';
client.EVENT_LOGGED = 'chat logged';
client.EVENT_LOGIN = 'chat login';
client.EVENT_BROADCAST_MESSAGE = 'chat broadcast message';
client.EVENT_PRIVATE_MESSAGE = 'chat private message';

// Iniciando os eventos de comunicação com servidor

client.on(client.EVENT_ERROR, function(err) {
  swal("Oops...", err, "error");
});

client.on(client.EVENT_LOGGED, function() {
  swal.close();
  client.isLogged = true;
  $('#btn-login').addClass('hidden');
  $('.top .box-active').removeClass('hidden');
  $('#btn-send').attr('disabled', false);
  $('#txt-message').attr('disabled', false);
  $('#txt-message').focus();
});

client.on(client.EVENT_BROADCAST_MESSAGE, function(data) {
  // Usuário recebeu uma mensagem de broadcast
  var $messages = $('#messages');
  $messages.append('<li><strong>'+data.user+'</strong>: '+data.message+'</li>');
});

client.on(client.EVENT_PRIVATE_MESSAGE, function(data) {
  // Usuário recebeu uma mensagem privada
  var $messages = $('#messages');
  $messages.append('<li class="private"><strong>'+data.user+'</strong>: '+data.message+'</li>');
});

client.on('disconnect', function(data) {
  client.isLogged = false;
  $('#btn-login').removeClass('hidden');
  $('.top .box-active').addClass('hidden');
  $('#btn-send').attr('disabled', true);
  $('#txt-message').attr('disabled', true);
  $('#txt-message').val('');
});

// Funções jQuery para enviar dados ao servidor

$(function() {

  $('#btn-send').on('click', function(e) {
    var text = $('#txt-message').val();
    if(text.length > 0) {
      var $messages = $('#messages');
      $('#txt-message').val('');
      $messages.append('<li class="me"><strong>'+client.user.name+':</strong> '+text+'</li>');
      client.emit(client.EVENT_BROADCAST_MESSAGE, text);
    }
  });

  $('#btn-login').on('click', function(e) {

    swal({
      title: "Login",
      text: "Digite o nome do usuário",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "Nome do usuário"
    },
    function(value){
      if (value === false && !value.length) return false;
      client.user.name = value;
      client.emit(client.EVENT_LOGIN, {user: value});
    });

  });

  $('#txt-message').on('keydown', function(e) {
    if(e.which == 13) {
      $('#btn-send').click();
    }
  });

});
