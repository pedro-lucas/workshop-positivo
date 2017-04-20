#!/usr/bin/env node

'use strict';

// Importo as bibliotecas que vamos utilizar
const program = require('commander');
const ProgressBar = require('progress');

const bar = new ProgressBar('Imprimindo [:bar] :current/:total :token1', {
  total: 100
});;

program
.version('0.0.1')
.option('-p, --print', 'Imprimir alguma coisa na tela')
.option('-t, --test <string>', 'Fazer algo com uma entrada string')
.parse(process.argv);

if (program.print) {

  // Uso a função setInterval para executar até chegar no final da barra de progresso
  const timerRef = setInterval(() => {
    bar.tick({
      token1: "Passou " + bar.curr + " vezes no timer"
    });
    if (bar.complete) {
      clearInterval(timerRef);
    }else if (bar.curr === 5) {
      bar.interrupt('Essa mensagem aparece quando o valor atual for 5');
    }
  }, 100);

}else if(program.test) {
  // Imprime o valor no console
  console.log('Valor', program.test);
}
