const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server, Namespace } = require("socket.io");
const io = new Server(server);

app.use(express.static('img'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app.html');
});

const rooms = ['main','sub1','sub2'];
let tmp = 0;

io.on('connection', (socket) => {
  console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('join_room',(num,name) => {
      socket.join(rooms[num]);
      console.log(name + " join " + rooms[num]);
      io.to(rooms[num]).emit('join_room',num,name);
    });

    socket.on('leave_room',(num,name) => {
      socket.leave(rooms[num]);
      console.log(name +' leave room '+rooms[num]);
      io.to(rooms[num]).emit('leave_room',num,name);
    });

    socket.on('chat message', (num,name,msg) => {
        console.log('message: to '+num+' ' + msg);
        io.to(rooms[num]).emit('chat message', name,msg);
    });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});