const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null;

function connectSockets(http, session) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  });
  gIo.on('connection', (socket) => {
    console.log('New socket', socket.id);
    socket.on('disconnect', (socket) => {
      console.log('Someone disconnected');
    });
    socket.on('logService id', (logServiceId) => {
      if (socket.logServiceId === logServiceId) return;
      if (socket.logServiceId) {
        socket.leave(socket.logServiceId);
      }
      socket.join(logServiceId);
      socket.logServiceId = logServiceId;
      console.log('joined to', socket.logServiceId);
    });

    socket.on('changeSongs', (songs) => {
      socket.broadcast.emit('songsChanged', songs);
    });

    socket.on('addActivity', (activitylog) => {
      socket.broadcast.emit('activityAdded', activitylog);
    });

    socket.on('addFollow', (userId) => {
      socket.to(socket.id).emit('followYou', userId);
    });
  });
}

module.exports = {
  connectSockets,
};
