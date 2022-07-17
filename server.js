const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

let messages = [];

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
