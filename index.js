const app = require('./app');
const server = require('http').Server(app);
server.listen(1234, 'localhost', () => {
    console.log('Server Started');
});