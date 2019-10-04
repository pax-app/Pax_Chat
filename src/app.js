import path from 'path';
import http from 'http';
import express from 'express';
import socketio from 'socket.io';

const app = express();
const raw_server = http.createServer(app);
const io = socketio(raw_server);

const port = process.env.PORT || 3001;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

io.on('connection', socket => {
  console.log(`New user: ${socket.id}`);
  socket.emit('message', `Welcome ${socket.id}`);

  socket.on('text-message', message => {
    io.emit('message', `${socket.id}: ${message}`);
  });
});

raw_server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
