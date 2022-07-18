const express = require('express');
const { userInfo } = require('os');
const path = require('path');
const socket = require('socket.io');

const app = express();

let messages = [];
let users = [];

//middleware
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.htm  l'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log("New client! It's id - " + socket.id);

  socket.on('join', (userName) => {
    users.push({ name: userName, id: socket.id });
    socket.broadcast.emit('message', {
      author: 'ChatBot',
      content: `${userName} has joined the conversation`,
    });
  });

  socket.on('message', (message) => {
    console.log("Oh I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', (userName) => {
    console.log('Oh, socket' + socket.id + ' has left');
    socket.emit('message', {
      author: 'ChatBot',
      content: `${userName} has left the conversation`,
    });
  });
});
