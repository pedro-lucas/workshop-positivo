const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const clientsByUser = {};

app.set('view engine', 'pug');
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'static', 'index.html')));
app.use('/lib', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('static'));

function broadcastToLogged(data, client) {
  const clients = Object.values(clientsByUser);
  clients.forEach(cli => {
    if(cli.isLogged && (!client || cli.user.name != client.user.name)) {
      cli.emit(client.EVENT_BROADCAST_MESSAGE, data);
    }
  });
}

io.on('connection', function(client) {

  console.log('Usuário conectado ao servidor');

  client.isLogged = false;
  client.user = {name: 'Unnamed'};
  client.EVENT_ERROR = 'chat error';
  client.EVENT_LOGGED = 'chat logged';
  client.EVENT_LOGIN = 'chat login';
  client.EVENT_BROADCAST_MESSAGE = 'chat broadcast message';
  client.EVENT_PRIVATE_MESSAGE = 'chat private message';

  client.on(client.EVENT_LOGIN, function(data){
    if(client.isLogged) {
      client.emit(client.EVENT_ERROR, 'O usuário já está logado');
      return;
    }
    if(data && data.user) {

      data.user = data.user.trim();

      if(data.user.length) {
        const clients = io.sockets.clients();
        let clientByUser = clientsByUser[data.user];

        if(clientByUser) {
          client.emit(client.EVENT_ERROR, 'Já existe um usuário logado com esse nome');
        }else{
          client.user.name = data.user;
          client.isLogged = true;
          clientsByUser[data.user] = client;
          client.emit(client.EVENT_LOGGED);
          broadcastToLogged({
            user: 'System',
            message: `O usuário <b>${client.user.name}</b> conectou ao chat`
          }, client);
        }
      }else{
        client.emit(client.EVENT_ERROR, 'O nome do usuário é inválido');
      }

    }else{
      client.emit(client.EVENT_ERROR, 'O nome do usuário é inválido');
    }
  });

  client.on(client.EVENT_BROADCAST_MESSAGE, function(msg){
    if(client.isLogged) {
      msg = msg ? msg.trim() : '';
      if(msg.length) {
        broadcastToLogged({
          user: client.user.name,
          message: msg
        }, client);
      }else{
        client.emit(client.EVENT_ERROR, 'Mensagem inválida');
      }
    }else{
      client.emit(client.EVENT_ERROR, 'Realize login antes de iniciar o chat');
    }
  });

  client.on('disconnect', function() {
    if(client.isLogged) {
      delete clientsByUser[client.user.name];
      console.log(`Usuário ${client.user.name} desconectado`);
    }else{
      console.log(`Usuário desconectado`);
    }
  });

});

http.listen(3000, () => console.log('Executando o app na porta 3000'));
