const serve = require('serve');

console.log('serving on port 3000')

serve('../build', { port: 3000 });