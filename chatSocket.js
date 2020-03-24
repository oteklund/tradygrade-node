const io = require('socket.io')();

let connections = []
let socketApi = {};



io.on('connection', (socket) => {
    console.log('Connected', socket.id);
    socket.on('joinChat', ({user, chatID}) => {
        socket.join(chatID)

        socket.emit('join', 'Welcome user')

        //User online
        socket.broadcast.to(chatID).emit('user online', `${user} is online`)

        //Usert typing a message
        socket.on('typing', (user) => {socket.broadcast.to(chatID).emit('typing', user)})
    })

    //Listening for chatMessage
    socket.on('chatMessage', message => {
        io.emit('new message', message)
    })

    //User going offline
    socket.on('disconnect', () => {
        io.emit('user disconnect', 'user is no longer online')
        console.log("connection disconnected:", socket.id)
    })

});

socketApi.io = io;

module.exports = socketApi; 