var express = require('express');
var app =  express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv, {});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log('server started');

io.sockets.on('connection', function(socket) {
  console.log('client connected');

  socket.on('move', function(data) {
    console.log('dir: ' + data.dir);
    if (data.dir == 'left') {
      socket.emit('moveAck', {
        x: -1,
        y: 0
      });
    } else if (data.dir == 'up') {
      socket.emit('moveAck', {
        x: 0,
        y: -1
      });
    } else if (data.dir == 'right') {
      socket.emit('moveAck', {
        x: 1,
        y: 0
      });
    } else if (data.dir == 'down') {
      socket.emit('moveAck', {
        x: 0,
        y: 1
      });
    }
  });
});