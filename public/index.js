// Create connection to socket
const socket = io.connect("http://localhost:4000");

const message = document.getElementById('message');
const user = document.getElementById('user');
const send = document.getElementById('send');
const output = document.getElementById('output');

send.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        user: user.value
    });
});

socket.on('chat', (data) => {
    output.innerHTML += `<p><b>${data.user}: </b>${data.message}</p>`
})