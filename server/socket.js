var socketio = require('socket.io');
function init(server) {
    var io = socketio(ioServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    return io;
}

module.exports = init;