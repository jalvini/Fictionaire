const helper = require('./helper');

class Socket{

    constructor(socket){
        this.io = socket;
    }

    socketEvents(){

        this.io.on('connection', (socket) => {



            /**
             * get the user's Chat list
             */
            socket.on('chat-list', (data) => {

                let chatListResponse = {};

                if (data.userId == '') {

                    chatListResponse.error = true;
                    chatListResponse.message = `User does not exits.`;

                    this.io.emit('chat-list-response',chatListResponse);

                }else{

                    helper.getUserInfo( data.userId,(err, UserInfoResponse)=>{

                        delete UserInfoResponse.password;
                        delete UserInfoResponse.timestamp;

                        helper.getChatList(data.userId, (err, response)=>{

                            this.io.to(socket.id).emit('chat-list-response',{
                                error : false ,
                                singleUser : false ,
                                chatList : response === null ? null : response.users
                            });

                            if (response !== null) {
                                let chatListIds = response.socketIds;
                                chatListIds.forEach( (Ids)=>{
                                    this.io.to(Ids.socketId).emit('chat-list-response',{
                                        error : false ,
                                        singleUser : true ,
                                        chatList : UserInfoResponse
                                    });
                                });
                            }
                        });
                    });
                }
            });

            /**
             * Logout the user
             */
            socket.on('logout',(data)=>{

                const userId = data.userId;
                helper.logout(userId , (error, result)=>{
                    this.io.to(socket.id).emit('logout-response',{
                        error : false
                    });
                    socket.disconnect();
                });
            });


            /**
             * sending the disconnected user to all socket users.
             */
            socket.on('disconnect',()=>{
                setTimeout(()=>{
                    helper.isUserLoggedOut(socket.id,(response)=>{
                        if (response.loggedOut) {
                            socket.broadcast.emit('chat-list-response',{
                                error : false ,
                                userDisconnected : true ,
                                socketId : socket.id
                            });
                        }
                    });
                },1000);
            });

        });

    }

    socketConfig(){

        this.io.use(function(socket, next) {
            let userID = socket.request._query['userId'];
            let userSocketId = socket.id;
            const data = {
                id : userID,
                value : {
                    $set :{
                        socketId : userSocketId,
                        online : 'Y'
                    }
                }
            };

            helper.addSocketId( data ,(err,res)=>{
                next();
            });
        });

        this.socketEvents();
    }
}
module.exports = Socket;