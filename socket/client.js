const net = require('net');

const client = new net.Socket();
client.connect(2000, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Mensagem ao servidor');
});

client.on('data', function(data) {
	console.log('Received', `"${data}"`);
});

setTimeout(() => {
	client.destroy();
}, 5000);
