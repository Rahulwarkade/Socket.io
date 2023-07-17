const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var activeUser = [];
var userName = [];
// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    activeUser.push(socket.id);
    socket.on("naam",naam=>{
        userName.push(naam);
    })
    io.emit("users",activeUser.length);
    socket.on("disconnect",function(){
        var idx = activeUser.indexOf(socket.id);
        activeUser.splice(idx,1);
        userName.splice(idx,1);
        io.emit("users",activeUser.length);
    })
    socket.on("chat",(chat)=>{
        var idx = activeUser.indexOf(socket.id);
        var username = userName[idx];
        io.emit("msg",{chat,username});
    })

});

// end of socket.io logic

module.exports = socketapi;