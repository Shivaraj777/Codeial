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

    io.sockets.on('connection', function(socket){
        console.log('New connection received', socket.id);

        //disconnect from socket.io connection
        socket.on('disconnect', function(){
            console.log('Socket disconnected');
        });

        //detect the join_room event
        socket.on('join_room', function(data){
            console.log('Joining request received', data);

            //add the user to the chatroom if it exists, else it will create a chatrrom and add the user to it
            socket.join(data.chatroom);

            //to emit event in a specific chatroom(send a notification to everyone that user has joined the chat room)
            io.in(data.chatroom).emit('User_joined', data);
        });

        //detect the message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}