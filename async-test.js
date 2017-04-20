console.log('Início');

setTimeout(() => {
  console.log('Mensagem 1 no setTimeout');
});

console.log('Meio');

setTimeout(() => {
  console.log('Mensagem 2 no setTimeout');
}, 0);

console.log('Fim');
