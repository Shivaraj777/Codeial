//Description: This file contains the code for setting up the chat front-end configuration using socket.io

//Creat/Send a request for chat engine connection at front-end
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);  //get and set the chatbox id
        this.userEmail = userEmail;

        //initializing the client side web socket connection to a server using socket.io library
        this.socket = io.connect('http://localhost:3000/');

        //initiate the connection handler if user email exists
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    //handle the interaction between the user and server(detects if the connection has been completed)
    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('Connection established using sockets...');
        });

        //sending an event from client to server to join a chat room
        self.socket.emit('join_room', {
            user_email: self.userEmail,
            chatroom: 'Codeial Room'
        });

        //detect the event user_joined
        self.socket.on('User_joined', function(data){
            console.log('A User has joined', data);
        });

        //send a message after clicking on send message button of chat box
        $('#send-message').click(function(){
            //get message from chat box
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'Codeial Room'
                });
            }
        });

        //detect the receive_message event at client side
        self.socket.on('receive_message', function(data){
            console.log('Message received', data.message);

            let newMessage = $('<li>');

            let messageClass = 'other-message';
            if(data.user_email == self.userEmail){
                messageClass = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageClass);

            $('#chat-messages-list').append(newMessage);
        });
    }
}