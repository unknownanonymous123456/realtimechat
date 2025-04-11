const socket = io();
let room = '';
let name = '';

function joinRoom() {
  room = document.getElementById('room').value;
  name = document.getElementById('name').value;
  socket.emit('joinRoom', room);
}

function sendMessage() {
  const message = document.getElementById('msgInput').value;
  if (room && message) {
    socket.emit('chatMessage', { room, message, sender: name });
    document.getElementById('msgInput').value = '';
  }
}

function appendMessage(data, isSender = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.style.alignSelf = isSender ? 'flex-end' : 'flex-start';
    msgDiv.style.backgroundColor = isSender ? '#dbeafe' : '#f1f5f9';
    msgDiv.innerText = `${data.name}: ${data.message}`;
    document.getElementById('chat-box').appendChild(msgDiv);
    msgDiv.scrollIntoView({ behavior: 'smooth' });
  }
  

socket.on('chatMessage', ({ message, sender }) => {
  const chatBox = document.getElementById('chat-box');
  const msgDiv = document.createElement('div');
  msgDiv.textContent = `${sender}: ${message}`;
  chatBox.appendChild(msgDiv);
});
