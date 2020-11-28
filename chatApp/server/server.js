const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
require("./config/config")

const publicPath = path.join(__dirname, '..', 'public')
const app = express();
const server = http.createServer(app);
//web-socket server
const io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('socket started');

  // to the current user 
  socket.emit('newMessage', generateMessage('Admin', 'welcome to the chatapp'))
  //to every user except the current user
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'))

  socket.on('createMessage', (messageDetails, callback) => {
    // to the current user 
    io.emit('newMessage', generateMessage(messageDetails.from, messageDetails.text))
    callback('From the server');
  })

  socket.on('currentLocation', (messageDetails) => {
    // to the current user 
    io.emit('newLocationMessage', generateLocationMessage('Admin', messageDetails));
  })

  socket.on('disconnect', () => {
    console.log("server disconnected")
  })
  
})

server.listen(process.env.PORT, () => {
  console.log(`started on port ${process.env.PORT}`);
})

module.exports = {
  app
}
