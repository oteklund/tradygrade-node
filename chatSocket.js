var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    console.log('Connected', socket.id);

    socket.on("join", (user, room) => {
        socket.join(room)
        console.log(`${user} joined room ${room}`)
        socket.emit("getChatHistory")
    })

    socket.on('message', (data) => {
        io.sockets.emit('new message', data);
    });

    socket.off("disconnect", () => {
        console.log("user disconnected:", socket.id)
        const index = connections.findIndex(i => i === socket.id)
        connections.splice(index, 1)
    })

    
    // socket.on('typing', (data) => {
    //     socket.broadcast.emit('typing', data)
    // })
});

module.exports = socketApi; 