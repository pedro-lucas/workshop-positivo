const net = require('net');

const server = net.createServer(function(client) {

	console.log('Alguém conectou');

	client.on('data', (data) => {
		console.log('Received from client', `"${data.toString('utf8')}"`);
	});

	client.write('Bem vindo ao servidor');

});

server.listen(2000);
