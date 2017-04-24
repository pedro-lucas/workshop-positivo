const lib = require('./lib'); //Arquivo criado para o projeto
const colors = require('colors'); //Módulo adicionado as dependências
const path = require('path'); //Módulo nativo do Node.js

const TheClass = lib.TheClass;
const nClass = new TheClass();

console.log('lib sum'.blue, ('"'+lib.sum(1, 1)+'"').green);
console.log('TheClass property value'.blue, `"${nClass.value}"`.green);
