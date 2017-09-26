const serve = require('serve');

console.log('serving on port 3000')
console.log('it totally should be working')

const server = serve('../build', { port: 3000 });