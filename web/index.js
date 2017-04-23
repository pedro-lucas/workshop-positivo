const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const filePath = path.join(__dirname, 'index.html');
  const rs = fs.createReadStream(filePath);
  rs.pipe(res);
});

server.listen(port, () => {
  const address = server.address();
  console.log(`Server running at http://${address.address}:${address.port}/`);
});
