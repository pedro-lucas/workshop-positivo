const lib = require('./lib');
const TheClass = lib.TheClass;
const nClass = new TheClass();

console.log('lib sum', lib.sum(1, 1));
console.log('TheClass property value', `"${nClass.value}"`);
