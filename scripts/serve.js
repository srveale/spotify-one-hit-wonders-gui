const serve = require('serve');
const fs = require('fs');

console.log('serving on port 3000')
console.log('it totally should be working')
console.log('filesystem', process.cwd())


const server = serve('./build', { port: 3000 });