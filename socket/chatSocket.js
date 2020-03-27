const io = require('socket.io')();
const { ChatUser } = require('../models/ChatUser')

let connections = []
let socketApi = {};

io.on('connection', socket => {
    console.log('Connected', socket.id)

    socket.on('joinChat', ( username, chatID ) => {
        const user = ChatUser(socket.id, username, chatID)

        socket.join(user.chatID, () => {
            console.log(user.chatID)
        }) 

        //Welcome user to chat
        socket.emit('message', `Welcome to chat nro.${user.chatID} ${user.username}!`)

        //User typing a message...
        socket.on('typing', (user) => { socket.broadcast.to(chatID).emit('typing', user) })

        //Listening for chatMessage
        socket.on('chatMessage', message => {
            
            //Commit message to only this chatID
            io.to(user.chatID).emit('new message', message)
        })

        //User going offline
        socket.on('disconnect', () => {
            io.emit('user disconnect', `${user.username} is no longer online`)
            console.log("connection disconnected:", socket.id)
        })
    })

});

socketApi.io = io;

module.exports = socketApi; 