//Description: This file contains the code for setting up the chat server configuration using socket.io

//import the socket.io module
// const chatSockets = require('socket.io');

//listen for web socket connections and events from client side
module.exports.chatSockets = function(socketServer){
    //This creates a new Socket.IO server instance and binds it to the Node.js server instance specified in socketServer
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: '*',
        }
    });

    io.on('connection', function(socket){
        console.log('New connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('Socket disconnected');
        });
    });
}