//https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206
export {};
const stringify = require('querystring');
const express = require('express');
const app = express();
let http = require('http').createServer(app);
const cors = require('cors');
let io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});
app.use(cors);
io.sockets.on('connection', function (socket) {
  console.log(socket.id, 'news');
  // 2 Send data from server to the rooms
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('Sport', (data) => {
    if (data.room) {
      socket.join(data.room);
      //io.sockets.in(data.room).emit(data.room, 'what is going on, party people SPORT?');
    } else {
      console.log('Sport received informations');
      io.sockets.emit('Sport', data);
    }
  });
  socket.on('Science', (data) => {
    if (data.room) {
      socket.join(data.room);
      //io.sockets.in(data.room).emit(data.room, 'what is going on, party people SPORT?');
    } else {
      io.sockets.emit('Science', data);
    }
  });
  // 3 To say that's someone is actually typing
  socket.on('typingSport', function (data) {
    socket.broadcast.emit('typingSport', data);
  });

  socket.on('typingScience', function (data) {
    socket.broadcast.emit('typingScience', data);
  });
  // 4 To broadcast a message in the room from the admin.
});

http.listen('3000', () => {
  console.log('server started on port 3000');
});
