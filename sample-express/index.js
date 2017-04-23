const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Testando',
    body: 'Hello World!'
  });
});

app.get('/example', (req, res) => {
  res.render('example', {
    msg: 'OPA'
  });
});

app.listen(3000, () => {
  console.log('Executando o app na porta 3000');
});
