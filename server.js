const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);
  });
  socket.on("chat-message", (data) => {
    const isSender = data.name === name;
    appendMessage(data, isSender);
  });
  

  socket.on('chatMessage', ({ room, message, sender }) => {
    io.to(room).emit('chatMessage', { message, sender });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
